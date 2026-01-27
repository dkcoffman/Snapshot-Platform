
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  BarChart3, 
  Globe, 
  ShieldAlert, 
  Zap, 
  MessageSquare, 
  TrendingUp,
  LayoutDashboard,
  Settings,
  Bell,
  ChevronRight,
  Sparkles,
  Loader2,
  ArrowRight,
  ShieldCheck,
  MousePointer2,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { GlassCard } from './components/GlassCard';
import { generateBusinessInsights } from './services/geminiService';
import { SMBSnapshot } from './types';

const MOCK_SNAPSHOT: SMBSnapshot = {
  businessName: "Lumiere Coffee Roasters",
  domain: "lumierecoffee.com",
  overallScore: 84,
  sections: {
    seo: {
      score: 88,
      status: 'good',
      metrics: [{ label: 'Rank', value: '#3' }, { label: 'Auth', value: '42' }]
    },
    reputation: {
      score: 92,
      status: 'good',
      metrics: [{ label: 'Reviews', value: '154' }, { label: 'Rating', value: '4.8' }]
    },
    social: {
      score: 45,
      status: 'poor',
      metrics: [{ label: 'Reach', value: 'Low' }, { label: 'Posts', value: '2/mo' }]
    },
    advertising: {
      score: 72,
      status: 'average',
      metrics: [{ label: 'CPC', value: '$0.85' }, { label: 'ROI', value: '3.1x' }]
    },
    listing: {
      score: 95,
      status: 'good',
      metrics: [{ label: 'Sync', value: '100%' }, { label: 'Errors', value: '0' }]
    }
  }
};

const getGradeInfo = (score: number) => {
  if (score >= 90) return { grade: 'A', color: 'emerald', hex: '#10b981' };
  if (score >= 80) return { grade: 'B', color: 'blue', hex: '#3b82f6' };
  if (score >= 70) return { grade: 'C', color: 'yellow', hex: '#f59e0b' };
  if (score >= 60) return { grade: 'D', color: 'orange', hex: '#f97316' };
  return { grade: 'F', color: 'red', hex: '#ef4444' };
};

const App: React.FC = () => {
  const [snapshot, setSnapshot] = useState<SMBSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery) return;
    
    setIsScanning(true);
    setLoading(true);
    setSnapshot(null);

    // Simulate scanning
    await new Promise(r => setTimeout(r, 2500));
    
    const result = { ...MOCK_SNAPSHOT, domain: searchQuery };
    setSnapshot(result);
    setIsScanning(false);
    
    const insights = await generateBusinessInsights(result);
    setAiInsight(insights || 'Analysis complete.');
    setLoading(false);
  };

  const gradeInfo = snapshot ? getGradeInfo(snapshot.overallScore) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar - Minimized or Standard based on screen */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-64 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl z-50 hidden md:flex flex-col p-4">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">OCC <span className="text-cyan-400">Catalyst</span></span>
        </div>
        <div className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Globe />} label="SEO Audit" />
          <NavItem icon={<ShieldCheck />} label="Security" />
          <NavItem icon={<BarChart3 />} label="Analytics" />
          <NavItem icon={<Settings />} label="White Label" />
        </div>
      </nav>

      <main className="md:ml-64 p-6 md:p-12">
        <AnimatePresence mode="wait">
          {!snapshot && !isScanning ? (
            <motion.div 
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[80vh] text-center"
            >
              <div className="mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-24 h-24 bg-cyan-500/20 rounded-3xl flex items-center justify-center mb-6 mx-auto relative"
                >
                  <Search className="w-12 h-12 text-cyan-400" />
                  <div className="absolute inset-0 rounded-3xl border border-cyan-500/50 animate-ping" />
                </motion.div>
                <h1 className="text-5xl font-bold text-white tracking-tighter mb-4">Snapshot Your Business</h1>
                <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Enter any domain to generate a high-fidelity business snapshot with AI-powered insights.
                </p>
              </div>

              <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
                <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl overflow-hidden p-2 shadow-2xl">
                  <Globe className="w-6 h-6 text-slate-500 ml-4 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="example-business.com" 
                    className="flex-1 bg-transparent border-none text-xl py-4 px-4 text-white focus:outline-none placeholder:text-slate-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 group/btn"
                  >
                    Generate Snapshot
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : isScanning ? (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[80vh] space-y-8"
            >
              <div className="w-64 h-80 relative liquid-glass rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                <div className="scanning-line" />
                <div className="space-y-4 text-center p-6">
                  <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest animate-pulse">Scanning Core Vitality</p>
                  <div className="flex flex-col gap-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="h-full bg-cyan-500"
                      />
                    </div>
                    <span className="text-xs text-slate-500">Crawling {searchQuery}...</span>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-light tracking-widest text-white uppercase">Building Snapshot</h2>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Hero Results Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                      Live Snapshot
                    </div>
                    <span className="text-slate-500 text-sm">{new Date().toLocaleDateString()} • {snapshot?.domain}</span>
                  </div>
                  <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
                    {snapshot?.businessName}
                  </h1>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                    Our scanner analyzed over 250+ data points across SEO, Security, Social, and Performance to calculate your business vitality.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setSnapshot(null)} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                      New Search
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                      Download PDF Report
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex justify-center"
                >
                  <div className="relative group grade-3d">
                    <motion.div 
                      whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                      className={`w-72 h-72 rounded-[4rem] flex flex-col items-center justify-center relative z-10 transition-all duration-700 shadow-2xl`}
                      style={{ 
                        background: `radial-gradient(circle at top left, ${gradeInfo?.hex}, #020617)`,
                        border: `4px solid ${gradeInfo?.hex}55`,
                        boxShadow: `0 0 60px ${gradeInfo?.hex}22`
                      }}
                    >
                      <span className="text-[12rem] font-black text-white leading-none drop-shadow-2xl">
                        {gradeInfo?.grade}
                      </span>
                      <div className="absolute bottom-10 px-6 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white font-bold uppercase tracking-widest text-xs">
                        Snapshot Grade
                      </div>
                    </motion.div>
                    {/* Floating accents */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                  </div>
                </motion.div>
              </div>

              {/* The Score Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ScoreGridCard 
                  index={0}
                  icon={<Globe className="text-cyan-400" />} 
                  title="SEO Vitality" 
                  score={snapshot?.sections.seo.score || 0}
                  status={snapshot?.sections.seo.status || 'poor'}
                  description="Visibility in organic search results."
                />
                <ScoreGridCard 
                  index={1}
                  icon={<ShieldCheck className="text-emerald-400" />} 
                  title="Web Security" 
                  score={95}
                  status="good"
                  description="SSL, firewall, and trust signals."
                />
                <ScoreGridCard 
                  index={2}
                  icon={<Zap className="text-amber-400" />} 
                  title="Load Speed" 
                  score={snapshot?.sections.advertising.score || 0}
                  status="average"
                  description="Cumulative layout shift and time to interactive."
                />
                <ScoreGridCard 
                  index={3}
                  icon={<MessageSquare className="text-purple-400" />} 
                  title="Reputation" 
                  score={snapshot?.sections.reputation.score || 0}
                  status={snapshot?.sections.reputation.status || 'poor'}
                  description="Sentiment and review velocity."
                />
              </div>

              {/* Business Intelligence Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Competitive Advantage</h2>
                  </div>
                </div>

                <div className="relative p-10 liquid-glass rounded-3xl border border-white/10 group overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-24 h-24 text-white" />
                  </div>
                  
                  <div className="relative z-10 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">AI Executive Brief</h3>
                        <p className="text-xs text-slate-500">Insights powered by Gemini Pro</p>
                      </div>
                    </div>

                    {loading ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-4/6" />
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none text-xl leading-relaxed text-slate-300 font-light italic">
                        {aiInsight}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const ScoreGridCard: React.FC<{ index: number; icon: React.ReactNode; title: string; score: number; status: string; description: string }> = ({ index, icon, title, score, status, description }) => {
  const getStatusColor = (s: string) => {
    if (s === 'good') return 'text-emerald-400';
    if (s === 'average') return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <GlassCard className="h-full flex flex-col gap-6 hover:translate-y-[-4px] transition-all group">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/10">
            {icon}
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-white">{score}%</div>
            <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${getStatusColor(status)}`}>
              {status}
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-cyan-400 cursor-pointer group/link">
          Explore Breakdown
          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </div>
      </GlassCard>
    </motion.div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-cyan-500/10 text-cyan-400 neon-border-brand' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    <span className="shrink-0">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export default App;
