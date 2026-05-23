import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeadCaptureModal } from '@/components/lead/LeadCaptureModal';

jest.mock('@/hooks/useLead', () => ({
  useLead: () => ({
    submitLead: jest.fn().mockResolvedValue(true),
    isLoading: false,
    error: null
  })
}));

describe('LeadCaptureModal', () => {
  it('renders modal when open', () => {
    render(<LeadCaptureModal isOpen={true} onClose={jest.fn()} auditId="123" onSuccess={jest.fn()} />);
    expect(screen.getByText('Get Your Full Audit Report')).toBeInTheDocument();
  });

  it('calls onClose when skip is clicked', () => {
    const mockClose = jest.fn();
    render(<LeadCaptureModal isOpen={true} onClose={mockClose} auditId="123" onSuccess={jest.fn()} />);
    fireEvent.click(screen.getByText(/Skip for now/i));
    expect(mockClose).toHaveBeenCalled();
  });
});
