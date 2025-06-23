import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { SiDevpost } from 'react-icons/si';

interface HeaderProps {
  scrollProgress: number;
}

const Header = ({ scrollProgress }: HeaderProps) => {
  const handleResumeView = () => {
    window.open('/Alex_Turianskyj_Resume.pdf', '_blank');
  };

  const socialLinks = [
    {
      href: 'mailto:alex.turianskyj@gmail.com',
      icon: HiMail,
      label: 'Email',
      ariaLabel: 'Send email to Alex'
    },
    {
      href: 'https://linkedin.com/in/alex-turianskyj',
      icon: FaLinkedin,
      label: 'LinkedIn',
      ariaLabel: 'Visit LinkedIn profile'
    },
    {
      href: 'https://github.com/alex8ndr/',
      icon: FaGithub,
      label: 'GitHub',
      ariaLabel: 'Visit GitHub profile'
    },
    {
      href: 'https://devpost.com/alex8ndr',
      icon: SiDevpost,
      label: 'Devpost',
      ariaLabel: 'Visit Devpost profile'
    }
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 h-12 2xl:h-16 3xl:h-20 px-4 flex items-center bg-slate-900/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >        <div className="flex-1 flex items-center">
          <a
            href="https://alext.dev"
            className="font-montserrat font-extrabold text-lg 2xl:text-xl 3xl:text-2xl tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text transition-all duration-300 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded cursor-pointer select-none mx-6"
            style={{ letterSpacing: '-0.01em' }}
          >
            alext.dev
          </a>
        </div>
        {/* Name and initials - centered with flex, will shrink if needed */}
        <motion.div
          className="flex items-center gap-3 px-4 min-w-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: scrollProgress > 0.6 ? 1 : 0,
            y: scrollProgress > 0.6 ? 0 : -20
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Profile image with colored border */}
          <motion.div
            className="w-10 h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-0.5"
            initial={{ scale: 0 }}
            animate={{
              scale: scrollProgress > 0.6 ? 1 : 0,
              rotate: scrollProgress > 0.6 ? 0 : 180
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'backOut' }}
          >
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: `
                  inset -10px -10px 20px rgba(59,130,246,0.25),
                  inset 10px 10px 20px rgba(168,85,247,0.25),
                  inset 0 0 30px rgba(139,92,246,0.08)
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

          <div className="flex flex-col min-w-0">
            <motion.div
              className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight truncate"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: scrollProgress > 0.6 ? 1 : 0,
                y: scrollProgress > 0.6 ? 0 : 10
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Alex Turianskyj
            </motion.div>
            <motion.div
              className="text-[10px] 2xl:text-xs 3xl:text-sm text-gray-400 font-medium leading-tight truncate mt-0.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: scrollProgress > 0.6 ? 1 : 0,
                y: scrollProgress > 0.6 ? 0 : 10
              }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              Software Developer
            </motion.div>
          </div>
        </motion.div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={link.ariaLabel}
                    className="p-2 rounded-full text-white/70 hover:text-white transition-colors duration-300 hover:bg-white/10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-base 2xl:text-xl 3xl:text-2xl">
                      <IconComponent />
                    </div>
                  </motion.a>
                );
              })}
            </div>
            {/* Download Resume Button */}
            <motion.button
              onClick={handleResumeView}
              className="relative px-4 py-1 2xl:px-6 2xl:py-1.5 3xl:px-8 3xl:py-2 bg-transparent rounded-lg font-medium text-white transition-all duration-300 text-xs 2xl:text-sm 3xl:text-base"
              style={{
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(to right, #a855f7, #3b82f6)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 20px #a855f760',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px #a855f780'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden lg:inline">View Resume</span>
              <span className="lg:hidden">Resume</span>
            </motion.button>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
