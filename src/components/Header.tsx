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
      <div className="website-link">
        <a href="https://alext.dev" className="header-link">alext.dev</a>
      </div>      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-12 2xl:h-16 3xl:h-20 px-4 flex items-center bg-slate-900/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left spacer to balance the right side */}
        <div className="flex-1"></div>

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
          {/* AT initials */}
          <motion.div
            className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-0.5"
            initial={{ scale: 0 }}
            animate={{
              scale: scrollProgress > 0.6 ? 1 : 0,
              rotate: scrollProgress > 0.6 ? 0 : 180
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'backOut' }}
          >
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                AT
              </span>
            </div>
          </motion.div>

          <motion.div
            className="text-base 2xl:text-lg 3xl:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 truncate"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: scrollProgress > 0.6 ? 1 : 0,
              y: scrollProgress > 0.6 ? 0 : 10
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Alex Turianskyj
          </motion.div>        </motion.div>

        {/* Right side content - flex item to prevent overlap */}
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
            </div>            {/* Download Resume Button */}
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
              whileTap={{ scale: 0.95 }}            >
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
