import React from 'react';
import Navigation from '@/components/navigation';
import AboutHeroSection from '@/components/about-hero-section';
import AboutJourneySection from '@/components/about-journey-section';
import CardStackSection from '@/components/card-stack-section';
import Footer from '@/components/footer';

export default function About() {
  return (
    <div className="relative bg-black">
      {/* Navigation */}
      <Navigation />

      {/* About Hero Section */}
      <AboutHeroSection />

      {/* Journey Section with Stacking Effect */}
      <AboutJourneySection />

      {/* Join the List Section */}
      <CardStackSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}