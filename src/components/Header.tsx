import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { SiDevpost } from 'react-icons/si';

const Header = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Alex_Turianskyj_Resume.pdf';
    link.download = 'Alex_Turianskyj_Resume.pdf';
    link.click();
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
      </div>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-end items-center gap-4 bg-slate-900/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
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
                <IconComponent size={20} />
              </motion.a>
            );
          })}
        </div>

        {/* Download Resume Button */}
        <motion.button
          onClick={handleResumeDownload}
          className="relative px-6 py-2 bg-transparent rounded-full font-medium text-white transition-all duration-300"
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
          Download Resume
        </motion.button>
      </motion.header>
    </>
  );
};

export default Header;
