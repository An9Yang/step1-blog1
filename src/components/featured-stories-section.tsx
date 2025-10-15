import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  const cardRef = useRef<HTMLElement>(null);
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const numberScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      className="group relative flex h-[500px] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Image Container with Reveal Effect */}
      <motion.div
        className={cn(
          "relative overflow-hidden",
          isEven ? "w-[65%]" : "order-2 w-[65%]"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Parallax Image */}
        <motion.div
          className="relative h-full w-full"
          style={{ y: imageY }}
        >
          <motion.img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: isHovered ? 0 : 0.15 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Animated Number Overlay */}
        <motion.div
          className="absolute left-12 top-12 z-10 font-extrabold leading-none"
          style={{
            scale: numberScale,
            fontSize: 'clamp(8rem, 15vw, 12rem)',
          }}
        >
          <motion.span
            className="block text-white/20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.15 + 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {story.number}
          </motion.span>
        </motion.div>

        {/* Image Border Animation */}
        <motion.div
          className="pointer-events-none absolute inset-0 border-2 border-white/20"
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
        />
      </motion.div>

      {/* Content Panel with Stagger Animations */}
      <motion.div
        className={cn(
          "relative flex w-[35%] flex-col justify-center bg-black p-12",
          isEven ? "" : "order-1"
        )}
        style={{ y: contentY, z: 50 }}
      >
        <div className="space-y-6">
          {/* Category - Slide In */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            whileInView={{ height: 'auto' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
          >
            <motion.span
              className="block text-xs font-medium uppercase tracking-[0.4em] text-white/40"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
            >
              {story.category}
            </motion.span>
          </motion.div>

          {/* Title with Character Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.6 }}
          >
            <motion.h3
              className="text-4xl font-bold leading-tight tracking-tight text-white"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              {story.title}
            </motion.h3>
            <motion.h3
              className="text-4xl font-bold leading-tight tracking-tight text-white/60"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {story.subtitle}
            </motion.h3>
          </motion.div>

          {/* Metadata with Line Animation */}
          <motion.div
            className="relative flex items-center gap-6 pt-4 text-xs uppercase tracking-[0.3em] text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.9 }}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              transition={{ duration: 0.5, delay: index * 0.15 + 1 }}
            >
              {story.location}
            </motion.span>
            <motion.span
              className="h-3 w-px bg-white/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 1.1 }}
            />
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              transition={{ duration: 0.5, delay: index * 0.15 + 1.2 }}
            >
              {story.year}
            </motion.span>
          </motion.div>

          {/* Interactive Arrow */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20"
              whileHover={{ scale: 1.1, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-5 w-5 text-white/60" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export const FeaturedStoriesSection: React.FC<FeaturedStoriesSectionProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden bg-black py-32',
        className,
      )}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-blue-500/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'blur(200px)' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/5"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ filter: 'blur(180px)' }}
        />
      </motion.div>

      <div className="relative z-10">
        {/* Story Cards with Stagger */}
        <div className="space-y-px">
          {STORIES.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* Bottom Navigation with Entrance Animation */}
        <motion.div
          className="mt-32 flex items-center justify-between px-6 sm:px-12 md:px-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="flex items-center gap-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">
              More Stories
            </span>
            <motion.span
              className="h-px w-32 bg-white/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
          </motion.div>

          <motion.button
            className="group flex items-center gap-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ x: 10 }}
          >
            <span>View All</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;