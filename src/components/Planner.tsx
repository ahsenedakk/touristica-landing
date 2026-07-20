import { useCallback, useState } from 'react';
import { Users, Heart, Crown, Wallet, Sparkles, Waves, ChevronDown, Check, Loader2 } from 'lucide-react';
import {
  destinationsForPlanner,
  months,
  tripTypes,
  formatTRY,
  featureLabels,
} from '../data';
import { AnalysisAnimation } from './AnalysisAnimation';
import type { Plan as PlanType } from '../engine/scoring';

export type { PlanType };

const tripIcons: Record<string, typeof Users> = {
  Users, Heart, Crown, Wallet, Sparkles, Waves,
};

const featureOptions = ['kids_club', 'aquapark', 'beachfront', 'adults_only', 'private_beach', 'spa', 'vip'];

export type PlannerResult = {
  plan: PlanType;
};

export function Planner({
  onAnalysisComplete,
}: {
  onAnalysisComplete: (plan: PlanType) => void;
}) {
  const [plan, setPlan] = useState<PlanType>({
    destination: 'all',
    month: 'Ağustos 2026',
    nights: 7,
    adults: 2,
    children: 0,
    budget: 75000,
    features: [],
    tripType: 'family',
  });
  const [analyzing, setAnalyzing] = useState(false);

  const toggleFeature = (f: string) =>
    setPlan((p) => ({
      ...p,
      features: p.features.includes(f) ? p.features.filter((x) => x !== f) : [...p.features, f],
    }));

  const runAnalysis = () => {
    setAnalyzing(true);
  };

  const handleAnalysisDone = useCallback(() => {
    setAnalyzing(false);
    onAnalysisComplete(plan);
  }, [onAnalysisComplete, plan]);

  return (
    <section id="planner" className="relative scroll-mt-20 overflow-hidden bg-mist py-16 lg:py-24">
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#EF3E42]/8 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0fb5ae]/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EF3E42]/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#EF3E42] ring-1 ring-[#EF3E42]/20">
            <Sparkles className="h-3.5 w-3.5" />
            Tatil Planlayıcın
          </span>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-[#163A5F] sm:text-[44px]">
            Tercihlerini seç — en uygun tatili saniyeler içinde bulalım.
          </h2>
          <p className="mt-3 text-[15px] text-[#163A5F]/60">
            Booking standardında doğrulanmış bilgiler, Touristica'ya özel fiyatlar. Planlayıcıyı doldurun, size özel sıralayalım.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#163A5F]/10 bg-white p-5 shadow-2xl shadow-[#163A5F]/5 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">Destinasyon</label>
              <div className="relative">
                <select
                  value={plan.destination}
                  onChange={(e) => setPlan({ ...plan, destination: e.target.value })}
                  className="h-12 w-full appearance-none rounded-xl border border-[#163A5F]/10 bg-mist px-4 pr-10 text-[14px] font-semibold text-[#163A5F] focus:border-[#EF3E42] focus:outline-none focus:ring-2 focus:ring-[#EF3E42]/20"
                >
                  {destinationsForPlanner.map((d) => (
                    <option key={d.key} value={d.key}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#163A5F]/40" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">Gidiş tarihi</label>
              <div className="relative">
                <select
                  value={plan.month}
                  onChange={(e) => setPlan({ ...plan, month: e.target.value })}
                  className="h-12 w-full appearance-none rounded-xl border border-[#163A5F]/10 bg-mist px-4 pr-10 text-[14px] font-semibold text-[#163A5F] focus:border-[#EF3E42] focus:outline-none focus:ring-2 focus:ring-[#EF3E42]/20"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#163A5F]/40" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">Gece sayısı</label>
              <div className="flex gap-2">
                {[5, 7, 10, 14].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPlan({ ...plan, nights: n })}
                    className={`h-12 flex-1 rounded-xl text-[14px] font-bold transition ${
                      plan.nights === n
                        ? 'bg-[#163A5F] text-white shadow-lg'
                        : 'bg-mist text-[#163A5F]/70 ring-1 ring-[#163A5F]/10 hover:bg-[#163A5F]/5'
                    }`}
                  >
                    {n} gece
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">Misafir</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between rounded-xl bg-mist px-4 ring-1 ring-[#163A5F]/10">
                  <span className="text-[13px] font-semibold text-[#163A5F]/70">Yetişkin</span>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setPlan({ ...plan, adults: Math.max(1, plan.adults - 1) })} className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#163A5F] shadow-sm">−</button>
                    <span className="w-4 text-center text-[15px] font-bold text-[#163A5F]">{plan.adults}</span>
                    <button onClick={() => setPlan({ ...plan, adults: Math.min(6, plan.adults + 1) })} className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#163A5F] shadow-sm">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-mist px-4 ring-1 ring-[#163A5F]/10">
                  <span className="text-[13px] font-semibold text-[#163A5F]/70">Çocuk</span>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setPlan({ ...plan, children: Math.max(0, plan.children - 1) })} className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#163A5F] shadow-sm">−</button>
                    <span className="w-4 text-center text-[15px] font-bold text-[#163A5F]">{plan.children}</span>
                    <button onClick={() => setPlan({ ...plan, children: Math.min(4, plan.children + 1) })} className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#163A5F] shadow-sm">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">
              Tatil tarzı
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {tripTypes.map((t) => {
                const Icon = tripIcons[t.icon] || Users;
                const active = plan.tripType === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setPlan({ ...plan, tripType: t.key })}
                    className={`group rounded-2xl border p-3.5 text-left transition ${
                      active ? 'border-[#EF3E42] bg-[#EF3E42]/8 shadow-md shadow-[#EF3E42]/10' : 'border-[#163A5F]/10 bg-white hover:border-[#EF3E42]/40 hover:bg-mist'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${active ? 'text-[#EF3E42]' : 'text-[#163A5F]/50'}`} />
                    <p className="mt-2 text-[13.5px] font-bold text-[#163A5F]">{t.label}</p>
                    <p className="text-[11px] text-[#163A5F]/50">{t.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">Bütçe</label>
              <span className="text-[14px] font-bold text-[#163A5F]">{formatTRY(plan.budget)} ₺</span>
            </div>
            <input
              type="range"
              min={20000}
              max={200000}
              step={2500}
              value={plan.budget}
              onChange={(e) => setPlan({ ...plan, budget: Number(e.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#163A5F]/10 accent-[#EF3E42]"
            />
            <div className="mt-1.5 flex justify-between text-[11px] text-[#163A5F]/40">
              <span>25.000 ₺</span>
              <span>200.000 ₺</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/50">
              Otel Özellikleri <span className="font-normal normal-case text-[#163A5F]/35">(opsiyonel)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map((f) => {
                const active = plan.features.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                      active ? 'bg-[#163A5F] text-white shadow-md' : 'bg-mist text-[#163A5F]/70 ring-1 ring-[#163A5F]/10 hover:bg-[#163A5F]/5'
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {featureLabels[f]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-[12.5px] text-[#163A5F]/50">
              Ön ödeme yok • Ücretsiz iptal • <span className="font-semibold text-[#163A5F]/70">Şu an {120} otel müsait</span>
            </p>
            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#EF3E42] px-7 py-4 text-[15px] font-bold text-white shadow-2xl shadow-[#EF3E42]/30 transition hover:scale-[1.02] hover:bg-[#d83539] hover:shadow-[#EF3E42]/50 disabled:opacity-70 sm:w-auto"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {analyzing ? 'Analiz ediliyor…' : 'En Uygun Tatili Bul'}
            </button>
          </div>
        </div>
      </div>

      {analyzing && <AnalysisAnimation onComplete={handleAnalysisDone} />}
    </section>
  );
}
