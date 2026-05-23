import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Narrow container */
  narrow?: boolean;
}

export function PageContainer({ children, className, narrow = false }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
        narrow ? 'max-w-3xl' : 'max-w-6xl',
        className
      )}
    >
      {children}
    </div>
  );
}
