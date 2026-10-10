import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  StudentAttempt,
  SubjectCategory,
  ClinicalCase,
  AdaptiveRecommendation
} from '../types/clinical';
import { fetchHealthCheck, fetchCases, fetchAdaptiveRecommendation } from '../services/api';

const DEFAULT_SUBJECTS: SubjectCategory[] = [
  'Anatomy & Physiology',
  'Clinical History-Taking',
  'Basic Observations Interpretation',
  'Clinical Communication',
  'Patient Safety',
  'Evidence Evaluation',
  'Healthcare Ethics'
];

const INITIAL_PROFILE: StudentProfile = {
  id: 'student-maya',
  name: 'Maya Chen',
  role: 'Year 3 Medical Student',
  institution: 'University School of Medicine',
  demoMode: true,
  attempts: [
    {
      id: 'att-1',
      caseId: 'case-hemodynamics-postop',
      caseTitle: 'The Compensatory Phase: Tachycardia in a Post-Operative Ward Patient',
      subject: 'Anatomy & Physiology',
      difficulty: 'Intermediate',
      startedAt: '2026-10-08T09:30:00Z',
      completedAt: '2026-10-08T09:44:00Z',
      status: 'completed',
      finalScore: 82,
      hintsUsedCount: 1,
      questionAttempts: [
        {
          questionId: 'q-hemo-1',
          questionNumber: 1,
          questionText: 'Which physiological mechanisms explain why Mr. Davies’ heart rate is elevated while his systolic blood pressure remains above 100 mmHg?',
          studentAnswer: 'The patient has lower stroke volume due to blood and fluid loss. Baroreceptors in the carotid sinus sense this decrease and increase sympathetic outflow, causing tachycardia to maintain cardiac output (CO = HR x SV). Systemic vascular resistance also rises, narrowing the pulse pressure.',
          hintsRevealed: [1],
          answeredAt: '2026-10-08T09:38:00Z',
          evaluation: {
            whatStudentDidWell: [
              'Correctly stated CO = HR x SV equation',
              'Identified baroreceptor reflex and sympathetic surge',
              'Noted pulse pressure narrowing'
            ],
            relevantEvidenceIdentified: ['Tachycardia', 'Stroke volume decrease', 'Preserved systolic BP'],
            missingConcepts: ['Could mention oliguria as direct sign of renal vasoconstriction'],
            unsupportedAssumptions: ['None'],
            suggestedReasoningImprovements: ['Link adrenergic vasoconstriction directly to cool peripheral extremities'],
            rubricScores: {
              evidenceIdentification: { score: 4, maxScore: 4, levelTitle: 'Exemplary', feedback: 'Identified all key parameters.' },
              conceptualUnderstanding: { score: 3, maxScore: 4, levelTitle: 'Proficient', feedback: 'Solid command of baroreceptor reflex.' },
              logicalReasoning: { score: 3, maxScore: 4, levelTitle: 'Proficient', feedback: 'Deductive flow is solid.' },
              recognitionOfUncertainty: { score: 3, maxScore: 4, levelTitle: 'Proficient', feedback: 'Recognized hidden shock risk.' },
              alignmentWithObjectives: { score: 4, maxScore: 4, levelTitle: 'Exemplary', feedback: 'Met all learning goals.' }
            },
            overallScore: 85,
            overallFeedback: 'Strong physiological reasoning showing clear grasp of autonomic compensation.',
            followUpQuestion: 'How would you differentiate this volume deficit from acute pulmonary embolism?',
            sourceCitations: [],
            educationalExplanation: 'Foundations of Clinical Physiology Ch. 14 details baroreceptor unloading.',
            aiGrounded: false,
            evaluatedAt: '2026-10-08T09:38:00Z'
          }
        }
      ]
    },
    {
      id: 'att-2',
      caseId: 'case-safety-medication',
      caseTitle: 'The Look-Alike Vials: Preventing Medication Administration Errors',
      subject: 'Patient Safety',
      difficulty: 'Beginner',
      startedAt: '2026-10-09T14:15:00Z',
      completedAt: '2026-10-09T14:26:00Z',
      status: 'completed',
      finalScore: 90,
      hintsUsedCount: 0,
      questionAttempts: [
        {
          questionId: 'q-safe-1',
          questionNumber: 1,
          questionText: 'Explain how human cognitive factors and environmental conditions create an accident trajectory...',
          studentAnswer: 'The look-alike packaging and adjacent bins create a latent system error. Noise and interruption trigger confirmation bias where the nurse sees what she expects. An independent double check requires the second nurse to calculate and inspect the vial without verbal leading.',
          hintsRevealed: [],
          answeredAt: '2026-10-09T14:23:00Z',
          evaluation: {
            whatStudentDidWell: [
              'Understood latent system flaws and Swiss Cheese Model',
              'Defined independent double check correctly without leading prompts'
            ],
            relevantEvidenceIdentified: ['LASA packaging', 'Auditory distractions', 'Confirmation bias'],
            missingConcepts: ['Could mention forcing functions like barcode scanning'],
            unsupportedAssumptions: ['None'],
            suggestedReasoningImprovements: ['Recommend barcoding and pharmacy physical isolation of vasopressors'],
            rubricScores: {
              evidenceIdentification: { score: 4, maxScore: 4, levelTitle: 'Exemplary', feedback: 'Comprehensive cue extraction.' },
              conceptualUnderstanding: { score: 4, maxScore: 4, levelTitle: 'Exemplary', feedback: 'Demonstrated human factors mastery.' },
              logicalReasoning: { score: 3, maxScore: 4, levelTitle: 'Proficient', feedback: 'Logical and clear.' },
              recognitionOfUncertainty: { score: 3, maxScore: 4, levelTitle: 'Proficient', feedback: 'Addressed human fallibility.' },
              alignmentWithObjectives: { score: 4, maxScore: 4, levelTitle: 'Exemplary', feedback: 'Targeted objectives met.' }
            },
            overallScore: 90,
            overallFeedback: 'Excellent human factors and systems-safety analysis.',
            followUpQuestion: 'What physical forcing function could prevent picking the wrong vial?',
            sourceCitations: [],
            educationalExplanation: 'Human Factors in Healthcare Ch. 7 emphasizes independent verification.',
            aiGrounded: false,
            evaluatedAt: '2026-10-09T14:23:00Z'
          }
        }
      ]
    }
  ],
  topicMastery: {
    'Anatomy & Physiology': 82,
    'Patient Safety': 90,
    'Clinical History-Taking': 68,
    'Basic Observations Interpretation': 62,
    'Clinical Communication': 70,
    'Evidence Evaluation': 74,
    'Healthcare Ethics': 72
  },
  weaknesses: [
    'Subtle trend interpretation in respiratory mechanics',
    'Cognitive bias avoidance during rapid clinical history exploration'
  ],
  strengths: [
    'Autonomic hemodynamic compensation pathways',
    'Independent medication verification protocols'
  ]
};

export const SAMPLE_PROFILES: { id: string; name: string; role: string; institution: string }[] = [
  {
    id: 'student-maya',
    name: 'Maya Chen',
    role: 'Year 3 Medical Student',
    institution: 'University School of Medicine'
  },
  {
    id: 'student-david',
    name: 'David O’Connor',
    role: 'Nursing Resident (ICU Rotation)',
    institution: 'Regional Academic Medical Center'
  },
  {
    id: 'student-alex',
    name: 'Alex Rivera',
    role: 'Physician Associate Trainee',
    institution: 'College of Health Sciences'
  }
];

interface ClinicalContextType {
  profile: StudentProfile;
  cases: ClinicalCase[];
  loadingCases: boolean;
  activeCaseId: string | null;
  activeTab: string;
  recommendation: AdaptiveRecommendation | null;
  health: { status: string; appName: string; mode: string; model: string };
  setActiveTab: (tab: string) => void;
  selectCase: (caseId: string) => void;
  recordQuestionAttempt: (attempt: {
    caseId: string;
    questionAttempt: any;
    isCaseComplete: boolean;
  }) => void;
  switchProfile: (profileId: string) => void;
  resetDemoData: () => void;
  refreshRecommendation: () => void;
}

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_clintutor_student_profile_v1';

export const ClinicalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return INITIAL_PROFILE;
  });

  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [recommendation, setRecommendation] = useState<AdaptiveRecommendation | null>(null);
  const [health, setHealth] = useState({
    status: 'checking',
    appName: 'AI-CLINTUTOR',
    mode: 'deterministic-demo',
    model: 'gemini-3.8-flash'
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }, [profile]);

  // Load health and cases
  useEffect(() => {
    async function init() {
      try {
        const [h, c] = await Promise.all([fetchHealthCheck(), fetchCases()]);
        setHealth(h);
        setCases(c);
      } catch (err) {
        console.error('Init error', err);
      } finally {
        setLoadingCases(false);
      }
    }
    init();
  }, []);

  // Compute recommendation
  const refreshRecommendation = async () => {
    try {
      const rec = await fetchAdaptiveRecommendation({
        history: profile.attempts,
        topicMastery: profile.topicMastery,
        currentCaseId: activeCaseId || undefined
      });
      setRecommendation(rec);
    } catch (e) {
      console.warn('Failed to load recommendation', e);
    }
  };

  useEffect(() => {
    if (cases.length > 0) {
      refreshRecommendation();
    }
  }, [cases, profile.attempts, activeCaseId]);

  const selectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setActiveTab('tutor');
  };

  const switchProfile = (profileId: string) => {
    const found = SAMPLE_PROFILES.find(p => p.id === profileId);
    if (!found) return;
    setProfile(prev => ({
      ...prev,
      id: found.id,
      name: found.name,
      role: found.role,
      institution: found.institution
    }));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(INITIAL_PROFILE);
    setActiveCaseId(null);
    refreshRecommendation();
  };

  const recordQuestionAttempt = (params: {
    caseId: string;
    questionAttempt: any;
    isCaseComplete: boolean;
  }) => {
    const { caseId, questionAttempt, isCaseComplete } = params;
    const currentCase = cases.find(c => c.id === caseId);
    if (!currentCase) return;

    setProfile(prev => {
      const attempts = [...prev.attempts];
      let existingAttemptIndex = attempts.findIndex(
        a => a.caseId === caseId && a.status === 'in_progress'
      );

      let targetAttempt: StudentAttempt;
      if (existingAttemptIndex >= 0) {
        targetAttempt = { ...attempts[existingAttemptIndex] };
        targetAttempt.questionAttempts = [
          ...targetAttempt.questionAttempts.filter(
            q => q.questionId !== questionAttempt.questionId
          ),
          questionAttempt
        ];
        targetAttempt.hintsUsedCount += (questionAttempt.hintsRevealed?.length || 0);
      } else {
        targetAttempt = {
          id: `attempt-${Date.now()}`,
          caseId: currentCase.id,
          caseTitle: currentCase.title,
          subject: currentCase.subject,
          difficulty: currentCase.difficulty,
          startedAt: new Date().toISOString(),
          status: 'in_progress',
          finalScore: questionAttempt.evaluation.overallScore,
          hintsUsedCount: questionAttempt.hintsRevealed?.length || 0,
          questionAttempts: [questionAttempt]
        };
        attempts.unshift(targetAttempt);
        existingAttemptIndex = 0;
      }

      if (isCaseComplete) {
        targetAttempt.status = 'completed';
        targetAttempt.completedAt = new Date().toISOString();
        const scores = targetAttempt.questionAttempts.map(q => q.evaluation?.overallScore || 70);
        targetAttempt.finalScore = Math.round(
          scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length)
        );
      }

      attempts[existingAttemptIndex] = targetAttempt;

      // Update topic mastery
      const currentTopicScore = prev.topicMastery[currentCase.subject] || 70;
      const newScore = Math.round(
        (currentTopicScore * 0.6) + (questionAttempt.evaluation.overallScore * 0.4)
      );

      const updatedMastery = {
        ...prev.topicMastery,
        [currentCase.subject]: Math.min(100, Math.max(20, newScore))
      };

      return {
        ...prev,
        attempts,
        topicMastery: updatedMastery
      };
    });
  };

  return (
    <ClinicalContext.Provider
      value={{
        profile,
        cases,
        loadingCases,
        activeCaseId,
        activeTab,
        recommendation,
        health,
        setActiveTab,
        selectCase,
        recordQuestionAttempt,
        switchProfile,
        resetDemoData,
        refreshRecommendation
      }}
    >
      {children}
    </ClinicalContext.Provider>
  );
};

export const useClinical = () => {
  const context = useContext(ClinicalContext);
  if (!context) throw new Error('useClinical must be used within a ClinicalProvider');
  return context;
};
