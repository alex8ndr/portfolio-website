import { motion } from 'framer-motion';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {
  // Calculate position based on scroll progress - align exactly with project nodes
  const fastProgress = Math.min(scrollProgress * 2, 1);

  // Match the exact same Y position as project nodes when scrolled
  // This should align with: -(height / 2) + margins.top + NODE_CONFIG.horizontal.yOffset
  // Which is approximately: -(400px) + 60px + 60px = -280px from center
  const yOffset = fastProgress * -280; // Match project nodes positioning
  const scale = 1 - (fastProgress * 0.2); // Consistent scaling
  const opacity = Math.max(0.9, 1 - (fastProgress * 0.1)); // Stay very visible

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
    >
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AT
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
        Alex Turianskyj
      </h1>

      {/* Hide "Software Developer" text when scrolled */}
      {scrollProgress < 0.3 && (
        <p className="text-xl md:text-2xl text-gray-300 mb-3">
          Software Developer
        </p>
      )}

      {/* Only show the hover instruction when not scrolled */}
      {scrollProgress < 0.3 && (
        <div className="text-sm text-gray-400 max-w-md mx-auto">
          <p>Hover over the nodes to explore my projects</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSection;
