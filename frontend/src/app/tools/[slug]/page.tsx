import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOOL_SEO_DATA } from '@/utils/toolSeoData';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export function generateStaticParams() {
  return TOOL_SEO_DATA.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = TOOL_SEO_DATA.find(t => t.slug === params.slug);
  if (!tool) return {};
  
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
  };
}

export default function ToolSeoPage({ params }: { params: { slug: string } }) {
  const tool = TOOL_SEO_DATA.find(t => t.slug === params.slug);
  
  if (!tool) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <BackgroundBeams />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Spend Optimization
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">{tool.name}</span> Spend
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {tool.metaDescription}
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-zinc-900 dark:text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-transform"
          >
            Start Free Audit
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Details Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pricing Tiers */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Pricing Tiers</h2>
            <div className="space-y-4">
              {tool.pricingTiers.map((tier, idx) => (
                <SpotlightCard key={idx} className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{tier.name}</h3>
                    <span className="text-lg font-mono font-bold text-violet-600 dark:text-violet-400">{tier.price}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">{tier.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Features & FAQ */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Common Questions</h2>
              <div className="space-y-6">
                {tool.faqs.map((faq, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">{faq.question}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
