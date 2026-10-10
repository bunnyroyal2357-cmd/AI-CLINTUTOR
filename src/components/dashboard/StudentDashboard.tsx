import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Clock,
  CheckCircle2,
  Calendar,
  Flame,
  Target,
  GraduationCap
} from 'lucide-react';
import { useClinical, SAMPLE_PROFILES } from '../../context/ClinicalContext';
import { SubjectCategory } from '../../types/clinical';

export const StudentDashboard: React.FC = () => {
  const {
    profile,
    cases,
    selectCase,
    setActiveTab,
    recommendation,
    switchProfile,
    resetDemoData
  } = useClinical();

  // Compute metrics
  const totalAttempts = profile.attempts.length;
  const averageScore = totalAttempts > 0
    ? Math.round(profile.attempts.reduce((acc, a) => acc + (a.finalScore || 0), 0) / totalAttempts)
    : 0;

  // Find lowest mastery topic for revision recommendation
  const masteryEntries = Object.entries(profile.topicMastery) as [SubjectCategory, number][];
  const sortedByMastery = [...masteryEntries].sort((a, b) => a[1] - b[1]);
  const revisionTopic = sortedByMastery[0];

  // Find candidate case for revision topic
  const revisionCase = cases.find((c) => c.subject === revisionTopic?.[0]) || cases[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Student Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-full">
              Student Learning Analytics
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
              {profile.demoMode ? 'Local Demo Mode' : 'Live Verified'}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            {profile.role} • {profile.institution}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (recommendation) {
                selectCase(recommendation.caseId);
              } else if (cases.length > 0) {
                selectCase(cases[0].id);
              }
            }}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Cases Attempted</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalAttempts}</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Across {masteryEntries.length} clinical domains
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Average Rubric Score</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{averageScore}%</div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Based on 5-category evaluation rubric
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Active Practice Streak</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">3 Days</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Consistent diagnostic deliberation
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold uppercase tracking-wider">Scaffolding Reliance</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-teal-600">0.8</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Avg. hints requested per challenge
          </div>
        </div>
      </div>

      {/* Main Grid: Topic Mastery & Adaptive Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Topic Mastery Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Topic Mastery Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Calculated from evidence extraction, hypothesis accuracy, and bias avoidance.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Proficiency
            </span>
          </div>

          <div className="space-y-4">
            {masteryEntries.map(([subject, score]) => {
              const isLow = score < 65;
              const isHigh = score >= 80;
              return (
                <div key={subject} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{subject}</span>
                    <span
                      className={`font-extrabold ${
                        isHigh ? 'text-emerald-600' : isLow ? 'text-amber-600' : 'text-sky-600'
                      }`}
                    >
                      {score}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-emerald-500' : isLow ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revision Callout Card */}
          {revisionTopic && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Topic Requiring Revision: {revisionTopic[0]}</span>
                </div>
                <p className="text-amber-800 text-[11px]">
                  Current estimated mastery is at {revisionTopic[1]}%. Reinforced practice recommended.
                </p>
              </div>

              {revisionCase && (
                <button
                  onClick={() => selectCase(revisionCase.id)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-2xs"
                >
                  Review Case
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Adaptive Next Case Recommendation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommendation Card */}
          {recommendation ? (
            <div className="bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-sky-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Personalized Adaptive Next Case</span>
              </div>

              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase tracking-wider">
                  {recommendation.subject} • {recommendation.difficulty}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1 leading-snug">
                  {recommendation.caseTitle}
                </h3>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-sky-100 text-xs space-y-2">
                <span className="font-bold text-slate-700 block">Pedagogical Rationale:</span>
                <p className="text-slate-600 leading-relaxed italic">
                  "{recommendation.rationale}"
                </p>
                <div className="pt-1 text-[11px] text-teal-700 font-medium">
                  <strong>Target Objective: </strong>{recommendation.targetObjective}
                </div>
              </div>

              <button
                onClick={() => selectCase(recommendation.caseId)}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all hover:translate-y-[-1px]"
              >
                <span>Launch Recommended Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-sky-600 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Evaluating Learning Patterns...</h3>
              <p className="text-xs text-slate-500">
                Complete more case exercises to generate fine-grained adaptive progression tracks.
              </p>
            </div>
          )}

          {/* Profile Switcher Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Simulated Learner Profile:</span>
              </span>
              <button
                onClick={resetDemoData}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Data
              </button>
            </div>

            <div className="space-y-1.5">
              {SAMPLE_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => switchProfile(p.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer border transition-colors ${
                    profile.id === p.id
                      ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div>
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{p.role}</div>
                  </div>
                  {profile.id === p.id && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attempts History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Recent Case Attempts
            </h2>
            <p className="text-xs text-slate-500">
              Detailed breakdown of past simulated encounters and rubric scores.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {profile.attempts.length} Total Logged
          </span>
        </div>

        {profile.attempts.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No attempts completed yet. Start your first scenario in the Case Library!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Case Title</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Rubric Score</th>
                  <th className="py-2.5 px-3">Hints Used</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profile.attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 max-w-xs truncate">
                      {att.caseTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{att.subject}</td>
                    <td className="py-3 px-3 text-slate-400">
                      {new Date(att.startedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          att.finalScore >= 80
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-sky-50 text-sky-700'
                        }`}
                      >
                        {att.finalScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{att.hintsUsedCount} hints</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => selectCase(att.caseId)}
                        className="text-sky-600 hover:text-sky-800 font-bold cursor-pointer"
                      >
                        Retake / Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
