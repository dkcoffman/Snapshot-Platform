"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RecommendedProductCard } from '@/components/RecommendedProductCard';
import { products } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

export default function Marketplace() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <ShoppingBag className="w-4 h-4" /> Expansion
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Service Marketplace</h1>
                        <p className="text-gray-500 text-lg font-medium">Expand your digital capabilities with our premium agency partners.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map(product => (
                        <RecommendedProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
