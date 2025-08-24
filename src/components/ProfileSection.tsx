import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {
  const colors = useThemeColors();
  const fastProgress = Math.min(scrollProgress * 2, 1);
  const translateY = `${fastProgress * -26}vh`;

  const scale = 1 - (fastProgress * 0.3);
  const opacity = Math.max(0.8, 1 - (fastProgress * 0.0));

  // Calculate smooth fade for subtitle and instruction text
  const textFadeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.3));
  const textOpacity = 1 - textFadeProgress;

  // Calculate responsive text size based on scroll progress
  const nameScale = 1 - (fastProgress * 0.2);

  // Responsive avatar margin using CSS classes
  const avatarMarginClass = fastProgress > 0.5
    ? 'mb-1 2xl:mb-1 3xl:mb-2'
    : 'mb-3 2xl:mb-4 3xl:mb-4';
  const initialScrollRef = useRef<boolean | null>(null);
  if (initialScrollRef.current === null) {
    initialScrollRef.current = scrollProgress > 0.0001;
  }
  const suppressEntrance = initialScrollRef.current;
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
      style={{
        transform: `translateY(${translateY}) scale(${scale})`,
        opacity: opacity,
        pointerEvents: scrollProgress > 0.4 ? 'none' : 'auto',
      }}
      initial={suppressEntrance ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity, transform: `translateY(${translateY}) scale(${scale})` }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.05 }}
    >
      <div className={avatarMarginClass}>
        <motion.div
          className={`w-24 h-24 2xl:w-28 2xl:h-28 3xl:w-32 3xl:h-32 mx-auto rounded-full bg-gradient-to-br ${colors.gradientPrimary} p-1`}
          initial={suppressEntrance ? false : { opacity: 0, scale: 0.8 }}
          animate={{
            opacity: scrollProgress > 0.4 ? 0 : 1,
            scale: scrollProgress > 0.4 ? 0.3 : 1
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div
            className={`w-full h-full rounded-full ${colors.cardBackground} flex items-center justify-center overflow-hidden relative transition-colors duration-500`}
            style={{
              boxShadow: `
                inset -15px -15px 30px rgba(59,130,246,0.3),
                inset 15px 15px 30px rgba(168,85,247,0.3),
                inset 0 0 50px rgba(139,92,246,0.1)
              `
            }}
          >
            <img
              src="/headshot.png"
              alt="Alex Turianskyj headshot"
              className="w-full h-full object-cover rounded-full"
              draggable="false"
            />
          </div>
        </motion.div>
      </div>
      <motion.h1
        className={`text-2xl 2xl:text-3xl 3xl:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientText}`}
        initial={suppressEntrance ? false : { opacity: 0, y: 10 }}
        animate={{
          scale: nameScale,
          opacity: scrollProgress > 0.4 ? 0 : 1,
          y: scrollProgress > 0.4 ? -20 : 0
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        Alex Turianskyj
      </motion.h1>
      <motion.div
        className={`text-sm 2xl:text-base 3xl:text-lg ${colors.textSecondary} mb-3 max-w-md 2xl:max-w-lg 3xl:max-w-xl mx-auto`}
        initial={suppressEntrance ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: textOpacity, y: 0 }}
        transition={{ duration: 0.12, ease: "linear" }}
      >
        <p className="leading-snug">Hi! I&apos;m Alex, a Software Engineering co-op student at McGill graduating Dec 2025. I&apos;ve interned at Autodesk, Matrox, and Hydro‑Québec and enjoy building user-focused full-stack apps and projects.</p>
      </motion.div>
      <motion.div
        className={`text-xs 2xl:text-xs 3xl:text-sm ${colors.textTertiary} max-w-xs mx-auto`}
        initial={suppressEntrance ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: textOpacity, y: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <p>Hover over the nodes to explore my projects, or scroll to learn more about my experience and skills.</p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;
