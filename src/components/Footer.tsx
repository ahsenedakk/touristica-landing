import { ShieldCheck, CreditCard, Headphones, Award } from 'lucide-react';
import { Logo } from './Logo';

const trustItems = [
  { icon: ShieldCheck, title: 'Resmi TÜRSAB acentası', desc: 'A Sınıfı seyahat acentası belgesiyle her rezervasyon yasal güvence altında.' },
  { icon: CreditCard, title: 'Güvenli ödeme altyapısı', desc: 'Taksitli ya da tek çekim — tüm ödemeler banka düzeyinde şifrelenir.' },
  { icon: Headphones, title: 'Kesintisiz destek', desc: 'Türkçe konuşan danışmanlarımız transferde de, otelde de bir telefon uzağınızda.' },
  { icon: Award, title: '30 yıllık tecrübe', desc: '1,4 milyondan fazla misafirin tatilini planladık. Akdeniz’i avucumuzun içi gibi biliyoruz.' },
];

const footerNav = {
  'Destinasyonlar': ['Antalya', 'Belek', 'Side', 'Bodrum', 'Marmaris', 'Kemer', 'Kıbrıs'],
  'Kampanyalar': ['2026 Erken Rezervasyon', 'ParafPara', 'Jest Lira', 'Aile İndirimi', 'Ücretsiz Transfer'],
  'Kurumsal': ['Hakkımızda', 'TÜRSAB Belge No: 1359', 'İletişim', 'Gizlilik Politikası', 'Kullanım Koşulları'],
  'Destek': ['Çağrı Merkezi: 0850 300 14 00', 'WhatsApp Destek', 'SSS', 'İptal & İade'],
};

export function Footer() {
  return (
    <footer id="trust" className="relative overflow-hidden bg-deep text-white">
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-aqua/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sunset/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-aqua/40 hover:bg-white/[0.07]"
            >
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-aqua/20 to-ocean/20 ring-1 ring-aqua/30">
                <t.icon className="h-5 w-5 text-aqua" />
              </div>
              <h3 className="text-[15px] font-bold">{t.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 border-t border-white/10 py-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
              Akdeniz’in en güzel otellerini, en avantajlı fiyatlarla tek sayfada buluşturan Touristica Premium kampanya sayfası.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/70 ring-1 ring-white/10">
              <ShieldCheck className="h-4 w-4 text-aqua" />
              TÜRSAB Belge No: 1359
            </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-[12px] font-extrabold uppercase tracking-widest text-gold">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-[13.5px] text-white/60 transition hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[12.5px] text-white/45">© 2026 Touristica Premium. Tüm hakları saklıdır.</p>
          <p className="text-[12.5px] text-white/45">İstanbul, Türkiye · 30 yıllık tatil deneyimi</p>
        </div>
      </div>
    </footer>
  );
}
