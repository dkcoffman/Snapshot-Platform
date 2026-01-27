"use client";
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Points to your Dockerized API on port 5001
      const res = await fetch('http://localhost:5001/api/generate-snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessUrl: url })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to connect to the Audit Engine." });
    }
    setLoading(false);
  };

  // Helper to color the badge based on grade
  const getBadgeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-500 shadow-emerald-500/50';
      case 'B': return 'bg-blue-500 shadow-blue-500/50';
      case 'C': return 'bg-yellow-500 shadow-yellow-500/50';
      case 'D': return 'bg-orange-500 shadow-orange-500/50';
      case 'F': return 'bg-red-500 shadow-red-500/50';
      default: return 'bg-slate-500';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto pt-20 pb-10 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AI Snapshot Auditor
        </h1>
        <p className="text-slate-400 text-lg mb-10">Scan any business website to generate a 2026 digital performance report.</p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
          <input 
            className="w-full md:w-96 p-4 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
            onChange={e => setUrl(e.target.value)} 
            placeholder="Enter business website (e.g. apple.com)" 
          />
          <button 
            className="w-full md:w-auto bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
            onClick={runAudit}
            disabled={loading || !url}
          >
            {loading ? 'Analyzing Data...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && !result.error && (
        <div className="max-w-5xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            
            {/* The A-F Grade Badge */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className={`w-40 h-40 rounded-full flex items-center justify-center text-7xl font-black shadow-2xl ${getBadgeColor(result.grade)}`}>
                {result.grade}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{result.url}</h2>
                <p className="text-emerald-400 font-medium mb-4 uppercase tracking-widest text-sm italic">
                  {result.recommendation}
                </p>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${getBadgeColor(result.grade)}`} style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Local SEO</p>
                <p className="text-xl font-semibold">{result.scoreDetails.seo}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Security</p>
                <p className="text-xl font-semibold">{result.scoreDetails.security}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Performance</p>
                <p className="text-xl font-semibold">{result.scoreDetails.performance}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Social</p>
                <p className="text-xl font-semibold">{result.scoreDetails.social}</p>
              </div>
            </div>

            <p className="mt-10 text-center text-slate-500 text-xs italic">
              Report Generated via AI Snapshot Engine • {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {result?.error && (
        <div className="max-w-md mx-auto mt-4 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-center">
          {result.error}
        </div>
      )}
    </main>
  );
}
