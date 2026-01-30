"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "../data/products";

interface RecommendedProductCardProps {
    product: Product;
}

export function RecommendedProductCard({ product }: RecommendedProductCardProps) {
    return (
        <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:bg-gray-800">
            <div className="absolute -top-3 -right-3">
                <span className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3" /> Recommended
                </span>
            </div>

            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-200 transition-colors">
                        {product.title}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                    <span className="font-bold text-white">{product.price}</span>
                    <button className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-white transition-colors">
                        Add to Bundle <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
