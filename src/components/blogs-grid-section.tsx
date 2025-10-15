import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogsGridSectionProps {
  className?: string;
}

const GRID_POSTS = [
  {
    id: 1,
    title: 'The Art of Minimalism in Content Creation',
    category: 'Creativity',
    location: 'George Town',
    date: 'September 1, 2025',
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 2,
    title: 'Why Consistency Beats Perfection',
    category: 'Lifestyle',
    location: 'Chiang Mai',
    date: 'July 2, 2025',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 3,
    title: 'Capturing Stories Through Everyday Moments',
    category: 'Design & Tech',
    location: 'Barcelona',
    date: 'June 2, 2025',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'tall',
  },
  {
    id: 4,
    title: 'Building a Portable Creator Setup',
    category: 'Design & Tech',
    location: 'Bali',
    date: 'June 25, 2025',
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 5,
    title: 'How Remote Work Shapes Creative Freedom',
    category: 'Travel',
    location: 'Mexico City',
    date: 'May 23, 2025',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'wide',
  },
  {
    id: 6,
    title: 'Behind the Scenes: Filming My Lisbon Vlog',
    category: 'Travel',
    location: 'Lisbon',
    date: 'April 25, 2025',
    image: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 7,
    title: 'The Tools That Changed My Workflow',
    category: 'Tech',
    location: 'Seoul',
    date: 'March 15, 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
    size: 'normal',
  },
  {
    id: 8,
    title: 'Finding Balance in Chaos',
    category: 'Lifestyle',
    location: 'Bangkok',
    date: 'March 1, 2025',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
    parallaxOffsetY: -55,
    parallaxOffsetX: -12,
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
    parallaxOffsetY: -70,
    parallaxOffsetX: -6,
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
    parallaxOffsetY: -65,
    parallaxOffsetX: 10,
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
    parallaxOffsetY: -70,
    parallaxOffsetX: -10,
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
    parallaxOffsetY: -82,
    parallaxOffsetX: -4,
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
    parallaxOffsetY: -75,
    parallaxOffsetX: 6,
  },
];

export const BlogsGridSection: React.FC<BlogsGridSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className={cn('relative bg-black', className)}
      style={{ height: '700vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />

        <div className="relative hidden h-full w-full lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="absolute inset-x-0 bottom-[-30%] h-[65%] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(0,0,0,0.08)_55%,rgba(0,0,0,0)_80%)] blur-3xl opacity-30" />

          <div className="relative h-full w-full max-w-[1500px] mx-auto px-8 pt-16 pb-72">
            {GRID_POSTS.slice(0, STAIR_LAYOUT.length).map((post, index) => {
              const layout = STAIR_LAYOUT[index];

              const stageOffsets = [0.14, 0.46];
              const baseOffset = stageOffsets[layout.group] ?? stageOffsets[stageOffsets.length - 1];
              const stagger = 0.075;
              const settlePadding = 0.08;

              const appearStart = Math.min(baseOffset + layout.indexInGroup * stagger, 0.82);
              const appearEnd = Math.min(appearStart + 0.15, 0.9);
              const parallaxStart = Math.min(appearEnd + settlePadding, 0.96);

              const timeline = [0, appearStart, appearEnd, parallaxStart, 1];

              const translateY = useTransform(scrollYProgress, timeline, [
                layout.spawnOffsetY ?? 240,
                layout.spawnOffsetY ?? 240,
                0,
                layout.parallaxOffsetY ?? -100,
                layout.parallaxOffsetY ?? -100,
              ]);

              const translateX = useTransform(scrollYProgress, timeline, [
                layout.spawnOffsetX ?? 0,
                layout.spawnOffsetX ?? 0,
                0,
                layout.parallaxOffsetX ?? 0,
                layout.parallaxOffsetX ?? 0,
              ]);

              const scale = useTransform(scrollYProgress, [0, appearStart, appearEnd], [0.94, 0.94, 1]);
              const opacity = useTransform(
                scrollYProgress,
                [0, appearStart, appearStart + 0.02, appearEnd],
                [0, 0, 1, 1]
              );

              return (
                <motion.div
                  key={post.id}
                  className="absolute group"
                  style={{
                    left: `${layout.left}%`,
                    top: `${layout.top}%`,
                    width: `${layout.width}%`,
                    translateX,
                    translateY,
                    scale,
                    opacity,
                    zIndex: 100 - index,
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
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="inline-block mb-3 text-xs uppercase tracking-[0.24em] text-white/70">
                        {post.category}
                      </span>
                      <h3 className="mb-4 text-2xl font-semibold text-white leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-white/65">
                        <span>{post.location}</span>
                        <span className="h-1 w-1 rounded-full bg-white/45" />
                        <span>{post.date}</span>
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
            {GRID_POSTS.slice(0, STAIR_LAYOUT.length).map((post) => (
              <div key={post.id} className="group overflow-hidden rounded-3xl bg-neutral-900">
                <div className="relative aspect-[4/5] w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>
                <div className="space-y-3 px-6 pb-6 pt-5">
                  <span className="inline-block text-xs uppercase tracking-[0.2em] text-white/70">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight text-white">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span>{post.location}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{post.date}</span>
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

export default BlogsGridSection;
