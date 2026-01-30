"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { GradeDisplay } from '@/components/GradeDisplay';
import { ResultCard } from '@/components/ResultCard';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { products } from '@/data/products';
import { RecommendedProductCard } from '@/components/RecommendedProductCard';

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runAudit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const res = await fetch('http://localhost:5001/api/generate-snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessUrl: url })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: 'Failed to connect to audit server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
      <Sidebar />

      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Audit Dashboard</h1>
            <p className="text-gray-500 font-medium">Analyze and optimize your digital presence</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              OCC
            </div>
          </div>
        </header>

        {!response && !isLoading && (
          <div className="max-w-xl mx-auto mt-20 text-center">
            <h2 className="text-2xl font-black mb-6 tracking-tight">Run a New Audit</h2>
            <form onSubmit={runAudit} className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="enter-business-url.com"
                className="w-full p-5 pl-14 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-900"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2.5 top-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-800 text-white px-8 rounded-xl font-bold transition-all flex items-center gap-2 active:scale-95"
              >
                Scan <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-400 font-medium uppercase tracking-widest">Powered by AI Audit Engine</p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-32">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#F8FAFC] rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-900 font-black text-xl animate-pulse tracking-tight">Analyzing digital footprint...</p>
            <p className="text-gray-500 text-sm mt-2">This usually takes about 10-15 seconds.</p>
          </div>
        )}

        {response && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black tracking-tight">Results for: <span className="text-blue-600">{response.url}</span></h2>
              <button
                onClick={() => setResponse(null)}
                className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
              >
                Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="col-span-1 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <GradeDisplay grade={response.grade || 'F'} />
                <p className="mt-6 text-gray-500 font-black uppercase tracking-widest text-xs">Overall Performance</p>
              </div>

              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ResultCard
                  title="SEO Status"
                  status={response.scoreDetails?.seo || 'Unknown'}
                  description="Metadata and H1 hierarchy"
                />
                <ResultCard
                  title="Security"
                  status={response.scoreDetails?.security || 'Unknown'}
                  description="SSL/TLS certificate"
                />
                <ResultCard
                  title="Performance"
                  status={response.scoreDetails?.performance || '0ms'}
                  description="Load time efficiency"
                />
                <ResultCard
                  title="Social Strategy"
                  status={response.scoreDetails?.social || 'Unknown'}
                  description="OpenGraph tags"
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                <ArrowRight className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-1">Strategic Recommendation</h3>
                <p className="text-gray-700 font-medium text-lg leading-relaxed">{response.recommendation}</p>
              </div>
            </div>

            {/* Recommended Fixes / Marketplace Upsell */}
            <div className="mt-16">
              <h3 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3">
                Recommended Solutions
                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Tailored for you
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products
                  .filter(p => !p.triggerCondition || (response.scoreDetails && p.triggerCondition(response.scoreDetails)))
                  .map(product => (
                    <RecommendedProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}