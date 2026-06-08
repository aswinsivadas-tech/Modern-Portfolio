import { useRef, useState, memo, type MouseEvent } from 'react';
import type React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiTypescript, SiVite, SiMongodb, SiExpress } from 'react-icons/si';
import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';
import { useTheme } from '@/context/ThemeContext';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: { name: string; icon: React.ElementType }[];
  github: string;
  live?: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'RoyalKUlture-Webapp',
    category: 'FULL-STACK',
    description: 'RoyalKulture is a modern, responsive Ecommerce web app showcasing rare and Beautifull Sneakers and creativity through a clean, interactive, and visually appealing user and admin experience.',
    tags: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    github: 'https://github.com/aswinsivadas-tech/RoyalKulture-Ecommerce-WebApp',
    live: 'https://royalkulture-ecommerce-webapp-1.onrender.com/',
    image: 'assets/home.png',
    color: '#ff4d4d',
  },
  {
    id: '02',
    title: 'Personal-Portfolio',
    category: 'Front-End',
    description: 'My portfolio website, showcasing my professional background and more. Clean, responsive, and shows off my work while keeping things simple and professional.',
    tags: [
      { name: 'Express', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
    ],
    github: 'https://github.com/aswinsivadas-tech/react-ts-personal-portfolio',
    live: 'https://aswinsivadaswebsite.vercel.app/',
    image: 'assets/portfolio.png',
    color: '#ff4d4d',
  },
  {
    id: '03',
    title: 'Node-Rest-Api-Typescript',
    category: 'BACK-END',
    description: 'Production-grade REST API built with Node.js, TypeScript, Express, MongoDB, Redis and Docker. Includes Jest, Supertest, test Coverage and Docker Compose.',
    tags: [
      { name: 'Vite', icon: SiVite },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com/aswinsivadas-tech/node-rest-api-typescript',
    live: '#',
    image: 'assets/fullstack.png',
    color: '#ff4d4d',
  },
  {
    id: '04',
    title: 'DEV-EVENT',
    category: 'FULL-STACK',
    description: "DevEvent is a modern, full-stack platform built to bridge the gap between event organizers and developer communities. Whether you're looking to host a hackathon or attend a local tech meetup, DevEvent provides a seamless experience for managing events and booking tickets.",
    tags: [
      { name: 'React', icon: SiReact },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],
    github: 'https://github.com/aswinsivadas-tech/DevEvent',
    live: '#',
    image: '/assets/devevent.png',
    color: '#ff4d4d',
  },
];



function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tiltX = isHovered ? (mousePos.y - 50) * 0.15 : 0;
  const tiltY = isHovered ? (mousePos.x - 50) * -0.15 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      animate={{
        rotateX: tiltX,
        rotateY: tiltY,
        z: isHovered ? 20 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        delay: idx * 0.1
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d'
      }}
      className="relative w-full h-[320px] group cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden border border-border-main transition-all duration-700 group-hover:border-[#0ea5e9]/30 bg-bg-secondary rounded-2xl shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: 'brightness(1) grayscale(0)'
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover object-top origin-top"
          />
          <div className={`absolute bottom-0 left-0 right-0 h-[85%] bg-gradient-to-t from-bg-secondary via-bg-secondary/90 to-transparent transition-opacity duration-700 ${theme === 'dark' ? 'opacity-95' : 'opacity-100'}`} />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="flex items-center gap-3 mb-3"
          >
            <div className={`w-6 h-px ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`} />
            <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {project.category}
            </span>
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary mb-2 tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-500">
            {project.title}
          </h3>

          <motion.div
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            className="overflow-hidden"
          >
            <p className={`text-xs leading-relaxed font-medium mb-5 ${theme === 'light' ? 'text-gray-800' : 'text-white/80'}`}>
              {project.description}
            </p>

            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 transition-all hover:text-[#0ea5e9] ${theme === 'light' ? 'text-gray-900' : 'text-white/80'}`}>
                <FaGithub size={16} />
                <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase">Code</span>
              </a>
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 transition-all hover:text-[#0ea5e9] ${theme === 'light' ? 'text-gray-900' : 'text-white/80'}`}>
                  <ExternalLink size={14} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase">Demo</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Bottom Line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-border-main overflow-hidden">
            <motion.div
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent"
            />
          </div>
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(14, 165, 233, 0.08), transparent)` }}
        />
      </div>
    </motion.div>
  );
}

const ProjectCardMemo = memo(ProjectCard);

export default memo(function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden transition-colors min-h-screen flex flex-col justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0ea5e9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <ScrollHeading className="text-center mb-10">
          <p className="text-text-secondary uppercase tracking-[0.25em] text-sm font-semibold mb-4">
            What I've Built
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            Featured{' '}
            <DiaTextReveal text="Projects" textColor="#0ea5e9" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Crafted with care, shipped with pride — a selection of my most impactful work.
          </p>
          <a
            href="https://github.com/aswinsivadas-tech"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-border-main bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] text-text-primary text-sm font-medium transition-all duration-300 hover:border-[#0ea5e9]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
          >
            <FaGithub size={16} />
            View All Projects on GitHub
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </ScrollHeading>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {projects.map((project, idx) => (
            <ProjectCardMemo key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});
