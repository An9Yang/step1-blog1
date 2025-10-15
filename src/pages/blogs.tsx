import React from 'react';
import Navigation from '@/components/navigation';
import BlogsHeroSection from '@/components/blogs-hero-section';
import BlogsGridSection from '@/components/blogs-grid-section';
import Footer from '@/components/footer';

export default function Blogs() {
  return (
    <div className="relative bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Blogs Hero Section with Parallax */}
      <BlogsHeroSection />

      {/* Blogs Grid Section - Transition to Grid */}
      <BlogsGridSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}