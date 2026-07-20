import { useEffect, useRef, useState } from 'react';
import { Brain, Check, Loader2, Database, User, BadgePercent, Star, Calculator, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: Brain, text: 'Tatil tercihleri analiz ediliyor' },
  { icon: User, text: 'Seyahat profili oluşturuluyor' },
  { icon: Database, text: 'Touristica otelleri taranıyor' },
  { icon: BadgePercent, text: 'Kampanyalar karşılaştırılıyor' },
  { icon: Star, text: 'Misafir yorumları analiz ediliyor' },
  { icon: Calculator, text: 'Fiyat / Performans hesaplanıyor' },
  { icon: Sparkles, text: 'En uygun oteller belirleniyor' },
];

const COUNTER_SEQUENCE = [245, 188, 146, 98, 56, 21, 3];

export function AnalysisAnimation({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(COUNTER_SEQUENCE[0]);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const totalDuration = 6000;
    const stepInterval = totalDuration / STEPS.length;
    const counterInterval = totalDuration / (COUNTER_SEQUENCE.length - 1);

    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, stepInterval);

    const counterTimer = setInterval(() => {
      setCounter((c) => {
        const idx = COUNTER_SEQUENCE.indexOf(c);
        return idx < COUNTER_SEQUENCE.length - 1 ? COUNTER_SEQUENCE[idx + 1] : c;
      });
    }, counterInterval);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, totalDuration / 50);

    const complete = setTimeout(() => {
      clearInterval(stepTimer);
      clearInterval(counterTimer);
      clearInterval(progressTimer);
      setProgress(100);
      setTimeout(() => onCompleteRef.current(), 400);
    }, totalDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(counterTimer);
      clearInterval(progressTimer);
      clearTimeout(complete);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#163A5F]/80 backdrop-blur-md">
      <div className="mx-4 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#EF3E42] to-[#d83539] text-white">
            <Brain className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#163A5F]">Touristica Tatil Asistanı</p>
            <p className="text-[12.5px] text-[#163A5F]/55">Tercihlerinizle uyum hesaplanıyor</p>
          </div>
        </div>

        {/* Animated counter */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#163A5F] to-[#1e4a6e] p-5 text-center text-white">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Hotels Scanned</p>
          <p className="mt-1 font-display text-[44px] font-bold leading-none tabular-nums transition-all duration-500">
            {counter}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-white/45">
            <span>Filtreleniyor → en uygun 3 otel</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[12px] font-semibold text-[#163A5F]/60">
            <span>İlerleme</span>
            <span className="tabular-nums">%{progress}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#163A5F]/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#EF3E42] to-[#ff6a5a] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="mt-5 space-y-2">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={s.text}
                className={`flex items-center gap-3 rounded-xl p-2.5 transition-all duration-300 ${
                  active ? 'bg-[#EF3E42]/8 ring-1 ring-[#EF3E42]/20' : done ? 'opacity-50' : 'opacity-25'
                }`}
              >
                <div className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                  done ? 'bg-emerald-50 text-emerald-600'
                    : active ? 'bg-[#EF3E42]/15 text-[#EF3E42]'
                    : 'bg-[#163A5F]/5 text-[#163A5F]/40'
                }`}>
                  {done ? <Check className="h-4 w-4" /> : <Loader2 className={`h-4 w-4 ${active ? 'animate-spin' : ''}`} />}
                </div>
                <span className={`text-[13px] font-semibold transition ${done || active ? 'text-[#163A5F]' : 'text-[#163A5F]/50'}`}>
                  {s.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
