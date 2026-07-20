import { BadgePercent, ArrowRight } from 'lucide-react';
import { campaigns, type Campaign } from '../data';

const themeStyles: Record<Campaign['theme'], { ring: string; chip: string; glow: string }> = {
  sunset: { ring: 'ring-sunset/30', chip: 'bg-sunset/15 text-ember', glow: 'bg-sunset/20' },
  gold: { ring: 'ring-gold/30', chip: 'bg-gold/15 text-gold', glow: 'bg-gold/20' },
  aqua: { ring: 'ring-aqua/30', chip: 'bg-aqua/15 text-ocean', glow: 'bg-aqua/20' },
  ocean: { ring: 'ring-ocean/30', chip: 'bg-ocean/15 text-ocean', glow: 'bg-ocean/20' },
  leaf: { ring: 'ring-emerald-500/30', chip: 'bg-emerald-500/15 text-emerald-600', glow: 'bg-emerald-500/20' },
};

export function Campaigns() {
  return (
    <section id="campaigns" className="scroll-mt-20 bg-deep py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-gold ring-1 ring-gold/30">
            <BadgePercent className="h-3.5 w-3.5" />
            Aktif Kampanyalar
          </span>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-white sm:text-[44px]">
            Bu ayın <span className="text-gold">kaçırılmayacak</span> fırsatları
          </h2>
          <p className="mt-3 text-[15px] text-white/60">
            Banka kampanyalarından erken rezervasyon avantajlarına — tüm fırsatlar Touristica güvencesiyle tek sayfada.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, i) => {
            const t = themeStyles[c.theme];
            return (
              <article
                key={c.id}
                className={`group relative overflow-hidden rounded-3xl bg-white/5 p-1 ring-1 ${t.ring} transition hover:bg-white/[0.07] ${
                  i === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${t.glow} blur-3xl`} />
                <div className="relative flex h-full flex-col rounded-[20px] bg-gradient-to-br from-white/[0.06] to-transparent p-5">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${t.chip}`}>
                      {c.badge}
                    </span>
                    <span className="text-[11.5px] font-semibold text-white/45">Bitiş: {c.expires}</span>
                  </div>
                  <div className="mt-4 flex items-start gap-4">
                    <div className="hidden flex-1 sm:block">
                      <p className="font-display text-[26px] font-bold leading-tight text-white">{c.title}</p>
                      <p className={`mt-1 text-[15px] font-bold ${c.theme === 'gold' ? 'text-gold' : c.theme === 'leaf' ? 'text-emerald-400' : 'text-aqua'}`}>{c.highlight}</p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">{c.description}</p>
                    </div>
                    <div className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28 ${i === 0 ? 'lg:h-40 lg:w-56' : ''}`}>
                      <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-4 flex-1" />
                  <button className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-white transition hover:bg-white/20">
                    {c.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
