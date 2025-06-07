import { motion } from 'framer-motion';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {  // Calculate position based on scroll progress - align exactly with project nodes
  const fastProgress = Math.min(scrollProgress * 2, 1);

  // Adjust Y position to avoid header overlap (header is ~64px tall)
  // Move up but not so far as to overlap with the fixed header
  const yOffset = fastProgress * -250; // Reduced from -280 to -150 to avoid header overlap
  const scale = 1 - (fastProgress * 0.3); // Slightly more scaling for better effect
  const opacity = Math.max(0.8, 1 - (fastProgress * 0.0)); // Allow more fade

  // Calculate smooth fade for subtitle and instruction text
  const textFadeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.3)); // Fade from 0.1 to 0.4
  const textOpacity = 1 - textFadeProgress;
  // Calculate responsive text size based on scroll progress
  const nameScale = 1 - (fastProgress * 0.2); // Make name significantly smaller when scrolled

  // Reduce margin between AT and name when scrolled
  const avatarMargin = fastProgress > 0.5 ? 'mb-2' : 'mb-6';

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10"
      animate={{
        y: yOffset,
        scale: scale,
        opacity: opacity,
      }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.05, // Much faster response
      }}
    >      <div className={`${avatarMargin}`}>
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AT
            </span>
          </div>
        </div>
      </div>

      <motion.h1
        className="text-4xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
        animate={{ scale: nameScale }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.05 }}
      >
        Alex Turianskyj
      </motion.h1>{/* Smoothly fade "Software Developer" text when scrolled */}
      <motion.p
        className="text-xl md:text-2xl text-gray-300 mb-3"
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        Software Developer
      </motion.p>

      {/* Smoothly fade the hover instruction when scrolled */}
      <motion.div
        className="text-sm text-gray-400 max-w-md mx-auto"
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <p>Hover over the nodes to explore my projects</p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;
