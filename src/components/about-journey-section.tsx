import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AboutJourneySectionProps {
  className?: string;
}

const JOURNEY_ITEMS = [
  {
    id: 'journey',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'The Journey So Far',
    content: "My creative path began with a laptop, a camera, and a desire to share what I was learning. Over time, it grew into a way of life — blending remote work with the freedom to explore. From designing websites in Kuala Lumpur to writing essays in Lisbon, each city leaves a mark on my work.",
  },
  {
    id: 'share',
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'What I Share',
    content: [
      'Articles on creativity, design, and remote living.',
      'Videos that capture the rhythm of life on the road.',
      'Reflections on balancing work, travel, and personal growth.',
    ],
  },
  {
    id: 'create',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Why I Create',
    content: "To me, storytelling is about connection. Whether through words or visuals, I want to inspire others to see beauty in simplicity, to embrace curiosity, and to carve their own paths. This space is not just about my story, but about the possibilities of yours.",
  },
];

export const AboutJourneySection: React.FC<AboutJourneySectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative bg-black',
        className
      )}
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black" />

        {/* Content Container */}
        <div className="relative h-full w-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1400px] w-full">

            {/* Left: Stacking Images */}
            <div className="relative h-[45vh] lg:h-[50vh] flex items-center justify-center">
              {JOURNEY_ITEMS.map((item, index) => {
                // Animation timeline for each image - more overlap for book stacking
                const start = index * 0.3; // More overlap between transitions
                const peak = start + 0.12;
                const settle = start + 0.2;
                const nextStart = Math.min(1, (index + 1) * 0.3);

                // Image Y position - slide up from bottom and stack
                const imageY = useTransform(
                  scrollYProgress,
                  index === 0
                    ? [0, 0.3, 0.6, 0.9]
                    : index === 1
                    ? [
                        Math.max(0, start - 0.05),
                        start,
                        peak,
                        settle,
                        0.9,
                      ]
                    : [
                        Math.max(0, start - 0.05),
                        start,
                        peak,
                        settle,
                        0.9,
                        1,
                      ],
                  index === 0
                    ? ['0%', '0%', '-5%', '-10%']
                    : index === 1
                    ? [
                        '120%',
                        '40%',
                        '10%',
                        '5%',
                        '-5%',
                      ]
                    : [
                        '120%',
                        '40%',
                        '15%',
                        '10%',
                        '10%',
                        '10%',
                      ]
                );

                // Opacity - all images stay visible in final state
                const imageOpacity = useTransform(
                  scrollYProgress,
                  index === 0
                    ? [0, 0.01, 0.3, 0.35, 0.6, 0.65, 1]
                    : index === 1
                    ? [
                        Math.max(0, start - 0.05),
                        start,
                        peak,
                        0.6,
                        0.65,
                        1,
                      ]
                    : [
                        Math.max(0, start - 0.05),
                        start,
                        peak,
                        0.9,
                        1,
                      ],
                  index === 0
                    ? [1, 1, 1, 0.85, 0.85, 0.8, 0.8]
                    : index === 1
                    ? [0, 0.5, 1, 1, 0.95, 0.95]
                    : [0, 0.5, 1, 1, 1]
                );

                const imageScale = useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, start - 0.05),
                    start,
                    peak,
                    settle,
                  ],
                  index === 0
                    ? [1, 1, 1, 0.98]
                    : [0.95, 0.97, 1, index === 2 ? 1 : 0.98]
                );

                // Add subtle rotation for book-like stacking
                const imageRotate = useTransform(
                  scrollYProgress,
                  [start, peak, settle, 0.9],
                  index === 0
                    ? [0, 0, -2, -3]
                    : index === 1
                    ? [5, 2, -1, -2]
                    : [8, 3, 2, 2]
                );

                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0"
                    style={{
                      y: imageY,
                      opacity: imageOpacity,
                      scale: imageScale,
                      rotate: imageRotate,
                      zIndex: index + 1,
                    }}
                  >
                    <div
                      className="relative h-full w-[80%] mx-auto overflow-hidden rounded-lg"
                      style={{
                        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 10px 30px -8px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Text Content */}
            <div className="relative flex items-center">
              {JOURNEY_ITEMS.map((item, index) => {
                // Text animation timeline - synced with image animations
                const start = index * 0.3;
                const peak = start + 0.08;
                const nextStart = Math.min(1, (index + 1) * 0.3);

                const textOpacity = useTransform(
                  scrollYProgress,
                  index === JOURNEY_ITEMS.length - 1
                    ? [Math.max(0, start), peak, 1, 1]
                    : [
                        Math.max(0, start),
                        peak,
                        Math.min(1, nextStart - 0.02),
                        Math.min(1, nextStart + 0.02),
                      ],
                  index === JOURNEY_ITEMS.length - 1
                    ? [0, 1, 1, 1]
                    : [0, 1, 1, 0]
                );

                const textY = useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, start - 0.02),
                    peak,
                  ],
                  ['40px', '0px']
                );

                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity: textOpacity,
                      y: textY,
                    }}
                  >
                    <h2 className="mb-8 text-5xl md:text-6xl font-bold text-white">
                      {item.title}
                    </h2>

                    {Array.isArray(item.content) ? (
                      <ul className="space-y-4">
                        {item.content.map((point, i) => (
                          <li
                            key={i}
                            className="text-lg md:text-xl text-white/80 leading-relaxed"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                        {item.content}
                      </p>
                    )}
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

export default AboutJourneySection;