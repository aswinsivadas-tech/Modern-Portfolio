import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { executeThemeTransition } from '@/lib/theme-transition';

export default memo(function MacStartup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scrolling while the startup animation is playing
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      executeThemeTransition(() => setShow(false), { 
        coordinates: { x: window.innerWidth, y: 0 },
        duration: 1000,
        variant: "circle" 
      });
      
      // Restore scrolling after fade out completes
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 1000);
    }, 4000); // 4 seconds total to enjoy the liquid effect

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mac-startup"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
        >
          {/* Hidden SVG Filter for Fluid Distortion */}
          <svg className="hidden">
            <defs>
              <filter id="fluid-glow" x="-50%" y="-50%" width="200%" height="200%">
                {/* Organic slow moving noise */}
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
                  <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="8s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feGaussianBlur in="displaced" stdDeviation="6" result="blurred" />
                <feMerge>
                  <feMergeNode in="blurred" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className="flex flex-col items-center gap-16 relative -top-10">
            {/* Glowing Fluid Text Wrapper */}
            <div className="relative flex items-center justify-center">
              
              {/* Layer 1: Deep wide blurry aura */}
              <motion.div
                className="absolute text-4xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-transparent select-none whitespace-nowrap text-center"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #0ea5e9, #3b82f6)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  filter: 'blur(35px)',
                  opacity: 0.8,
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ASWIN SIVADAS
              </motion.div>

              {/* Layer 2: Highly distorted fluid layer */}
              <motion.div
                className="absolute text-4xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-transparent select-none mix-blend-screen whitespace-nowrap text-center"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #4f46e5, #ec4899, #06b6d4, #4f46e5)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  filter: 'url(#fluid-glow)',
                  opacity: 1,
                }}
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ASWIN SIVADAS
              </motion.div>

              {/* Layer 3: Crisper but slightly glowing core */}
              <motion.div
                className="relative text-4xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-transparent select-none mix-blend-overlay whitespace-nowrap text-center"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #c4b5fd, #7dd3fc, #c4b5fd)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  filter: 'blur(1px)',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ASWIN SIVADAS
              </motion.div>
            </div>

            {/* Neon Loading Bar */}
            <div className="w-48 sm:w-64 h-[4px] bg-[#111] rounded-full overflow-hidden mt-6 shadow-[0_0_15px_rgba(56,189,248,0.1)] relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: "easeInOut", delay: 0.2 }}
                style={{
                  boxShadow: '0 0 10px rgba(56,189,248,0.8)'
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
