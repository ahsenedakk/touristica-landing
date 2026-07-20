import { Star, Sparkles, Check, X } from 'lucide-react';
import { type Hotel } from '../data';

export function WhyThisHotel({ hotel, reasons, pct }: { hotel: Hotel; reasons: string[]; pct: number }) {
  return (
    <div className="rounded-2xl border border-aqua/30 bg-gradient-to-br from-aqua/10 to-ocean/5 p-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-ocean">
          <Sparkles className="h-3.5 w-3.5" />
          Touristica Premium Analizi
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-deep px-3 py-1 text-[13px] font-bold text-white">
          %{pct} <span className="text-white/60">uyum</span>
        </div>
      </div>
      <p className="mt-3 text-[14.5px] font-bold text-deep">Bu otel sizin için neden mükemmel?</p>
      <ul className="mt-2.5 space-y-2">
        {reasons.length > 0 ? (
          reasons.map((r) => (
            <li key={r} className="flex items-start gap-2 text-[13px] text-deep/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              {r}
            </li>
          ))
        ) : (
          <li className="flex items-start gap-2 text-[13px] text-deep/60">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-sunset" />
            Bu kriterlere tam uyan otel bulunamadı. Bütçeyi biraz yükseltmeyi veya başka bir destinasyon seçmeyi deneyin.
          </li>
        )}
      </ul>
      <div className="mt-3 flex items-center gap-2 border-t border-deep/10 pt-3 text-[12px] text-deep/55">
        <Star className="h-3.5 w-3.5 text-gold" />
        {hotel.rating}/10 misafir puanı — {hotel.reviews_count.toLocaleString('tr-TR')} misafir onayladı
      </div>
    </div>
  );
}
