"use client";

import React from 'react';
import { PublicAuditView } from '@/components/share/PublicAuditView';

export default function SharePage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicAuditView token={params.token} />
    </div>
  );
}
