import { motion } from 'framer-motion';

const Header = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alex_Turianskyj_Resume.pdf';
    link.click();
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-slate-900/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        alext.dev
      </motion.div>

      <motion.button
        onClick={handleResumeDownload}
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Resume
      </motion.button>
    </motion.header>
  );
};

export default Header;
