import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolAuditCard } from '@/components/results/ToolAuditCard';

describe('ToolAuditCard', () => {
  it('renders correctly', () => {
    const tool = {
      tool: 'chatgpt',
      current_plan: 'team',
      current_spend: 600,
      seats: 20,
      use_case: 'writing',
      recommended_action: 'switch',
      recommended_plan: 'pro',
      recommended_tool: 'claude',
      monthly_savings: 200,
      annual_savings: 2400,
      reason: 'Test reason'
    };
    render(<ToolAuditCard tool={tool} />);
    expect(screen.getByText('Test reason')).toBeInTheDocument();
    expect(screen.getByText(/\+\$200/i)).toBeInTheDocument();
  });
});
