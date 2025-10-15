import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AboutHeroSectionProps {
  className?: string;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({ className }) => {
  return (
    <section className={cn('relative bg-black pt-24 pb-20', className)}>
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/3 blur-[200px]" />
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h1 className="text-[clamp(4rem,9vw,7rem)] font-bold uppercase tracking-[0.08em] text-white">
          About Me
        </h1>
      </motion.div>

      {/* Photo and Text Container */}
      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="relative mx-auto max-w-[1400px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Main Photo - Full width */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            <motion.img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2400"
              alt="Alec with camera"
              className="h-full w-full object-cover filter grayscale"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          </div>

          {/* Text Box Overlay - Horizontally centered at bottom */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="bg-black/95 backdrop-blur-md p-8 md:p-10 lg:p-12 max-w-2xl w-full">
              <p className="text-center text-lg font-light leading-relaxed text-white/90 md:text-xl lg:text-2xl">
                I'm Alec — a digital nomad, creator, and storyteller.
              </p>
              <p className="mt-4 text-center text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
                I believe creativity thrives in movement, in the moments between places, and in the quiet
                corners of cafés and co-working spaces around the world.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;