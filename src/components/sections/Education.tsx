import { useRef, memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, School, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

const educationList = [
  {
    degree: 'Full Stack Development (MERN)',
    institution: 'G Tech - Computer Education',
    duration: 'oct 2025 – May 2026',
    description: 'Completed intensive training in MongoDB, Express.js, React, and Node.js, building full-stack web applications with modern development practices and real-world projects.',
    icon: <GraduationCap size={28} />,
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: '#3b82f6'
  },
  {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
    institution: 'IES College of Engineering, Thrissur',
    duration: 'jul 2021 – jan 2025',
    description: 'Developed a strong foundation in software engineering, data structures, algorithms, databases, computer networks, and modern web technologies through academic and project-based learning.',
    icon: <BookOpen size={28} />,
    color: 'from-sky-400/20 to-rose-500/20',
    accent: '#f97316'
  },
  {
    degree: 'Senior Secondary Education (Plus Two)',
    institution: 'Santhinikethan Public School, Irinjalakuda',
    duration: 'april 2017 – Mar 2019',
    description: 'Focused on Mathematics and Science, strengthening analytical thinking, problem-solving skills, and technical fundamentals that laid the groundwork for a career in technology.',
    icon: <School size={28} />,
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10b981'
  },
];

function ThreeDEducationCard({ edu, idx }: { edu: typeof educationList[0], idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal animationNum={idx} direction={idx % 2 === 0 ? "left" : "right"} className="w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        className="relative group w-full cursor-default"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-[1.2rem] pointer-events-none z-0"
          style={{
            backgroundColor: `${edu.accent}10`,
            x: useTransform(x, [-0.5, 0.5], [-15, 15]),
            y: useTransform(y, [-0.5, 0.5], [-15, 15]),
          }}
        />

        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[1.2rem] p-3 sm:p-4 overflow-hidden shadow-xl shadow-black/20">
          <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-3 sm:gap-4">
            {/* Icon Column */}
            <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${edu.color} border border-white/10 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500`}>
              <div style={{ color: edu.accent }} className="scale-[0.7] sm:scale-[0.85]">
                {edu.icon}
              </div>
            </div>

            {/* Main Content Column */}
            <div className="flex-grow space-y-1.5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-text-primary tracking-tight leading-snug">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-bold text-text-secondary w-fit whitespace-nowrap">
                  <Calendar size={10} className="opacity-60" />
                  <span>{edu.duration}</span>
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-semibold text-accent-orange opacity-90">
                {edu.institution}
              </h4>

              {edu.description && (
                <p className="text-[11px] sm:text-xs text-text-secondary leading-snug opacity-80 max-w-3xl">
                  {edu.description}
                </p>
              )}
            </div>

            {/* Vertical Accent Line (Right side for desktop) */}
            <div className="hidden md:block w-1 h-10 rounded-full bg-white/5 overflow-hidden shrink-0">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                className="w-full rounded-full"
                style={{ backgroundColor: edu.accent }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default memo(function Education() {
  return (
    <section id="education" className="py-8 sm:py-12 relative overflow-hidden transition-colors">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollHeading className="text-center mb-6 sm:mb-8">
          <p className="text-accent-orange font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2">Academic Journey</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 tracking-tighter text-text-primary">
            <DiaTextReveal text="Education" textColor="var(--color-text-primary)" duration={1.5} delay={0.2} />
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-accent-orange to-transparent mx-auto rounded-full" />
        </ScrollHeading>

        <div className="space-y-3 sm:space-y-4">
          {educationList.map((edu, idx) => (
            <ThreeDEducationCard key={idx} edu={edu} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});

