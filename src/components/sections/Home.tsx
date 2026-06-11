import { useRef, useEffect, memo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const heroImg = '/assets/avatar_3d.png';
import { Spotlight } from '@/components/ui/Spotlight';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { KillianBackground } from '@/components/ui/KillianBackground';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/useIsMobile';

export default memo(function Home() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);




  // Spotlight Position with Spring for organic smoothness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const maskImage = useMotionTemplate`radial-gradient(circle 400px at ${smoothX}px ${smoothY}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`;
  const lightMaskImage = useMotionTemplate`radial-gradient(circle 300px at ${smoothX}px ${smoothY}px, rgba(0, 0, 0, 0.5) 0%, transparent 100%)`;


  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);


  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-[120vh] sm:min-h-[110vh] md:min-h-screen pt-24 sm:pt-14 md:pt-0"
    >
      {/* Dynamic Background Noise/Pattern */}
      <Spotlight
        className="animate-[spotlight-right_2s_ease_0.75s_1_forwards] -top-40 right-[-10%] md:right-[-10vw] md:-top-60"
        fill="#0ea5e9"
      />

      {/* Dots — furthest back */}
      {/* <div className="absolute inset-0 z-1 select-none opacity-15 pointer-events-auto">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#f94b00ff"
          gridSpacing={30}
          animationSpeed={0.001}
        />
      </div> */}

      {/* Cyan/Neon glows — above dots, below the ghost title */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#38bdf8]/40 blur-[150px] rounded-full" />
      </div>

      {/* Killian Herzer Background Effect */}
      <KillianBackground />

      {/* Ghost title — in front of glows + dots, behind portrait */}
      <div className="absolute inset-0 z-20 sm:z-5 flex items-start sm:items-center justify-center pointer-events-none select-none pt-28 sm:pt-0">
        <motion.div
          className="flex items-center justify-center w-full mt-0 sm:mt-[-5vh] md:mt-[-10vh]"
        >
          <motion.div
            className="relative w-full px-[2vw] sm:px-[5vw] md:px-[10vw]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h1
              className={`flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-6 sm:justify-between w-full text-[20vw] sm:text-[10vw] md:text-[12vw] font-big-shoulders font-black leading-none uppercase whitespace-nowrap select-none scale-y-[1.0] scale-x-[0.9] tracking-[-0.05em] origin-center ${theme === 'dark' ? 'text-white/40' : 'text-black/[0.3]'
                }`}
            >
              <span>ASWIN</span>
              <span>SIVADAS</span>
            </h1>

            {/* Glassy Black Spotlight Glow - ONLY IN LIGHT MODE */}
            {theme === 'light' && !isMobile && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-[2] mix-blend-multiply opacity-10"
                style={{
                  background: lightMaskImage,
                }}
              />
            )}

            {/* Revealed version of the text */}
            <motion.h1
              className={`absolute inset-0 flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-6 sm:justify-between w-full px-[2vw] sm:px-[5vw] md:px-[10vw] text-[20vw] sm:text-[10vw] md:text-[12vw] font-big-shoulders font-black leading-none uppercase whitespace-nowrap select-none scale-y-[1.0] scale-x-[0.9] tracking-[-0.05em] origin-center ${theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              style={isMobile ? {
                textShadow: theme === 'light'
                  ? '0 15px 45px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
                  : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05)'
              } : {
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
                textShadow: theme === 'light'
                  ? '0 15px 45px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
                  : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05)'
              }}
            >
              <span>ASWIN</span>
              <span>SIVADAS</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      </div>


      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none perspective-[1000px] px-4">
        <motion.div
          className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[620px] pointer-events-auto will-change-transform"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="relative w-full aspect-square md:aspect-[4/5] flex items-center justify-center">
            <motion.img
              src={heroImg}
              alt="Aswin Sivadas"
              className="w-[180%] h-[180%] sm:w-[150%] sm:h-[150%] md:w-[170%] md:h-[170%] lg:w-[190%] lg:h-[190%] object-contain contrast-[1.1] brightness-[1.1] select-none pointer-events-none md:drop-shadow-[0_20px_50px_rgba(14,165,233,0.4)] relative z-20"
              style={{ objectPosition: 'center' }}
              animate={isMobile ? {} : {
                y: [0, -15, 0],
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={isMobile ? {} : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Cinematic Bottom Blur Fade (Seamless transition while scrolling) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25vh] min-h-[200px] z-20 pointer-events-none"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 80%)',
        }}
      />

      {/* Call to Action */}
      <motion.div
        className="absolute bottom-[12vh] sm:bottom-[15vh] md:bottom-[18vh] right-[5vw] sm:right-[8vw] md:right-[10vw] z-[30] pointer-events-auto flex flex-col items-center will-change-transform"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, delay: 3.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'opacity, transform, filter' }}
      >
        <LiquidMetalButton
          label="Explore Projects"
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </motion.div>
    </section>
  );
});
