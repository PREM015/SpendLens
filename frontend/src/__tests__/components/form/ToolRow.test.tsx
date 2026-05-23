import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolRow } from '@/components/form/ToolRow';

jest.mock('@/stores/formStore', () => ({
  useFormStore: () => ({
    updateToolRow: jest.fn(),
    removeToolRow: jest.fn()
  })
}));

describe('ToolRow', () => {
  it('renders all input fields', () => {
    const data = { id: '1', toolId: 'cursor', planName: 'pro', monthlySpend: 20, seats: 1, useCase: 'coding' };
    render(<ToolRow toolIndex={0} data={data} />);
    
    expect(screen.getByText('Tool')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
    expect(screen.getByText('Monthly Spend ($)')).toBeInTheDocument();
    expect(screen.getByText('Seats/Users')).toBeInTheDocument();
    expect(screen.getByText('Primary Use Case')).toBeInTheDocument();
  });
});
