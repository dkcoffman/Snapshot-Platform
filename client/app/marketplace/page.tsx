"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RecommendedProductCard } from '@/components/RecommendedProductCard';
import { products } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

export default function Marketplace() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8 text-blue-500" />
                            Service Marketplace
                        </h1>
                        <p className="text-gray-400">Expand your digital capabilities with our partners.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                            OCC
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <RecommendedProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
