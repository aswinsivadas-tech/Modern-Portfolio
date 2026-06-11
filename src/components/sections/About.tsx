import { memo } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiDevdotto } from 'react-icons/si';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

export default memo(function About() {

  return (
    <section id="about" className="relative w-full min-h-[100svh] py-24 sm:py-0 bg-transparent overflow-hidden flex items-center z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-6">
              More About Me
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-light text-text-primary mb-8 leading-[1.1]">
              I'm Aswin, a <br />
              <span className="font-extrabold tracking-tighter sm:whitespace-nowrap">
                Full Stack <DiaTextReveal text="Developer" textColor="#0ea5e9" className="font-serif italic inline-block" duration={1.5} delay={0.3} />
              </span>
            </h2>

            <div className="space-y-6 text-text-secondary leading-relaxed font-light text-sm sm:text-base md:text-lg">
              <p>
                I'm Aswin Sivadas, a passionate full-stack developer who loves turning ideas into interactive web experiences. From designing responsive frontends to building efficient backends, I thrive on creating solutions that just work.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies, experimenting with creative projects, and challenging myself to grow every day. Curiosity and learning are what keep me moving forward.
              </p>
              <p>
                I believe in making the most of every day and building things that leave a positive impact!
              </p>
            </div>

            {/* Social Icons & Button */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4 text-text-secondary">
                <a href="https://github.com/aswinsivadas-tech" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <FiGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/aswinsivadas-tech/" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <FiLinkedin size={22} />
                </a>
                <a href="https://leetcode.com/u/Aswinsivadas/" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <SiLeetcode size={22} />
                </a>
                <a href="https://dev.to/aswinsivadas" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <SiDevdotto size={22} />
                </a>
              </div>

              <a
                href="/assets/AswinSivadas-CV2026.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-text-primary text-bg-primary font-semibold rounded-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  <Download size={16} strokeWidth={2.5} />
                  Download CV
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative w-full sm:aspect-[4/5] max-w-sm mx-auto md:ml-auto rounded-[1rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border border-border-main/50 group bg-bg-secondary flex items-center justify-center">
              <img
                src="/assets/profilecard.jpeg"
                alt="Aswin Sivadas"
                className="w-full h-auto sm:h-full object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
              />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-80" />
            </div>

            {/* Subtle backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0ea5e9]/10 blur-[100px] -z-10 rounded-full" />
          </motion.div>

        </div>

      </div>
    </section>
  );
});
