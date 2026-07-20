import type { Hotel } from '../data';

export type Plan = {
  destination: string;
  month: string;
  nights: number;
  adults: number;
  children: number;
  budget: number;
  features: string[];
  tripType: string;
};

export type Subscores = {
  family: number;
  luxury: number;
  romantic: number;
  spa: number;
  beach: number;
  budget: number;
};

export type ScoreResult = {
  total: number;
  subscores: Subscores;
};

export function scoreHotel(h: Hotel, p: Plan): ScoreResult {
  const subs: Subscores = { family: 0, luxury: 0, romantic: 0, spa: 0, beach: 0, budget: 0 };

  // --- Family suitability ---
  if (p.children > 0) {
    if (h.features.kids_club) subs.family += 15;
    if (h.features.aquapark) subs.family += 11;
    if (h.features.meal.includes('Her Şey')) subs.family += 6;
    if (h.capacity >= 800) subs.family += 4;
    if (h.features.adults_only) subs.family -= 30;
  } else {
    subs.family += 5;
  }

  // --- Luxury score ---
  if (h.features.vip) subs.luxury += 17;
  if (h.stars >= 5) subs.luxury += 8;
  if (h.features.private_beach) subs.luxury += 9;
  if (h.features.spa) subs.luxury += 5;
  if (Number(h.price) > 90000) subs.luxury += 5;
  if (h.features.meal.includes('Ultra')) subs.luxury += 4;

  // --- Romantic score ---
  if (p.children === 0) {
    if (h.features.adults_only) subs.romantic += 17;
    if (h.features.private_beach) subs.romantic += 11;
    if (h.features.spa) subs.romantic += 8;
    if (h.features.pool.toLowerCase().includes('infinity')) subs.romantic += 6;
    if (h.features.beach.toLowerCase().includes('iskele')) subs.romantic += 5;
  }

  // --- Spa score ---
  if (h.features.spa) {
    subs.spa += 14;
    if (h.features.vip) subs.spa += 4;
    if (h.features.adults_only) subs.spa += 7;
    if (h.features.pool.toLowerCase().includes('kapalı')) subs.spa += 3;
  }

  // --- Beach score ---
  if (h.features.beachfront) subs.beach += 12;
  if (h.features.private_beach) subs.beach += 8;
  if (h.features.beach.toLowerCase().includes('kum')) subs.beach += 5;
  if (h.features.beach.toLowerCase().includes('iskele')) subs.beach += 4;

  // --- Budget score ---
  const price = Number(h.price);
  if (p.budget) {
    if (price <= p.budget) subs.budget += 18 + Math.min(8, Math.round((p.budget - price) / p.budget * 20));
    else subs.budget -= Math.min(20, Math.round((price - p.budget) / p.budget * 30));
  }

  // --- Weight by trip type ---
  const weights: Record<string, Partial<Subscores>> = {
    family: { family: 2.0, beach: 1.0, budget: 1.0, luxury: 0.3 },
    honeymoon: { romantic: 2.2, spa: 1.2, luxury: 1.0, beach: 0.8 },
    luxury: { luxury: 2.0, spa: 1.0, beach: 0.8, romantic: 0.5 },
    budget: { budget: 2.0, beach: 1.0, family: 0.5 },
    spa: { spa: 2.2, luxury: 0.8, romantic: 1.0, beach: 0.5 },
    beach: { beach: 2.0, family: 0.5, budget: 0.8, romantic: 0.5 },
  };

  const w = weights[p.tripType] ?? {};
  let total = 0;
  (Object.keys(subs) as (keyof Subscores)[]).forEach((k) => {
    const weight = w[k] ?? 1;
    total += subs[k] * weight;
  });

  // --- Destination match ---
  if (p.destination !== 'all' && h.destination_key === p.destination) total += 25;
  else if (p.destination !== 'all') total -= 8;

  // --- Month availability ---
  if (h.available_months.includes(p.month)) total += 6;
  else total -= 10;

  // --- Feature toggles ---
  for (const f of p.features) {
    if (f === 'kids_club' && h.features.kids_club) total += 9;
    else if (f === 'aquapark' && h.features.aquapark) total += 9;
    else if (f === 'beachfront' && h.features.beachfront) total += 9;
    else if (f === 'adults_only' && h.features.adults_only) total += 9;
    else if (f === 'private_beach' && h.features.private_beach) total += 9;
    else if (f === 'spa' && h.features.spa) total += 9;
    else if (f === 'vip' && h.features.vip) total += 9;
  }

  // --- Rating bonus ---
  total += Number(h.rating) * 10;
  if (h.is_popular) total += 15;

  // --- Nights proximity ---
  total -= Math.abs(p.nights - 7) * 1.5;

  return { total, subscores: subs };
}
