import React, { useState, useMemo } from 'react';
import { Calculator, IndianRupee, PieChart, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function FinancialCalculator({ prefilledPrice, onOpenVisit }) {
  const [propertyPrice, setPropertyPrice] = useState(prefilledPrice || 8500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Synchronize if user passed new prefilledPrice from Floor Plans
  React.useEffect(() => {
    if (prefilledPrice) {
      setPropertyPrice(prefilledPrice);
    }
  }, [prefilledPrice]);

  // Financial calculations
  const { downPaymentAmount, loanAmount, monthlyEmi, totalInterest, totalAmount } = useMemo(() => {
    const dp = Math.round(propertyPrice * (downPaymentPercent / 100));
    const principal = propertyPrice - dp;

    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    const emi = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );

    const totalPay = emi * totalMonths;
    const interest = totalPay - principal;

    return {
      downPaymentAmount: dp,
      loanAmount: principal,
      monthlyEmi: emi,
      totalInterest: interest,
      totalAmount: totalPay
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  const principalRatio = Math.round((loanAmount / totalAmount) * 100) || 50;
  const interestRatio = 100 - principalRatio;

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatCrLakhs = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(val / 100000).toFixed(1)} Lakhs`;
  };

  return (
    <section id="financials" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#845D12] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            Smart Investment Advisory
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] tracking-tight mb-4">
            Real-Time <span className="gold-gradient-text">EMI & Mortgage Suite</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg font-normal leading-relaxed">
            Plan your acquisition effortlessly. Customize property price, tenure, and down payments to view transparent monthly obligations and tax advantages.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Sliders Column */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Property Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase text-[#0F172A] font-bold">
                  Estimated Property Value
                </label>
                <span className="text-lg font-bold font-mono text-[#845D12]">
                  {formatCrLakhs(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min="7500000"
                max="25000000"
                step="250000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#F4EFE6] border border-[#D8CEBF] rounded-lg appearance-none cursor-pointer accent-[#845D12]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-1">
                <span>₹ 75 Lakhs</span>
                <span>₹ 1.50 Cr</span>
                <span>₹ 2.50 Cr</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase text-[#0F172A] font-bold">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold font-mono text-[#0F172A]">
                  {formatCrLakhs(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#F4EFE6] border border-[#D8CEBF] rounded-lg appearance-none cursor-pointer accent-[#845D12]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-1">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Loan Tenure & Interest Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/60">
              
              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-[#0F172A] font-bold">
                    Interest Rate
                  </label>
                  <span className="text-sm font-bold font-mono text-[#0F172A]">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="11.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#F4EFE6] border border-[#D8CEBF] rounded-lg appearance-none cursor-pointer accent-[#845D12]"
                />
                <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-1">
                  <span>7.5%</span>
                  <span>8.5% (Avg)</span>
                  <span>11.0%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-[#0F172A] font-bold">
                    Loan Tenure
                  </label>
                  <span className="text-sm font-bold font-mono text-[#0F172A]">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#F4EFE6] border border-[#D8CEBF] rounded-lg appearance-none cursor-pointer accent-[#845D12]"
                />
                <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-1">
                  <span>5 Yrs</span>
                  <span>20 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>

            </div>

            {/* Partner Banks Assurance */}
            <div className="p-4 rounded-xl glass-inner-well flex items-center justify-between text-xs text-[#475569]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                Pre-approved by SBI, HDFC, ICICI, Axis Bank & Bank of Baroda
              </span>
              <span className="text-[11px] font-mono font-bold text-[#845D12]">Zero Processing Fee Assistance</span>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-[#845D12] font-bold tracking-wider block mb-1">
                Estimated Monthly Outflow
              </span>
              
              <div className="text-4xl sm:text-5xl font-display font-black text-[#0F172A] mb-2">
                {formatINR(monthlyEmi)}
                <span className="text-sm text-[#64748B] font-normal"> / month</span>
              </div>

              <span className="text-xs text-[#64748B] block mb-6">
                Based on {interestRate}% for {tenureYears} years. Indicative and subject to bank approval.
              </span>

              {/* Progress Bar (Principal vs Interest) */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-[#845D12]">Principal: {principalRatio}%</span>
                  <span className="text-[#0284C7]">Interest: {interestRatio}%</span>
                </div>
                <div className="w-full h-3 rounded-full glass-inner-well overflow-hidden flex">
                  <div style={{ width: `${principalRatio}%` }} className="bg-[#845D12] h-full"></div>
                  <div style={{ width: `${interestRatio}%` }} className="bg-[#0284C7] h-full"></div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="space-y-3 pt-4 border-t border-white/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Loan Principal Amount:</span>
                  <span className="font-mono font-bold text-[#0F172A]">{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Total Interest Payable:</span>
                  <span className="font-mono font-bold text-[#0284C7]">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Total Payment (Principal + Int):</span>
                  <span className="font-mono font-bold text-[#0F172A]">{formatINR(totalAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/60">
                  <span className="text-[#065F46] font-bold">Income Tax Deductions:</span>
                  <span className="font-mono text-[#065F46] font-bold">Up to ₹ 3.5 Lakhs / yr*</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-white/60">
              <button
                onClick={onOpenVisit}
                className="w-full py-4 px-6 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Customized Payment Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
