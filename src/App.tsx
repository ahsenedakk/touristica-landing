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

export default function App() {
  const [recommendations, setRecommendations] = useState<RankedHotel[] | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const plannerRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);

  const handleAnalysisComplete = (p: PlanType) => {
    setPlan(p);
    setFilter(p.destination === 'all' ? 'all' : p.destination);
    const result = recommend(p);
    const withImages = result.top3.map((r) => ({
      ...r,
      hotel: { ...r.hotel, image: pickImage(r.hotel, p.tripType) },
    }));
    setRecommendations(withImages);
  };

  // Scroll only after recommendations are in the DOM (avoids cancelled smooth scroll)
  useEffect(() => {
    if (!recommendations) return;

    const scroll = () => {
      const el = hotelsRef.current ?? document.getElementById('hotels');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Wait for paint + layout of AI cards
    const t1 = window.setTimeout(scroll, 100);
    const t2 = window.setTimeout(scroll, 450);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [recommendations]);

  const scrollToPlanner = () => plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToHotels = () => hotelsRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div id="top" className="min-h-screen bg-sand">
      <Header />
      <Hero onPlan={scrollToPlanner} />
      <div ref={plannerRef}>
        <Planner onAnalysisComplete={handleAnalysisComplete} />
      </div>
      <Destinations onSelect={(k) => { setFilter(k); setRecommendations(null); setPlan(null); setTimeout(scrollToHotels, 100); }} />
      <div ref={hotelsRef}>
        <Hotels recommendations={recommendations} plan={plan} filter={filter} />
      </div>
      <Campaigns />
      <Experience />
      <Reviews />
      <Footer />
      <Floating />
    </div>
  );
}
