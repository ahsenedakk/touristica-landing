import { useState, useRef } from 'react';
import { ArrowDown, Sparkles, Headset, Plane, CreditCard, Clock } from 'lucide-react';
import { stats } from '../data';

const VIDEO_SOURCES = [
  'https://videos.pexels.com/video-files/16451462/16451462-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
];
const POSTER =
  'https://images.pexels.com/photos/1450389/pexels-photo-1450389.jpeg?auto=compress&cs=tinysrgb&w=1920';

const glassCards = [
  { icon: Sparkles, title: 'Erken Rezervasyon', value: "%50'ye Varan İndirim" },
  { icon: Plane, title: 'Ücretsiz Transfer', value: 'Havalimanı + Otel' },
  { icon: CreditCard, title: '9 Taksit', value: 'Peşin Fiyatına' },
  { icon: Clock, title: 'Son Dakika', value: 'Sınırlı Kontenjan' },
];

export function Hero({ onPlan }: { onPlan: () => void }) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#163A5F]">
      {/* Poster image — stays as fallback until video fades in */}
      <img
        src={POSTER}
        alt="Lüks tatil köyü havuz başı"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
          videoReady ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Cinematic background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER}
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {VIDEO_SOURCES.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>

      {/* Subtle dark overlay for readability (≈25%) */}
      <div className="absolute inset-0 bg-[#163A5F]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#163A5F]/85 via-[#163A5F]/30 to-[#163A5F]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#163A5F]/65 via-transparent to-transparent" />

      {/* Soft brand glows */}
      <div className="absolute -right-20 top-32 h-72 w-72 rounded-full bg-[#EF3E42]/15 blur-3xl" />
      <div className="absolute -left-24 bottom-24 h-80 w-80 rounded-full bg-[#EF3E42]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-24 pb-20 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12.5px] font-bold tracking-wide text-white ring-1 ring-white/25 backdrop-blur-md"
            style={{ animationDelay: '60ms' }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#EF3E42]" />
            Size Özel Tatil Önerileri
          </div>

          {/* Headline */}
          <h1
            className="mt-6 animate-fade-up font-display text-[42px] font-bold leading-[1.06] text-white text-balance sm:text-[56px] lg:text-[66px]"
            style={{ animationDelay: '160ms' }}
          >
            Hayalinizdeki Tatil,
            <br />
            <span className="bg-gradient-to-r from-white via-white to-[#EF3E42] bg-clip-text text-transparent">
              Size Özel Önerilerle
            </span>{' '}
            Başlıyor.
          </h1>

          {/* Description */}
          <p
            className="mt-5 max-w-xl animate-fade-up text-[16px] leading-relaxed text-white/80 sm:text-[17.5px]"
            style={{ animationDelay: '320ms' }}
          >
            Touristica'nın otelleri, kampanyaları ve misafir deneyimlerinden yararlanarak
            beklentilerinize en uygun tatili saniyeler içinde keşfedin.
          </p>

          {/* Buttons */}
          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '460ms' }}
          >
            <button
              onClick={onPlan}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#EF3E42] px-7 py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(239,62,66,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#d83539] hover:shadow-[0_14px_40px_-8px_rgba(239,62,66,0.75)]"
            >
              Tatilimi Bul
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <a
              href="#planner"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-4 text-[15px] font-bold text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:ring-white/40"
            >
              <Headset className="h-4 w-4" />
              Uzmana Danış
            </a>
          </div>

          {/* Floating glass cards */}
          <div
            className="mt-10 grid max-w-2xl animate-fade-up grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: '620ms' }}
          >
            {glassCards.map((c, i) => (
              <div
                key={c.title}
                className="animate-float rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition hover:bg-white/15"
                style={{ animationDelay: `${620 + i * 140}ms`, animationDuration: `${6 + i * 0.4}s` }}
              >
                <c.icon className="mb-1.5 h-5 w-5 text-[#EF3E42]" />
                <p className="text-[12.5px] font-bold leading-tight text-white">{c.title}</p>
                <p className="mt-0.5 text-[11px] text-white/65">{c.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#planner"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float flex-col items-center gap-1.5 text-white/60 transition hover:text-white lg:flex"
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest">Tatil Planlayıcın</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
