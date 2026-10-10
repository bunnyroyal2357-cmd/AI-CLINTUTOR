import {
  ClinicalCase,
  EvaluationResult,
  ApprovedKnowledgeItem,
  AdaptiveRecommendation
} from '../types/clinical';

export async function fetchHealthCheck(): Promise<{
  status: string;
  appName: string;
  mode: string;
  model: string;
}> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (e) {
    return {
      status: 'offline',
      appName: 'AI-CLINTUTOR',
      mode: 'deterministic-demo',
      model: 'offline-rubric-engine'
    };
  }
}

export async function fetchCases(): Promise<ClinicalCase[]> {
  try {
    const res = await fetch('/api/cases');
    if (!res.ok) throw new Error('Failed to load cases');
    return await res.json();
  } catch (e) {
    console.warn('Using local cases fallback', e);
    const { CLINICAL_CASES } = await import('../data/clinicalCases');
    return CLINICAL_CASES;
  }
}

export async function fetchCaseById(id: string): Promise<ClinicalCase | null> {
  try {
    const res = await fetch(`/api/cases/${id}`);
    if (!res.ok) throw new Error('Failed to load case');
    return await res.json();
  } catch (e) {
    const { CLINICAL_CASES } = await import('../data/clinicalCases');
    return CLINICAL_CASES.find(c => c.id === id) || null;
  }
}

export async function fetchMaterials(query?: string, subject?: string): Promise<ApprovedKnowledgeItem[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (subject && subject !== 'All') params.append('subject', subject);
    const res = await fetch(`/api/materials?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load materials');
    return await res.json();
  } catch (e) {
    const { APPROVED_KNOWLEDGE_BASE } = await import('../data/approvedMaterials');
    let results = [...APPROVED_KNOWLEDGE_BASE];
    if (subject && subject !== 'All') {
      results = results.filter(m => m.subject.toLowerCase() === subject.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(m => m.title.toLowerCase().includes(q) || m.topic.toLowerCase().includes(q));
    }
    return results;
  }
}

export async function evaluateStudentAnswer(params: {
  caseId: string;
  questionId: string;
  studentAnswer: string;
  hintsUsedCount: number;
}): Promise<EvaluationResult> {
  const res = await fetch('/api/tutor/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error('Failed to evaluate reasoning answer');
  }

  return await res.json();
}

export async function fetchAdaptiveRecommendation(params: {
  history: any[];
  topicMastery: Record<string, number>;
  currentCaseId?: string;
}): Promise<AdaptiveRecommendation> {
  try {
    const res = await fetch('/api/tutor/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Failed to generate recommendation');
    return await res.json();
  } catch (e) {
    return {
      caseId: 'case-observations-respiratory',
      caseTitle: 'Deteriorating Respiratory Mechanics',
      subject: 'Basic Observations Interpretation',
      difficulty: 'Beginner',
      rationale: 'Recommended foundational practice targeting early vital sign trend recognition.',
      targetObjective: 'Recognize why tachypnea precedes desaturation.',
      difficultyAdjustment: 'similar',
    };
  }
}

export async function saveEducatorCase(newCase: any): Promise<{ success: boolean; case: ClinicalCase }> {
  const res = await fetch('/api/educator/save-case', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCase),
  });
  if (!res.ok) throw new Error('Failed to save case');
  return await res.json();
}
