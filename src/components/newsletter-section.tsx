import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NewsletterSectionProps {
  className?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ className }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribe:', email);
  };

  return (
    <section
      className={cn(
        'relative min-h-screen bg-black text-white',
        className
      )}
    >
      <div className="relative flex min-h-screen">
        {/* Left Image */}
        <motion.div
          className="hidden lg:block lg:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2"
            alt="Workspace"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Center Content */}
        <div className="flex flex-1 items-center justify-center px-8 py-24">
          <motion.div
            className="max-w-lg text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="hidden lg:block lg:w-1/3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://images.pexels.com/photos/1478386/pexels-photo-1478386.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2"
            alt="City view"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;