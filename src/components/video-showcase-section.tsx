import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoShowcaseSectionProps {
  className?: string;
}

interface VideoMeta {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  location: string;
  date: string;
  thumbnail: string;
}

const VIDEOS: VideoMeta[] = [
  {
    id: 'tokyo-remote',
    title: 'A Day in the Life:',
    subtitle: 'Remote Work in Tokyo',
    category: 'Travel',
    location: 'Tokyo',
    date: 'July 23, 2025',
    thumbnail: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
  },
  {
    id: 'workspace-tour',
    title: 'Minimalist Workspace',
    subtitle: '2025 Setup Tour',
    category: 'Productivity',
    location: 'Berlin',
    date: 'August 15, 2025',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
  },
  {
    id: 'kyoto-temples',
    title: 'Ancient Kyoto:',
    subtitle: 'Temple Architecture',
    category: 'Culture',
    location: 'Kyoto',
    date: 'September 03, 2025',
    thumbnail: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
  },
  {
    id: 'coffee-culture',
    title: 'Coffee Culture:',
    subtitle: 'Melbourne Cafés',
    category: 'Lifestyle',
    location: 'Melbourne',
    date: 'October 12, 2025',
    thumbnail: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2',
  }
];

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative bg-black -mt-20',
        className
      )}
      style={{ height: `${VIDEOS.length * 100}vh` }}
    >
      {/* Fixed Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Simple Background - no animations for better performance */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
          {/* Static soft glow effects */}
          <div
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/5"
            style={{ filter: 'blur(150px)' }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/5"
            style={{ filter: 'blur(150px)' }}
          />
        </div>

        {/* Video Cards with Parallax */}
        {VIDEOS.map((video, index) => {
          // Calculate individual card progress
          const cardStart = index / VIDEOS.length;
          const cardEnd = (index + 1) / VIDEOS.length;
          const cardMid = (cardStart + cardEnd) / 2;

          // Card visibility and position
          const cardOpacity = useTransform(
            scrollYProgress,
            [
              cardStart,
              cardStart + 0.03,
              cardMid,
              cardEnd - 0.03,
              cardEnd
            ],
            [0, 1, 1, 1, 0]
          );

          // Parallax Y movement - cards enter from bottom and exit to top
          const cardY = useTransform(
            scrollYProgress,
            [cardStart, cardMid, cardEnd],
            ['30%', '0%', '-30%']
          );

          // Scale effect for depth perception
          const cardScale = useTransform(
            scrollYProgress,
            [
              cardStart,
              cardStart + 0.05,
              cardMid,
              cardEnd - 0.05,
              cardEnd
            ],
            [0.8, 0.95, 1, 0.95, 0.8]
          );

          // Blur effect for cards not in focus
          const cardBlur = useTransform(
            scrollYProgress,
            [
              cardStart,
              cardStart + 0.05,
              cardMid - 0.02,
              cardMid + 0.02,
              cardEnd - 0.05,
              cardEnd
            ],
            [10, 2, 0, 0, 2, 10]
          );

          // Text content animations
          const contentOpacity = useTransform(
            scrollYProgress,
            [
              cardStart + 0.1,
              cardMid - 0.05,
              cardMid + 0.05,
              cardEnd - 0.1
            ],
            [0, 1, 1, 0]
          );

          const contentY = useTransform(
            scrollYProgress,
            [cardStart, cardMid, cardEnd],
            [30, 0, -30]
          );

          return (
            <motion.div
              key={video.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: cardOpacity,
                y: cardY,
                scale: cardScale,
              }}
            >
              {/* Card Container with Simple Soft Mask */}
              <motion.div
                className="relative h-[75vh] w-[85vw] max-w-[1100px] overflow-hidden rounded-2xl"
                style={{
                  filter: useTransform(cardBlur, (blur) => `blur(${blur}px)`),
                  // Simple radial mask for soft edges
                  maskImage: 'radial-gradient(ellipse at center, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)',
                }}
              >
                {/* Image with Gradient Overlay */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />

                {/* Simple gradient overlay for dreamy effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Soft edge vignette - single layer for performance */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 90%)',
                  }}
                />

                  {/* Content Overlay */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-12"
                  style={{
                    opacity: contentOpacity,
                  }}
                >
                  {/* Top - Category Tag */}
                  <div className="flex justify-end">
                    <motion.div
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md"
                      initial={{ scale: 0.8 }}
                      style={{
                        scale: useTransform(contentOpacity, [0, 1], [0.8, 1]),
                        y: contentY,
                      }}
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                        {video.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-6">
                    {/* Title */}
                    <motion.div
                      style={{
                        y: contentY,
                        opacity: contentOpacity,
                      }}
                    >
                      <h2 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                        {video.title}
                      </h2>
                      {video.subtitle && (
                        <h3 className="mt-1 text-4xl font-bold leading-tight text-white/90 md:text-5xl lg:text-6xl">
                          {video.subtitle}
                        </h3>
                      )}
                    </motion.div>

                    {/* Metadata Bar */}
                    <motion.div
                      className="flex flex-wrap items-center justify-between gap-4"
                      style={{
                        y: contentY,
                        opacity: contentOpacity,
                      }}
                    >
                      {/* Location and Date */}
                      <div className="flex items-center gap-8 text-white/70">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {video.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {video.date}
                          </span>
                        </div>
                      </div>

                      {/* Watch Button */}
                      <motion.button
                        className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          Watch Vlog
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Progress Indicators - Fixed at bottom, moves earlier */}
        <motion.div
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 flex gap-3"
          style={{
            // Start moving up earlier, right after last video
            y: useTransform(
              scrollYProgress,
              [0.7, 0.85, 1],
              ['0%', '-100%', '-300%']
            ),
          }}
        >
          {VIDEOS.map((_, index) => {
            const dotProgress = useTransform(
              scrollYProgress,
              [index / VIDEOS.length, (index + 1) / VIDEOS.length],
              [0, 1]
            );

            return (
              <motion.div
                key={index}
                className="relative h-2 w-2"
              >
                {/* Background dot */}
                <div className="absolute inset-0 rounded-full bg-white/20" />
                {/* Progress dot */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  style={{
                    scale: dotProgress,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Hint - Fixed at bottom, moves earlier */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            // Start moving up earlier, right after last video
            y: useTransform(
              scrollYProgress,
              [0.7, 0.85, 1],
              ['0%', '-100%', '-300%']
            ),
          }}
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;