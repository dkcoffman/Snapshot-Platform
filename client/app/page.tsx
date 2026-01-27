"use client";

import React, { useState, useCallback } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Zap, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAudit = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Points to the Docker API container on port 5001
      const res = await fetch('http://localhost:5001/api/generate-snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessUrl: url })
      });

      if (!res.ok) throw new Error('Audit Engine failed to respond.');
      
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Connection to Audit Engine failed.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  const getGradeColor = (grade: string) => {
    const colors: any = {
      'A': 'from-emerald-400 to-cyan-500 shadow-emerald-500/50',
      'B': 'from-blue-400 to-indigo-500 shadow-blue-500/50',
      'C': 'from-yellow-400 to-orange-500 shadow-yellow-500/50',
      'D': 'from-orange-400 to-red-500 shadow-orange-500/50',
      'F': 'from-red-500 to-rose-700 shadow-red-600/50',
    };
    return colors[grade] || 'from-slate-400 to-slate-600';
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Background Decorative Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            SNAPSHOT.AI
          </h1>
          <p className="text-slate-400 text-xl font-medium mb-12">Identify growth gaps in seconds.</p>
        </motion.div>

        {/* Liquid Glass Search Bar */}
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative flex gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
            <div className="flex items-center pl-4 text-slate-500">
              <Search size={20} />
            </div>
            <input 
              className="flex-1 bg-transparent px-2 py-3 outline-none text-white placeholder:text-slate-600"
              placeholder="Enter business URL (e.g., localcafe.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runAudit()}
            />
            <button 
              onClick={runAudit}
              disabled={loading || !url}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? 'Analyzing...' : <>Run Audit <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-6 pb-24"
          >
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-12 border-b border-slate-800/50 pb-12">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center text-8xl font-black bg-gradient-to-br shadow-2xl border-4 border-white/10 ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-4xl font-bold">{result.url}</h2>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-sm uppercase">
                    <CheckCircle2 className="w-5 h-5" />
                    {result.recommendation}
                  </div>
                  <p className="text-slate-500 font-mono text-xs italic">SCAN_TIMESTAMP: {new Date(result.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <ScoreCard icon={<Globe className="text-blue-400"/>} title="Local SEO" value={result.scoreDetails.seo} />
                <ScoreCard icon={<ShieldCheck className="text-emerald-400"/>} title="Security" value={result.scoreDetails.security} />
                <ScoreCard icon={<Zap className="text-amber-400"/>} title="Speed" value={result.scoreDetails.performance} />
                <ScoreCard icon={<Share2 className="text-purple-400"/>} title="Social" value={result.scoreDetails.social} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto mt-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium text-sm">{error}</p>
        </motion.div>
      )}
    </main>
  );
}

function ScoreCard({ icon, title, value }: any) {
  return (
    <div className="p-6 bg-slate-800/20 backdrop-blur-md border border-slate-800/50 rounded-3xl hover:border-slate-700 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 border border-slate-800 group-hover:scale-110 transition-transform">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
