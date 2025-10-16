import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VlogsGridSectionProps {
  className?: string;
}

const GRID_VLOGS = [
  {
    id: 1,
    title: 'Morning Routine in Tokyo',
    category: 'Daily Life',
    location: 'Tokyo',
    date: 'September 8, 2025',
    image: 'https://images.pexels.com/photos/3771787/pexels-photo-3771787.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 2,
    title: 'Exploring Street Markets',
    category: 'Travel',
    location: 'Bangkok',
    date: 'August 15, 2025',
    image: 'https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 3,
    title: 'A Day of Coding & Coffee',
    category: 'Work & Life',
    location: 'Berlin',
    date: 'July 28, 2025',
    image: 'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'tall',
  },
  {
    id: 4,
    title: 'Sunset Walks in Santorini',
    category: 'Travel',
    location: 'Santorini',
    date: 'July 10, 2025',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 5,
    title: 'Creative Process: From Idea to Execution',
    category: 'Behind The Scenes',
    location: 'Amsterdam',
    date: 'June 18, 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'wide',
  },
  {
    id: 6,
    title: 'Mountain Adventures in Switzerland',
    category: 'Adventure',
    location: 'Swiss Alps',
    date: 'May 30, 2025',
    image: 'https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
];

const STAIR_LAYOUT = [
  {
    width: 25,
    left: 10,
    top: 8,
    aspectRatio: 'aspect-square',
    group: 0,
    indexInGroup: 0,
    spawnOffsetY: 200,
    spawnOffsetX: -120,
  },
  {
    width: 25,
    left: 39,
    top: 22,
    aspectRatio: 'aspect-square',
    group: 0,
    indexInGroup: 1,
    spawnOffsetY: 215,
    spawnOffsetX: -10,
  },
  {
    width: 25,
    left: 68,
    top: 36,
    aspectRatio: 'aspect-square',
    group: 0,
    indexInGroup: 2,
    spawnOffsetY: 230,
    spawnOffsetX: 115,
  },
  {
    width: 25,
    left: 10,
    top: 60,
    aspectRatio: 'aspect-square',
    group: 1,
    indexInGroup: 0,
    spawnOffsetY: 220,
    spawnOffsetX: -110,
  },
  {
    width: 25,
    left: 39,
    top: 74,
    aspectRatio: 'aspect-square',
    group: 1,
    indexInGroup: 1,
    spawnOffsetY: 235,
    spawnOffsetX: 15,
  },
  {
    width: 25,
    left: 68,
    top: 88,
    aspectRatio: 'aspect-square',
    group: 1,
    indexInGroup: 2,
    spawnOffsetY: 250,
    spawnOffsetX: 130,
  },
];

export const VlogsGridSection: React.FC<VlogsGridSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} className={cn('relative bg-black pt-64 pb-64', className)}>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

        <div className="relative hidden w-full lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[800px] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(0,0,0,0.08)_55%,rgba(0,0,0,0)_80%)] blur-3xl opacity-30" />

          <div className="relative w-full max-w-[1500px] mx-auto px-8 pt-16" style={{ minHeight: '1400px' }}>
            {GRID_VLOGS.slice(0, STAIR_LAYOUT.length).map((vlog, index) => {
              const layout = STAIR_LAYOUT[index];

              // Calculate animation range for each card
              const baseStart = 0.2 + (layout.group * 0.15) + (layout.indexInGroup * 0.05);
              const animationEnd = baseStart + 0.15;

              // Smooth animations based on scroll progress
              const cardOpacity = useTransform(
                scrollYProgress,
                [baseStart - 0.1, baseStart, animationEnd, animationEnd + 0.3],
                [0, 1, 1, 0]
              );

              const cardX = useTransform(
                scrollYProgress,
                [baseStart - 0.05, baseStart, animationEnd],
                [layout.spawnOffsetX, 0, 0]
              );

              const cardY = useTransform(
                scrollYProgress,
                [baseStart - 0.05, baseStart, animationEnd],
                [layout.spawnOffsetY, 0, 0]
              );

              const cardScale = useTransform(
                scrollYProgress,
                [baseStart - 0.05, baseStart, animationEnd],
                [0.94, 1, 1]
              );

              return (
                <motion.div
                  key={vlog.id}
                  className="absolute group"
                  style={{
                    left: `${layout.left}%`,
                    top: `${layout.top * 10}px`,
                    width: `${layout.width}%`,
                    opacity: cardOpacity,
                    x: cardX,
                    y: cardY,
                    scale: cardScale,
                  }}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-[20px] bg-neutral-900 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.65)] transition-all duration-700 ease-out group-hover:-translate-y-[6px]',
                      layout.aspectRatio ?? 'aspect-square'
                    )}
                  >
                    <div className="relative h-full w-full">
                      <motion.img
                        src={vlog.image}
                        alt={vlog.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="inline-block mb-3 text-xs uppercase tracking-[0.24em] text-white/70">
                        {vlog.category}
                      </span>
                      <h3 className="mb-4 text-2xl font-semibold text-white leading-tight">
                        {vlog.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-white/65">
                        <span>{vlog.location}</span>
                        <span className="h-1 w-1 rounded-full bg-white/45" />
                        <span>{vlog.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative h-full w-full px-6 py-16 lg:hidden">
          <div className="mx-auto flex h-full max-w-4xl flex-col justify-end gap-8 pb-10">
            {GRID_VLOGS.slice(0, STAIR_LAYOUT.length).map((vlog) => (
              <div key={vlog.id} className="group overflow-hidden rounded-3xl bg-neutral-900">
                <div className="relative aspect-[4/5] w-full">
                  <img
                    src={vlog.image}
                    alt={vlog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>
                <div className="space-y-3 px-6 pb-6 pt-5">
                  <span className="inline-block text-xs uppercase tracking-[0.2em] text-white/70">
                    {vlog.category}
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight text-white">
                    {vlog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span>{vlog.location}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{vlog.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VlogsGridSection;
