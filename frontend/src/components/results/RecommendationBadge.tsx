'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';

export function RecommendationBadge({ action }: { action: string }) {
  switch (action) {
    case 'switch':
      return <Badge variant="switch" dot>Switch Tool</Badge>;
    case 'downgrade':
      return <Badge variant="savings" dot>Downgrade Plan</Badge>;
    case 'optimize':
      return <Badge variant="savings" dot>Consolidate Seats</Badge>;
    case 'keep':
      return <Badge variant="optimal" dot>Optimal</Badge>;
    default:
      return null;
  }
}
