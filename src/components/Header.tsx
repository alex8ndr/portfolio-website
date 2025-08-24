import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { SiDevpost } from 'react-icons/si';
import { SCROLL_CONFIG, progressToScrollY } from '../config/scroll';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  scrollProgress: number;
}

const Header = ({ scrollProgress }: HeaderProps) => {
  const themeColors = useThemeColors();
  const { isDark } = useTheme();

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
        className={`fixed top-0 left-0 right-0 z-40 h-12 2xl:h-16 3xl:h-20 px-4 flex items-center ${themeColors.headerBackground} backdrop-blur-sm transition-colors duration-500`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex-1 flex items-center gap-10 pl-2">
          <a
            href="https://alext.dev"
            className={`font-montserrat font-extrabold leading-none -translate-y-[1px] text-lg 2xl:text-xl 3xl:text-2xl tracking-tight bg-gradient-to-r ${themeColors.gradientPrimary} text-transparent bg-clip-text transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded cursor-pointer select-none ml-4`}
            style={{ letterSpacing: '-0.01em' }}
          >
            alext.dev
          </a>
          <div className="hidden md:flex items-center gap-10 ml-2 relative">
            {(() => {
              const tabs = [
                { key: 'projects', label: 'Profile & Projects', target: 0 },
                { key: 'skills', label: 'Skills & Experience', target: SCROLL_CONFIG.sectionsFull + 0.05 }
              ];
              const active = scrollProgress < SCROLL_CONFIG.sectionsStart ? 'projects' : 'skills';
              return (
                <>
                  {tabs.map(t => (
                    <button
                      key={t.key}
                      onClick={() => {
                        const y = progressToScrollY(t.target, window.innerHeight);
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }}
                      className={`relative font-semibold tracking-wide text-xs 2xl:text-sm 3xl:text-base leading-none pt-0.5 transition-colors duration-300 ${active === t.key ? themeColors.textPrimary : themeColors.textSecondary} hover:${themeColors.textPrimary}`}
                    >
                      {t.label}
                      {active === t.key && (
                        <motion.span
                          layoutId="header-underline"
                          className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] rounded-full"
                          style={{ background: 'linear-gradient(to right,#6366f1,#3b82f6)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </>
              );
            })()}
          </div>
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
            className={`w-10 h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 rounded-full bg-gradient-to-br ${themeColors.gradientPrimary} p-0.5`}
            initial={{ scale: 0 }}
            animate={{
              scale: scrollProgress > 0.6 ? 1 : 0,
              rotate: scrollProgress > 0.6 ? 0 : 180
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'backOut' }}
          >
            <div
              className={`w-full h-full rounded-full ${isDark ? 'bg-slate-800' : 'bg-white'} flex items-center justify-center overflow-hidden transition-colors duration-500`}
              style={{
                boxShadow: isDark
                  ? `
                    inset -10px -10px 20px rgba(59,130,246,0.25),
                    inset 10px 10px 20px rgba(168,85,247,0.25),
                    inset 0 0 30px rgba(139,92,246,0.08)
                  `
                  : `
                    inset -10px -10px 20px rgba(59,130,246,0.15),
                    inset 10px 10px 20px rgba(99,102,241,0.15),
                    inset 0 0 30px rgba(59,130,246,0.05)
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
              className={`text-base 2xl:text-xl 3xl:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeColors.gradientText} leading-tight truncate`}
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
              className={`text-[10px] 2xl:text-[13px] 3xl:text-[15px] ${themeColors.textTertiary} font-medium leading-tight truncate mt-0.5 transition-colors duration-500`}
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
            {/* Theme Toggle */}
            <ThemeToggle />

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
                    className={`p-2 rounded-full ${themeColors.textSecondary} hover:${themeColors.textPrimary} transition-all duration-300 ${themeColors.buttonHover}`}
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
              className={`relative px-4 py-1 2xl:px-6 2xl:py-1.5 3xl:px-8 3xl:py-2 bg-transparent rounded-lg font-medium ${themeColors.textPrimary} transition-all duration-300 text-xs 2xl:text-sm 3xl:text-base`}
              style={{
                border: '3px solid transparent',
                backgroundImage: isDark
                  ? 'linear-gradient(#0f172a, #0f172a), linear-gradient(to right, #a855f7, #3b82f6)'
                  : 'linear-gradient(#ffffff, #ffffff), linear-gradient(to right, #3b82f6, #6366f1)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: isDark ? '0 0 20px #a855f760' : '0 0 20px #3b82f660',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: isDark ? '0 0 20px #a855f780' : '0 0 20px #3b82f680'
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
