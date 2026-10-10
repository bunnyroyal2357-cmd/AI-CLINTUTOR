import React, { useState } from 'react';
import {
  Stethoscope,
  Brain,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  FileCheck2,
  Activity,
  AlertCircle,
  ChevronDown,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab, selectCase, cases } = useClinical();

  // Interactive sample preview hint state
  const [activeHintLevel, setActiveHintLevel] = useState<number | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleStartLearning = () => {
    setActiveTab('cases');
  };

  const handleExploreDemo = () => {
    if (cases.length > 0) {
      selectCase(cases[0].id);
    } else {
      setActiveTab('cases');
    }
  };

  const faqs = [
    {
      q: 'Is AI-CLINTUTOR intended to diagnose real patients?',
      a: 'No. AI-CLINTUTOR is strictly an educational learning platform designed for medical, nursing, and allied-health students to practice clinical deduction and critical thinking. It must never be used to diagnose, triage, or recommend treatment for real clinical patients.'
    },
    {
      q: 'How does the 3-Tier Progressive Hint system work?',
      a: 'Instead of simply giving away answers, the tutor scaffolds your thinking progressively: Level 1 directs your attention to relevant observations or cues without revealing the solution; Level 2 introduces the underlying physiological concept or guideline; Level 3 provides an authorized educational explanation derived directly from approved textbooks.'
    },
    {
      q: 'How is student reasoning scored without relying on simple keywords?',
      a: 'The tutor evaluates your natural-language explanation across 5 structured rubric dimensions: Evidence Identification, Conceptual Understanding, Logical Reasoning, Recognition of Uncertainty, and Alignment with Learning Objectives. It highlights what you did well, catches unsupported assumptions or cognitive biases, and identifies missing concepts.'
    },
    {
      q: 'How does the adaptive recommendation system decide what case is next?',
      a: 'The system assesses your history of attempts, topic mastery scores, misconception patterns, and hint usage. If understanding is developing, it recommends foundational or similar cases; if mastery is consistently strong, it presents more complex multi-system scenarios with detailed rationales.'
    },
    {
      q: 'Can I use AI-CLINTUTOR without entering personal API keys or credentials?',
      a: 'Yes! AI-CLINTUTOR includes an interactive demo mode with pre-seeded student profiles, full fictional cases, and an offline deterministic clinical-reasoning engine. If a server-side Gemini API key is configured, advanced interactive natural-language feedback is enabled automatically.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-sky-50/60 via-white to-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Value Prop, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Next-Gen Healthcare Education Simulation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Practice Clinical Reasoning.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700">
                  Build Confidence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Healthcare students often struggle to apply textbook knowledge to complex clinical encounters.
                <strong> AI-CLINTUTOR</strong> trains your diagnostic and management deduction through fictional
                case-based exercises, 3-tier progressive hints, rubric-based feedback, and approved-source explanations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleStartLearning}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 flex items-center justify-center gap-2.5 transition-all hover:translate-y-[-1px] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExploreDemo}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>Explore Sample Case Demo</span>
                </button>
              </div>

              {/* Educational Disclaimer Pill */}
              <div className="pt-2">
                <p className="text-[12px] text-slate-500 flex items-center justify-center lg:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Educational platform for health professions trainees • Strict fictional cases only</span>
                </p>
              </div>
            </div>

            {/* Right Column: Live Interactive Sample Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden transition-all hover:shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        Interactive Case Preview
                      </div>
                      <div className="text-sm font-semibold truncate">Post-Op Tachycardia & Hemodynamics</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Intermediate
                  </span>
                </div>

                {/* Vitals Ribbon */}
                <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 text-center py-2 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold">BP</div>
                    <div className="font-extrabold text-slate-800">106/74</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold">HR</div>
                    <div className="font-extrabold text-rose-600">118 bpm</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold">RR</div>
                    <div className="font-extrabold text-amber-600">22 /min</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold">Urine</div>
                    <div className="font-extrabold text-rose-600">18 mL/h</div>
                  </div>
                </div>

                {/* Clinical Prompt & Progressive Hint Demo */}
                <div className="p-5 space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Reasoning Challenge:
                    </span>
                    <p className="text-slate-600 leading-relaxed bg-sky-50/70 p-3 rounded-lg border border-sky-100">
                      "Why is the heart rate climbing to 118 bpm while systolic BP is still &gt; 100 mmHg? Explain the
                      underlying autonomic compensatory reflex."
                    </p>
                  </div>

                  {/* 3-Tier Progressive Hints Tester */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span className="flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        Test the 3-Tier Progressive Hint Scaffolding:
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setActiveHintLevel(activeHintLevel === 1 ? null : 1)}
                        className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
                          activeHintLevel === 1
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        Hint 1: Attention
                      </button>
                      <button
                        onClick={() => setActiveHintLevel(activeHintLevel === 2 ? null : 2)}
                        className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
                          activeHintLevel === 2
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        Hint 2: Concept
                      </button>
                      <button
                        onClick={() => setActiveHintLevel(activeHintLevel === 3 ? null : 3)}
                        className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
                          activeHintLevel === 3
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        Hint 3: Source
                      </button>
                    </div>

                    {/* Hint reveal panel */}
                    {activeHintLevel === 1 && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 animate-in fade-in">
                        <span className="font-bold block text-[11px] mb-0.5">Hint 1 (Direct Attention):</span>
                        Inspect the pulse pressure (106 - 74 = 32 mmHg) and urine output (18 mL/hr) rather than just the
                        isolated systolic reading.
                      </div>
                    )}
                    {activeHintLevel === 2 && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 animate-in fade-in">
                        <span className="font-bold block text-[11px] mb-0.5">Hint 2 (Physiological Concept):</span>
                        Recall CO = HR × SV. Arterial baroreceptors detect reduced venous return and trigger sympathetic
                        vasoconstriction to defend blood pressure.
                      </div>
                    )}
                    {activeHintLevel === 3 && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 animate-in fade-in">
                        <span className="font-bold block text-[11px] mb-0.5">Hint 3 (Approved Source):</span>
                        <em>Foundations of Clinical Physiology (Ch. 14):</em> Tachycardia with narrowed pulse pressure is
                        an active defense. Normotension does NOT exclude Class II hypovolemic shock.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleExploreDemo}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                  >
                    <span>Launch Full Interactive Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-sky-600 mb-2">
            Engineered for High-Reliability Healthcare Learning
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Traditional Multiple-Choice Fails Clinical Students
          </p>
          <p className="text-slate-600 text-sm mt-3">
            Real patient care is never multiple-choice. AI-CLINTUTOR challenges students to formulate, articulate, and defend
            their clinical hypotheses before seeing the diagnosis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              3-Tier Progressive Hints
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Never reveals answers upfront. Directs attention to clinical cues first, reminds of core physiological
              concepts second, and references approved source literature third.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Rubric-Grounded Scoring
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Evaluates reasoning across Evidence Identification, Conceptual Understanding, Logical Deduction,
              Recognition of Uncertainty, and Learning Objectives.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Approved-Source Citations
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Grounds explanations strictly in curated medical textbooks and guidelines. No invented citations or
              hallucinated trial figures.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Adaptive Practice Loop
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Detects recurring misconceptions, tracks topic mastery, and recommends easier scaffolding or advanced
              multisystem challenges based on real attempt patterns.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-sky-600 mb-2">
              Structured Educational Methodology
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Clinical Reasoning Is Trained
            </p>
            <p className="text-slate-600 text-sm mt-2">
              A 4-step pedagogical workflow designed to eliminate premature closure and reinforce deliberate practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                Fictional Scenario Immersion
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Review patient narratives, baseline observations, vital sign trajectories, and diagnostic reports in a
                realistic clinical setting.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                Articulate Your Reasoning
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Explain <em>why</em> observations are occurring, identify potential traps, and propose hypotheses in your
                own words with optional hints.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                Rubric & Source Feedback
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Receive instant granular feedback on what you did well, unsupported assumptions, missing concepts, and
                approved literature citations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                Adaptive Recommendation
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                The platform updates your topic mastery profile and recommends your next scenario with an explicit
                pedagogical rationale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Learning Workflow / Fictional Cases Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-sky-600 mb-1">
              High-Yield Fictional Cases
            </h2>
            <p className="text-2xl font-extrabold text-slate-900">
              Curated Across 7 Healthcare Disciplines
            </p>
          </div>
          <button
            onClick={() => setActiveTab('cases')}
            className="self-start sm:self-auto text-sky-600 font-bold text-xs flex items-center gap-1.5 hover:text-sky-700 cursor-pointer"
          >
            <span>Explore all {cases.length} fictional cases</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.slice(0, 3).map((c) => (
            <div
              key={c.id}
              onClick={() => selectCase(c.id)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                    {c.subject}
                  </span>
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
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {c.fictionalScenario.narrative}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">~{c.estimatedTimeMinutes} min session</span>
                <span className="text-sky-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Launch Case <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Non-Accreditation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-teal-50 border border-amber-200/90 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0 shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Educational Safety Commitment
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                <strong>AI-CLINTUTOR is an educational learning tool. Its simulated cases and feedback are not a
                substitute for qualified clinical supervision and must not be used to diagnose or treat real patients.</strong>
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                All patient profiles, vital sign readings, and clinical progressions presented within this software are
                fictitious pedagogical simulations. Neither the rubric scores nor tutor feedback constitute a formal
                credential, legal license, or verification of clinical competence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-sky-600 mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-2xl font-extrabold text-slate-900">
            About AI-CLINTUTOR
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-slate-900 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
