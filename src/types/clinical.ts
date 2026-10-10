export type SubjectCategory =
  | 'Anatomy & Physiology'
  | 'Clinical History-Taking'
  | 'Basic Observations Interpretation'
  | 'Clinical Communication'
  | 'Patient Safety'
  | 'Evidence Evaluation'
  | 'Healthcare Ethics';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface VitalSigns {
  bp: string;          // e.g. "98/62 mmHg"
  hr: string;          // e.g. "118 bpm"
  rr: string;          // e.g. "24 breaths/min"
  spo2: string;        // e.g. "94% on room air"
  temp?: string;       // e.g. "37.9°C"
  painScore?: string;  // e.g. "6/10 dull right lower quadrant"
  gcs?: string;        // e.g. "15/15"
}

export interface FictionalScenario {
  patientSummary: {
    age: number;
    gender: string;
    setting: string;
    chiefComplaint: string;
  };
  narrative: string;
  vitalSigns?: VitalSigns;
  initialNotes?: string;
  relevantLabOrHistory?: string[];
}

export interface ProgressiveHint {
  level: 1 | 2 | 3;
  type: 'attention' | 'concept' | 'explanation';
  title: string;
  text: string;
  approvedSourceReference?: string;
}

export interface RubricCriterion {
  category:
    | 'evidenceIdentification'
    | 'conceptualUnderstanding'
    | 'logicalReasoning'
    | 'recognitionOfUncertainty'
    | 'alignmentWithObjectives';
  label: string;
  description: string;
  maxScore: number; // e.g. 4
  criteriaLevels: {
    1: string; // Beginning
    2: string; // Developing
    3: string; // Proficient
    4: string; // Exemplary
  };
}

export interface ApprovedSourceCitation {
  id: string;
  title: string;
  section: string;
  chapter?: string;
  excerpt?: string;
  fullExcerpt?: string;
  educationalTakeaway?: string;
  clinicalTakeaway?: string;
}

export interface ClinicalQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  clinicalPrompt: string;
  type: 'reasoning' | 'prioritization' | 'concept_explanation' | 'communication';
  expectedReasoningPoints: string[];
  commonMisconceptions: string[];
  rubric: RubricCriterion[];
  hints: ProgressiveHint[];
  approvedSources: ApprovedSourceCitation[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  subtitle: string;
  subject: SubjectCategory;
  difficulty: DifficultyLevel;
  estimatedTimeMinutes: number;
  learningObjectives: string[];
  fictionalScenario: FictionalScenario;
  questions: ClinicalQuestion[];
  createdDate?: string;
  isCustom?: boolean;
}

export interface RubricScoreItem {
  score: number;
  maxScore: number;
  levelTitle: string; // 'Beginning' | 'Developing' | 'Proficient' | 'Exemplary'
  feedback: string;
}

export interface EvaluationResult {
  whatStudentDidWell: string[];
  relevantEvidenceIdentified: string[];
  missingConcepts: string[];
  unsupportedAssumptions: string[];
  suggestedReasoningImprovements: string[];
  rubricScores: {
    evidenceIdentification: RubricScoreItem;
    conceptualUnderstanding: RubricScoreItem;
    logicalReasoning: RubricScoreItem;
    recognitionOfUncertainty: RubricScoreItem;
    alignmentWithObjectives: RubricScoreItem;
  };
  overallScore: number; // 0 - 100 percentage
  overallFeedback: string;
  followUpQuestion: string;
  sourceCitations: ApprovedSourceCitation[];
  educationalExplanation: string;
  aiGrounded: boolean;
  evaluatedAt: string;
}

export interface ApprovedKnowledgeItem {
  id: string;
  title: string;
  subject: SubjectCategory;
  topic: string;
  sourceDoc: string;
  section: string;
  summary: string;
  keyConcepts: string[];
  fullExcerpt: string;
  clinicalTakeaway: string;
  citationString: string;
}

export interface QuestionAttempt {
  questionId: string;
  questionNumber: number;
  questionText: string;
  studentAnswer: string;
  hintsRevealed: number[];
  evaluation: EvaluationResult;
  followUpAnswer?: string;
  answeredAt: string;
}

export interface StudentAttempt {
  id: string;
  caseId: string;
  caseTitle: string;
  subject: SubjectCategory;
  difficulty: DifficultyLevel;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed';
  questionAttempts: QuestionAttempt[];
  finalScore: number;
  hintsUsedCount: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  role: string;
  institution: string;
  demoMode: boolean;
  attempts: StudentAttempt[];
  topicMastery: Record<SubjectCategory, number>;
  weaknesses: string[];
  strengths: string[];
}

export interface AdaptiveRecommendation {
  caseId: string;
  caseTitle: string;
  subject: SubjectCategory;
  difficulty: DifficultyLevel;
  rationale: string;
  targetObjective: string;
  difficultyAdjustment: 'easier' | 'similar' | 'more_challenging';
}
