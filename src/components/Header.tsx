import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navLinks = [
  { href: '#planner', label: 'Planlayıcı' },
  { href: '#destinations', label: 'Destinasyonlar' },
  { href: '#hotels', label: 'Oteller' },
  { href: '#campaigns', label: 'Kampanyalar' },
  { href: '#reviews', label: 'Yorumlar' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-deep/90 shadow-lg shadow-deep/20 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[14px] font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:08503001400"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-aqua to-ocean px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-aqua/30 transition hover:shadow-aqua/50 sm:flex"
          >
            <Phone className="h-4 w-4" />
            0850 300 14 00
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 lg:hidden"
            aria-label="Menü"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl bg-deep/95 p-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-semibold text-white/85 transition hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:08503001400"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua to-ocean px-4 py-3 text-[14px] font-bold text-white"
            >
              <Phone className="h-4 w-4" />
              0850 300 14 00
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
