import React from 'react';
import { render, screen } from '@testing-library/react';
import { SavingsHero } from '@/components/results/SavingsHero';

describe('SavingsHero', () => {
  it('renders savings correctly', () => {
    render(<SavingsHero monthlySavings={500} annualSavings={6000} />);
    expect(screen.getByText('You could save')).toBeInTheDocument();
    expect(screen.getByText(/\$6,000/i)).toBeInTheDocument();
  });

  it('renders optimal message when no savings', () => {
    render(<SavingsHero monthlySavings={0} annualSavings={0} />);
    expect(screen.getByText('Your AI spend is optimal')).toBeInTheDocument();
  });
});
