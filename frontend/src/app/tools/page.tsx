import React from 'react';
import Link from 'next/link';
import { TOOL_SEO_DATA } from '@/utils/toolSeoData';
import { ArrowRight, Settings } from 'lucide-react';

export default function ToolsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Supported AI Tools
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
          We provide instant spend audits and optimization strategies for all major AI platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOL_SEO_DATA.map((tool) => (
          <Link 
            key={tool.slug} 
            href={`/tools/${tool.slug}`}
            className="group block p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-violet-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">
                <Settings className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {tool.name}
              </h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2">
              {tool.description}
            </p>
            <div className="flex items-center text-violet-600 dark:text-violet-400 font-medium">
              View Audit Strategy
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
