import { useState } from 'react';
import { Sparkles, GitCompare, X, Check } from 'lucide-react';
import { hotels as allHotels, formatTRY, type Hotel } from '../data';
import { RecommendationCard, type RankedHotel } from './RecommendationCard';
import { generateSummary } from '../engine/summary';
import type { Plan } from '../engine/scoring';

export function Hotels({
  recommendations,
  plan,
  filter,
}: {
  recommendations: RankedHotel[] | null;
  plan: Plan | null;
  filter: string;
}) {
  const [compare, setCompare] = useState<number[]>([]);

  const toggleCompare = (id: number) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));

  // When no recommendations, show default hotel grid (filtered by destination)
  const defaultList = allHotels
    .filter((h) => filter === 'all' || h.destination_key === filter)
    .sort((a, b) => b.sort_order - a.sort_order)
    .map((h) => ({ hotel: h, score: 0, pct: 0, reasons: [], subscores: { family: 0, luxury: 0, romantic: 0, spa: 0, beach: 0, budget: 0 } }));

  const list = recommendations ?? defaultList;
  const showAI = !!recommendations && !!plan;

  return (
    <section id="hotels" className="scroll-mt-24 bg-mist py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EF3E42]/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#EF3E42] ring-1 ring-[#EF3E42]/20">
            <Sparkles className="h-3.5 w-3.5" />
            {showAI ? 'Yapay Zekâ Önerileri' : 'Özel Seçim'}
          </span>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-[#163A5F] sm:text-[44px]">
            {showAI ? (
              <>Sizin için <span className="text-[#EF3E42]">özenle seçilen</span> 3 otel</>
            ) : (
              <>Sizin için <span className="text-[#EF3E42]">özenle seçilen</span> oteller</>
            )}
          </h2>
        </div>

        {/* AI Summary */}
        {showAI && plan && (
          <div className="mt-6 rounded-2xl border border-[#EF3E42]/20 bg-gradient-to-br from-[#EF3E42]/5 to-transparent p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EF3E42]/10 ring-1 ring-[#EF3E42]/20">
                <Sparkles className="h-5 w-5 text-[#EF3E42]" />
              </div>
              <p className="text-[14px] leading-relaxed text-[#163A5F]/80">
                {generateSummary(plan)}
              </p>
            </div>
          </div>
        )}

        {list.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[#163A5F]/10 bg-white p-10 text-center">
            <p className="text-[16px] font-bold text-[#163A5F]">Bu kriterlere tam uyan otel bulunamadı</p>
            <p className="mt-1.5 text-[14px] text-[#163A5F]/55">Bütçeyi biraz yükseltmeyi veya başka bir destinasyon seçmeyi deneyin.</p>
          </div>
        ) : showAI ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {list.map((r, i) => (
              <RecommendationCard
                key={r.hotel.id}
                ranked={r}
                index={i}
                compared={compare.includes(r.hotel.id)}
                onCompare={() => toggleCompare(r.hotel.id)}
                canCompare={compare.length < 3 || compare.includes(r.hotel.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {list.map((r, i) => (
              <RecommendationCard
                key={r.hotel.id}
                ranked={r}
                index={Math.min(i, 2)}
                compared={compare.includes(r.hotel.id)}
                onCompare={() => toggleCompare(r.hotel.id)}
                canCompare={compare.length < 3 || compare.includes(r.hotel.id)}
              />
            ))}
          </div>
        )}

        {compare.length >= 2 && (
          <Comparison ids={compare} onClose={() => setCompare([])} />
        )}
      </div>
    </section>
  );
}

function Comparison({ ids, onClose }: { ids: number[]; onClose: () => void }) {
  const items = allHotels.filter((h) => ids.includes(h.id));
  const rows: { label: string; render: (h: Hotel) => React.ReactNode }[] = [
    { label: 'Paket Fiyatı', render: (h) => `${formatTRY(h.price)} ₺` },
    { label: 'Misafir Puanı', render: (h) => `${h.rating}/10` },
    { label: 'Yorum Sayısı', render: (h) => h.reviews_count.toLocaleString('tr-TR') },
    { label: 'Konsept', render: (h) => h.features.meal },
    { label: 'Havuz', render: (h) => h.features.pool },
    { label: 'Plaj', render: (h) => h.features.beach },
    { label: 'Havalimanı', render: (h) => `${h.features.airport_km} km` },
    { label: 'Çocuk Kulübü', render: (h) => (h.features.kids_club ? <Check className="h-4 w-4 text-[#0fb5ae]" /> : <X className="h-4 w-4 text-[#163A5F]/30" />) },
    { label: 'Aquapark', render: (h) => (h.features.aquapark ? <Check className="h-4 w-4 text-[#0fb5ae]" /> : <X className="h-4 w-4 text-[#163A5F]/30" />) },
    { label: 'Spa', render: (h) => (h.features.spa ? <Check className="h-4 w-4 text-[#0fb5ae]" /> : <X className="h-4 w-4 text-[#163A5F]/30" />) },
    { label: 'VIP', render: (h) => (h.features.vip ? <Check className="h-4 w-4 text-[#0fb5ae]" /> : <X className="h-4 w-4 text-[#163A5F]/30" />) },
  ];
  return (
    <div className="fixed inset-0 z-[55] grid place-items-center bg-[#163A5F]/70 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 font-display text-[22px] font-bold text-[#163A5F]">
            <GitCompare className="h-5 w-5 text-[#EF3E42]" /> Yan yana bakın
          </h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-mist text-[#163A5F]/60 hover:bg-[#163A5F]/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/40">Kriterler</th>
                {items.map((h) => (
                  <th key={h.id} className="p-2 text-left">
                    <p className="text-[14px] font-bold text-[#163A5F]">{h.name}</p>
                    <p className="text-[11.5px] font-normal text-[#163A5F]/50">{h.location}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-[#163A5F]/10">
                  <td className="p-2.5 text-[12.5px] font-semibold text-[#163A5F]/60">{r.label}</td>
                  {items.map((h) => (
                    <td key={h.id} className="p-2.5 text-[13px] font-semibold text-[#163A5F]">{r.render(h)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
