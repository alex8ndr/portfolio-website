import { motion } from 'framer-motion';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {  // Calculate position based on scroll progress - keep AT visible at top center when scrolled
  const fastProgress = Math.min(scrollProgress * 2, 1);

  // When scrolled, move to top center and make smaller but keep visible
  const yOffset = fastProgress * -250; // Move up to top
  const scale = 1 - (fastProgress * 0.6); // Scale down significantly but keep visible
  const opacity = Math.max(0.8, 1 - (fastProgress * 0.2)); // Keep highly visible

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 pt-16"
      animate={{
        y: yOffset,
        scale: scale,
        opacity: opacity,
      }} transition={{
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

      <p className="text-xl md:text-2xl text-gray-300 mb-3">
        Software Developer
      </p>

      <div className="text-sm text-gray-400 max-w-md mx-auto">
        <p>Hover over the nodes to explore my projects</p>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
