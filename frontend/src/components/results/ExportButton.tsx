'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuditResponse } from '@/types';
import { useCurrency } from '@/contexts/CurrencyProvider';
import { useLanguage } from '@/contexts/LanguageProvider';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ExportButton({ auditData }: { auditData: AuditResponse | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'csv' | null>(null);
  const { currency } = useCurrency();
  const { t } = useLanguage();

  const handleExportCSV = () => {
    if (!auditData) return;
    setIsExporting('csv');
    setIsOpen(false);

    try {
      const headers = ['Tool', 'Current Plan', 'Seats', 'Current Spend', 'Recommended Action', 'Optimized Spend', 'Monthly Savings', 'Annual Savings'];
      const rows = auditData.tools.map(r => [
        r.tool,
        r.current_plan,
        r.seats.toString(),
        r.current_spend.toString(),
        r.recommended_action,
        (r.current_spend - r.monthly_savings).toString(),
        r.monthly_savings.toString(),
        r.annual_savings.toString()
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `SpendLens_Audit_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPDF = async () => {
    if (!auditData) return;
    setIsExporting('pdf');
    setIsOpen(false);

    try {
      const element = document.getElementById('audit-dashboard-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#000000',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`SpendLens_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting !== null || !auditData}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {isExporting ? `Exporting ${isExporting.toUpperCase()}...` : t('dashboard.export')}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-1">
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <FileText size={16} className="text-violet-500 dark:text-violet-400" />
                Export as PDF
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <FileSpreadsheet size={16} className="text-emerald-500 dark:text-emerald-400" />
                Export as CSV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
