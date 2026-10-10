import React, { useState } from 'react';
import {
  Stethoscope,
  BookOpen,
  BrainCircuit,
  BarChart3,
  Library,
  GraduationCap,
  Sparkles,
  ChevronDown,
  User,
  Menu,
  X,
  RotateCcw
} from 'lucide-react';
import { useClinical, SAMPLE_PROFILES } from '../../context/ClinicalContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeCaseId,
    cases,
    health,
    profile,
    switchProfile,
    resetDemoData
  } = useClinical();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCase = cases.find(c => c.id === activeCaseId);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Stethoscope },
    { id: 'cases', label: 'Case Library', icon: BookOpen, badge: cases.length },
    {
      id: 'tutor',
      label: 'Interactive Tutor',
      icon: BrainCircuit,
      activeIndicator: !!activeCase
    },
    { id: 'dashboard', label: 'Dashboard & Progress', icon: BarChart3 },
    { id: 'materials', label: 'Approved Sources', icon: Library },
    { id: 'educator', label: 'Educator Hub', icon: GraduationCap }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                  AI-CLIN<span className="text-sky-600">TUTOR</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wider">
                  Edu
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Adaptive Clinical-Skills Tutor
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-700">
                      {item.badge}
                    </span>
                  )}
                  {item.activeIndicator && (
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" title="Active Case Session" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header: AI Status & Student Profile */}
          <div className="flex items-center gap-2.5">
            {/* AI Engine Status Pill */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                health.mode === 'gemini-live'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-sky-50 text-sky-800 border-sky-200'
              }`}
              title={
                health.mode === 'gemini-live'
                  ? 'Connected to server-side Gemini 3.8 Flash'
                  : 'Running in offline deterministic clinical-reasoning demo mode'
              }
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{health.mode === 'gemini-live' ? 'Gemini 3.8' : 'Edu Demo'}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health.mode === 'gemini-live' ? 'bg-emerald-500 animate-ping' : 'bg-sky-500'
                }`}
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-white text-xs text-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[11px]">
                  {profile.name[0]}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-semibold text-slate-800 leading-tight">{profile.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{profile.role.split(' ')[0]}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{profile.name}</p>
                    <p className="text-[11px] text-slate-500">{profile.role}</p>
                    <p className="text-[10px] text-teal-600 font-medium">{profile.institution}</p>
                  </div>

                  <div className="py-1">
                    <p className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Switch Demo Student:
                    </p>
                    {SAMPLE_PROFILES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          switchProfile(p.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          profile.id === p.id
                            ? 'bg-sky-50 text-sky-800 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div>{p.name}</div>
                          <div className="text-[10px] text-slate-400">{p.role}</div>
                        </div>
                        {profile.id === p.id && <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        resetDemoData();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Demo Progress</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.activeIndicator && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
