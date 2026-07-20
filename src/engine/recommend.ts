import { hotels, formatTRY, type Hotel } from '../data';
import { scoreHotel, type Plan, type Subscores } from './scoring';

export type RankedHotel = {
  hotel: Hotel;
  score: number;
  pct: number;
  reasons: string[];
  subscores: Subscores;
};

export type RecommendationResult = {
  top3: RankedHotel[];
  totalScanned: number;
};

export function recommend(plan: Plan): RecommendationResult {
  const scored = hotels.map((h) => {
    const { total, subscores } = scoreHotel(h, plan);
    return { hotel: h, score: total, subscores, reasons: generateReasons(h, plan, subscores) };
  });

  scored.sort((a, b) => b.score - a.score);

  const max = scored[0]?.score ?? 0;
  const min = scored[scored.length - 1]?.score ?? 0;
  const span = Math.max(1, max - min);

  const ranked: RankedHotel[] = scored.map((s) => {
    let pct = Math.round(80 + ((s.score - min) / span) * 17);
    pct = Math.max(75, Math.min(98, pct));
    return { hotel: s.hotel, score: s.score, pct, reasons: s.reasons, subscores: s.subscores };
  });

  return { top3: ranked.slice(0, 3), totalScanned: hotels.length };
}

function generateReasons(h: Hotel, p: Plan, subs: Subscores): string[] {
  const price = Number(h.price);
  const old = Number(h.old_price);
  const disc = Math.round((1 - price / old) * 100);
  const out: string[] = [];
  const push = (s: string) => { if (!out.includes(s)) out.push(s); };

  // Budget-based
  if (p.budget && price <= p.budget) push(`Bütçenize uygun — ${formatTRY(p.budget - price)} ₺ avantajlı`);
  else if (p.budget) push('Bütçenize en yakın paket — 9 taksitle erişilebilir');

  // Trip-type-specific
  if (p.tripType === 'family') {
    if (h.features.kids_club) push('Çocuk Dostu');
    if (h.features.aquapark) push('Aquapark');
    if (h.capacity >= 800) push('Aile Odası');
  }
  if (p.tripType === 'honeymoon') {
    if (h.features.adults_only) push('Balayı Konsepti');
    if (h.features.pool.toLowerCase().includes('infinity')) push('Infinity Pool');
    if (h.features.beach.toLowerCase().includes('iskele') || h.features.private_beach) push('Deniz Manzarası');
  }
  if (p.tripType === 'luxury') {
    if (h.features.vip) push('VIP Beach');
    if (h.features.private_beach) push('Özel Plaj');
    if (h.features.pool.toLowerCase().includes('infinity')) push('Infinity Pool');
  }
  if (p.tripType === 'spa') {
    if (h.features.spa) push('Spa Merkezi');
    if (h.features.pool.toLowerCase().includes('kapalı')) push('Wellness Pool');
  }
  if (p.tripType === 'beach') {
    if (h.features.beachfront) push('Denize Sıfır');
    if (h.features.beach.toLowerCase().includes('kum')) push('Kum Plaj');
    if (h.features.private_beach) push('Özel Plaj');
  }
  if (p.tripType === 'budget') {
    if (price <= 45000) push('Bütçenize uygun');
    if (h.features.meal.includes('Her Şey')) push('Her Şey Dahil');
  }

  // Discount
  if (disc >= 20) push(`Erken Rezervasyon %${disc}`);

  // Campaign
  if (h.campaign.toLowerCase().includes('transfer')) push('Ücretsiz Transfer');
  if (h.campaign.toLowerCase().includes('jest')) push('Jest Lira');

  // Rating
  if (Number(h.rating) >= 9) push('Misafir Puanı 9+');

  // Feature toggles
  for (const f of p.features) {
    if (f === 'kids_club' && h.features.kids_club) push('Çocuk Kulübü');
    if (f === 'aquapark' && h.features.aquapark) push('Aquapark');
    if (f === 'beachfront' && h.features.beachfront) push('Denize Sıfır');
    if (f === 'adults_only' && h.features.adults_only) push('Yetişkinlere Özel');
    if (f === 'private_beach' && h.features.private_beach) push('Özel Plaj');
    if (f === 'spa' && h.features.spa) push('Spa Merkezi');
    if (f === 'vip' && h.features.vip) push('VIP Ayrıcalıklar');
  }

  // Destination
  if (p.destination !== 'all' && h.destination_key === p.destination) push('Seçtiğiniz destinasyonda');

  return out.slice(0, 6);
}

// Pick a gallery image that matches the trip type — curated Pexels photos
// that visually represent each holiday category (couples, families, spa, etc.)
const TRIP_IMAGES: Record<string, number[]> = {
  family: [1287460, 1648377, 672532, 1450363], // kids playing, aquapark, family room
  honeymoon: [1024311, 1450389, 2467558, 189296], // couples, romantic suite, sunset dinner
  luxury: [2021745, 261101, 3225531, 1571463], // private villa, infinity pool, premium suite
  spa: [3997991, 3865638, 3998029, 6621336], // spa center, massage, wellness pool
  beach: [1450389, 261101, 259005, 1287460], // beach, pier, sunbeds, sea view
  budget: [1287460, 259005, 261101, 1450389], // standard room, pool, garden, beach
};

export function pickImage(h: Hotel, tripType: string): string {
  const pool = TRIP_IMAGES[tripType] ?? TRIP_IMAGES.beach;
  // Pick a stable image from the pool based on hotel id so each hotel differs
  const idx = (h.id - 1) % pool.length;
  return px(pool[idx], 1200);
}
