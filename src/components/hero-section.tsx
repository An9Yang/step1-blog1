/**
 * Hero Section Component
 * 
 * 博客首页的英雄区域，集成了所有核心元素：
 * 1. 大型 "ALEC CARTER" 标题，居中显示
 * 2. 动态图片堆叠效果，位于左侧
 * 3. 副标题信息：Writing, Video, Minimalism, Travel
 * 4. 底部交互按钮：Read the Blogs, Watch the Vlogs, Follow me
 * 5. 地理位置信息：Kuala Lumpur
 * 6. 全屏黑色背景设计
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, UserRound } from 'lucide-react';
import DynamicImageStack from './dynamic-image-stack';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

const CATEGORY_ITEMS = ['Writing', 'Video', 'Minimalism', 'Travel'];

const ACTION_BUTTONS = [
  { label: 'Read the Blogs', icon: ArrowUpRight },
  { label: 'Watch the Vlogs', icon: ArrowUpRight },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const images = useMemo(
    () => [
      'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/5211024/pexels-photo-5211024.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    ],
    [],
  );

  return (
    <section
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(0,0,0,0.2)_45%,_rgba(0,0,0,0.85))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[250px]" />
      <div className="pointer-events-none absolute right-1/3 bottom-12 h-[480px] w-[480px] rounded-full bg-purple-500/20 blur-[220px]" />

      <div className="relative z-20 flex w-full max-w-[1600px] flex-1 flex-col items-center justify-center px-6 pb-36 pt-44 sm:px-12 md:px-16">
        <div className="relative flex w-full max-w-[1080px] flex-col items-center">
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <DynamicImageStack className="-top-20 -translate-y-6 scale-[0.88] sm:scale-[0.92] md:scale-100" images={images} />
          </motion.div>

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="font-extrabold uppercase leading-none tracking-[0.04em] text-[clamp(3.75rem,16vw,11rem)]">
                <span className="block">Alec</span>
                <span className="block">Carter</span>
              </h1>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center justify-center gap-8 text-sm uppercase tracking-[0.5em] text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <span className="h-[1px] w-24 bg-white/15" />
              {CATEGORY_ITEMS.map((item) => (
                <span key={item} className="text-xs md:text-sm">
                  {item}
                </span>
              ))}
              <span className="h-[1px] w-24 bg-white/15" />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-30 w-full max-w-[1400px] px-6 pb-12 sm:px-12 md:px-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex flex-col items-center gap-6 text-sm uppercase tracking-[0.3em] text-white/60 md:flex-row md:items-center md:justify-between">
          <motion.div
            className="flex items-center gap-3 text-xs md:text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="h-4 w-4" />
            <span className="tracking-[0.25em]">Kuala Lumpur</span>
          </motion.div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            {ACTION_BUTTONS.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  className="group flex items-center gap-2 rounded-[10px] border border-white/15 px-5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/75 transition-colors duration-300 hover:border-white/40 hover:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{action.label}</span>
                  <Icon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-[2px]" />
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="flex items-center gap-3 text-xs md:text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <UserRound className="h-4 w-4" />
            <span className="tracking-[0.25em]">Follow me</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;