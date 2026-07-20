import { Star, BadgeCheck, Quote } from 'lucide-react';
import { reviews } from '../data';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= Math.round(rating) ? 'fill-gold text-gold' : 'text-deep/20'}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-mist py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-gold ring-1 ring-gold/30">
            Misafir Yorumları
          </span>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-deep sm:text-[44px]">
            Tatilden dönenler <span className="text-ocean">misafirlerimiz</span> ne diyor?
          </h2>
          <p className="mt-3 text-[15px] text-deep/55">
            Her yorum, gerçekleşmiş bir rezervasyonun ardından doğrulanarak yayınlanır.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <article key={r.id} className="relative rounded-3xl border border-deep/10 bg-white p-6 shadow-lg shadow-deep/5 transition hover:shadow-xl">
              <Quote className="absolute right-5 top-5 h-10 w-10 text-deep/5" />
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-aqua/30" />
                <div>
                  <p className="text-[15px] font-bold text-deep">{r.name}</p>
                  <p className="text-[12px] text-deep/50">{r.trip}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Stars rating={r.rating} />
                {r.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                    <BadgeCheck className="h-3.5 w-3.5" /> Doğrulanmış
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-[16px] font-bold text-deep">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-deep/70">{r.text}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[12px] font-semibold text-deep/60">
                <BadgeCheck className="h-3.5 w-3.5 text-aqua" /> {r.hotel}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
