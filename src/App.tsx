import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Stats from '@/components/sections/Stats';

import Badges from '@/components/ui/Badges';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { ReactLenis } from 'lenis/react';
import LiquidEther from '@/components/ui/LiquidEther';
import WaterRippleBackground from '@/components/ui/WaterRipple';
import CometBackground from '@/components/ui/CometBackground';
import GSAPScrollSync from '@/components/animations/GSAPScrollSync';
import { useStackedPanels } from '@/hooks/useStackedPanels';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Particles from '@/components/ui/Particles';
import HomeDock from '@/components/layout/HomeDock';
import MacMenuBar from '@/components/layout/MacMenuBar';
import Navbar from '@/components/layout/Navbar';
import MacStartup from '@/components/animations/MacStartup';
import MacTerminal from '@/components/windows/MacTerminal';
import VSCodeWindow from '@/components/windows/VSCodeWindow';
import { HomeDockChromeProvider } from '@/context/HomeDockChromeContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { MouseProvider } from '@/context/MouseContext';
import { CustomCursor } from '@/components/ui/CustomCursor';
// import { Globe } from '@/components/ui/globe';
import ScrollAnimatedObject from '@/components/animations/ScrollAnimatedObject';
import { useIsMobile } from '@/hooks/useIsMobile';


function MainContent({ mainRef }: { mainRef: React.RefObject<HTMLElement | null> }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (

    <div className="bg-bg-primary text-text-primary font-sans selection:bg-[#0ea5e9]/30 selection:text-orange-200 min-h-screen transition-colors duration-300 relative md:cursor-none">

      {/* Intro Startup Animation */}
      <MacStartup />

      {!isMobile && <CustomCursor />}


      {/* macOS-style top strip — same visibility as HomeDock (hero / near top only) */}
      <MacMenuBar />

      {/* Universal Navbar - Logic handles fading in/out based on scroll */}
      <Navbar />

      {/* Smooth scroll-to-top button with progress ring */}
      <ScrollToTop />

      {/* Lenis ↔ GSAP ScrollTrigger sync */}
      {!isMobile && <GSAPScrollSync />}

      {/* 3D Global Object that follows scroll */}
      {!isMobile && <ScrollAnimatedObject />}

      {/* Global Cinematic Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dynamic Global Particles - Deepest Layer */}
        {!isMobile && (
          <Particles
            className="absolute inset-0 opacity-50"
            quantity={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 100}
            ease={80}
            color={theme === 'dark' ? '#ffffff' : '#000000'}
            staticity={30}
            refresh
          />
        )}
        {/* Global Interactive LiquidEther - ONLY IN DARK MODE */}
        {!isMobile && theme === 'dark' && (
          <div className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen">
            <LiquidEther
              colors={['#0ea5e9', '#8b1e00', '#d97706']}
              isViscous={true}
              viscous={10}
              mouseForce={15}
              cursorSize={80}
            />
          </div>
        )}

        {/* Global Interactive Water Ripple */}
        {!isMobile && <WaterRippleBackground />}

        {/* Global Ambient Comets */}
        {!isMobile && <CometBackground />}

        {/* Simple low-impact animated background for Mobile Dark Mode */}
        {isMobile && theme === 'dark' && (
          <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(45deg,#020617,#0f172a,#1e1b4b,#0f172a)] bg-[length:400%_400%] animate-gradient-bg pointer-events-none" />
        )}

        {/* Main Dramatic Spotlight - Softened in light mode */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,var(--cinematic-glow)_0%,transparent_70%)] transition-opacity duration-700 ${theme === 'dark' ? 'opacity-50' : 'opacity-10'}`}
        />

        {/* Ambient Corner Glows - Hidden in light mode for clean look */}
        {!isMobile && theme === 'dark' && (
          <>
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0ea5e9]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-sky-500/3 rounded-full blur-[120px]" />
          </>
        )}

        {/* Global Vignette Overlay - Enhances depth in Light Mode */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.08) 100%)',
          }}
        />

        {/* Noise Texture Overlay */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

      </div>


      {/* Stacked Panel effect ONLY between Home → About.
          Home pins and scales out; About is the landing panel (no exit).
          All other sections scroll normally. */}
      <main ref={mainRef} className="relative z-10 w-full">
        <div className="panel-section relative overflow-hidden">
          <div className="panel-inner">
            <Home />
          </div>
        </div>

        {/* Last stacked panel — Home fades into this, no exit animation */}
        <div className="panel-section relative overflow-hidden">
          <div className="panel-inner">
            <About />
          </div>
        </div>

        {/* Normal scroll sections — no stacking */}
        <div className="border-t border-white/10 [body.light_&]:border-black/10 divide-y divide-white/10 [body.light_&]:divide-black/10">
          <Experience />
          <Education />
          <Skills />
          <Services />
          <Projects />
          <Stats />
          <Badges />
          <Contact />
          <Footer />
        </div>
      </main>

      {/* Footer */}
      <HomeDock />
      <MacTerminal />
      <VSCodeWindow />
    </div>
  );
}

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  useStackedPanels(mainRef, isMobile);

  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (isMobile) return;
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [isMobile]);

  const appContent = (
    <ThemeProvider>
      <MouseProvider>
        <HomeDockChromeProvider>
          <MainContent mainRef={mainRef} />
        </HomeDockChromeProvider>
      </MouseProvider>
    </ThemeProvider>
  );

  if (isMobile) {
    return appContent;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      }}
    >
      {appContent}
    </ReactLenis>
  );
}

export default App;
