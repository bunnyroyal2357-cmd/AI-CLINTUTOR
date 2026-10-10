import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Send,
  Loader2,
  ListPlus
} from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { saveEducatorCase } from '../../services/api';
import { SubjectCategory, DifficultyLevel, ClinicalCase } from '../../types/clinical';

export const EducatorHub: React.FC = () => {
  const { cases, selectCase, setActiveTab } = useClinical();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [subject, setSubject] = useState<SubjectCategory>('Clinical Communication');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [objectives, setObjectives] = useState('');
  const [patientAge, setPatientAge] = useState(55);
  const [patientGender, setPatientGender] = useState('Female');
  const [patientSetting, setPatientSetting] = useState('Medical Ward');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [narrative, setNarrative] = useState('');
  const [bp, setBp] = useState('120/80 mmHg');
  const [hr, setHr] = useState('88 bpm');
  const [rr, setRr] = useState('18 breaths/min');
  const [spo2, setSpo2] = useState('98% on room air');

  // Question 1
  const [questionText, setQuestionText] = useState('');
  const [clinicalPrompt, setClinicalPrompt] = useState('');
  const [expectedPoints, setExpectedPoints] = useState('');
  const [misconceptions, setMisconceptions] = useState('');
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');

  const [saving, setSaving] = useState(false);
  const [successCase, setSuccessCase] = useState<ClinicalCase | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !questionText.trim() || !narrative.trim()) {
      setErrorMsg('Please enter case title, narrative scenario, and the primary reasoning question.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    const parsedObjectives = objectives
      .split('\n')
      .map((o) => o.trim())
      .filter(Boolean);

    const parsedExpected = expectedPoints
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const parsedMisconceptions = misconceptions
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const newCasePayload = {
      title: title.trim(),
      subtitle: subtitle.trim() || 'Fictional educational clinical scenario',
      subject,
      difficulty,
      estimatedTimeMinutes: estimatedTime,
      learningObjectives:
        parsedObjectives.length > 0
          ? parsedObjectives
          : ['Formulate evidence-based clinical reasoning', 'Avoid premature diagnostic closure'],
      fictionalScenario: {
        patientSummary: {
          age: Number(patientAge),
          gender: patientGender,
          setting: patientSetting,
          chiefComplaint: chiefComplaint.trim() || 'Unspecified acute discomfort'
        },
        narrative: narrative.trim(),
        vitalSigns: { bp, hr, rr, spo2 }
      },
      questions: [
        {
          id: `q-custom-${Date.now()}`,
          questionNumber: 1,
          questionText: questionText.trim(),
          clinicalPrompt:
            clinicalPrompt.trim() || 'Explain the pathophysiological mechanism and evaluate key observations.',
          type: 'reasoning',
          expectedReasoningPoints:
            parsedExpected.length > 0
              ? parsedExpected
              : ['Extract relevant clinical observations', 'Link physiology directly to patient symptoms'],
          commonMisconceptions:
            parsedMisconceptions.length > 0
              ? parsedMisconceptions
              : ['Premature diagnostic closure without verifying trend data'],
          rubric: [
            {
              category: 'evidenceIdentification',
              label: 'Evidence Identification',
              description: 'Extracts critical vital signs and symptom trajectory.',
              maxScore: 4,
              criteriaLevels: {
                1: 'Misses primary findings.',
                2: 'Identifies isolated cues.',
                3: 'Extracts most key findings.',
                4: 'Exemplary extraction.'
              }
            },
            {
              category: 'conceptualUnderstanding',
              label: 'Conceptual Understanding',
              description: 'Applies correct core biological concepts.',
              maxScore: 4,
              criteriaLevels: {
                1: 'Fundamental misunderstanding.',
                2: 'Partial application.',
                3: 'Solid conceptual grasp.',
                4: 'Deep, integrated understanding.'
              }
            },
            {
              category: 'logicalReasoning',
              label: 'Logical Reasoning',
              description: 'Methodical deduction without illogical leaps.',
              maxScore: 4,
              criteriaLevels: {
                1: 'Incoherent leaps.',
                2: 'Partial reasoning.',
                3: 'Solid rational deductions.',
                4: 'Exemplary clinical reasoning.'
              }
            },
            {
              category: 'recognitionOfUncertainty',
              label: 'Recognition of Uncertainty',
              description: 'Recognizes diagnostic limits and tests needed.',
              maxScore: 4,
              criteriaLevels: {
                1: 'Extreme dogmatism.',
                2: 'Partial uncertainty acknowledgment.',
                3: 'Identifies key clinical unknowns.',
                4: 'Proactively identifies biases and unknowns.'
              }
            },
            {
              category: 'alignmentWithObjectives',
              label: 'Alignment with Objectives',
              description: 'Adherence to learning objectives.',
              maxScore: 4,
              criteriaLevels: {
                1: 'Off topic.',
                2: 'Addresses part.',
                3: 'Solid adherence.',
                4: 'Comprehensive synthesis.'
              }
            }
          ],
          hints: [
            {
              level: 1,
              type: 'attention',
              title: 'Attention Cue',
              text: hint1.trim() || 'Examine the patient’s vital signs trajectory over the last several hours.'
            },
            {
              level: 2,
              type: 'concept',
              title: 'Concept Scaffolding',
              text: hint2.trim() || 'Recall the relationship between autonomic compensatory reflexes and organ perfusion.'
            },
            {
              level: 3,
              type: 'explanation',
              title: 'Approved Reference Guidance',
              text: hint3.trim() || 'Approved clinical guidelines emphasize ruling out life-threatening shock or hypoxemia early.'
            }
          ],
          approvedSources: []
        }
      ]
    };

    try {
      const res = await saveEducatorCase(newCasePayload);
      if (res.success) {
        setSuccessCase(res.case);
        // Reset form
        setTitle('');
        setNarrative('');
        setQuestionText('');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to save case. Please check form values.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Educator & Faculty Workspace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Authoring Hub
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Author and publish custom fictional clinical cases, define 5-dimensional rubric thresholds, and construct 3-tier progressive hint tracks.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {successCase && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4 text-xs animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Case Successfully Published: </span>
              "{successCase.title}" is now active in the Case Library.
            </div>
          </div>
          <button
            onClick={() => {
              selectCase(successCase.id);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shrink-0 cursor-pointer"
          >
            Test in Tutor Now
          </button>
        </div>
      )}

      {/* Authoring Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-600" />
              <span>Create New Fictional Educational Scenario</span>
            </h2>
            <p className="text-slate-500 mt-0.5">
              Strict educational design: Ensure scenarios are entirely fictitious and do not reference real patients.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Case Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unraveling Subtle Stridor in the Pediatric Ward"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Subtitle / Scenario Focus</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Investigating upper airway resistance and work of breathing"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Subject Discipline *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="Anatomy & Physiology">Anatomy & Physiology</option>
                <option value="Clinical History-Taking">Clinical History-Taking</option>
                <option value="Basic Observations Interpretation">Basic Observations Interpretation</option>
                <option value="Clinical Communication">Clinical Communication</option>
                <option value="Patient Safety">Patient Safety</option>
                <option value="Evidence Evaluation">Evidence Evaluation</option>
                <option value="Healthcare Ethics">Healthcare Ethics</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Difficulty Tier</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="Beginner">Beginner (Foundational Scaffolding)</option>
                <option value="Intermediate">Intermediate (Trend Synthesis)</option>
                <option value="Advanced">Advanced (Multi-System Ambiguity)</option>
              </select>
            </div>
          </div>

          {/* Section 2: Patient Context & Scenario */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Simulated Patient Context
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-600 block mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="font-bold text-slate-600 block mb-1">Clinical Setting</label>
                <input
                  type="text"
                  value={patientSetting}
                  onChange={(e) => setPatientSetting(e.target.value)}
                  placeholder="e.g. Acute Assessment Unit"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Chief Complaint</label>
              <input
                type="text"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="e.g. Shortness of breath when reclining flat in bed"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Clinical Narrative *</label>
              <textarea
                rows={3}
                required
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Describe the clinical presentation, history of present illness, examination findings, and trajectory..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>

            {/* Vital Signs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Heart Rate</label>
                <input
                  type="text"
                  value={hr}
                  onChange={(e) => setHr(e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Resp Rate</label>
                <input
                  type="text"
                  value={rr}
                  onChange={(e) => setRr(e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">SpO2</label>
                <input
                  type="text"
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Question and Reasoning Objectives */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinical Reasoning Challenge Prompt
            </h3>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Question Text *</label>
              <input
                type="text"
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Which physiological reflex explains the persistent tachypnea despite normoxemia?"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Expected Reasoning Points (One per line)</label>
              <textarea
                rows={3}
                value={expectedPoints}
                onChange={(e) => setExpectedPoints(e.target.value)}
                placeholder="Tachypnea indicates increased minute ventilation to compensate for V/Q mismatch&#10;Accessory muscle recruitment indicates impending diaphragmatic fatigue"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Common Misconceptions (One per line)</label>
              <textarea
                rows={2}
                value={misconceptions}
                onChange={(e) => setMisconceptions(e.target.value)}
                placeholder="Assuming normal SpO2 rules out respiratory distress&#10;Attributing tachypnea solely to anxiety"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            {/* 3 Progressive Hints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block text-[11px]">Hint 1 (Direct Attention)</label>
                <input
                  type="text"
                  value={hint1}
                  onChange={(e) => setHint1(e.target.value)}
                  placeholder="Direct attention to work of breathing..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block text-[11px]">Hint 2 (Concept Cue)</label>
                <input
                  type="text"
                  value={hint2}
                  onChange={(e) => setHint2(e.target.value)}
                  placeholder="Remind of alveolar ventilation..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block text-[11px]">Hint 3 (Approved Source)</label>
                <input
                  type="text"
                  value={hint3}
                  onChange={(e) => setHint3(e.target.value)}
                  placeholder="Cite respiratory physiology guidelines..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-sky-600/20"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Scenario...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Fictional Case to Library</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
