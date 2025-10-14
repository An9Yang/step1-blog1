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
    </div>
  );
}