import React, { useState, useEffect } from 'react';
import {
  Brain,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
  Activity,
  FileCheck2,
  AlertCircle,
  TrendingUp,
  RotateCcw,
  MessageSquare,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { evaluateStudentAnswer } from '../../services/api';
import {
  ClinicalQuestion,
  EvaluationResult,
  QuestionAttempt
} from '../../types/clinical';

export const InteractiveTutor: React.FC = () => {
  const {
    cases,
    activeCaseId,
    selectCase,
    setActiveTab,
    recordQuestionAttempt,
    recommendation,
    refreshRecommendation
  } = useClinical();

  // If no case selected, pick first or prompt selection
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [followUpSubmitted, setFollowUpSubmitted] = useState(false);
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset question state when active case changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setStudentAnswer('');
    setEvaluation(null);
    setRevealedHints([]);
    setFollowUpAnswer('');
    setFollowUpSubmitted(false);
    setCaseCompleted(false);
    setErrorMessage(null);
  }, [activeCaseId]);

  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <Activity className="w-12 h-12 text-sky-600 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">No Case Selected</h2>
        <p className="text-sm text-slate-500">Please choose a fictional case from the library to begin.</p>
        <button
          onClick={() => setActiveTab('cases')}
          className="px-6 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-bold cursor-pointer"
        >
          View Case Library
        </button>
      </div>
    );
  }

  const currentQuestion: ClinicalQuestion =
    currentCase.questions[currentQuestionIndex] || currentCase.questions[0];

  // Helper to append thought scaffolding chip
  const insertThoughtChip = (text: string) => {
    if (!studentAnswer.includes(text)) {
      setStudentAnswer((prev) => (prev ? `${prev} ${text}` : text));
    }
  };

  // Reveal next progressive hint
  const handleRevealHint = (level: number) => {
    if (!revealedHints.includes(level)) {
      setRevealedHints((prev) => [...prev, level].sort());
    }
  };

  // Submit Answer for AI evaluation
  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim()) {
      setErrorMessage('Please articulate your clinical reasoning before submitting.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await evaluateStudentAnswer({
        caseId: currentCase.id,
        questionId: currentQuestion.id,
        studentAnswer: studentAnswer.trim(),
        hintsUsedCount: revealedHints.length
      });

      setEvaluation(result);

      // Record in context
      const isLastQuestion = currentQuestionIndex === currentCase.questions.length - 1;
      const questionAttempt: QuestionAttempt = {
        questionId: currentQuestion.id,
        questionNumber: currentQuestion.questionNumber,
        questionText: currentQuestion.questionText,
        studentAnswer: studentAnswer.trim(),
        hintsRevealed: revealedHints,
        evaluation: result,
        answeredAt: new Date().toISOString()
      };

      recordQuestionAttempt({
        caseId: currentCase.id,
        questionAttempt,
        isCaseComplete: isLastQuestion
      });
    } catch (err: any) {
      console.error('Submission failed', err);
      setErrorMessage('Failed to evaluate answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentCase.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setStudentAnswer('');
      setEvaluation(null);
      setRevealedHints([]);
      setFollowUpAnswer('');
      setFollowUpSubmitted(false);
      setErrorMessage(null);
    } else {
      setCaseCompleted(true);
      refreshRecommendation();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Case Headline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button
              onClick={() => setActiveTab('cases')}
              className="hover:text-sky-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-700">{currentCase.subject}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentCase.title}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{currentCase.subtitle}</p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              currentCase.difficulty === 'Beginner'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : currentCase.difficulty === 'Intermediate'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {currentCase.difficulty} Level
          </span>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
            Prompt {currentQuestionIndex + 1} of {currentCase.questions.length}
          </span>
        </div>
      </div>

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Case Narrative & Vitals Monitor */}
        <div className="lg:col-span-5 space-y-6">
          {/* Patient Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
                    Simulated Patient Record
                  </span>
                  <div className="text-sm font-semibold">
                    {currentCase.fictionalScenario.patientSummary.gender},{' '}
                    {currentCase.fictionalScenario.patientSummary.age} yrs
                  </div>
                </div>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                {currentCase.fictionalScenario.patientSummary.setting}
              </span>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Chief Presentation:</span>
                <p className="text-slate-800 font-medium bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 italic">
                  "{currentCase.fictionalScenario.patientSummary.chiefComplaint}"
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Clinical Narrative:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {currentCase.fictionalScenario.narrative}
                </p>
              </div>

              {/* Interactive Vitals Monitor Card */}
              {currentCase.fictionalScenario.vitalSigns && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Activity className="w-3.5 h-3.5 text-rose-500" />
                      Recorded Bedside Observations:
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Benchmarked
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Blood Pressure</div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {currentCase.fictionalScenario.vitalSigns.bp}
                      </div>
                      <div className="text-[10px] text-slate-500">Normal: 110–130/70–80</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Heart Rate</div>
                      <div className="font-extrabold text-rose-600 text-sm">
                        {currentCase.fictionalScenario.vitalSigns.hr}
                      </div>
                      <div className="text-[10px] text-slate-500">Normal: 60–100 bpm</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Respiratory Rate</div>
                      <div className="font-extrabold text-amber-600 text-sm">
                        {currentCase.fictionalScenario.vitalSigns.rr}
                      </div>
                      <div className="text-[10px] text-slate-500">Normal: 12–20 /min</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Oxygen Saturation</div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {currentCase.fictionalScenario.vitalSigns.spo2}
                      </div>
                      <div className="text-[10px] text-slate-500">Target: 94–98%</div>
                    </div>

                    {currentCase.fictionalScenario.vitalSigns.temp && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Temperature</div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          {currentCase.fictionalScenario.vitalSigns.temp}
                        </div>
                        <div className="text-[10px] text-slate-500">Normal: 36.5–37.5°C</div>
                      </div>
                    )}

                    {currentCase.fictionalScenario.vitalSigns.painScore && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Pain Score</div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          {currentCase.fictionalScenario.vitalSigns.painScore}
                        </div>
                        <div className="text-[10px] text-slate-500">Visual Analog Scale</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Relevant History & Diagnostic Findings */}
              {currentCase.fictionalScenario.relevantLabOrHistory && (
                <div className="pt-2">
                  <span className="font-bold text-slate-700 block mb-1.5">
                    Pertinent History & Findings:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {currentCase.fictionalScenario.relevantLabOrHistory.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Learning Objectives */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Targeted Learning Objectives:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {currentCase.learningObjectives.map((lo, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{lo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Reasoning Workspace, Hints, & Feedback */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Prompt Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                Reasoning Challenge {currentQuestion.questionNumber} of {currentCase.questions.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Explain rationale, avoid guessing</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.questionText}
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed bg-sky-50/50 p-3 rounded-xl border border-sky-100">
              <span className="font-semibold text-slate-800">Guidance: </span>
              {currentQuestion.clinicalPrompt}
            </p>

            {/* Quick Thought Scaffolding Chips */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Suggested Reasoning Anchors (click to insert):
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => insertThoughtChip('Underlying compensatory mechanism:')}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-medium"
                >
                  + Compensatory mechanism
                </button>
                <button
                  type="button"
                  onClick={() => insertThoughtChip('Relevant physiological equation:')}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-medium"
                >
                  + Physiological equation
                </button>
                <button
                  type="button"
                  onClick={() => insertThoughtChip('Critical observation trend:')}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-medium"
                >
                  + Observation trend
                </button>
                <button
                  type="button"
                  onClick={() => insertThoughtChip('Potential cognitive trap / assumption:')}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-medium"
                >
                  + Cognitive bias risk
                </button>
              </div>
            </div>

            {/* Student Answer Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <label htmlFor="student-answer" className="font-bold text-slate-700">
                  Your Clinical Reasoning:
                </label>
                <span>
                  {studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                id="student-answer"
                rows={5}
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                placeholder="Type your explanation here. Detail the underlying mechanisms, why observations are changing, and what assumptions to avoid..."
                className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors leading-relaxed"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Progressive 3-Tier Hints Section */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>3-Tier Progressive Hints:</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {revealedHints.length} of 3 hints revealed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentQuestion.hints.map((h) => {
                  const isRevealed = revealedHints.includes(h.level);
                  return (
                    <button
                      key={h.level}
                      type="button"
                      onClick={() => handleRevealHint(h.level)}
                      className={`p-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                        isRevealed
                          ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-bold">
                          Level {h.level}: {h.type === 'attention' ? 'Attention' : h.type === 'concept' ? 'Concept' : 'Source'}
                        </span>
                        {isRevealed && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {isRevealed ? h.title : 'Click to reveal'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Expanded revealed hints */}
              {revealedHints.length > 0 && (
                <div className="space-y-2 pt-1">
                  {revealedHints.map((lvl) => {
                    const hintObj = currentQuestion.hints.find((h) => h.level === lvl);
                    if (!hintObj) return null;
                    return (
                      <div
                        key={lvl}
                        className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-900 animate-in fade-in"
                      >
                        <div className="font-bold flex items-center justify-between mb-1">
                          <span>
                            Hint Level {hintObj.level} — {hintObj.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-200/60 font-semibold">
                            {hintObj.type}
                          </span>
                        </div>
                        <p className="leading-relaxed">{hintObj.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setStudentAnswer('');
                  setEvaluation(null);
                  setRevealedHints([]);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>

              <button
                type="button"
                disabled={isSubmitting || !studentAnswer.trim()}
                onClick={handleSubmitAnswer}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all hover:translate-y-[-1px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Clinical Deduction...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Reasoning for Review</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback & Rubric Evaluation Panel (Appears after evaluation) */}
          {evaluation && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              {/* Header with Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                    {evaluation.overallScore}%
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Rubric-Grounded Clinical Evaluation
                    </h3>
                    <p className="text-xs text-slate-500">
                      {evaluation.aiGrounded ? 'Grounded by Gemini 3.8 Flash' : 'Evaluated via Clinical Rubric Engine'}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Performance Level
                  </span>
                  <span
                    className={`text-sm font-extrabold ${
                      evaluation.overallScore >= 80
                        ? 'text-emerald-600'
                        : evaluation.overallScore >= 60
                        ? 'text-sky-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {evaluation.overallScore >= 80
                      ? 'Exemplary Mastery'
                      : evaluation.overallScore >= 60
                      ? 'Proficient Reasoning'
                      : 'Developing Competence'}
                  </span>
                </div>
              </div>

              {/* Overall Summary Feedback */}
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-sky-900 block mb-1">Tutor Synthesis:</span>
                {evaluation.overallFeedback}
              </div>

              {/* Detailed 5-Category Rubric Grid */}
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3">
                  5-Dimensional Rubric Assessment
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(evaluation.rubricScores).map(([key, item]) => {
                    const titles: Record<string, string> = {
                      evidenceIdentification: 'Evidence Identification',
                      conceptualUnderstanding: 'Conceptual Understanding',
                      logicalReasoning: 'Logical Reasoning & Deduction',
                      recognitionOfUncertainty: 'Recognition of Uncertainty',
                      alignmentWithObjectives: 'Learning Objectives Alignment'
                    };
                    return (
                      <div
                        key={key}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{titles[key] || key}</span>
                          <span className="font-extrabold text-sky-700 bg-sky-100 px-2 py-0.5 rounded text-[11px]">
                            {item.score} / {item.maxScore}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.score === 4
                                ? 'bg-emerald-500'
                                : item.score === 3
                                ? 'bg-sky-500'
                                : item.score === 2
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-600 leading-normal">{item.feedback}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths and Improvements Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* What Student Did Well */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What You Did Well:</span>
                  </div>
                  <ul className="space-y-1.5 text-emerald-800">
                    {evaluation.whatStudentDidWell.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unsupported Assumptions or Traps */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Unsupported Assumptions & Biases:</span>
                  </div>
                  <ul className="space-y-1.5 text-amber-800">
                    {evaluation.unsupportedAssumptions.map((u, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Concepts & Reasoning Recommendations */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">
                  Recommended Reasoning Enhancements:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {evaluation.suggestedReasoningImprovements.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approved Source Grounded Excerpts */}
              {evaluation.sourceCitations && evaluation.sourceCitations.length > 0 && (
                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-sky-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-600" />
                      Approved Learning Source References:
                    </span>
                    <span className="text-[10px] text-sky-700 bg-sky-100 px-2 py-0.5 rounded uppercase font-semibold">
                      Authoritative
                    </span>
                  </div>

                  <div className="space-y-2">
                    {evaluation.sourceCitations.map((cit, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-sky-100 space-y-1">
                        <div className="font-semibold text-slate-900 text-[11px]">
                          {cit.title} — {cit.section}
                        </div>
                        <p className="text-slate-600 italic text-[11px] leading-relaxed">
                          "{cit.excerpt}"
                        </p>
                        <div className="text-[10px] text-teal-700 font-medium">
                          Clinical Key: {cit.educationalTakeaway}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Probing Follow-Up Question */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Follow-Up Reasoning Challenge:</span>
                </div>

                <p className="text-indigo-800 font-medium leading-relaxed">
                  {evaluation.followUpQuestion}
                </p>

                {!followUpSubmitted ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={followUpAnswer}
                      onChange={(e) => setFollowUpAnswer(e.target.value)}
                      placeholder="Enter your response to the follow-up prompt..."
                      className="w-full p-2.5 bg-white border border-indigo-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      type="button"
                      onClick={() => setFollowUpSubmitted(true)}
                      disabled={!followUpAnswer.trim()}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs cursor-pointer"
                    >
                      Verify Follow-Up Deduction
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-indigo-200 text-indigo-900 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Follow-Up Response Recorded!</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Great engagement with deeper clinical exploration. Your adaptive profile has incorporated this
                      deductive synthesis.
                    </p>
                  </div>
                )}
              </div>

              {/* Question Progression Action */}
              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all hover:translate-x-0.5"
                >
                  <span>
                    {currentQuestionIndex < currentCase.questions.length - 1
                      ? 'Proceed to Next Question'
                      : 'Complete Case & View Summary'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Case Completion Celebration Modal */}
      {caseCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Fictional Clinical Case Completed!
              </h3>
              <p className="text-xs text-slate-500">
                You methodically worked through <strong>{currentCase.title}</strong>.
              </p>
            </div>

            {/* Performance Recap */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-3 text-center text-xs">
              <div>
                <span className="text-slate-400 font-bold block text-[10px]">Case Subject</span>
                <span className="font-extrabold text-slate-800 truncate block">{currentCase.subject}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px]">Final Rubric Score</span>
                <span className="font-extrabold text-sky-600 block text-sm">
                  {evaluation?.overallScore || 85}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px]">Hints Scaffolded</span>
                <span className="font-extrabold text-slate-800 block">{revealedHints.length} / 3</span>
              </div>
            </div>

            {/* Adaptive Next Recommendation */}
            {recommendation && (
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-sky-900">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Adaptive Recommendation for You:</span>
                </div>
                <div className="font-bold text-slate-800">{recommendation.caseTitle}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {recommendation.rationale}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCaseCompleted(false);
                  setActiveTab('dashboard');
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer text-center"
              >
                Go to Student Dashboard
              </button>

              {recommendation && (
                <button
                  type="button"
                  onClick={() => {
                    setCaseCompleted(false);
                    selectCase(recommendation.caseId);
                  }}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer text-center shadow-md shadow-sky-600/20"
                >
                  Start Recommended Case
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
