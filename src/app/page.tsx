import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import PopularDestinations from '@/components/PopularDestinations';
import Statistics from '@/components/Statistics';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <PopularDestinations />
      <Statistics />
      <Reviews />
      <FAQ />
      <CallToAction />
    </main>
  );
}
