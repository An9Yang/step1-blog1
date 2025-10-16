import React from 'react';
import Navigation from '@/components/navigation';
import VlogsHeroSection from '@/components/vlogs-hero-section';
import VlogsGridSection from '@/components/vlogs-grid-section';
import CardStackSection from '@/components/card-stack-section';
import Footer from '@/components/footer';

export default function Vlogs() {
  return (
    <div className="relative bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Vlogs Hero Section with Parallax */}
      <VlogsHeroSection />

      {/* Vlogs Grid Section - Transition to Grid */}
      <VlogsGridSection />

      {/* Card Stack Section with Join the List */}
      <CardStackSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
