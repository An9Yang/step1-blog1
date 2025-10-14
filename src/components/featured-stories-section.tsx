import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedStoriesSectionProps {
  className?: string;
}

interface StoryMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  image: string;
}

const STORIES: StoryMeta[] = [
  {
    id: 'dark-mode',
    number: '01',
    title: 'Finding Creativity',
    subtitle: 'in Dark Mode',
    category: 'Design & Tech',
    location: 'Berlin',
    year: '2025',
    image:
      'https://images.pexels.com/photos/4065627/pexels-photo-4065627.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
  },
  {
    id: 'lisbon-coffee',
    number: '02',
    title: '5 Coffee Shops',
    subtitle: 'in Lisbon',
    category: 'Lifestyle',
    location: 'Lisbon',
    year: '2025',
    image:
      'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
  },
  {
    id: 'copenhagen',
    number: '03',
    title: 'Copenhagen',
    subtitle: 'Light Studies',
    category: 'Architecture',
    location: 'Copenhagen',
    year: '2025',
    image:
      'https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
  },
  {
    id: 'tokyo',
    number: '04',
    title: 'Tokyo Workflows',
    subtitle: 'for Creators',
    category: 'Productivity',
    location: 'Tokyo',
    year: '2025',
    image:
      'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&dpr=2',
  },
];

const StoryCard: React.FC<{ story: StoryMeta; index: number }> = ({ story, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="group relative flex h-[500px] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          isEven ? "w-[65%]" : "order-2 w-[65%]"
        )}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Overlay Number */}
        <motion.div
          className="absolute left-12 top-12 z-10 text-[10rem] font-extrabold leading-none text-white/20"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.15 + 0.2 }}
        >
          {story.number}
        </motion.div>
      </div>

      {/* Content Panel */}
      <div
        className={cn(
          "relative flex w-[35%] flex-col justify-center bg-black p-12",
          isEven ? "" : "order-1"
        )}
      >
        <div className="space-y-6">
          {/* Category */}
          <motion.span
            className="block text-xs font-medium uppercase tracking-[0.4em] text-white/40"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          >
            {story.category}
          </motion.span>

          {/* Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
          >
            <h3 className="text-4xl font-bold leading-tight tracking-tight text-white">
              {story.title}
            </h3>
            <h3 className="text-4xl font-bold leading-tight tracking-tight text-white/60">
              {story.subtitle}
            </h3>
          </motion.div>

          {/* Metadata */}
          <motion.div
            className="flex items-center gap-6 pt-4 text-xs uppercase tracking-[0.3em] text-white/40"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
          >
            <span>{story.location}</span>
            <span className="h-3 w-px bg-white/20" />
            <span>{story.year}</span>
          </motion.div>

          {/* Hover Arrow */}
          <motion.div
            className="pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            whileHover={{ x: 5 }}
          >
            <ArrowUpRight className="h-6 w-6 text-white/60" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden bg-black py-32',
        className,
      )}
    >
      {/* Parallax Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[200px]" />
      </motion.div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-32 px-6 text-center sm:px-12 md:px-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="mb-8 block text-xs font-medium uppercase tracking-[0.5em] text-white/40">
            Selected Works
          </span>
          <h2 className="mx-auto max-w-[900px] text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-[0.02em] text-white">
            Featured
            <span className="block text-white/30">Stories</span>
          </h2>
        </motion.div>

        {/* Story Cards - Full Width */}
        <div className="space-y-px">
          {STORIES.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-32 flex items-center justify-between px-6 sm:px-12 md:px-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-8">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">
              More Stories
            </span>
            <span className="h-px w-32 bg-white/20" />
          </div>

          <motion.button
            className="group flex items-center gap-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span>View All</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;