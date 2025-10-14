import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Dynamic Image Stack Component
 *
 * 实现五层循环的中心透视推进动效：
 * - 每 3 秒注入一张新图片，从指定方向穿梭到画面中心
 * - 其他图片依次后退，维持五层深度；到最远层后淡出
 * - 使用 3D 透视与缩放营造从屏幕中央消失的视觉
 */

type EntryDirection = 'left' | 'right' | 'top' | 'bottom' | 'diagonal';

interface ImageLayer {
  id: string;
  src: string;
  layer: number; // 0 为最前层
  direction: EntryDirection;
}

interface DynamicImageStackProps {
  images?: string[];
  className?: string;
  intervalMs?: number;
}

const ENTRY_SEQUENCE: EntryDirection[] = ['left', 'top', 'right', 'bottom', 'diagonal'];

const ENTRY_INITIAL: Record<EntryDirection, { x: number; y: number; z: number; rotateX?: number; rotateY?: number; rotateZ?: number }> = {
  left: { x: -520, y: 30, z: 260, rotateY: -32 },
  right: { x: 520, y: -30, z: 260, rotateY: 28 },
  top: { x: 40, y: -420, z: 260, rotateX: -28 },
  bottom: { x: -40, y: 420, z: 260, rotateX: 28 },
  diagonal: { x: 360, y: -340, z: 260, rotateZ: 12 },
};

const LAYER_CONFIG = [
  { x: -200, y: 60, z: 0, scale: 1, opacity: 1, rotateX: -3, rotateY: -16 },
  { x: 160, y: -40, z: -140, scale: 0.88, opacity: 0.92, rotateX: 6, rotateY: 12 },
  { x: -140, y: -160, z: -280, scale: 0.74, opacity: 0.78, rotateX: -8, rotateY: -6 },
  { x: 120, y: 140, z: -430, scale: 0.62, opacity: 0.56, rotateX: 10, rotateY: 6 },
  { x: 0, y: 210, z: -580, scale: 0.5, opacity: 0.32, rotateX: 2, rotateY: 0 },
] as const;

const MAX_LAYER = LAYER_CONFIG.length - 1;

const FALLBACK_SIZE = { width: 520, height: 340 };

const buildInitialStack = (sources: string[]): ImageLayer[] =>
  Array.from({ length: Math.min(5, sources.length || 0) || 0 }, (_, layer) => {
    const direction = ENTRY_SEQUENCE[layer % ENTRY_SEQUENCE.length];
    return {
      id: `initial-${layer}-${sources[layer % sources.length]}`,
      src: sources[layer % sources.length],
      layer,
      direction,
    } satisfies ImageLayer;
  });

const clampLayer = (layer: number) => Math.min(layer, MAX_LAYER);

const buildFilterForLayer = (layer: number) => `brightness(${1.05 - layer * 0.1}) contrast(${1 - layer * 0.06}) saturate(${1 - layer * 0.07})`;

const overlayOpacityForLayer = (layer: number) => 0.14 + layer * 0.14;

export const DynamicImageStack: React.FC<DynamicImageStackProps> = ({
  images = [],
  className,
  intervalMs = 3000,
}) => {
  const sanitizedImages = useMemo(() => images.filter(Boolean), [images]);
  const [stack, setStack] = useState<ImageLayer[]>([]);
  const imageIndexRef = useRef(0);
  const directionIndexRef = useRef(0);

  // 初始化堆叠
  useEffect(() => {
    if (!sanitizedImages.length) {
      setStack([]);
      imageIndexRef.current = 0;
      directionIndexRef.current = 0;
      return;
    }

    const initialStack = buildInitialStack(sanitizedImages);

    // 如果图片少于 5 张，用循环补齐至 5 层，保证层级深度
    if (initialStack.length < 5) {
      for (let layer = initialStack.length; layer < 5; layer += 1) {
        const direction = ENTRY_SEQUENCE[layer % ENTRY_SEQUENCE.length];
        initialStack.push({
          id: `initial-${layer}-${sanitizedImages[layer % sanitizedImages.length]}`,
          src: sanitizedImages[layer % sanitizedImages.length],
          layer,
          direction,
        });
      }
    }

    setStack(initialStack);
    imageIndexRef.current = initialStack.length % sanitizedImages.length;
    directionIndexRef.current = initialStack.length % ENTRY_SEQUENCE.length;
  }, [sanitizedImages]);

  // 定时注入新图片
  useEffect(() => {
    if (!sanitizedImages.length) return;

    const timer = window.setInterval(() => {
      setStack((prev) => {
        if (!prev.length) return prev;

        const advanced = prev
          .map((item) => ({ ...item, layer: item.layer + 1 }))
          .filter((item) => item.layer <= MAX_LAYER);

        const direction = ENTRY_SEQUENCE[directionIndexRef.current % ENTRY_SEQUENCE.length];
        directionIndexRef.current = (directionIndexRef.current + 1) % ENTRY_SEQUENCE.length;

        const src = sanitizedImages[imageIndexRef.current % sanitizedImages.length];
        imageIndexRef.current = (imageIndexRef.current + 1) % sanitizedImages.length;

        const fresh: ImageLayer = {
          id: `image-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          src,
          layer: 0,
          direction,
        };

        return [fresh, ...advanced];
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, sanitizedImages]);

  if (!sanitizedImages.length) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center rounded-[28px] bg-neutral-900 text-white/60',
          className,
        )}
        style={{ width: FALLBACK_SIZE.width, height: FALLBACK_SIZE.height }}
      >
        暂无图片
      </div>
    );
  }

  return (
    <div
      className={cn('relative select-none', className)}
      style={{ width: FALLBACK_SIZE.width, height: FALLBACK_SIZE.height, perspective: '1600px' }}
    >
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false}>
          {stack.map((item) => {
            const layer = clampLayer(item.layer);
            const target = LAYER_CONFIG[layer];
            const initial = ENTRY_INITIAL[item.direction];

            return (
              <motion.div
                key={item.id}
                className="absolute inset-0 overflow-hidden rounded-[32px]"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: 100 - layer * 10,
                  boxShadow: '0 45px 110px -35px rgba(10, 10, 10, 0.75)',
                }}
                initial={{
                  ...initial,
                  opacity: 0,
                  scale: 1.04,
                  transformPerspective: 1600,
                }}
                animate={{
                  x: target.x,
                  y: target.y,
                  z: target.z,
                  scale: target.scale,
                  rotateX: target.rotateX,
                  rotateY: target.rotateY,
                  opacity: target.opacity,
                  transformPerspective: 1600,
                }}
                exit={{
                  z: -760,
                  opacity: 0,
                  scale: 0.42,
                  rotateX: target.rotateX * 2,
                  rotateY: target.rotateY * 2,
                  transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
                }}
                transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              >
                <img
                  src={item.src}
                  alt="Dynamic stack"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ filter: buildFilterForLayer(layer) }}
                  loading="lazy"
                />

                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(12,12,12,0.1),_rgba(6,6,6,0.65))]"
                  style={{ opacity: overlayOpacityForLayer(layer) }}
                />

                <div className="absolute inset-0 border border-white/5" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl opacity-60" />
    </div>
  );
};

export default DynamicImageStack;