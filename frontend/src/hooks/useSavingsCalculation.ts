import { useMemo } from 'react';
import { ToolAuditResult } from '@/types';

interface ChartData {
  name: string;
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
}

interface TrajectoryData {
  month: string;
  currentSpend: number;
  optimizedSpend: number;
}

export function useSavingsCalculation(results: ToolAuditResult[] | undefined) {
  const calculations = useMemo(() => {
    if (!results || results.length === 0) {
      return { 
        totalMonthly: 0, 
        totalAnnual: 0, 
        totalCurrentSpend: 0,
        totalOptimizedSpend: 0,
        totalSeats: 0,
        highestSavingTool: null,
        chartData: [],
        trajectoryData: []
      };
    }

    let totalMonthly = 0;
    let totalAnnual = 0;
    let totalSeats = 0;
    let highestSavingTool = results[0];
    
    const chartData = results.map(result => {
      totalMonthly += result.monthly_savings;
      totalAnnual += result.annual_savings;
      const optimizedSpend = result.current_spend - result.monthly_savings;
      totalSeats += result.seats;
      
      if (result.monthly_savings > highestSavingTool.monthly_savings) {
        highestSavingTool = result;
      }
      
      return {
        name: result.tool.replace(/_/g, ' '),
        currentSpend: result.current_spend,
        optimizedSpend: optimizedSpend,
        savings: result.monthly_savings
      };
    });

    const totalCurrentSpend = chartData.reduce((acc, curr) => acc + curr.currentSpend, 0);
    const totalOptimizedSpend = chartData.reduce((acc, curr) => acc + curr.optimizedSpend, 0);

    // Calculate 12-month cumulative trajectory
    const trajectoryData: TrajectoryData[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();
    
    let cumulativeCurrent = totalCurrentSpend;
    let cumulativeOptimized = totalOptimizedSpend;
    
    // Add Month 1 (Next month)
    trajectoryData.push({
      month: months[(currentMonthIndex + 1) % 12],
      currentSpend: cumulativeCurrent,
      optimizedSpend: cumulativeOptimized,
    });

    for (let i = 2; i <= 12; i++) {
      cumulativeCurrent += totalCurrentSpend;
      cumulativeOptimized += totalOptimizedSpend;
      trajectoryData.push({
        month: months[(currentMonthIndex + i) % 12],
        currentSpend: cumulativeCurrent,
        optimizedSpend: cumulativeOptimized,
      });
    }

    return { 
      totalMonthly, 
      totalAnnual, 
      totalCurrentSpend,
      totalOptimizedSpend,
      totalSeats,
      highestSavingTool,
      chartData,
      trajectoryData
    };
  }, [results]);

  return calculations;
}
