import { motion } from 'framer-motion';

interface ProfileSectionProps {
  scrollProgress: number;
}

const ProfileSection = ({ scrollProgress }: ProfileSectionProps) => {
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
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
      style={{
        transform: `translateY(${translateY}) scale(${scale})`,
        opacity: opacity,
        pointerEvents: scrollProgress > 0.4 ? 'none' : 'auto',
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.05 }}
    >
      <div className={avatarMarginClass}>
        <motion.div
          className="w-24 h-24 2xl:w-28 2xl:h-28 3xl:w-32 3xl:h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1"
          animate={{
            opacity: scrollProgress > 0.4 ? 0 : 1,
            scale: scrollProgress > 0.4 ? 0.3 : 1
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative"
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
        className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
        animate={{
          scale: nameScale,
          opacity: scrollProgress > 0.4 ? 0 : 1,
          y: scrollProgress > 0.4 ? -20 : 0
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        Alex Turianskyj
      </motion.h1>      <motion.p
        className="text-base 2xl:text-lg 3xl:text-xl text-gray-300 mb-3"
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        Software Developer
      </motion.p><motion.div
        className="text-xs 2xl:text-xs 3xl:text-sm text-gray-400 max-w-md mx-auto"
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <p>Hover over the nodes or scroll for more</p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;
