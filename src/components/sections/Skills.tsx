import { useRef, useState, useMemo, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, TrackballControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiDocker,
  SiLinux,
  SiHtml5,
  SiNestjs,
  SiRedis,
  SiBitbucket,
  SiPostman,
  SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { VscVscode } from 'react-icons/vsc';

import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';
import LightRays from '@/components/ui/LightRays';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];

const techStack = [
  { name: 'ReactJS', icon: SiReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'NextJS', icon: SiNextdotjs, color: '#ffffff', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
  { name: 'Html5', icon: SiHtml5, color: '#E34F26', category: 'Frontend' },
  { name: 'Css3', icon: IoLogoCss3, color: '#1572B6', category: 'Frontend' },

  { name: 'NodeJS', icon: SiNodedotjs, color: '#339933', category: 'Backend' },
  { name: 'ExpressJS', icon: SiExpress, color: '#ffffff', category: 'Backend' },
  { name: 'Nestjs', icon: SiNestjs, color: '#E0234E', category: 'Backend' },

  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'Database' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
  { name: 'Redis', icon: SiRedis, color: '#FF4438', category: 'Database' },
  { name: 'Prisma', icon: SiPrisma, color: '#ffffff', category: 'Database' },

  { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'Cloud' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'Cloud' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'Cloud' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'Cloud' },

  { name: 'Git', icon: SiGit, color: '#F05032', category: 'Tools' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: 'Tools' },
  { name: 'Bitbucket', icon: SiBitbucket, color: '#205081', category: 'Tools' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC', category: 'Tools' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'Tools' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'Tools' },
];

function Cloud({ activeCategory }: { activeCategory: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    const filtered = activeCategory === 'All' ? techStack : techStack.filter((t) => t.category === activeCategory);
    const count = filtered.length;
    const radius = count > 10 ? 4.5 : 3.5;

    return filtered.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        ...item,
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
      };
    });
  }, [activeCategory]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Html
            key={`${item.name}-${i}`}
            position={item.position}
            center
            sprite
            transform
            distanceFactor={11}
            zIndexRange={[100, 0]}
          >
            <div className="flex flex-col items-center justify-center group cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bg-secondary/40 backdrop-blur-md border border-border-main shadow-lg hover:bg-bg-secondary/80 hover:border-[#0ea5e9]/50 transition-all duration-300 relative">
              {/* Internal glow */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2)_0%,transparent_70%)] pointer-events-none" />

              <Icon size={32} style={{ color: item.color }} className="group-hover:scale-125 transition-transform duration-300 relative z-10 drop-shadow-md" />

              <div className="absolute -bottom-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                <span className="text-[11px] sm:text-[13px] font-bold text-text-primary whitespace-nowrap bg-bg-primary/90 px-3 py-1.5 rounded-lg border border-border-main shadow-xl backdrop-blur-xl">
                  {item.name}
                </span>
              </div>
            </div>
          </Html>
        );
      })}
    </group>
  );
}

export default memo(function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section id="skills" className="relative overflow-hidden transition-colors h-[100dvh] w-full bg-bg-primary/20 backdrop-blur-[2px]">
      {/* Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0ea5e9]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Full Section Background & Light Rays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#0ea5e9"
          raysSpeed={2}
          lightSpread={1.5}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.1}
          distortion={0.1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg-primary)_120%)] opacity-50 z-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full pt-[80px] sm:pt-[100px] pb-16 sm:pb-24 flex flex-col items-center justify-between">
        {/* Header Title Section */}
        <ScrollHeading className="text-center flex-shrink-0 relative z-20">
          <p className="text-text-secondary uppercase tracking-[0.2em] text-[10px] sm:text-sm font-semibold mb-2 sm:mb-4">
            My Skillset
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-2">
            My Dev{' '}
            <DiaTextReveal text="Arsenal" textColor="#0ea5e9" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
        </ScrollHeading>

        {/* Main Content Area */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center my-4 relative z-10">
          <AnimatePresence mode="wait">
            {activeCategory === 'All' ? (
              <motion.div
                key="3d-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full max-w-5xl relative"
              >
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 opacity-50 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary">Interactive 3D View</span>
                </div>

                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary opacity-50">Drag to orbit</span>
                </div>

                <Canvas camera={{ position: [0, 0, 11], fov: 60 }} className="cursor-grab active:cursor-grabbing w-full h-full">
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Cloud activeCategory={activeCategory} />
                  </Float>
                  <TrackballControls noPan noZoom rotateSpeed={2.5} />
                </Canvas>
              </motion.div>
            ) : (
              <motion.div
                key="2d-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-5xl mx-auto relative z-20 px-4 content-center h-full overflow-y-auto"
              >
                {techStack
                  .filter((item) => item.category === activeCategory)
                  .map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-bg-secondary/40 backdrop-blur-md border border-border-main shadow-lg hover:bg-bg-secondary/80 hover:border-[#0ea5e9]/50 transition-all duration-300 relative group cursor-pointer hover:-translate-y-2"
                      >
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0%,transparent_70%)] pointer-events-none" />
                        <Icon size={48} style={{ color: item.color }} className="group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-md mb-3" />
                        <span className="text-sm font-bold text-text-primary whitespace-nowrap z-10">
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl flex-shrink-0 relative z-20">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm sm:text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${activeCategory === category
                ? 'bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                : 'bg-bg-secondary/40 text-text-secondary border-border-main hover:bg-bg-secondary/80 hover:text-text-primary'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});
