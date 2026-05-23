import React from 'react';
import { render, screen } from '@testing-library/react';
import { CredexCTABlock } from '@/components/results/CredexCTABlock';

describe('CredexCTABlock', () => {
  it('renders CTA', () => {
    render(<CredexCTABlock savings={600} />);
    expect(screen.getByText(/Claim your/i)).toBeInTheDocument();
  });
});
