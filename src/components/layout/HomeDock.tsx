import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useHomeDockChrome } from '@/context/HomeDockChromeContext';
import { useIsMobile } from '@/hooks/useIsMobile';

// Asset Imports
const homeIcon = '/assets/home-icon.png';
const safariIcon = '/assets/safari.png';
const notesIcon = '/assets/notes.png';
const finderIcon = '/assets/finder.png';
const githubIcon = '/assets/github.png';
const leetcodeIcon = '/assets/leetcode.png';
const booksIcon = '/assets/books.png';
const mailIcon = '/assets/mail.png';
const terminalIcon = '/assets/terminal.png';
const vscodeIcon = '/assets/vscode.png';
const settingsIcon = '/assets/setting.png';

interface DockItemType {
  icon: string | React.ReactNode;
  label: string;
  id?: string;
  url?: string;
}

const mainDockItems: DockItemType[] = [
  { icon: homeIcon, label: 'Home', url: '/' },
  { icon: notesIcon, label: 'About', id: 'about' },
  { icon: safariIcon, label: 'Skills', id: 'skills' },
  { icon: finderIcon, label: 'Projects', id: 'projects' },
  { icon: githubIcon, label: 'GitHub', url: 'https://github.com/aswinsivadas-tech' },
  { icon: leetcodeIcon, label: 'LeetCode', url: 'https://leetcode.com/u/Aswinsivadas/' },
  { icon: booksIcon, label: 'Books', id: 'education' },
  { icon: mailIcon, label: 'Mail', url: 'mailto:aswinsivadas.tech@gmail.com' },
];

const secondaryDockItems: DockItemType[] = [
  { icon: terminalIcon, label: 'Terminal', url: '#' },
  { icon: vscodeIcon, label: 'VS Code', url: '#' },
  { icon: settingsIcon, label: 'Resume', url: '/assets/cv/AswinSivadas-CV2026.pdf' },
];

const DOCK_HOVER_SCALE = 1.55;

function DockItem({
  icon,
  label,
  onClick,
  terminalOpen,
  vscodeOpen,
}: {
  icon: string | React.ReactNode;
  label: string;
  onClick: () => void;
  terminalOpen?: boolean;
  vscodeOpen?: boolean;
}) {
  const itemIsTerminal = label === 'Terminal';
  const itemIsVSCode = label === 'VS Code';
  const [hovered, setHovered] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative flex w-[44px] sm:w-[58px] shrink-0 flex-col items-center justify-end gap-0.5 pb-px">
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="popLayout">
          {hovered && !isMobile && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-full left-1/2 z-[40] mb-1.5 flex -translate-x-1/2 flex-col items-center"
            >
              <div className="rounded-full border border-white/12 bg-[#2C2C2E]/95 px-3 py-1 text-center text-[12px] font-medium tracking-tight text-white/95 shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur-md">
                {label}
              </div>
              <div
                className="-mt-px h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#2C2C2E]/95 drop-shadow-sm"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: hovered && !isMobile ? DOCK_HOVER_SCALE : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{ transformOrigin: '50% 100%' }}
          onClick={onClick}
          aria-label={label}
          className={`relative flex h-[42px] w-[42px] sm:h-14 sm:w-14 shrink-0 cursor-pointer items-center justify-center will-change-transform group ${hovered ? 'z-20' : 'z-10'
            }`}
        >
          <div className="flex h-full w-full items-center justify-center p-1 transition-transform duration-150 group-active:scale-95">
            {typeof icon === 'string' ? (
              <img
                src={icon}
                alt={label}
                className="h-full w-full object-contain pointer-events-none drop-shadow-2xl"
              />
            ) : (
              icon
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex h-1.5 w-full shrink-0 items-center justify-center">
        {label === 'Home' && !itemIsTerminal && !itemIsVSCode && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/45" aria-hidden />
        )}
        {itemIsTerminal && terminalOpen && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden />
        )}
        {itemIsVSCode && vscodeOpen && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#007ACC] shadow-[0_0_8px_rgba(0,122,204,0.8)]" aria-hidden />
        )}
      </div>
    </div>
  );
}

export default function HomeDock() {
  const { visible: isVisible, setTerminalOpen, terminalOpen, setVscodeOpen, vscodeOpen } = useHomeDockChrome();
  const lenis = useLenis();

  const handleNavClick = (item: DockItemType) => {
    if (item.label === 'Terminal') {
      setTerminalOpen(true);
      return;
    }
    if (item.label === 'VS Code') {
      setVscodeOpen(true);
      return;
    }

    if (item.url && item.url !== '#' && item.url !== '/') {
      window.open(item.url, '_blank');
      return;
    }

    const id = item.id;
    if (id) {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -20, duration: 1.5 });
      } else {
        const element = document.querySelector(`#${id}`);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    } else if (item.url === '/') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 sm:bottom-4 left-1/2 z-50 w-full sm:w-max max-w-[100vw] -translate-x-1/2 overflow-visible pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 origin-bottom ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative box-border flex h-[64px] sm:h-[76px] max-h-[76px] w-full sm:w-auto shrink-0 items-end gap-px overflow-x-auto overflow-y-hidden sm:overflow-visible scrollbar-hide rounded-t-[20px] rounded-b-none sm:rounded-b-[24px] border-x border-t sm:border-b border-white/10 [body.light_&]:border-black/5 bg-[#0c0c0e]/30 [body.light_&]:bg-white/40 px-1.5 sm:px-2.5 py-1 pb-3 sm:pb-1 shadow-[0_40px_100px_-15px_rgba(0,0,0,1)] [body.light_&]:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-[20px] transition-colors"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 30px 60px -12px rgba(0,0,0,0.5)',
        }}

      >
        <div className="pointer-events-none absolute inset-0 rounded-t-[20px] rounded-b-none sm:rounded-b-[24px] border-t border-white/10 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />

        <div className="relative z-[1] flex shrink-0 items-end gap-px">
          {mainDockItems.map((item, idx) => (
            <DockItem
              key={`main-${idx}`}
              icon={item.icon}
              label={item.label}
              onClick={() => handleNavClick(item)}
              terminalOpen={terminalOpen}
              vscodeOpen={vscodeOpen}
            />
          ))}
        </div>

        <div
          className="relative z-[1] mx-px flex shrink-0 self-center"
          aria-hidden
        >
          <div className="h-7 w-px rounded-full bg-white/28" />
        </div>

        <div className="relative z-[1] flex shrink-0 items-end gap-px">
          {secondaryDockItems.map((item, idx) => (
            <DockItem
              key={`secondary-${idx}`}
              icon={item.icon}
              label={item.label}
              onClick={() => handleNavClick(item)}
              terminalOpen={terminalOpen}
              vscodeOpen={vscodeOpen}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
