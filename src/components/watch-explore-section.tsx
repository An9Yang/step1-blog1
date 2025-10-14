import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WatchExploreSectionProps {
  className?: string;
}

const INTRO_SUBTITLE = 'VLOGS';
const INTRO_TITLE = 'Watch & Explore';

const WatchExploreSection: React.FC<WatchExploreSectionProps> = ({ className }) => {
  return (
    <section
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-8 text-white sm:px-12 md:px-16',
        className,
      )}
    >
      <div className="relative z-10 flex max-w-[980px] flex-col items-center text-center">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="flex items-center gap-6 text-xs font-medium uppercase tracking-[0.5em] text-white/50">
            <span className="h-px w-16 bg-white/15" />
            {INTRO_SUBTITLE}
            <span className="h-px w-16 bg-white/15" />
          </span>

          <h2 className="font-semibold leading-tight tracking-[0.02em] text-[clamp(2.5rem,9vw,4.75rem)] text-white">
            {INTRO_TITLE}
          </h2>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-white/5 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-[260px] w-[260px] rounded-full bg-blue-500/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-purple-500/15 blur-[200px]" />
    </section>
  );
};

export default WatchExploreSection;