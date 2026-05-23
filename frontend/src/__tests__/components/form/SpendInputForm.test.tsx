import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpendInputForm } from '@/components/form/SpendInputForm';
import { useFormStore } from '@/stores/formStore';

// Mock the store
jest.mock('@/stores/formStore', () => ({
  useFormStore: jest.fn()
}));

describe('SpendInputForm', () => {
  beforeEach(() => {
    (useFormStore as jest.Mock).mockReturnValue({
      tools: [{ id: '1', toolId: '', planName: '', monthlySpend: 0, seats: 1, useCase: '' }],
      addToolRow: jest.fn(),
      updateToolRow: jest.fn(),
      removeToolRow: jest.fn()
    });
  });

  it('renders initial tool row', () => {
    render(<SpendInputForm onSubmit={jest.fn()} />);
    expect(screen.getByText('Tool')).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', () => {
    const mockSubmit = jest.fn();
    render(<SpendInputForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Run Audit'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
