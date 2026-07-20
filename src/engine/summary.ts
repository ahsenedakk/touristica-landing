import type { Plan } from './scoring';
import { destinationsForPlanner } from '../data';

const tripTypeNames: Record<string, string> = {
  family: 'aile tatili',
  honeymoon: 'balayı tatili',
  luxury: 'lüks tatil',
  budget: 'ekonomik tatil',
  spa: 'spa & wellness tatili',
  beach: 'deniz tatili',
};

const tripTypePriorities: Record<string, string> = {
  family: 'çocuk dostu ve aquaparklı oteller önceliklendirildi',
  honeymoon: 'romantik konseptli yetişkinlere özel oteller önceliklendirildi',
  luxury: 'VIP servis ve özel plajlı lüks oteller önceliklendirildi',
  budget: 'fiyat / performans oranı yüksek oteller önceliklendirildi',
  spa: 'spa ve wellness merkezli oteller önceliklendirildi',
  beach: 'denize sıfır ve kum plajlı oteller önceliklendirildi',
};

export function generateSummary(plan: Plan): string {
  const tripName = tripTypeNames[plan.tripType] ?? 'tatil';
  const priority = tripTypePriorities[plan.tripType] ?? 'en uygun oteller önceliklendirildi';

  const destName = destinationsForPlanner.find((d) => d.key === plan.destination)?.name ?? 'tüm bölgeler';
  const destClause = plan.destination !== 'all'
    ? `${destName} bölgesindeki kampanyalar, `
    : 'tüm destinasyonlardaki kampanyalar, ';

  const guestCount = plan.adults + plan.children;
  const guestClause = guestCount > 1
    ? `${guestCount} misafir için uygun, `
    : '';

  const budgetClause = `bütçeniz (${new Intl.NumberFormat('tr-TR').format(plan.budget)} ₺) ve tercih ettiğiniz otel özellikleri değerlendirilerek `;

  const featureClause = plan.features.length > 0
    ? 'seçtiğiniz otel özellikleriyle uyumlu, '
    : '';

  return `${tripName.charAt(0).toUpperCase() + tripName.slice(1)} seçtiğiniz için ${priority}. ${destClause}${guestClause}${budgetClause}${featureClause}sizin için en uygun 3 otel seçildi.`;
}
