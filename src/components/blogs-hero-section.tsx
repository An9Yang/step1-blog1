import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogsHeroSectionProps {
  className?: string;
}

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Finding Creativity in Dark Mode',
    category: 'Design & Tech',
    location: 'Berlin',
    date: 'August 13, 2025',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 2,
    title: 'Remote Work Setup in Paradise',
    category: 'Work & Travel',
    location: 'Bali',
    date: 'September 5, 2025',
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 3,
    title: '5 Coffee Shops in Lisbon That Spark Creativity',
    category: 'Design & Tech',
    location: 'Lisbon',
    date: 'July 29, 2025',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 4,
    title: 'Minimalism in Digital Nomad Life',
    category: 'Lifestyle',
    location: 'Tokyo',
    date: 'June 15, 2025',
    image: 'https://images.pexels.com/photos/3862634/pexels-photo-3862634.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export const BlogsHeroSection: React.FC<BlogsHeroSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative bg-black',
        className
      )}
      style={{ height: `${100 + (BLOG_POSTS.length - 1) * 80}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black" />

        {/* Content Container */}
        <div className="relative h-full w-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 pt-20">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1400px] w-full">

            {/* Left: Fixed Text */}
            <div className="relative flex flex-col justify-center">
              {/* Small Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                  — BLOGS
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="mb-8 text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Stories &<br />
                Ideas
              </motion.h1>

              {/* Description */}
              <motion.p
                className="max-w-md text-lg text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                This is where I share my blog posts — covering creativity, design, and the nomadic lifestyle.
                Each piece is a snapshot of what I'm learning and exploring along the way.
              </motion.p>
            </div>

            {/* Right: Elegant Fade Carousel */}
            <div className="relative h-[80vh] flex items-center justify-center">
              {BLOG_POSTS.map((post, index) => {
                // Smooth fade and scale carousel with overlap
                const progress = index * 0.25;
                const start = Math.max(0, progress - 0.08);
                const fadeInEnd = progress + 0.04;
                const holdEnd = progress + 0.16;
                const fadeOutStart = progress + 0.2;
                const fadeOutEnd = Math.min(1, progress + 0.28);

                // First card starts visible, others fade in
                const cardOpacity = index === 0
                  ? useTransform(
                      scrollYProgress,
                      [0, holdEnd, fadeOutStart, fadeOutEnd],
                      [1, 1, 0.3, 0]
                    )
                  : useTransform(
                      scrollYProgress,
                      [start, fadeInEnd, holdEnd, fadeOutStart, fadeOutEnd],
                      [0, 1, 1, 0.3, 0]
                    );

                // First card starts at full scale
                const cardScale = index === 0
                  ? useTransform(
                      scrollYProgress,
                      [0, holdEnd, fadeOutStart, fadeOutEnd],
                      [1, 1, 0.98, 0.94]
                    )
                  : useTransform(
                      scrollYProgress,
                      [start, fadeInEnd, holdEnd, fadeOutStart, fadeOutEnd],
                      [0.94, 1, 1, 0.98, 0.94]
                    );

                // First card starts at center position
                const cardY = index === 0
                  ? useTransform(
                      scrollYProgress,
                      [0, holdEnd, fadeOutStart, fadeOutEnd],
                      ['0px', '0px', '0px', '-20px']
                    )
                  : useTransform(
                      scrollYProgress,
                      [start, fadeInEnd, holdEnd, fadeOutStart, fadeOutEnd],
                      ['20px', '0px', '0px', '0px', '-20px']
                    );

                // First card starts with no blur
                const cardBlur = index === 0
                  ? useTransform(
                      scrollYProgress,
                      [0, holdEnd, fadeOutStart, fadeOutEnd],
                      [0, 0, 0, 3]
                    )
                  : useTransform(
                      scrollYProgress,
                      [start, fadeInEnd, holdEnd, fadeOutStart, fadeOutEnd],
                      [3, 0, 0, 0, 3]
                    );

                // First card starts with no rotation
                const cardRotate = index === 0
                  ? useTransform(
                      scrollYProgress,
                      [0, holdEnd, fadeOutStart, fadeOutEnd],
                      [0, 0, 0, 2]
                    )
                  : useTransform(
                      scrollYProgress,
                      [start, fadeInEnd, holdEnd, fadeOutStart, fadeOutEnd],
                      [-2, 0, 0, 0, 2]
                    );

                return (
                  <motion.div
                    key={post.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: cardOpacity,
                      scale: cardScale,
                      y: cardY,
                      rotate: cardRotate,
                      filter: useTransform(cardBlur, (b) => `blur(${b}px)`),
                    }}
                  >
                    <div className="relative w-full max-w-[500px] cursor-pointer group">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        {/* Category */}
                        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
                          {post.category}
                        </p>

                        {/* Title */}
                        <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                          {post.title}
                        </h2>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {post.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHeroSection;