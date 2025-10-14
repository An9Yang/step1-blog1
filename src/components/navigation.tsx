/**
 * Navigation Component
 * 
 * 实现了博客首页的顶部导航栏，包含五个主要导航项目
 * - 居中的 ALEC 标志作为品牌标识
 * - 左右对称布局的导航链接
 * - 简洁的现代设计风格
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

const NAV_ITEMS = [
  { label: 'ABOUT', href: '#about', position: 'start', colStart: 'col-start-1' },
  { label: 'BLOGS', href: '#blogs', position: 'mid-left', colStart: 'col-start-3' },
  { label: 'ALEC', href: '/', position: 'center', colStart: 'col-start-5' },
  { label: 'VLOGS', href: '#vlogs', position: 'mid-right', colStart: 'col-start-7' },
  { label: 'CONTACT', href: '#contact', position: 'end', colStart: 'col-start-9' },
] as const;

const positionClassMap: Record<(typeof NAV_ITEMS)[number]['position'], string> = {
  start: 'justify-self-start',
  'mid-left': 'justify-self-center',
  center: 'justify-self-center',
  'mid-right': 'justify-self-center',
  end: 'justify-self-end',
};

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  return (
    <motion.nav
      className={cn(
        'absolute top-0 left-0 right-0 z-30 flex w-full justify-center px-10 py-6',
        className,
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative grid w-full max-w-[1280px] grid-cols-9 items-center">
        {NAV_ITEMS.map((item, index) => {
          const isCenter = item.position === 'center';
          const baseDelay = 0.08;

          return (
            <motion.div
              key={item.label}
              className={cn(item.colStart, positionClassMap[item.position])}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: baseDelay * index }}
            >
              {isCenter ? (
                <motion.a
                  href={item.href}
                  className="text-white text-base font-extrabold uppercase tracking-[0.5em]"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                  {item.label}
                </motion.a>
              ) : (
                <motion.a
                  href={item.href}
                  className="text-white/85 hover:text-white text-sm font-semibold uppercase tracking-[0.55em] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.a>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;