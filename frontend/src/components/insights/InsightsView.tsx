'use client';

import React, { useState, useEffect } from 'react';
import { useWorkStore } from '@/store/useWorkStore';
import { InsightsSummaryMetrics } from './InsightsSummaryMetrics';
import { EarningsDonutChart } from './EarningsDonutChart';
import { AcceptedCollabsSection } from './AcceptedCollabsSection';
import { RejectedCollabsSection } from './RejectedCollabsSection';
import { EventAttendanceHistory } from './EventAttendanceHistory';

export const InsightsView: React.FC = () => {
  const { monthlyEarnings, yearlyEarnings, fetchIntelligenceInsights } = useWorkStore();
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchIntelligenceInsights();
  }, [fetchIntelligenceInsights]);

  const earningsData = timeframe === 'monthly' ? monthlyEarnings : yearlyEarnings;
  const totalValue = (earningsData || []).reduce((acc: number, item: any) => acc + (item.value || 0), 0);
  const totalRevenueDisplay = totalValue > 0
    ? (totalValue >= 10000000 
        ? `₹${(totalValue / 10000000).toFixed(2)} Cr`
        : `₹${(totalValue / 100000).toFixed(1)} Lakhs`)
    : (timeframe === 'monthly' ? '₹2.98 Cr' : '₹35.40 Cr');
  const totalRevenueSub = timeframe === 'monthly' ? 'August 2026 Run-Rate' : 'Projected Annual ARR';

  return (
    <div className="space-y-8 pb-12">
      {/* KPI & Valuation Header */}
      <InsightsSummaryMetrics
        timeframe={timeframe}
        totalRevenueDisplay={totalRevenueDisplay}
        totalRevenueSub={totalRevenueSub}
      />

      {/* Revenue Stream Donut Chart */}
      <EarningsDonutChart
        data={earningsData}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        totalRevenueDisplay={totalRevenueDisplay}
      />

      {/* Side-by-Side Collabs: Accepted vs Rejected AI Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AcceptedCollabsSection />
        <RejectedCollabsSection />
      </div>

      {/* VIP Festival & Gala Attendance History */}
      <EventAttendanceHistory />
    </div>
  );
};
