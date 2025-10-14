import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardStackSectionProps {
  className?: string;
}

// Card data - 3 cards for more natural composition
const CARDS = [
  {
    id: 'main',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    title: 'Minimalist Morning',
  },
  {
    id: 'card-2',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    title: 'Team Collaboration',
  },
  {
    id: 'card-3',
    image: 'https://images.pexels.com/photos/1478386/pexels-photo-1478386.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    title: 'Urban Exploration',
  },
];

export const CardStackSection: React.FC<CardStackSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
  };

  // Animation flow for 3 cards with more natural scatter
  // 0-0.15: Main card peeks from bottom
  // 0.15-0.25: Main card moves to center
  // 0.25-0.4: Other cards reveal behind (stacked like books)
  // 0.4-0.55: Hold stacked view
  // 0.55-0.75: Cards scatter naturally
  // 0.75-1: Hold scattered view, reveal Join the List

  // Newsletter content reveal animation
  const newsletterOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.7, 0.75],
    [0, 0, 0.5, 1]
  );

  const newsletterScale = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [0.9, 1]
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative bg-black',
        className
      )}
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

        {/* Join the List - Hidden behind cards, revealed when they scatter */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: newsletterOpacity,
            scale: newsletterScale,
          }}
        >
          <div className="max-w-lg text-center text-white px-8">
            {/* Subtitle */}
            <p className="mb-8 text-sm text-white/60">
              Short, weekly updates on creativity, travel and tools.
            </p>

            {/* Title */}
            <h2 className="mb-12 text-6xl font-bold">
              Join the List
            </h2>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-all hover:bg-white/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Cards Container - On top of newsletter */}
        <div className="relative h-full w-full flex items-center justify-center">
          {CARDS.map((card, index) => {
            // Different animations for each card with more natural scatter
            let cardY, cardX, cardRotate, cardScale, cardOpacity, cardRotateY, cardZ;

            if (index === 0) {
              // Main card - goes top left with interesting angle
              cardY = useTransform(
                scrollYProgress,
                [0, 0.1, 0.2, 0.25, 0.55, 0.68],
                ['80vh', '30vh', '5vh', '0vh', '0vh', '-20vh']
              );
              cardX = useTransform(
                scrollYProgress,
                [0, 0.55, 0.68],
                ['0vw', '0vw', '-24vw']
              );
              cardRotate = useTransform(
                scrollYProgress,
                [0, 0.55, 0.68],
                [0, 0, -15]
              );
              cardScale = useTransform(
                scrollYProgress,
                [0, 0.1, 0.2, 0.55, 0.68, 0.75],
                [0.9, 0.95, 1, 1, 0.7, 0.6]
              );
              cardOpacity = useTransform(
                scrollYProgress,
                [0, 0.05, 0.85, 0.95],
                [0, 1, 1, 0]
              );
              cardRotateY = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35],
                [0, 0, 8]
              );
              cardZ = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35],
                [0, 0, 100]
              );
            } else if (index === 1) {
              // Second card - goes top right with different angle
              cardY = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.7],
                ['80vh', '0vh', '0vh', '0vh', '-18vh']
              );
              cardX = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.7],
                ['0vw', '0vw', '2vw', '2vw', '28vw']
              );
              cardRotate = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.7],
                [0, 0, -10, -10, 20]
              );
              cardScale = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.7, 0.75],
                [0.85, 0.85, 0.92, 0.92, 0.65, 0.55]
              );
              cardOpacity = useTransform(
                scrollYProgress,
                [0, 0.25, 0.3, 0.85, 0.95],
                [0, 0, 1, 1, 0]
              );
              cardRotateY = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.45],
                [0, 0, -18, -25]
              );
              cardZ = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35],
                [0, 0, -50]
              );
            } else {
              // Third card - goes bottom right, further away from subscribe button
              cardY = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.65],
                ['80vh', '0vh', '0vh', '0vh', '28vh']
              );
              cardX = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.65],
                ['0vw', '0vw', '-1vw', '-1vw', '18vw']
              );
              cardRotate = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.65],
                [0, 0, 8, 8, -5]
              );
              cardScale = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.55, 0.65, 0.75],
                [0.8, 0.8, 0.88, 0.88, 0.6, 0.5]
              );
              cardOpacity = useTransform(
                scrollYProgress,
                [0, 0.25, 0.32, 0.85, 0.95],
                [0, 0, 1, 1, 0]
              );
              cardRotateY = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35, 0.45],
                [0, 0, 15, 22]
              );
              cardZ = useTransform(
                scrollYProgress,
                [0, 0.25, 0.35],
                [0, 0, -100]
              );
            }

            return (
              <motion.div
                key={card.id}
                className="absolute"
                style={{
                  opacity: cardOpacity,
                  y: cardY,
                  x: cardX,
                  rotate: cardRotate,
                  scale: cardScale,
                  rotateY: cardRotateY,
                  z: cardZ,
                  transformStyle: 'preserve-3d',
                  perspective: '1200px',
                  zIndex: 10 + (CARDS.length - index),
                }}
              >
                {/* Card - Smaller and more refined */}
                <div className="relative h-[50vh] w-[38vw] max-w-[500px] overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Soft edge vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardStackSection;