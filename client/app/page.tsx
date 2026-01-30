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
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Audit Dashboard</h1>
            <p className="text-gray-400">Manage and analyze your digital presence</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              OCC
            </div>
          </div>
        </header>

        {!response && !isLoading && (
          <div className="max-w-xl mx-auto mt-20 text-center">
            <h2 className="text-2xl font-bold mb-6">Run a New Audit</h2>
            <form onSubmit={runAudit} className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="enter-business-url.com"
                className="w-full p-4 pl-12 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Scan <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-32">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Analyzing digital footprint...</p>
          </div>
        )}

        {response && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Results for: <span className="text-blue-400">{response.url}</span></h2>
              <button
                onClick={() => setResponse(null)}
                className="text-sm text-gray-500 hover:text-white"
              >
                Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="col-span-1 bg-gray-900/50 p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center">
                <GradeDisplay grade={response.grade || 'F'} />
                <p className="mt-4 text-gray-400 font-medium tracking-wide">Overall Grade</p>
              </div>

              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultCard
                  title="SEO Status"
                  status={response.scoreDetails?.seo || 'Unknown'}
                  description="Metadata and H1 hierarchy check"
                />
                <ResultCard
                  title="Security"
                  status={response.scoreDetails?.security || 'Unknown'}
                  description="SSL/TLS certificate validation"
                />
                <ResultCard
                  title="Performance"
                  status={response.scoreDetails?.performance || '0ms'}
                  description="First Contentful Paint (FCP) proxy"
                />
                <ResultCard
                  title="Social Strategy"
                  status={response.scoreDetails?.social || 'Unknown'}
                  description="OpenGraph tags presence"
                />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="font-semibold mb-2 text-gray-300">Recommendation</h3>
              <p className="text-gray-400">{response.recommendation}</p>
            </div>

            {/* Recommended Fixes / Marketplace Upsell */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Recommended Fixes
                <span className="text-sm font-normal text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
                  Based on your results
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div >
  );
}