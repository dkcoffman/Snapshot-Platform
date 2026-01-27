"use client";
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);

  const runAudit = async () => {
    const res = await fetch('http://localhost:5001/api/generate-snapshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessUrl: url })
    });
    setResult(await res.json());
  };

  return (
    <div className="p-20 font-sans">
      <h1 className="text-2xl mb-4">SMB Snapshot Tool</h1>
      <input className="border p-2 mr-2 text-black" onChange={e => setUrl(e.target.value)} placeholder="domain.com" />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={runAudit}>Generate</button>
      {result && <pre className="mt-4 bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
