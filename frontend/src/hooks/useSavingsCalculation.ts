import { useMemo } from 'react';
import { ToolAuditResult } from '@/types';

export function useSavingsCalculation(results: ToolAuditResult[] | undefined) {
  const calculations = useMemo(() => {
    if (!results || results.length === 0) {
      return { totalMonthly: 0, totalAnnual: 0, highestSavingTool: null };
    }

    let totalMonthly = 0;
    let totalAnnual = 0;
    let highestSavingTool = results[0];

    results.forEach(result => {
      totalMonthly += result.monthly_savings;
      totalAnnual += result.annual_savings;
      if (result.monthly_savings > highestSavingTool.monthly_savings) {
        highestSavingTool = result;
      }
    });

    return { totalMonthly, totalAnnual, highestSavingTool };
  }, [results]);

  return calculations;
}
