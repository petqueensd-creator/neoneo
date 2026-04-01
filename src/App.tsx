/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Search, 
  Lock, 
  Wallet, 
  PenTool, 
  ShieldCheck, 
  ChevronDown, 
  ExternalLink,
  Youtube,
  Info,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Eye,
  Shield,
  Key,
  ChevronUp
} from 'lucide-react';

// --- Background Components ---

const StaticTunnelBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)]" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.1] grayscale mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
  </div>
);

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span 
        animate={{ x: [-2, 2, -1, 0, 1], opacity: [0, 0.5, 0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
        className="absolute inset-0 text-red-500 z-0 select-none"
      >{text}</motion.span>
      <motion.span 
        animate={{ x: [2, -2, 1, 0, -1], opacity: [0, 0.5, 0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
        className="absolute inset-0 text-blue-500 z-0 select-none"
      >{text}</motion.span>
    </div>
  );
};

const CrtEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    <motion.div 
      animate={{ y: ["-100%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-full h-[10%] bg-white/5 blur-xl pointer-events-none"
    />
  </div>
);

const NoiseOverlay = () => (
  <div className="noise-overlay fixed inset-0 z-[99] pointer-events-none opacity-[0.03]" />
);

const Scanline = () => (
  <div className="scanline fixed inset-0 z-[98] pointer-events-none" />
);

const Vignette = () => (
  <div className="fixed inset-0 pointer-events-none z-[101] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.95)_100%)]" />
);

const Flashlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[97] mix-blend-soft-light opacity-60"
      style={{ background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(139, 0, 0, 0.15), transparent 80%)` }}
    />
  );
};

const DustScratches = () => (
  <div className="fixed inset-0 pointer-events-none z-[102] overflow-hidden opacity-[0.03]">
    <motion.div 
      animate={{ x: [-10, 10, -5, 5, 0], y: [-10, 5, 10, -5, 0], opacity: [0.1, 0.3, 0.1, 0.4, 0.1] }}
      transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] scale-150"
    />
  </div>
);

const GlitchOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.97) {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 50 + Math.random() * 150);
      }
    };
    const interval = setInterval(trigger, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden mix-blend-screen opacity-30">
      <div className="absolute inset-0 bg-accent/5" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-accent" style={{ transform: `translateY(${Math.random() * 100}vh)` }} />
      <div className="absolute top-3/4 left-0 w-full h-px bg-accent" style={{ transform: `translateY(${Math.random() * 100}vh)` }} />
    </div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("AWAKENING_THE_SEVENTH_SEED...");
  useEffect(() => {
    const statuses = ["SUMMONING_THE_WATCHERS...","DECRYPTING_SACRED_TEXTS...","BREAKING_THE_FIRST_SEAL...","RECOVERING_APOCRYPHAL_LOGS...","COMMUNION_ESTABLISHED.","YOU_HAVE_BEEN_CHOSEN."];
    let currentStatus = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 1000); return 100; }
        if (prev % 20 === 0 && currentStatus < statuses.length - 1) { currentStatus++; setStatus(statuses[currentStatus]); }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 sm:p-12 font-mono">
      <div className="max-w-md w-full">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <div className="text-accent text-[10px] tracking-[0.3em] animate-pulse">{status}</div>
            <div className="text-white/80 text-[9px] tracking-widest">LOCATION: PURGATORY_LEVEL_7</div>
          </div>
          <div className="text-accent text-xl sm:text-2xl font-black">{progress}%</div>
        </div>
        <div className="h-1 w-full bg-white/5 relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_20px_rgba(139,0,0,0.5)]" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-4 gap-4 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-1 bg-accent ${progress > (i * 8) ? 'opacity-100' : 'opacity-0'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SystemAlert = () => {
  const [alert, setAlert] = useState<string | null>(null);
  useEffect(() => {
    const alerts = ["UNHOLY_PRESENCE_DETECTED","SEAL_INTEGRITY_COMPROMISED","SOUL_FRAGMENTATION_IN_SECTOR_7","APOCRYPHAL_MEMORY_RECOVERED","THE_WATCHERS_ARE_ONLINE","PURGATORY_THRESHOLD_EXCEEDED"];
    const trigger = () => {
      if (Math.random() > 0.95) { setAlert(alerts[Math.floor(Math.random() * alerts.length)]); setTimeout(() => setAlert(null), 3000); }
    };
    const interval = setInterval(trigger, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence>
      {alert && (
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
          className="fixed top-20 sm:top-32 right-3 sm:right-12 z-[150] bg-red-950/80 border border-red-500/50 p-3 sm:p-4 backdrop-blur-md font-mono max-w-[85vw] sm:max-w-xs">
          <div className="flex items-center gap-3 text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping flex-shrink-0" />
            <span className="text-[9px] tracking-[0.15em] font-bold uppercase break-all">Alert: {alert}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Terminal = ({ lines }: { lines: string[] }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    if (currentLine >= lines.length) return;
    let i = 0;
    const interval = setInterval(() => {
      setText(lines[currentLine].slice(0, i + 1)); i++;
      if (i >= lines[currentLine].length) { clearInterval(interval); setTimeout(() => { setCurrentLine(p => p + 1); setText(""); }, 1200); }
    }, 40);
    return () => clearInterval(interval);
  }, [currentLine, lines]);
  return (
    <div className="font-mono text-[10px] text-accent bg-accent/[0.02] p-4 sm:p-6 border border-accent/10 rounded backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-accent/20" />
      <div className="flex items-center gap-3 mb-4 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="uppercase tracking-[0.2em] text-[9px]">Divine_Terminal // REVELATION_v7.0</span>
      </div>
      <div className="min-h-[6em] space-y-1">
        {lines.slice(0, currentLine).map((line, i) => <div key={i} className="opacity-30 break-all">{`> ${line}`}</div>)}
        {currentLine < lines.length && (
          <div className="flex items-center gap-1">
            <span className="text-accent break-all">{`> ${text}`}</span>
            <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.4, repeat: Infinity }} className="w-1.5 h-3 bg-accent flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [signal, setSignal] = useState(4);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => setSignal(Math.floor(Math.random() * 2) + 3), 3000);
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(interval); };
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 sm:py-4 border-b border-white/5' : 'bg-transparent py-5 sm:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-[10px] sm:text-xs">7S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-xl tracking-tighter leading-none">SEVENTH SEED</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <div key={i} className={`w-0.5 h-1.5 ${i <= signal ? 'bg-accent' : 'bg-white/10'}`} />)}</div>
              <span className="text-[7px] font-mono text-accent uppercase tracking-widest">Faith_Level</span>
            </div>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">
          <a href="#about" className="hover:text-accent transition-colors">01_Genesis</a>
          <a href="#how-it-works" className="hover:text-accent transition-colors">02_Covenant</a>
          <a href="#reward" className="hover:text-accent transition-colors">03_Offering</a>
          <a href="#faq" className="hover:text-accent transition-colors">04_Apocrypha</a>
          <a href="https://youtube.com/@VIISeed" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full hover:bg-accent/20 transition-all flex items-center gap-2 text-accent">
            <Youtube size={13} />Witness_Now
          </a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
          <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5 overflow-hidden">
            <div className="flex flex-col px-4 py-4 font-mono text-[11px] tracking-[0.3em] uppercase">
              {[{href:'#about',label:'01_Genesis'},{href:'#how-it-works',label:'02_Covenant'},{href:'#reward',label:'03_Offering'},{href:'#faq',label:'04_Apocrypha'}].map(link => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="py-4 text-white/50 hover:text-accent transition-colors border-b border-white/5">{link.label}</a>
              ))}
              <a href="https://youtube.com/@VIISeed" target="_blank" rel="noopener noreferrer"
                className="mt-4 py-3 bg-accent/10 border border-accent/20 flex items-center justify-center gap-3 text-accent">
                <Youtube size={14} />Witness_Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const RedactedText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block group cursor-help">
    <span className="bg-white text-transparent select-none group-hover:bg-accent/20 group-hover:text-accent transition-all duration-500 px-1">{children}</span>
  </span>
);

const SectionHeading = ({ children, subtitle, number }: { children: React.ReactNode, subtitle?: string, number?: string }) => (
  <div className="mb-12 sm:mb-20 lg:mb-28 relative">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative overflow-hidden">
      <h2 className="text-[11vw] sm:text-6xl md:text-8xl lg:text-9xl font-display font-black mb-5 sm:mb-8 tracking-tighter uppercase leading-[0.85] glow-text">
        {children}
      </h2>
      <div className="absolute -top-2 -left-2 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-l-2 border-accent/30" />
    </motion.div>
    {subtitle && (
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}
        className="text-white/70 max-w-2xl text-base sm:text-xl md:text-2xl font-serif italic leading-tight tracking-tight border-l-2 border-accent/10 pl-5 sm:pl-8 mt-5 sm:mt-8">
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ClassifiedStamp = () => (
  <motion.div initial={{ opacity: 0, scale: 1.5, rotate: -20 }} whileInView={{ opacity: 0.15, scale: 1, rotate: -15 }} viewport={{ once: true }}
    className="absolute top-8 right-4 sm:top-20 sm:right-20 border-4 border-accent text-accent px-3 sm:px-8 py-2 sm:py-4 font-black text-lg sm:text-4xl tracking-[0.2em] uppercase select-none pointer-events-none mix-blend-overlay">
    SEALED
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-7 sm:py-10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left gap-4 group">
        <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase leading-none group-hover:text-accent transition-colors">{question}</span>
        <div className={`w-9 h-9 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isOpen ? 'rotate-180 border-accent text-accent bg-accent/5' : 'text-white/60'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden relative">
            <div className="absolute top-0 left-4 sm:left-8 w-px h-full blood-drip animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="pt-6 sm:pt-10 pl-7 sm:pl-16 text-white/20 leading-tight text-base sm:text-xl md:text-2xl font-serif italic max-w-3xl">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen w-full max-w-full font-sans bg-black text-white overflow-x-hidden">
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <CrtEffect /><NoiseOverlay /><Vignette /><Flashlight /><DustScratches /><GlitchOverlay /><SystemAlert />
      <Navbar />
      
      {/* Back to top button */}
      <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-4 sm:bottom-12 sm:right-12 z-[60] group flex items-center gap-2 sm:gap-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 sm:p-4 hover:border-accent transition-all duration-500">
        <span className="hidden sm:block text-[10px] font-mono tracking-[0.4em] text-white/30 group-hover:text-accent uppercase">Return_to_Surface</span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all rotate-180">
          <ChevronDown size={16} />
        </div>
      </motion.button>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <Scanline />
        <StaticTunnelBackground />
        <div className="absolute top-0 left-1/4 w-px h-32 sm:h-64 blood-drip animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute top-0 right-1/3 w-px h-48 sm:h-96 blood-drip animate-[pulse_6s_ease-in-out_infinite_1s]" />
        <div className="absolute inset-0 z-1 pointer-events-none">
          <motion.div animate={{ scale:[1,1.5,1], opacity:[0.05,0.15,0.05], x:[-200,200,-200], y:[-100,100,-100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[1200px] h-[400px] sm:h-[1200px] bg-accent/10 rounded-full blur-[100px] sm:blur-[250px]" />
          
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} className="text-center w-full">

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}
              className="flex items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
              <div className="h-px w-8 sm:w-16 bg-accent/30" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-accent uppercase flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse flex-shrink-0" />SIGNAL_LOST
              </span>
              <div className="h-px w-8 sm:w-16 bg-accent/30" />
            </motion.div>

            {/* HERO TITLE — responsive using vw on mobile, fixed sizes on sm+ */}
            <div className="relative w-full mb-8 sm:mb-12">
              <h1 className="text-[13vw] sm:text-7xl md:text-9xl lg:text-[12rem] font-display font-black leading-[0.82] tracking-tighter uppercase italic glow-text animate-flicker w-full">
                <GlitchText text="THE SEVENTH" /><br />
                <span className="text-accent not-italic">SEED</span><br />
                <span className="text-white/10 text-[10vw] sm:text-5xl md:text-7xl lg:text-[9rem]">HAS TAKEN ROOT.</span>
              </h1>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2.5 }}
              className="text-white/30 text-sm sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-10 sm:mb-20 font-serif italic leading-[1.3] tracking-tight px-2">
              "They buried the truth for a reason. The offering waits in the dark, and the first to decipher the scripture claims the harvest."
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-8 px-2">
              <a href="https://youtube.com/@VIISeed" target="_blank" rel="noopener noreferrer"
                className="group relative px-8 sm:px-16 lg:px-20 py-5 sm:py-8 lg:py-10 bg-accent text-black font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_80px_rgba(139,0,0,0.4)] text-center">
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-4 tracking-[0.3em] text-xs font-mono">
                  BEAR_WITNESS <Play size={18} fill="currentColor" />
                </span>
              </a>
              <a href="#about"
                className="px-8 sm:px-16 lg:px-20 py-5 sm:py-8 lg:py-10 bg-transparent hover:bg-accent/5 text-white/40 hover:text-accent border border-white/10 hover:border-accent/30 transition-all duration-700 text-center">
                <span className="font-mono font-bold tracking-[0.3em] text-xs">READ_SCRIPTURE</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1.5 }}
          className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-6">
          <div className="w-px h-10 sm:h-20 bg-gradient-to-b from-accent/50 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase animate-pulse">Scroll to descend</span>
        </motion.div>
      </section>

      {/* ── GENESIS ── */}
      <section id="about" className="py-20 sm:py-40 lg:py-80 relative border-t border-white/5 overflow-hidden">
        <ClassifiedStamp />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/[0.02] -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-6">
              <SectionHeading number="01" subtitle="A living, breathing testament set in a dark, atmospheric world of biblical dread.">
                THE <br /> <GlitchText text="GENESIS" />
              </SectionHeading>
              <div className="space-y-8 sm:space-y-14 text-white/50 leading-[1.2] text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif italic">
                <p>"Follow the perspective of those who witnessed the breaking of the seals. Every video is a verse of a larger narrative, captured in a raw, found-footage style that blurs the line between scripture and reality."</p>
                <Terminal lines={["ESTABLISHING_COMMUNION...","DECRYPTING_SACRED_TEXTS...","WARNING: DEMONIC_INTERFERENCE_DETECTED","RECOVERING_FRAGMENTED_PROPHECIES...","LOCATION: [PURGATORY]","STATUS: AWAITING_JUDGMENT"]} />
                <div className="p-6 sm:p-10 border border-accent/10 bg-accent/[0.03] font-mono text-xs tracking-widest leading-relaxed uppercase relative">
                  <div className="absolute -top-2 -left-2 w-5 h-5 border-t border-l border-accent" />
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b border-r border-accent" />
                  <span className="text-accent font-bold block mb-4 tracking-[0.3em]">APOCRYPHAL_REPORT // 2026</span>
                  Our visions are crafted using advanced generation tools. Every clue, number, and symbol is placed with divine intention.
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                className="col-span-2 relative aspect-video overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 group">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYrbl4nNsBeZuRrzb5Bc42Z0wGXLMHUGZWWj4U5giPy83ECyektI1BMh8wEV7KcN92erR_fk0aZN9cmqwtOE203ENJd01WdED8VWpCmo3qW68v_kOX3tnuMLD2-1Vj9JSbGh0xKI3gHu9ep0YCCMMD9LWc47qEut77g28CvhZZmAsCBwtf3bzQQfPrxqk/s1376/imagen2.webp" alt="Dark tunnel"
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute top-3 sm:top-8 left-3 sm:left-8 flex items-center gap-2 sm:gap-4">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[9px] sm:text-xs font-mono tracking-[0.3em] text-red-500 uppercase font-bold">REC // SEAL_01</span>
                </div>
                <div className="absolute bottom-3 sm:bottom-8 right-3 sm:right-8 text-[8px] sm:text-[10px] font-mono text-white/30 uppercase tracking-widest">03:33:33</div>
              </motion.div>
              {[{label:'VERSE_A', title:'RAW TESTIMONY', desc:'UNFILTERED POV FROM THE DAMNED.'},{label:'VERSE_B', title:'AI REVELATION', desc:'NEURAL NETWORK ENVIRONMENTS.'}].map((v,i) => (
                <div key={i} className="aspect-square border border-white/5 flex flex-col justify-center p-4 sm:p-8 bg-white/[0.02] hover:bg-accent/[0.05] transition-colors duration-500">
                  <span className="text-[10px] font-mono text-accent mb-3 tracking-widest">{v.label}</span>
                  <h3 className="text-xl sm:text-3xl font-display font-black leading-none mb-3 uppercase tracking-tighter">{v.title}</h3>
                  <p className="text-[9px] sm:text-xs text-white/20 font-mono leading-relaxed uppercase tracking-widest">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COVENANT ── */}
      <section id="how-it-works" className="py-20 sm:py-40 lg:py-80 relative border-t border-white/5 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading number="02" subtitle="The covenant is simple. The execution is not. Follow the signs.">
            THE <br /> <GlitchText text="COVENANT" />
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/5 mt-10 sm:mt-20">
            {[
              { title:"BEAR_WITNESS", desc:"Clues are scattered everywhere: hidden in video frames, encoded in titles, buried in thumbnails, or whispered in the audio frequencies.", icon:<Eye size={26} /> },
              { title:"TRIBULATION", desc:"The first few signs are simple. As the prophecy unfolds, the trials become exponentially harder, requiring a congregation.", icon:<TrendingUp size={26} /> },
              { title:"NO_SALVATION", desc:"We do not offer absolution. The flock must figure it out together. Every discovery is a step closer to the end.", icon:<Shield size={26} /> }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 1 }}
                className="p-7 sm:p-12 lg:p-16 border-r border-b border-white/5 group hover:bg-accent/[0.03] transition-all duration-700 relative overflow-hidden">
                <div className="text-accent/20 group-hover:text-accent transition-colors mb-6 sm:mb-10 relative z-10">{item.icon}</div>
                <span className="text-accent font-mono text-[10px] mb-4 sm:mb-8 block tracking-[0.4em] uppercase relative z-10">Seal_0{i+1} // Broken</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-4 sm:mb-8 tracking-tighter uppercase leading-none group-hover:text-accent transition-colors relative z-10">{item.title}</h3>
                <p className="text-white/30 leading-[1.2] text-base sm:text-lg lg:text-xl font-serif italic relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABERNACLE ── */}
      <section className="py-20 sm:py-36 lg:py-48 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-accent/[0.03] rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-28 sm:h-28 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-accent/20">
              <Lock className="text-accent" size={28} />
            </div>
            <SectionHeading subtitle="At the end of the tribulation lies the Seventh Seed.">
              THE <br /> <GlitchText text="TABERNACLE" />
            </SectionHeading>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 text-left mt-10 sm:mt-20">
              {[{title:"The Sealed Reliquary", desc:"There is a digital reliquary containing the final offering. It is protected by a complex, multi-layered incantation that can only be constructed by witnessing every revelation."},
                {title:"The Chosen One", desc:"Only one soul can be the first to break the seals. The moment the incantation is spoken and the offering is claimed, the prophecy is fulfilled."}].map((c,i) => (
                <div key={i} className="p-7 sm:p-12 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                  <h4 className="text-xl sm:text-3xl font-display font-black mb-4 sm:mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />{c.title}
                  </h4>
                  <p className="text-white/30 text-sm sm:text-lg font-serif italic leading-tight">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERING ── */}
      <section id="reward" className="py-20 sm:py-40 lg:py-80 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 lg:gap-32 items-center">
            <div className="relative overflow-hidden">
              <SectionHeading number="03" subtitle="The offering is real, verifiable, and secured by the blockchain.">
                THE <br /> <GlitchText text="OFFERING" />
              </SectionHeading>
              <div className="space-y-8 sm:space-y-14">
                {[{n:"01",title:"USDC_RELIQUARY",desc:<>The offering is held in a public USDC wallet, ensuring stability and instant global accessibility. No false prophets. No <RedactedText>delays</RedactedText>.</>},
                  {n:"02",title:"COMPOUNDING_TITHE",desc:<>The offering grows with every interaction, donation, and revelation. The stakes only go <RedactedText>up</RedactedText>.</>}].map(item => (
                  <div key={item.n} className="flex gap-5 sm:gap-10 group">
                    <span className="font-mono text-accent text-sm mt-1 flex-shrink-0">{item.n}</span>
                    <div className="p-5 sm:p-8 border-l border-white/10 group-hover:border-accent transition-colors">
                      <h4 className="text-xl sm:text-3xl font-display font-black tracking-tight uppercase mb-3 sm:mb-5">{item.title}</h4>
                      <p className="text-white/30 text-base sm:text-xl font-serif italic leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative p-5 sm:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
              <div className="flex flex-wrap justify-between gap-2 mb-6 sm:mb-10">
                <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Status: [SEALED]</div>
                <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">ETH_MAINNET</div>
              </div>
              <div className="bg-black/60 p-7 sm:p-12 text-center border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.05)_0%,transparent_70%)]" />
                <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-5 block relative z-10">Current_Offering_Verified</span>
                <div className="text-4xl sm:text-7xl lg:text-9xl font-display font-black text-white tracking-tighter mb-7 sm:mb-10 leading-none relative z-10 glow-text">$12,450</div>
                <div className="flex items-center justify-center gap-3 mb-7 sm:mb-10 relative z-10">
                  <div className="h-px w-5 bg-white/10" />
                  <div className="text-white/20 text-[9px] font-mono break-all px-3 py-1.5 border border-white/5">0x71C765...d8976F</div>
                  <div className="h-px w-5 bg-white/10" />
                </div>
                <button className="relative z-10 w-full py-5 sm:py-8 bg-accent text-black font-black text-xs tracking-[0.4em] uppercase hover:bg-white transition-all duration-500">
                  VERIFY_ON_CHAIN
                </button>
              </div>
              <div className="mt-5 sm:mt-8 grid grid-cols-3 gap-3">
                {[1,2,3].map(i => <div key={i} className="h-1 bg-accent/10" />)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TITHE ── */}
      <section className="py-20 sm:py-40 lg:py-80 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading subtitle="Become part of the narrative. Your presence can be immortalized in the purgatory.">
            THE <br /> <GlitchText text="TITHE" />
          </SectionHeading>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-14">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
              className="p-7 sm:p-12 lg:p-16 border border-white/10 bg-black relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-8 mb-7 sm:mb-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                    <PenTool className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase">Blood Inscription</h3>
                    <p className="text-accent text-[10px] font-mono tracking-[0.3em] uppercase mt-1">Permanent_Mark</p>
                  </div>
                </div>
                <p className="text-white/40 mb-7 sm:mb-10 leading-tight text-base sm:text-xl font-serif italic">
                  Users can offer a tithe to have their name or custom mark placed as blood graffiti in future revelations. Your legacy is <RedactedText>eternal</RedactedText>.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-14">
                  <div className="p-4 sm:p-8 border border-white/5 bg-white/[0.02]">
                    <span className="text-white/20 text-[10px] font-mono uppercase block mb-2 tracking-widest">Blood_Tithe</span>
                    <span className="text-2xl sm:text-4xl font-display font-black text-white tracking-tighter">$1.00</span>
                  </div>
                  <div className="p-4 sm:p-8 border border-white/5 bg-white/[0.02]">
                    <span className="text-white/20 text-[10px] font-mono uppercase block mb-2 tracking-widest">Status</span>
                    <span className="text-2xl sm:text-4xl font-display font-black text-accent tracking-tighter">OPEN</span>
                  </div>
                </div>
                <button className="w-full py-5 sm:py-10 bg-accent text-black font-black tracking-[0.3em] uppercase text-xs hover:bg-white transition-all shadow-[0_0_50px_rgba(139,0,0,0.2)]">
                  INSCRIBE_YOUR_NAME
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
              className="space-y-6 sm:space-y-10">
              <div className="p-7 sm:p-12 border border-white/10 bg-black">
                <div className="flex items-center gap-4 sm:gap-8 mb-7 sm:mb-10">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-white/50" size={20} />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase">Tithe Allocation</h4>
                </div>
                <div className="space-y-7 sm:space-y-10">
                  {[{label:"Offering Contribution",pct:"40%",w:"40%",color:"bg-accent shadow-[0_0_20px_rgba(139,0,0,0.5)]"},
                    {label:"Infrastructure & Creator",pct:"60%",w:"60%",color:"bg-white/20"}].map(b => (
                    <div key={b.label}>
                      <div className="flex justify-between text-xs mb-3 font-mono uppercase tracking-[0.3em]">
                        <span className="text-white/20">{b.label}</span>
                        <span className="text-accent font-black">{b.pct}</span>
                      </div>
                      <div className="h-2 bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: b.w }} transition={{ duration: 2, ease: "circOut" }} className={`h-full ${b.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-xs text-white/20 leading-relaxed italic font-serif">"Every contribution fuels the mystery. The cycle <RedactedText>continues</RedactedText>."</p>
              </div>
              <motion.div whileHover={{ x: 8 }}
                className="p-7 sm:p-12 border border-white/10 bg-black flex items-center justify-between group cursor-pointer hover:bg-accent/[0.05] transition-all duration-500">
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 border border-accent/20 bg-accent/5 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-2xl font-display font-black tracking-tight uppercase">Direct Contribution</h4>
                    <p className="text-white/20 text-sm font-serif italic">Increase the stakes immediately</p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-14 sm:h-14 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:text-accent transition-all">
                  <ChevronDown className="-rotate-90" size={18} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTAMENT ── */}
      <section className="py-20 sm:py-40 lg:py-80 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <SectionHeading subtitle="The prophecy is built on a foundation of absolute, mathematical fairness.">
            THE <br /> <GlitchText text="TESTAMENT" />
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16 mt-12 sm:mt-24">
            {[{icon:ShieldCheck,title:"Immutable Ledger",desc:<>The USDC reliquary is public. Anyone can verify the balance and transactions on the blockchain. Transparency is <RedactedText>divine</RedactedText>.</>},
              {icon:Lock,title:"Static Prophecy",desc:<>The final incantation is fixed from the start. We do not change it based on who is winning. The solution is already <RedactedText>written</RedactedText>.</>},
              {icon:HelpCircle,title:"Logical Integrity",desc:<>Every revelation is solvable. We do not use false idols or impossible riddles. If it looks like a sign, it probably <RedactedText>is</RedactedText>.</>}].map((item,i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 1 }}
                className="space-y-5 sm:space-y-8 group">
                <div className="w-14 h-14 sm:w-20 sm:h-20 border border-accent/20 bg-accent/[0.02] flex items-center justify-center mx-auto mb-6 sm:mb-10 group-hover:bg-accent/10 transition-all duration-700">
                  <item.icon className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase">{item.title}</h3>
                <div className="text-white/30 text-sm sm:text-lg leading-tight font-serif italic max-w-xs mx-auto">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONGREGATION ── */}
      <section className="py-20 sm:py-40 lg:py-80 relative border-t border-white/5 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <SectionHeading number="04" subtitle="The truth is not a straight line. It is a web of interconnected anomalies.">
              THE <br /> <GlitchText text="CONGREGATION" />
            </SectionHeading>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-14 mt-10 sm:mt-20 text-left w-full">
              {[{label:"CHOIR_01 // SERAPHIM", title:"Omnipresent Signs", desc:<>The mystery extends beyond YouTube. Check descriptions, source code of linked sites, and even metadata of shared files. Every byte could be a <RedactedText>revelation</RedactedText>.</>},
                {label:"CHOIR_02 // CHERUBIM", title:"Collective Faith", desc:<>No one person can solve this alone. Join the collective effort. Share your visions, debunk false prophets, and build the map together. The watchers are <RedactedText>listening</RedactedText>.</>}].map((c,i) => (
                <motion.div key={i} whileHover={{ scale: 1.01 }}
                  className="p-7 sm:p-12 border border-white/10 bg-black/40 backdrop-blur-xl relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
                  <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-accent">{c.label}</div>
                  <div className="relative z-10 mt-3">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black mb-4 sm:mb-7 uppercase tracking-tighter text-accent">{c.title}</h4>
                    <p className="text-white/40 text-base sm:text-xl font-serif italic leading-tight mb-7 sm:mb-10">{c.desc}</p>
                    <div className="flex items-center gap-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span className="text-[10px] font-mono tracking-widest uppercase">Scanning...</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-40 lg:py-80 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading number="05" subtitle="Everything you need to know before you bear witness.">
            APOCRYPHAL <br /> <GlitchText text="TEXTS" />
          </SectionHeading>
          <div className="mt-10 sm:mt-20 space-y-3 sm:space-y-6">
            <FAQItem question="Is the offering real?" answer={<>Yes. The offering is held in a public USDC wallet (0x71C765...d8976F). You can verify the balance on Etherscan or any blockchain explorer. This is <RedactedText>verified</RedactedText>.</>} />
            <FAQItem question="Can anyone be chosen?" answer={<>Absolutely. No geographical or age restrictions. The first soul to solve the mystery wins the entire balance. The judgment is <RedactedText>approaching</RedactedText>.</>} />
            <FAQItem question="Are the signs fair?" answer={<>All trials are based on logic, pattern recognition, and observation. We do not use false idols or impossible riddles. The truth is <RedactedText>hidden in plain sight</RedactedText>.</>} />
            <FAQItem question="Are the visions AI-generated?" answer={<>Yes, we use cutting-edge AI generation tools. Any 'glitches' are byproducts of the tech, but all intended signs are clearly visible. The machine <RedactedText>prophesies</RedactedText>.</>} />
            <FAQItem question="Can I bear witness for free?" answer={<>Yes! Watching revelations and solving trials is 100% free. Blood Inscription and tithes are optional. The descent is <RedactedText>open to all</RedactedText>.</>} />
          </div>
          <div className="mt-14 sm:mt-28 p-7 sm:p-12 border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <div className="flex items-start gap-4 sm:gap-8">
              <div className="p-3 bg-accent/10 text-accent flex-shrink-0"><Shield size={18} /></div>
              <div>
                <h4 className="text-lg sm:text-2xl font-display font-black uppercase tracking-tighter mb-2 sm:mb-4">Divine_Judgment</h4>
                <p className="text-white/30 font-serif italic leading-relaxed text-sm sm:text-base">
                  All signs are generated and verified by the core system. Any attempt to manipulate the congregation or bypass the covenant will result in immediate <RedactedText>damnation</RedactedText>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 sm:py-32 border-t border-white/5 relative overflow-hidden bg-black">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 sm:gap-20">
            <div className="flex flex-col items-start gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-accent flex items-center justify-center">
                  <span className="text-black font-black text-sm sm:text-lg">7S</span>
                </div>
                <span className="font-display font-black text-2xl sm:text-4xl tracking-tighter uppercase">SEVENTH SEED</span>
              </div>
              <p className="text-white/20 text-base sm:text-2xl max-w-sm font-serif italic leading-tight">
                "The watchers descend from the heavens. The seals are breaking in the dark. End of <RedactedText>revelation</RedactedText>."
              </p>
              <div className="flex gap-4">
                <a href="https://youtube.com/@VIISeed" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="w-9 h-9 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Youtube size={16} />
                </a>
                <a href="#" aria-label="Search" className="w-9 h-9 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Search size={16} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 w-full lg:w-auto">
              {[{title:"Scripture",links:[{href:"#about",label:"The_Genesis"},{href:"#how-it-works",label:"The_Covenant"},{href:"#reward",label:"The_Offering"}]},
                {title:"Apocrypha",links:[{href:"#faq",label:"Texts"},{href:"#",label:"Relics"},{href:"#",label:"Tabernacle"}]},
                {title:"Commandments",links:[{href:"#",label:"Privacy_Lvl_0"},{href:"#",label:"Terms_of_Faith"}]}].map(col => (
                <div key={col.title} className="space-y-4 sm:space-y-6">
                  <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 font-bold">{col.title}</h3>
                  <ul className="space-y-3 sm:space-y-5 text-xs font-mono tracking-widest uppercase">
                    {col.links.map(l => <li key={l.label}><a href={l.href} className="text-white/30 hover:text-accent transition-colors">{l.label}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 sm:mt-24 pt-7 sm:pt-14 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-5 text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.4em] text-white/10">
            <p>© 2026 SEVENTH SEED PROJECT. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center gap-3"><span className="w-2 h-2 bg-accent rounded-full animate-pulse" />PURGATORY_LEVEL_7</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
