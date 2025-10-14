import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedStoriesSectionProps {
  className?: string;
}

interface StoryMeta {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  column: 'left' | 'right';
}

interface LayoutCard extends StoryMeta {
  offsetY: number;
  height: number;
  start: number;
  end: number;
}

const STORIES: StoryMeta[] = [
  {
    id: 'dark-mode-creativity',
    title: 'Finding Creativity in Dark Mode',
    category: 'Design & Tech',
    location: 'Berlin',
    date: 'August 13, 2025',
    image:
      'https://images.pexels.com/photos/4065627/pexels-photo-4065627.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
    column: 'left',
  },
  {
    id: 'lisbon-coffee-shops',
    title: '5 Coffee Shops in Lisbon That Spark Creativity',
    category: 'Design & Tech',
    location: 'Lisbon',
    date: 'July 29, 2025',
    image:
      'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
    column: 'right',
  },
  {
    id: 'copenhagen-light',
    title: 'Lighting Concepts from Copenhagen Studios',
    category: 'Design & Tech',
    location: 'Copenhagen',
    date: 'June 11, 2025',
    image:
      'https://images.pexels.com/photos/4475920/pexels-photo-4475920.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
    column: 'left',
  },
  {
    id: 'tokyo-workflows',
    title: 'Tokyo Workflows for Remote Creators',
    category: 'Design & Tech',
    location: 'Tokyo',
    date: 'May 24, 2025',
    image:
      'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
    column: 'right',
  },
];

const COLUMN_GAP_PX = 80; // gap-20
const STEP_GAP_PX = 72;
const DEFAULT_WIDTH = 640;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const FeaturedStoryCard = React.forwardRef<HTMLElement, {
  card: LayoutCard;
  smoothProgress: MotionValue<number>;
  columnWidth: number;
}>(({ card, smoothProgress, columnWidth }) => {
  const progress = useTransform(smoothProgress, (value) => {
    const normalized = (value - card.start) / Math.max(0.001, card.end - card.start);
    return clamp01(normalized);
  });

  const translateY = useTransform(progress, [0, 1], [220, 0]);
  const scaleX = useTransform(progress, [0, 0.25, 1], [0.22, 0.55, 1]);
  const scaleY = useTransform(progress, [0, 0.25, 1], [0.18, 0.6, 1]);
  const opacity = useTransform(progress, [0, 0.15, 1], [0, 0.5, 1]);
  const radius = useTransform(progress, [0, 1], ['120px', '28px']);
  const shadow = useTransform(
    progress,
    [0, 1],
    ['0 48px 160px -90px rgba(0,0,0,0.28)', '0 70px 210px -80px rgba(0,0,0,0.82)'],
  );

  return (
    <motion.article
      className={cn(
        'absolute aspect-[4/3] overflow-hidden bg-neutral-900',
        card.column === 'left' ? 'left-0' : 'right-0',
      )}
      style={{
        top: card.offsetY,
        width: columnWidth,
        translateY,
        scaleX,
        scaleY,
        opacity,
        borderRadius: radius,
        boxShadow: shadow,
        transformOrigin: 'center top',
      }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/35 to-black/78" />

      <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-5">
        <span className="inline-flex w-fit items-center rounded-full bg-white/12 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/90">
          {card.category}
        </span>
        <h3 className="text-3xl font-semibold tracking-[0.01em] md:text-[2.4rem] lg:text-[2.6rem]">
          {card.title}
        </h3>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="flex items-center gap-2">
            <span className="block h-1 w-1 rounded-full bg-white/60" />
            {card.location}
          </span>
          <span className="flex items-center gap-2">
            <span className="block h-1 w-1 rounded-full bg-white/60" />
            {card.date}
          </span>
        </div>
      </div>
    </motion.article>
  );
});

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setGridWidth(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 55%', 'end 15%'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 170, damping: 28, mass: 0.55 });

  const columnMetrics = useMemo(() => {
    if (gridWidth === 0) {
      return {
        leftWidth: DEFAULT_WIDTH,
        rightWidth: DEFAULT_WIDTH * 0.92,
        leftHeight: DEFAULT_WIDTH * 0.75,
        rightHeight: DEFAULT_WIDTH * 0.75 * 0.92,
      };
    }

    const availableWidth = Math.max(0, gridWidth - COLUMN_GAP_PX);
    const totalRatio = 1.05 + 0.95;
    const leftWidth = (availableWidth * 1.05) / totalRatio;
    const rightWidth = (availableWidth * 0.95) / totalRatio;
    return {
      leftWidth,
      rightWidth,
      leftHeight: leftWidth * 0.75,
      rightHeight: rightWidth * 0.75,
    };
  }, [gridWidth]);

  const cardsWithLayout = useMemo(() => {
    let cursor = 0;
    const layouts: LayoutCard[] = [];

    STORIES.forEach((story) => {
      const height = story.column === 'left' ? columnMetrics.leftHeight : columnMetrics.rightHeight;
      layouts.push({
        ...story,
        offsetY: cursor,
        height,
        start: 0,
        end: 0,
      });
      cursor += height + STEP_GAP_PX;
    });

    const totalHeight = cursor - STEP_GAP_PX;
    const viewHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    const appearThreshold = viewHeight * 0.78;
    const settleThreshold = viewHeight * 0.32;
    const scrollRange = totalHeight + viewHeight;

    return layouts.map((card) => {
      const startRaw = (card.offsetY - appearThreshold) / scrollRange;
      const endRaw = (card.offsetY + card.height - settleThreshold) / scrollRange;
      const start = clamp01(startRaw);
      const end = clamp01(Math.max(start + 0.1, endRaw));
      return { ...card, start, end };
    });
  }, [columnMetrics.leftHeight, columnMetrics.rightHeight]);

  const leftCards = cardsWithLayout.filter((card) => card.column === 'left');
  const rightCards = cardsWithLayout.filter((card) => card.column === 'right');

  const leftColumnHeight = (leftCards.at(-1)?.offsetY ?? 0) + (leftCards.at(-1)?.height ?? DEFAULT_WIDTH * 0.75) + 200;
  const rightColumnHeight = (rightCards.at(-1)?.offsetY ?? 0) + (rightCards.at(-1)?.height ?? DEFAULT_WIDTH * 0.65) + 200;

  const secondCardStart = rightCards[0]?.start ?? 0.38;
  const arrowProgress = useTransform(smoothProgress, (value) => {
    const normalized = (value - secondCardStart) / 0.12;
    return clamp01(normalized);
  });
  const arrowOpacity = useTransform(arrowProgress, [0, 1], [0, 1]);
  const arrowScale = useTransform(arrowProgress, [0, 1], [0.85, 1.08]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative -mt-10 flex w-full justify-center overflow-hidden bg-black px-6 pt-12 pb-48 text-white sm:px-12 md:px-16',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/4 hidden w-px bg-white/5 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-1/4 hidden w-px bg-white/5 lg:block" />

      <div
        ref={gridRef}
        className="relative z-10 grid w-full max-w-[1380px] grid-cols-1 gap-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
      >
        <div className="relative" style={{ height: leftColumnHeight }}>
          {leftCards.map((card) => (
            <FeaturedStoryCard
              key={card.id}
              card={card}
              smoothProgress={smoothProgress}
              columnWidth={columnMetrics.leftWidth}
            />
          ))}
        </div>

        <div className="relative flex w-full flex-col items-center gap-20 lg:items-end">
          <motion.button
            className="relative flex h-18 w-18 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_35px_80px_-45px_rgba(255,255,255,0.7)]"
            style={{ opacity: arrowOpacity, scale: arrowScale }}
            whileHover={{ scale: 1.1 }}
            aria-label="Browse more stories"
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>

          <div className="relative w-full" style={{ height: rightColumnHeight }}>
            {rightCards.map((card) => (
              <FeaturedStoryCard
                key={card.id}
                card={card}
                smoothProgress={smoothProgress}
                columnWidth={columnMetrics.rightWidth}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
