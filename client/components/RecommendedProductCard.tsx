"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "../data/products";

interface RecommendedProductCardProps {
    product: Product;
}

export function RecommendedProductCard({ product }: RecommendedProductCardProps) {
    return (
        <div className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-3 -right-3 z-10">
                <span className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-blue-400" /> Best Match
                </span>
            </div>

            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                        {product.category}
                    </span>
                    <h3 className="text-xl font-black text-gray-900 mt-4 tracking-tight">
                        {product.title}
                    </h3>
                </div>

                <p className="text-gray-500 font-medium text-sm mb-8 flex-1 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting at</span>
                        <span className="font-black text-2xl text-gray-900">{product.price}</span>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-90">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
