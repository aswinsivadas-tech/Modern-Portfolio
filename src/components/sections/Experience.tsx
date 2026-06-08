import { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer Intern',
    company: 'G-Tec Education, Irinjalakuda',
    period: 'Oct 2025 - May 2026',
    location: 'On-site',
    description: 'A certified internship program in MERN Stack Development, covering MongoDB, Express.js, React, and Node.js. Focused on building dynamic, responsive, and scalable full-stack web applications through hands-on, project-based learning.',
    tags: [
      'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'TypeScript', 
      'AWS', 'Docker', 'Redis', 'postman', 'Git & GitHub', 'api development', 
      'backend development', 'frontend development', 'full stack development', 
      'Training & Internship'
    ]
  }
];

export default memo(function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={containerRef} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollHeading className="text-center mb-20">
          <p className="text-text-secondary uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            My Journey
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-text-primary mb-6">
            Work <DiaTextReveal text="Experience" textColor="#0ea5e9" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
          <p className="text-text-secondary mt-4 font-medium">Where engineering, teaching, and real-world problem-solving come together.</p>
        </ScrollHeading>

        <div className="relative">
          {/* Vertical Progress Line Background */}
          <div className="absolute left-[27px] sm:left-[39px] top-4 bottom-4 w-px bg-border-main" />

          {/* Animated Progress Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[27px] sm:left-[39px] top-4 w-px bg-[#3b82f6] origin-top"
          />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-16 sm:pl-24">
                
                {/* Timeline Dot */}
                <div className="absolute left-5 sm:left-8 top-10 w-4 h-4 rounded-full bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10" />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group bg-transparent border border-white/10 p-5 sm:p-6 rounded-3xl shadow-xl shadow-black/20 overflow-hidden hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500"
                >
                  {/* Glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                      {/* Icon Box */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center shrink-0 border border-white/10 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Briefcase className="text-text-primary/90" size={20} />
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight mb-1">{exp.role}</h3>
                        <span className="text-text-primary/80 font-semibold text-sm mb-2">{exp.company}</span>
                        
                        <div className="flex flex-wrap items-center gap-4 text-text-secondary text-xs sm:text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <span className="text-text-secondary mt-1 text-[10px]">●</span>
                      <p className="text-sm sm:text-[14px] text-text-primary/90 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {exp.tags && (
                      <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                        {exp.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 text-xs sm:text-[13px] font-medium text-text-primary/80 bg-white/[0.05] border border-white/10 rounded-full hover:bg-white/[0.1] hover:border-white/20 hover:text-text-primary transition-colors cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
