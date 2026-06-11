import { memo } from 'react';
import { Layers, Network, Database } from 'lucide-react';
import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'I build scalable web applications using the MERN stack (MongoDB, Express, React, Node.js), focusing on development. I create responsive frontends with React and build robust backend APIs with Node.js and Express. My goal is to deliver maintainable, user-friendly products.',
    icon: Layers,
    color: 'from-[#0ea5e9]/20 to-cyan-500/5',
    iconColor: 'text-[#0ea5e9]',
    iconBg: 'bg-[#0ea5e9]/10 border-[#0ea5e9]/20',
  },
  {
    title: 'Scalable Backend and Frontend Architectures',
    description: 'I develop scalable and high-performance applications using Node.js, TypeScript, React, and Next.js. I focus on clean architecture, efficient backend systems, and responsive frontend interfaces. I ensure seamless communication between client and server for reliable performance.',
    icon: Network,
    color: 'from-purple-500/20 to-fuchsia-500/5',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'Database Design & Optimization',
    description: 'I design optimized and scalable databases using MongoDB and PostgreSQL. I focus on improving query performance, structuring data efficiently, and ensuring consistency across applications. My approach ensures fast, reliable, and well-structured data handling.',
    icon: Database,
    color: 'from-amber-500/20 to-orange-500/5',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
  }
];

export default memo(function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0ea5e9]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollHeading className="text-center mb-16 sm:mb-24">
          <p className="text-text-secondary uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            What I Do
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-text-primary mb-6">
            My <DiaTextReveal text="Services" textColor="#0ea5e9" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
        </ScrollHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="relative group rounded-3xl p-6 sm:p-8 bg-white/[0.03] backdrop-blur-3xl backdrop-saturate-150 border border-white/5 border-t-white/10 border-l-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden hover:shadow-[0_8px_32px_rgba(14,165,233,0.15)] hover:border-white/20 hover:bg-white/[0.05] transition-colors transition-shadow duration-500 flex flex-col h-full min-h-[300px]"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg ${service.iconBg}`}>
                    <Icon size={24} className={service.iconColor} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-base sm:text-lg text-text-primary/80 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
