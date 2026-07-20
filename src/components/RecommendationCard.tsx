import { Star, MapPin, Check, GitCompare, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { formatTRY, formatMonthly, type Hotel } from '../data';
import type { Subscores } from '../engine/scoring';

export type RankedHotel = {
  hotel: Hotel;
  score: number;
  pct: number;
  reasons: string[];
  subscores: Subscores;
};

export function RecommendationCard({
  ranked,
  index,
  compared,
  onCompare,
  canCompare,
}: {
  ranked: RankedHotel;
  index: number;
  compared: boolean;
  onCompare: () => void;
  canCompare: boolean;
}) {
  const { hotel, pct, reasons } = ranked;

  const rankLabels = ['Önerimiz', 'En İyi Alternatif', 'Bütçe Dostu Seçim'];
  const rankColors = ['from-[#EF3E42] to-[#d83539]', 'from-[#163A5F] to-[#1e4a6e]', 'from-[#0e6fae] to-[#0fb5ae]'];

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#163A5F]/10 bg-white shadow-lg shadow-[#163A5F]/5 transition hover:shadow-2xl hover:shadow-[#163A5F]/10">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#163A5F]/80 via-transparent to-transparent" />

        {/* Rank badge */}
        <div className="absolute left-4 top-4">
          <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${rankColors[index]} px-3 py-1.5 text-[11px] font-bold text-white shadow-lg`}>
            <Sparkles className="h-3 w-3" />
            {rankLabels[index]}
          </span>
        </div>

        {/* Match percentage */}
        <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-3 py-1.5 backdrop-blur">
          <span className="text-[15px] font-bold text-[#163A5F]">%{pct}</span>
          <span className="ml-1 text-[10px] font-semibold text-[#163A5F]/50">uyum</span>
        </div>

        {/* Discount badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-[#EF3E42] px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
            %{Math.round((1 - hotel.price / hotel.old_price) * 100)} İndirim
          </span>
        </div>

        {/* Hotel name + location */}
        <div className="absolute inset-x-4 bottom-4 pr-20">
          <h3 className="font-display text-[22px] font-bold leading-tight text-white">{hotel.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-white/75">
            <MapPin className="h-3.5 w-3.5" /> {hotel.location}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Rating + campaign */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[#c9a45c] text-[#c9a45c]" />
            <span className="text-[15px] font-bold text-[#163A5F]">{hotel.rating}</span>
            <span className="text-[12px] text-[#163A5F]/45">/ 10</span>
            <span className="ml-1.5 text-[12px] text-[#163A5F]/40">({hotel.reviews_count.toLocaleString('tr-TR')} yorum)</span>
          </div>
          <span className="rounded-full bg-[#0fb5ae]/10 px-2.5 py-1 text-[11px] font-bold text-[#0e6fae] ring-1 ring-[#0fb5ae]/20">
            {hotel.campaign}
          </span>
        </div>

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.features.spa && <Tag>Spa</Tag>}
          {hotel.features.kids_club && <Tag>Çocuk Kulübü</Tag>}
          {hotel.features.aquapark && <Tag>Aquapark</Tag>}
          {hotel.features.vip && <Tag>VIP</Tag>}
          {hotel.features.private_beach && <Tag>Özel Plaj</Tag>}
          {hotel.features.beachfront && <Tag>Denize Sıfır</Tag>}
          <Tag>{hotel.features.meal}</Tag>
        </div>

        {/* Recommendation reasons */}
        <div className="mt-4 rounded-2xl bg-[#163A5F]/[0.03] p-4">
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#163A5F]/45">Neden bu otel?</p>
          <ul className="mt-2 space-y-1.5">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-[13px] text-[#163A5F]/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0fb5ae]" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between border-t border-[#163A5F]/10 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#EF3E42]">EN İYİ FİYAT</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[26px] font-bold text-[#163A5F]">{formatTRY(hotel.price)} ₺</span>
              <span className="text-[13px] text-[#163A5F]/40 line-through">{formatTRY(hotel.old_price)} ₺</span>
            </div>
            <p className="text-[12px] text-[#163A5F]/55">Aylık {formatMonthly(hotel.price)} ₺'den • 9 taksit</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href="#hotels"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#EF3E42] px-4 py-3 text-[13px] font-bold text-white shadow-lg shadow-[#EF3E42]/30 transition hover:bg-[#d83539] hover:shadow-[#EF3E42]/50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Touristica'da İncele
          </a>
          <button
            onClick={onCompare}
            disabled={!canCompare && !compared}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-[13px] font-bold transition ${
              compared
                ? 'bg-[#0fb5ae] text-white'
                : canCompare
                ? 'bg-[#163A5F]/5 text-[#163A5F] hover:bg-[#163A5F]/10'
                : 'bg-[#163A5F]/5 text-[#163A5F]/30 cursor-not-allowed'
            }`}
          >
            {compared ? <Check className="h-3.5 w-3.5" /> : <GitCompare className="h-3.5 w-3.5" />}
            {compared ? 'Seçildi' : 'Karşılaştır'}
          </button>
        </div>
        <a
          href="https://wa.me/908503001400"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#163A5F]/5 px-4 py-2.5 text-[13px] font-bold text-[#163A5F] ring-1 ring-[#163A5F]/10 transition hover:bg-[#163A5F]/10"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp'a Gönder
        </a>
      </div>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#163A5F]/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-[#163A5F]/70 ring-1 ring-[#163A5F]/8">
      {children}
    </span>
  );
}
