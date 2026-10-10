import React from 'react';
import { Stethoscope, Shield, BookOpen, Brain, Sparkles, HeartHandshake } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useClinical();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                AI-CLIN<span className="text-sky-400">TUTOR</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              <strong>Practice Clinical Reasoning. Build Confidence.</strong>
              <br />
              An adaptive clinical-skills tutoring environment empowering medical, nursing, and allied-health students
              to bridge theoretical knowledge and bedside deduction using fictional case scenarios, progressive hints, and
              rubric-grounded feedback.
            </p>
            <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl max-w-lg">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Strict Educational & Safety Boundary</span>
              </div>
              <p className="text-[12px] text-slate-400 leading-normal">
                AI-CLINTUTOR is an educational learning tool. Its simulated cases and feedback are not a substitute for
                qualified clinical supervision and must not be used to diagnose or treat real patients. It does not confer
                medical accreditation or certify clinical competence.
              </p>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">
              Clinical Learning Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Anatomy & Physiology / Hemodynamics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interpretation of Basic Observations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Clinical History-Taking & Bias Avoidance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interprofessional SBAR Handover
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Patient Safety & Medication Factors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Healthcare Ethics & Capacity Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Resources */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">
              Platform & Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('tutor')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive AI Reasoning Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Analytics & Mastery Radar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('materials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Approved Reference Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('educator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Educator Case Customizer
                </button>
              </li>
              <li className="pt-2 text-slate-500 text-[11px]">
                Powered by Google AI Studio & Gemini 3.8 Flash
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} AI-CLINTUTOR — Dedicated to high-reliability healthcare education.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Source-Grounded Reasoning
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-sky-400" />
              Educational Non-Accreditation Tool
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
