import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { LeadCaptureForm } from './LeadCaptureForm';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditId: string;
  onSuccess: () => void;
}

export function LeadCaptureModal({ isOpen, onClose, auditId, onSuccess }: LeadCaptureModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose} title="Get Your Full Audit Report">
      <div className="p-6">
        <p className="text-zinc-400 mb-6">
          Enter your email to receive a detailed breakdown of your potential savings and customized optimization plan.
        </p>
        <LeadCaptureForm auditId={auditId} onSuccess={onSuccess} />
        <div className="mt-4 text-center">
          <button 
            onClick={onClose}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Skip for now, just show me the results
          </button>
        </div>
      </div>
    </Modal>
  );
}
