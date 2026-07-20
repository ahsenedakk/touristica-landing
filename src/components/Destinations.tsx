import { MapPin, ArrowUpRight } from 'lucide-react';
import { destinations, formatTRY } from '../data';

export function Destinations({ onSelect }: { onSelect: (key: string) => void }) {
  return (
    <section id="destinations" className="scroll-mt-20 bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-ocean ring-1 ring-ocean/20">
              <MapPin className="h-3.5 w-3.5" />
              Tüm Destinasyonlar
            </span>
            <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-deep sm:text-[44px]">
              Antalya’dan Kıbrıs’a, <span className="text-ocean">özenle seçilmiş</span> lüks oteller
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] text-deep/55">
            Her destinasyon için en iyi otelleri, erken rezervasyon fiyatlarıyla tek sayfada topladık.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <button
              key={d.key}
              onClick={() => onSelect(d.key)}
              className={`group relative overflow-hidden rounded-3xl text-left shadow-lg shadow-deep/5 transition hover:shadow-2xl hover:shadow-deep/10 ${
                i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`relative ${i === 0 ? 'h-[420px] lg:h-full' : 'h-64'}`}>
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />
                <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aqua">{d.hotels_count} otel</p>
                  <h3 className="mt-1 font-display text-[24px] font-bold text-white">{d.name}</h3>
                  <p className="mt-0.5 text-[12.5px] text-white/70">{d.tagline}</p>
                  <p className="mt-2 text-[13px] font-bold text-gold">{formatTRY(d.price_from)} ₺’den başlayan</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
