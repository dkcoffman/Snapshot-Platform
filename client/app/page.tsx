"use client";

import React, { useState } from 'react';

export default function Home() {
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
      if (err instanceof Error) {
        setResponse({ error: `Error: ${err.message}` });
      } else {
        setResponse({ error: 'An unknown error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-20">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-5xl font-bold text-center mb-2">
          OCC <span className="text-blue-500">Catalyst</span>
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Generate digital performance reports for SMBs
        </p>

        <form onSubmit={runAudit} className="mb-10">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a domain..."
              className="w-full p-4 pr-32 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md disabled:bg-gray-600"
            >
              {isLoading ? 'Scanning...' : 'Analyze'}
            </button>
          </div>
        </form>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[200px]">
          <h2 className="text-lg font-semibold mb-4">API Response</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : response ? (
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">The API response will be displayed here.</p>
          )}
        </div>
      </div>
    </div>
  );
}