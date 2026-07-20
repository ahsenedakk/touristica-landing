import { hotels, formatTRY, px, type Hotel } from '../data';
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

// Trip-type curated Pexels photos — ONLY visually verified IDs.
// pickImage uses recommendation rank (0,1,2…) so top-3 never share a photo.
const TRIP_IMAGES: Record<string, number[]> = {
  // Aile
  family: [1648377, 1128318, 672532, 2253879, 1148998, 1128317, 3662667, 1450363],
  // Balayı
  honeymoon: [1024993, 3014856, 1488315, 1024967, 1024960, 1779416, 34677241, 27268887],
  // Lüks
  luxury: [2021745, 1571463, 1743229, 1838554, 258154, 3225531, 261101, 261395],
  // Spa: masaj / aromaterapi / wellness (yürüyüş, spor salonu, dişçi YOK)
  spa: [3997991, 3757952, 3757942, 3865676, 4041392, 6621336, 3762875, 261327],
  // Her Şey Dahil: kahvaltı → havuz → kahvaltı → havuz…
  beach: [103124, 261101, 1126728, 189296, 376464, 338504, 302899, 258154],
  // Ekonomik
  budget: [271624, 1287460, 259005, 258154, 3225531, 261327, 189296, 1450389],
};

/**
 * Mood image for a recommendation card.
 * `slot` = rank index (0,1,2…) so the top-3 always get different photos.
 */
export function pickImage(_h: Hotel, tripType: string, slot = 0): string {
  const pool = TRIP_IMAGES[tripType] ?? TRIP_IMAGES.beach;
  const idx = ((slot % pool.length) + pool.length) % pool.length;
  return px(pool[idx], 1200);
}
