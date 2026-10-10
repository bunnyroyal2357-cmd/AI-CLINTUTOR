import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

export const SafetyDisclaimerBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-medium">Educational Simulation Platform: Non-Clinical Advisory Mode Active</span>
        </div>
        <button
          onClick={() => setCollapsed(false)}
          className="text-amber-700 underline hover:text-amber-900 cursor-pointer text-xs"
        >
          View Full Safety Disclaimer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-blue-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-slate-800">
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1 bg-amber-200/70 rounded text-amber-900 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 uppercase tracking-wide mr-1.5 text-[11px] bg-amber-200/80 px-1.5 py-0.5 rounded">
              Educational Safety Notice
            </span>
            <span className="text-slate-700 leading-relaxed">
              <strong>AI-CLINTUTOR</strong> is an educational learning tool. Its simulated cases and feedback are not a
              substitute for qualified clinical supervision and must not be used to diagnose or treat real patients. All
              cases are fictional scenarios designed exclusively for reasoning practice.
            </span>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-amber-200/40 shrink-0 cursor-pointer transition-colors"
          title="Minimize disclaimer"
          aria-label="Minimize disclaimer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
