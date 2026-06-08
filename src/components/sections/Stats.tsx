import { useRef, memo, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Trophy, Cpu, Layout, ExternalLink } from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollHeading from "@/components/ui/ScrollHeading";
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

const githubUsername = "aswinsivadas-tech";
const leetcodeUsername = "Aswinsivadas";

const LEETCODE_STATS = {
  solved: { count: 169, total: 3907 },
  rank: 942396,
  difficulty: [
    { label: "EASY", solved: 81, total: 938, color: "#22c55e", glow: "rgba(34, 197, 94, 0.3)" },
    { label: "MEDIUM", solved: 86, total: 2045, color: "#eab308", glow: "rgba(234, 179, 8, 0.3)" },
    { label: "HARD", solved: 2, total: 924, color: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" },
  ],
  recent: [
    { title: "Binary Tree Inorder Traversal", date: "10.03.26" },
    { title: "Same Tree", date: "05.03.26" },
    { title: "Reverse Linked List II", date: "02.03.26" },
    { title: "Subsets II", date: "26.02.26" },
  ],
};

function RealisticAppleCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => scale.set(1.03);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  // Natural Realistic Lighting Template
  // const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  // const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);



  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        perspective: "1500px",
        transformStyle: "preserve-3d",
        willChange: 'transform',
      }}
      className={`relative group ${className}`}
    >
      {/* Dynamic Halo - More Subtle & Broad */}
      <motion.div
        className="absolute -inset-10 bg-gradient-to-br from-blue-500/5 via-amber-500/10 to-emerald-500/5 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
          y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
        }}
      />

      {/* Main Glass Shell */}
      <motion.div
        className="relative h-full backdrop-blur-[20px] rounded-[2.5rem] border border-border-main overflow-hidden shadow-2xl transition-all duration-700 bg-bg-primary/30"
      >
        <div className="absolute inset-0 rounded-[2.5rem] border border-border-main pointer-events-none z-10" />
        <div className="absolute inset-[1px] rounded-[2.5rem] border border-border-main opacity-50 pointer-events-none z-10" />

        {/* Content with Deep Parallax */}
        <div style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }} className="relative z-20 h-full p-3 sm:p-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const RealisticAppleCardMemo = memo(RealisticAppleCard);

export default memo(function Stats() {
  const { theme } = useTheme();

  return (
    <section id="stats" className="py-12 sm:py-16 relative overflow-hidden transition-colors">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollHeading className="text-center mb-10 sm:mb-16">
          <p className="text-text-secondary uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3">
            Developer Metrics
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-text-primary mb-4">
            GitHub <DiaTextReveal text="& LeetCode" textColor="#0ea5e9" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-accent-orange to-transparent mx-auto rounded-full" />
        </ScrollHeading>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ================= GITHUB ================= */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-main flex items-center justify-center">
                <SiGithub className="text-text-primary opacity-70" size={20} />
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight">GitHub Contributions</h3>
            </div>

            <RealisticAppleCardMemo className="flex-1">
              <ScrollReveal animationNum={0} direction="left" className="overflow-x-auto py-2 scrollbar-hide flex items-center justify-center h-full">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme={theme === 'dark' ? "dark" : "light"}
                  theme={{
                    dark: ['#1a2332', '#1e3a5f', '#1d4ed8', '#3b82f6', '#93c5fd'],
                    light: ['#f0fdf4', '#dcfce7', '#86efac', '#22c55e', '#16a34a'],
                  }}
                  fontSize={10}
                  blockSize={9}
                  blockMargin={3}
                  blockRadius={2}
                />
              </ScrollReveal>
            </RealisticAppleCardMemo>
          </div>

          {/* ================= LEETCODE ================= */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center">
                  <SiLeetcode className="text-amber-500" size={20} />
                </div>
                <h3 className="text-xl font-bold text-text-primary tracking-tight">LeetCode Mastery</h3>
              </div>

              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                href={`https://leetcode.com/u/${leetcodeUsername}/`}
                target="_blank"
                className="px-4 sm:px-5 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 transition-all"
              >
                <span className="text-sm font-bold text-text-primary opacity-60 uppercase tracking-widest">Profile</span>
                <ExternalLink size={14} className="text-text-primary opacity-30" />
              </motion.a>
            </div>

            {/* Staggered Natural Alignment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {/* Primary Stat: Solved */}
              <ScrollReveal animationNum={0} direction="left" className="h-full">
                <RealisticAppleCardMemo className="h-full">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <Cpu className="text-amber-500" size={18} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary opacity-60 uppercase tracking-[0.3em]">Solved</p>
                      <h4 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tighter">{LEETCODE_STATS.solved.count}</h4>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '45%' }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-sky-300 rounded-full"
                      />
                    </div>
                  </div>
                </RealisticAppleCardMemo>
              </ScrollReveal>

              {/* Secondary Stat: Rank */}
              <ScrollReveal animationNum={1} direction="up" className="h-full">
                <RealisticAppleCardMemo className="h-full">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 self-start">
                      <Trophy className="text-blue-400" size={18} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary opacity-60 uppercase tracking-[0.3em]">Global Rank</p>
                      <h4 className="text-xl font-black text-text-primary">#{LEETCODE_STATS.rank.toLocaleString()}</h4>
                    </div>
                    <div className="py-1.5 bg-white/5 rounded-lg border border-white/5 text-center">
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest text-center">Top Tier Active</span>
                    </div>
                  </div>
                </RealisticAppleCardMemo>
              </ScrollReveal>

              {/* Difficulty Breakdown */}
              <ScrollReveal animationNum={2} direction="right" className="sm:col-span-2 h-full">
                <RealisticAppleCardMemo className="h-full">
                  <div className="flex flex-col h-full justify-between gap-2">
                    <div className="flex items-center gap-2 mb-0">
                      <Layout className="text-text-secondary opacity-60" size={14} />
                      <span className="text-[10px] font-black tracking-[0.2em] text-text-secondary opacity-60 uppercase">Distribution</span>
                    </div>
                    <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                      {LEETCODE_STATS.difficulty.map((d) => (
                        <div key={d.label} className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-text-secondary opacity-80 tracking-widest uppercase">{d.label}</span>
                            <span className="text-xs font-bold text-text-primary opacity-80">{d.solved}</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(d.solved / d.total) * 100}%` }}
                              transition={{ duration: 1.2 }}
                              className="h-full rounded-full"
                              style={{ background: d.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </RealisticAppleCardMemo>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});