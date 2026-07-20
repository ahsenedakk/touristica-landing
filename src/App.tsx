import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Planner, type PlanType } from './components/Planner';
import { Destinations } from './components/Destinations';
import { Hotels } from './components/Hotels';
import { Campaigns } from './components/Campaigns';
import { Experience } from './components/Experience';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { Floating } from './components/Floating';
import { recommend, type RankedHotel } from './engine/recommend';
import { pickImage } from './engine/recommend';
import type { Plan } from './engine/scoring';

const HEADER_OFFSET = 80;

function scrollToHotelsSection() {
  const el = document.getElementById('hotels');
  if (!el) return;

  // Modal kapanınca buton focus'u scroll'u iptal edebiliyor
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  // 'auto' = anında git (smooth bazen iptal oluyor)
  window.scrollTo({ top, behavior: 'auto' });
}

export default function App() {
  const [recommendations, setRecommendations] = useState<RankedHotel[] | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [scrollTicket, setScrollTicket] = useState(0);
  const plannerRef = useRef<HTMLDivElement>(null);

  const handleAnalysisComplete = (p: PlanType) => {
    setPlan(p);
    setFilter(p.destination === 'all' ? 'all' : p.destination);
    const result = recommend(p);
    const withImages = result.top3.map((r) => ({
      ...r,
      hotel: { ...r.hotel, image: pickImage(r.hotel, p.tripType) },
    }));
    setRecommendations(withImages);
    setScrollTicket((n) => n + 1);
  };

  useEffect(() => {
    if (!scrollTicket || !recommendations) return;

    // DOM güncellensin, sonra kesin kaydır
    const t1 = window.setTimeout(scrollToHotelsSection, 50);
    const t2 = window.setTimeout(scrollToHotelsSection, 200);
    const t3 = window.setTimeout(scrollToHotelsSection, 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [scrollTicket, recommendations]);

  const scrollToPlanner = () => plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToHotels = () => scrollToHotelsSection();

  return (
    <div className="min-h-screen bg-sand">
      <Header />
      <Hero onPlan={scrollToPlanner} />
      <div ref={plannerRef}>
        <Planner onAnalysisComplete={handleAnalysisComplete} />
      </div>
      {/* Öneriler planlayıcının hemen altında — Destinations araya girmesin */}
      <Hotels recommendations={recommendations} plan={plan} filter={filter} />
      <Destinations
        onSelect={(k) => {
          setFilter(k);
          setRecommendations(null);
          setPlan(null);
          setTimeout(scrollToHotels, 100);
        }}
      />
      <Campaigns />
      <Experience />
      <Reviews />
      <Footer />
      <Floating />
    </div>
  );
}
