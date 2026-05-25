'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, MonitorPlay, Calculator, Settings, ArrowRight } from 'lucide-react';
import { TOOL_NAMES, TOOL_DISPLAY_NAMES } from '@/utils/constants';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-white/60 dark:bg-black/60 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
      <div 
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full h-full flex flex-col bg-transparent">
          <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50 text-zinc-500 dark:text-zinc-400" />
            <Command.Input
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
              autoFocus
            />
            <div className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded mr-1">
              ESC
            </div>
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2 overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>
            
            <Command.Group heading="Navigation" className="text-xs font-medium text-zinc-500 px-2 py-1.5 [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/'))}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm cursor-pointer aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800 aria-selected:text-zinc-900 dark:aria-selected:text-zinc-900 dark:text-white text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <MonitorPlay className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/audit'))}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm cursor-pointer aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800 aria-selected:text-zinc-900 dark:aria-selected:text-zinc-900 dark:text-white text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <Calculator className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                Start AI Spend Audit
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Tools & Pricing" className="text-xs font-medium text-zinc-500 px-2 py-1.5 mt-2 [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold">
              {TOOL_NAMES.map((tool) => (
                <Command.Item
                  key={tool}
                  onSelect={() => runCommand(() => router.push(`/tools/${tool.replace('_', '-')}-pricing-audit`))}
                  className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm cursor-pointer aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800 aria-selected:text-zinc-900 dark:aria-selected:text-zinc-900 dark:text-white text-zinc-600 dark:text-zinc-300 transition-colors"
                >
                  <Settings className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  {TOOL_DISPLAY_NAMES[tool]} Audit
                  <ArrowRight className="h-3 w-3 ml-auto opacity-50" />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
