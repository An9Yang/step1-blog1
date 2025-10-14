/**
 * Home Page Component
 * 
 * ALEC CARTER 个人博客主页
 * 完全重写，实现优雅的黑色背景设计和动态图片效果
 */

import React from 'react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import LatestStoriesSection from '@/components/latest-stories-section';
import FeaturedStoriesSection from '@/components/featured-stories-section';
import WatchExploreSection from '@/components/watch-explore-section';
import VideoShowcaseSection from '@/components/video-showcase-section';
import CardStackSection from '@/components/card-stack-section';
import Footer from '@/components/footer';

export default function Index() {
  return (
    <div className="relative">
      {/* 导航栏 */}
      <Navigation />

      {/* 英雄区域 */}
      <HeroSection />

      {/* Latest Stories 区块 */}
      <LatestStoriesSection />

      {/* Featured Stories 动效区块 */}
      <FeaturedStoriesSection />

      {/* Watch & Explore 区块 */}
      <WatchExploreSection />

      {/* Video Showcase 动态展示区块 */}
      <VideoShowcaseSection />

      {/* Card Stack 卡片堆叠散开效果 + Join the List */}
      <CardStackSection />

      {/* Footer 页脚 */}
      <Footer />
    </div>
  );
}