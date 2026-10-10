import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListOrdered,
  Tag,
  RotateCcw
} from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { SubjectCategory, DifficultyLevel } from '../../types/clinical';

export const CaseLibrary: React.FC = () => {
  const { cases, profile, selectCase, setActiveTab } = useClinical();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const subjects: string[] = [
    'All',
    'Anatomy & Physiology',
    'Clinical History-Taking',
    'Basic Observations Interpretation',
    'Clinical Communication',
    'Patient Safety',
    'Evidence Evaluation',
    'Healthcare Ethics'
  ];

  const difficulties: string[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses: string[] = ['All', 'Completed', 'In Progress', 'Unattempted'];

  // Calculate status for each case based on profile.attempts
  const caseStatusMap = useMemo(() => {
    const map = new Map<string, 'completed' | 'in_progress' | 'unattempted'>();
    profile.attempts.forEach((att) => {
      if (att.status === 'completed') {
        map.set(att.caseId, 'completed');
      } else if (att.status === 'in_progress' && map.get(att.caseId) !== 'completed') {
        map.set(att.caseId, 'in_progress');
      }
    });
    return map;
  }, [profile.attempts]);

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Search
      const matchesSearch =
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.fictionalScenario.narrative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.learningObjectives.some((lo) => lo.toLowerCase().includes(searchQuery.toLowerCase()));

      // Subject
      const matchesSubject = selectedSubject === 'All' || c.subject === selectedSubject;

      // Difficulty
      const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;

      // Status
      const status = caseStatusMap.get(c.id) || 'unattempted';
      let matchesStatus = true;
      if (selectedStatus === 'Completed') matchesStatus = status === 'completed';
      if (selectedStatus === 'In Progress') matchesStatus = status === 'in_progress';
      if (selectedStatus === 'Unattempted') matchesStatus = status === 'unattempted';

      return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
    });
  }, [cases, searchQuery, selectedSubject, selectedDifficulty, selectedStatus, caseStatusMap]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Fictional Clinical Scenarios</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinical Case Library
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Choose an educational scenario to practice hypothesis generation, vital signs interpretation, and clinical communication.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('educator')}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Create Custom Educator Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by symptoms, pathophysiological concepts, or learning objectives..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Subject Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Clinical Discipline:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden focus:border-sky-500 cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Difficulty Tier:
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden focus:border-sky-500 cursor-pointer"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Completion Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Completion Status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden focus:border-sky-500 cursor-pointer"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter reset helper if filtered */}
        {(searchQuery || selectedSubject !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All') && (
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500">
              Showing {filteredCases.length} of {cases.length} fictional cases
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
              }}
              className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Cases Grid */}
      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No cases match your filters</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keywords, discipline filter, or completion status.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('All');
              setSelectedDifficulty('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => {
            const status = caseStatusMap.get(c.id) || 'unattempted';
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200">
                      {c.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700'
                            : c.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {c.difficulty}
                      </span>
                      {status === 'completed' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      )}
                      {status === 'in_progress' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                          <Clock3 className="w-3 h-3" />
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-600 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      {c.subtitle}
                    </p>
                  </div>

                  {/* Patient Summary Pill */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs border border-slate-100 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center justify-between">
                      <span>
                        {c.fictionalScenario.patientSummary.gender}, {c.fictionalScenario.patientSummary.age} yrs
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {c.fictionalScenario.patientSummary.setting}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] italic">
                      "{c.fictionalScenario.patientSummary.chiefComplaint}"
                    </div>
                  </div>

                  {/* Learning Objectives Preview */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Key Objectives:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {c.learningObjectives.slice(0, 2).map((lo, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                          <span>{lo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.estimatedTimeMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <ListOrdered className="w-3.5 h-3.5" />
                      {c.questions.length} {c.questions.length === 1 ? 'Prompt' : 'Prompts'}
                    </span>
                  </div>

                  <button
                    onClick={() => selectCase(c.id)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>{status === 'completed' ? 'Review / Retake' : 'Start Case'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
