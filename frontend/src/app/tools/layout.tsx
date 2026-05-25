import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tool Pricing Audits | SpendLens',
  description: 'Audit pricing and optimize spend for all major AI tools including Cursor, Copilot, ChatGPT, and Claude.',
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-black min-h-screen pt-20">
      {children}
    </div>
  );
}
