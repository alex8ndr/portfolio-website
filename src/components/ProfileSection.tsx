import { motion } from 'framer-motion';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {  // Calculate position based on scroll progress with faster movement
  const fastProgress = Math.min(scrollProgress * 3, 1); // Speed up the movement significantly
  const yOffset = fastProgress * -300; // Move up more dramatically
  const scale = 1 - (fastProgress * 0.4); // Scale down more noticeably
  const opacity = Math.max(0.3, 1 - (fastProgress * 0.7)); // Keep some visibility but fade more

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 pt-16"
      animate={{
        y: yOffset,
        scale: scale,
        opacity: opacity,
      }}      transition={{
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
