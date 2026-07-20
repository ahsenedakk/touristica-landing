export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center" aria-label="Touristica ana sayfa">
      <img
        src="/touristica-logo.png"
        alt="Touristica 32. Yıl"
        className={`h-9 w-auto object-contain transition-opacity group-hover:opacity-85 sm:h-10 ${
          light ? 'brightness-0 invert' : ''
        }`}
      />
    </a>
  );
}
