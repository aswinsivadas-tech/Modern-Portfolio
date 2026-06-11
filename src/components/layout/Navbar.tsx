import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLenis } from 'lenis/react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Stats', href: '#stats' },
  { name: 'Badges', href: '#badges' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      let current = '';
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) {
        const matchingLink = navLinks.find(
          (link) => link.href.substring(1) === current
        );
        if (matchingLink) {
          setActiveSection(matchingLink.name);
        }
      } else if (window.scrollY < 50) {
        setActiveSection('Home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    if (lenis) {
      if (href === '#home') {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        lenis.scrollTo(href, { offset: -50, duration: 1.5 });
      }
    } else {
      // Fallback for mobile where Lenis is disabled
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    }
    setActiveSection(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isMobile ? 0 : (isScrolled ? 0 : -100), opacity: isMobile ? 1 : (isScrolled ? 1 : 0) }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2 md:top-2 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[95%] max-w-6xl pointer-events-auto"
      >
        <div className="flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl">

          {/* Logo for mobile / tablet */}
          <div className="xl:hidden font-black text-white text-lg tracking-widest mr-auto pl-2">
            ASWIN.
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-2 flex-grow justify-center relative">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.name)}
                className={`relative px-3 py-2 text-[13px] font-bold transition-all duration-300 ${activeSection === link.name ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
              >
                {activeSection === link.name && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#0ea5e9] shadow-[0_0_10px_#0ea5e9]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Hire Me Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact', 'Contact')}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#0ea5e9] text-white text-sm font-bold shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:bg-[#0284c7] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] transition-all duration-300 transform hover:scale-105"
            >
              Hire Me
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl md:hidden overflow-y-auto flex flex-col justify-start items-center z-[90] pt-24 pb-12"
          >
            <nav className="flex flex-col items-center gap-6 w-full px-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href, link.name)}
                  className={`text-2xl font-bold transition-colors duration-300 uppercase tracking-widest ${activeSection === link.name ? 'text-[#0ea5e9]' : 'text-white/60 hover:text-white'
                    }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
