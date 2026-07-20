import { Sparkles, Waves, UtensilsCrossed, HeartHandshake } from 'lucide-react';

const experiences = [
  {
    icon: Waves,
    title: 'Denizin sesine uyanmak',
    desc: 'Mavi bayraklı plajlarda, güneşin ilk ışıklarıyla başlayan huzurlu bir sabah.',
    image: 'https://images.pexels.com/photos/1450389/pexels-photo-1450389.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    icon: Sparkles,
    title: 'Huzur & wellness',
    desc: 'Sabah spa’da başlayan bir gün, günbatımında sahilde akşam yemeğiyle sona ersin.',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    icon: UtensilsCrossed,
    title: 'Gurme Lezzetler',
    desc: "A'la carte restoranlarda, dünya mutfağından yöresel tatlarla zengin bir akşam yemeği manzarası.",
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    icon: HeartHandshake,
    title: 'Kişisel Tatil Danışmanlığı',
    desc: 'Çocuklarınız güvende, siz tatilinizde. Tatil boyunca yanınızda olan danışmanınız.',
    image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export function Experience() {
  return (
    <section className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-aqua/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-ocean ring-1 ring-aqua/30">
            Deneyim
          </span>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-tight text-deep sm:text-[44px]">
            Her anı özenle tasarlanmış <span className="text-ocean">tatil deneyimi</span>
          </h2>
          <p className="mt-3 text-[15px] text-deep/55">
            Hepsi bir pakette: konaklama, uçak, transfer ve danışmanlık.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e) => (
            <article key={e.title} className="group relative h-72 overflow-hidden rounded-3xl shadow-lg shadow-deep/5">
              <img src={e.image} alt={e.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-2 grid h-11 w-11 place-items-center rounded-xl bg-aqua/20 ring-1 ring-aqua/40 backdrop-blur">
                  <e.icon className="h-5 w-5 text-aqua" />
                </div>
                <h3 className="font-display text-[20px] font-bold text-white">{e.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/70">{e.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
