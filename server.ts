import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';
import { CLINICAL_CASES } from './src/data/clinicalCases.js';
import { APPROVED_KNOWLEDGE_BASE } from './src/data/approvedMaterials.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory cases store allowing educator additions during session
let dynamicCases = [...CLINICAL_CASES];

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'AI-CLINTUTOR',
    mode: ai ? 'gemini-live' : 'deterministic-demo',
    model: ai ? 'gemini-3.8-flash' : 'offline-rubric-engine',
    casesCount: dynamicCases.length,
    materialsCount: APPROVED_KNOWLEDGE_BASE.length,
  });
});

// 2. Cases List & Retrieval
app.get('/api/cases', (req, res) => {
  res.json(dynamicCases);
});

app.get('/api/cases/:id', (req, res) => {
  const found = dynamicCases.find(c => c.id === req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'Case not found' });
  }
  res.json(found);
});

// 3. Approved Materials Retrieval
app.get('/api/materials', (req, res) => {
  const { query, subject } = req.query;
  let results = [...APPROVED_KNOWLEDGE_BASE];
  if (subject && typeof subject === 'string') {
    results = results.filter(m => m.subject.toLowerCase() === subject.toLowerCase());
  }
  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    results = results.filter(
      m =>
        m.title.toLowerCase().includes(q) ||
        m.topic.toLowerCase().includes(q) ||
        m.fullExcerpt.toLowerCase().includes(q) ||
        m.keyConcepts.some(k => k.toLowerCase().includes(q))
    );
  }
  res.json(results);
});

// 4. Deterministic Rubric Evaluation Fallback
function evaluateWithDeterministicEngine(params: {
  caseTitle: string;
  questionText: string;
  studentAnswer: string;
  expectedPoints: string[];
  commonMisconceptions: string[];
  approvedSources: any[];
}) {
  const { studentAnswer, expectedPoints, commonMisconceptions, approvedSources } = params;
  const answerLower = studentAnswer.toLowerCase();
  const words = studentAnswer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Evidence Identification
  const identifiedEvidence: string[] = [];
  const wellDonePoints: string[] = [];
  const missingPoints: string[] = [];

  expectedPoints.forEach((pt) => {
    // Check keywords from expected point
    const keywords = pt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 4);
    const matchCount = keywords.filter(k => answerLower.includes(k)).length;
    if (matchCount >= 2 || (keywords.length <= 3 && matchCount >= 1)) {
      identifiedEvidence.push(pt);
      wellDonePoints.push(`Recognized core reasoning factor: ${pt.slice(0, 85)}...`);
    } else {
      missingPoints.push(pt);
    }
  });

  // 2. Check for misconceptions & assumptions
  const unsupportedAssumptions: string[] = [];
  commonMisconceptions.forEach((misc) => {
    const miscWords = misc
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 5);
    const matches = miscWords.filter(w => answerLower.includes(w)).length;
    if (matches >= 2) {
      unsupportedAssumptions.push(`Caution regarding potential cognitive trap: ${misc}`);
    }
  });

  if (wordCount < 15) {
    unsupportedAssumptions.push('Answer is very brief; elaborate on physiological or clinical mechanisms to demonstrate comprehensive reasoning.');
  }

  // 3. Compute Rubric Scores
  // Score 1-4 for each category
  const evidenceScore = Math.min(
    4,
    Math.max(1, Math.round((identifiedEvidence.length / Math.max(1, expectedPoints.length)) * 4) || 2)
  );

  const conceptualScore = Math.min(
    4,
    Math.max(1, wordCount > 50 ? 3 : wordCount > 25 ? 2 : 1)
  );

  const logicalScore = Math.min(
    4,
    Math.max(1, identifiedEvidence.length >= 2 ? 3 : 2)
  );

  const uncertaintyScore = answerLower.includes('uncertain') ||
    answerLower.includes('trend') ||
    answerLower.includes('further') ||
    answerLower.includes('monitor') ||
    answerLower.includes('investigate') ||
    answerLower.includes('risk')
    ? 3
    : 2;

  const alignmentScore = identifiedEvidence.length > 0 ? 3 : 2;

  const rawSum = evidenceScore + conceptualScore + logicalScore + uncertaintyScore + alignmentScore;
  const overallPercentage = Math.min(100, Math.max(25, Math.round((rawSum / 20) * 100)));

  const scoreLabels = ['', 'Beginning', 'Developing', 'Proficient', 'Exemplary'];

  return {
    whatStudentDidWell:
      wellDonePoints.length > 0
        ? wellDonePoints
        : ['Structured initial response addressing the clinical question prompt.'],
    relevantEvidenceIdentified:
      identifiedEvidence.length > 0
        ? identifiedEvidence
        : ['Identified patient scenario context, but should integrate more specific observation metrics.'],
    missingConcepts:
      missingPoints.length > 0
        ? missingPoints.slice(0, 3)
        : ['Consider exploring secondary organ consequences and continuous reassessment windows.'],
    unsupportedAssumptions:
      unsupportedAssumptions.length > 0
        ? unsupportedAssumptions
        : ['No major unsupported assumptions detected; clinical caution maintained.'],
    suggestedReasoningImprovements: [
      'Explicitly reference physiological equations or clinical frameworks (e.g. CO = HR × SV or SBAR escalation steps).',
      'Integrate baseline trends rather than judging single numerical thresholds in isolation.',
      'Document what immediate objective tests (such as lactate, arterial blood gas, or repeat vitals) confirm or refute the hypothesis.'
    ],
    rubricScores: {
      evidenceIdentification: {
        score: evidenceScore,
        maxScore: 4,
        levelTitle: scoreLabels[evidenceScore],
        feedback: `Captured ${identifiedEvidence.length} of ${expectedPoints.length} core clinical reasoning cues.`
      },
      conceptualUnderstanding: {
        score: conceptualScore,
        maxScore: 4,
        levelTitle: scoreLabels[conceptualScore],
        feedback: 'Applies relevant physiological and clinical concepts to explain the observed scenario.'
      },
      logicalReasoning: {
        score: logicalScore,
        maxScore: 4,
        levelTitle: scoreLabels[logicalScore],
        feedback: 'Logical deductions connect clinical observations directly to student conclusions.'
      },
      recognitionOfUncertainty: {
        score: uncertaintyScore,
        maxScore: 4,
        levelTitle: scoreLabels[uncertaintyScore],
        feedback: 'Appropriately identifies diagnostic boundaries and recommends monitoring.'
      },
      alignmentWithObjectives: {
        score: alignmentScore,
        maxScore: 4,
        levelTitle: scoreLabels[alignmentScore],
        feedback: 'Response stays focused on the educational objectives of this case.'
      }
    },
    overallScore: overallPercentage,
    overallFeedback: `Solid clinical reasoning effort achieving an estimated rubric mastery of ${overallPercentage}%. Continue practicing trend synthesis and explicit mechanism explanation.`,
    followUpQuestion:
      'If the patient’s observations shift by 10% over the next 30 minutes, what would be the single most alarming early indicator that compensatory mechanisms are failing?',
    sourceCitations: approvedSources.slice(0, 2),
    educationalExplanation:
      approvedSources[0]?.fullExcerpt ||
      'Approved educational materials highlight the importance of evaluating compensatory autonomic reflexes and structured communication before clinical decompensation.',
    aiGrounded: false,
    evaluatedAt: new Date().toISOString()
  };
}

// 5. POST /api/tutor/evaluate
app.post('/api/tutor/evaluate', async (req, res) => {
  try {
    const {
      caseId,
      questionId,
      studentAnswer,
      hintsUsedCount = 0
    } = req.body;

    if (!studentAnswer || typeof studentAnswer !== 'string' || !studentAnswer.trim()) {
      return res.status(400).json({ error: 'Student answer is required.' });
    }

    const currentCase = dynamicCases.find(c => c.id === caseId);
    if (!currentCase) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const currentQuestion = currentCase.questions.find(q => q.id === questionId);
    if (!currentQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Try Gemini if available
    if (ai) {
      try {
        const prompt = `
You are AI-CLINTUTOR, an adaptive clinical reasoning tutor for healthcare students.
This is an EDUCATIONAL simulation only. You must NOT diagnose real patients or give treatment advice.

Evaluate this student's clinical reasoning answer against the case details, expected points, misconceptions, and approved learning materials.

CASE TITLE: "${currentCase.title}"
SUBJECT: ${currentCase.subject}
DIFFICULTY: ${currentCase.difficulty}
SCENARIO SUMMARY: ${currentCase.fictionalScenario.patientSummary.chiefComplaint} in ${currentCase.fictionalScenario.patientSummary.setting}
NARRATIVE: ${currentCase.fictionalScenario.narrative}
VITALS: ${JSON.stringify(currentCase.fictionalScenario.vitalSigns || {})}

QUESTION: "${currentQuestion.questionText}"
PROMPT GUIDANCE: "${currentQuestion.clinicalPrompt}"

EXPECTED REASONING POINTS:
${currentQuestion.expectedReasoningPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

COMMON MISCONCEPTIONS TO WATCH FOR:
${currentQuestion.commonMisconceptions.map((m, i) => `${i + 1}. ${m}`).join('\n')}

APPROVED SOURCE EXCERPTS:
${currentQuestion.approvedSources.map(s => `[${s.title} - ${s.section}]: "${s.excerpt}"`).join('\n')}

STUDENT'S ANSWER:
"""
${studentAnswer}
"""
HINTS USED SO FAR: ${hintsUsedCount}

Evaluate their reasoning constructive and thoroughly.
Return valid JSON with:
{
  "whatStudentDidWell": ["point 1", "point 2"],
  "relevantEvidenceIdentified": ["evidence 1", "evidence 2"],
  "missingConcepts": ["concept 1", "concept 2"],
  "unsupportedAssumptions": ["assumption 1"],
  "suggestedReasoningImprovements": ["suggestion 1", "suggestion 2"],
  "rubricScores": {
    "evidenceIdentification": { "score": 1-4, "maxScore": 4, "levelTitle": "Beginning/Developing/Proficient/Exemplary", "feedback": "brief reasoning" },
    "conceptualUnderstanding": { "score": 1-4, "maxScore": 4, "levelTitle": "Beginning/Developing/Proficient/Exemplary", "feedback": "brief reasoning" },
    "logicalReasoning": { "score": 1-4, "maxScore": 4, "levelTitle": "Beginning/Developing/Proficient/Exemplary", "feedback": "brief reasoning" },
    "recognitionOfUncertainty": { "score": 1-4, "maxScore": 4, "levelTitle": "Beginning/Developing/Proficient/Exemplary", "feedback": "brief reasoning" },
    "alignmentWithObjectives": { "score": 1-4, "maxScore": 4, "levelTitle": "Beginning/Developing/Proficient/Exemplary", "feedback": "brief reasoning" }
  },
  "overallScore": 0-100,
  "overallFeedback": "2-3 sentences evaluating the student's clinical thought process and encouraging growth",
  "followUpQuestion": "A thoughtful clinical follow-up question to probe deeper reasoning",
  "educationalExplanation": "A clear, grounded explanation derived strictly from the approved sources provided above."
}
`;

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'You are AI-CLINTUTOR, an adaptive clinical skills reasoning mentor for healthcare students. Fictional educational cases only. Never provide real patient care advice or diagnostic medical services. Evaluate student answers against provided clinical rubrics and approved sources. Provide constructive, encouraging feedback, highlight unsupported assumptions, assess uncertainty recognition, and formulate thoughtful follow-up questions. Do not invent citations.',
            responseMimeType: 'application/json',
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });

        const timeoutCall = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 9000)
        );

        const response: any = await Promise.race([geminiCall, timeoutCall]);

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          // Attach source citations and timestamp
          parsed.sourceCitations = currentQuestion.approvedSources;
          parsed.aiGrounded = true;
          parsed.evaluatedAt = new Date().toISOString();
          return res.json(parsed);
        }
      } catch (geminiError) {
        console.warn('Gemini API call returned error, using fallback engine:', geminiError);
        // Fall back seamlessly to deterministic engine
      }
    }

    // Fallback deterministic engine
    const evaluation = evaluateWithDeterministicEngine({
      caseTitle: currentCase.title,
      questionText: currentQuestion.questionText,
      studentAnswer,
      expectedPoints: currentQuestion.expectedReasoningPoints,
      commonMisconceptions: currentQuestion.commonMisconceptions,
      approvedSources: currentQuestion.approvedSources,
    });

    return res.json(evaluation);
  } catch (error) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({ error: 'Internal evaluation error occurred.' });
  }
});

// 6. POST /api/tutor/recommendation
app.post('/api/tutor/recommendation', (req, res) => {
  try {
    const { history = [], topicMastery = {}, currentCaseId } = req.body;

    // Filter out current case if other cases exist
    const candidateCases = dynamicCases.filter(c => c.id !== currentCaseId);
    if (candidateCases.length === 0) {
      return res.json({
        caseId: dynamicCases[0]?.id || '',
        caseTitle: dynamicCases[0]?.title || '',
        subject: dynamicCases[0]?.subject || 'Anatomy & Physiology',
        difficulty: dynamicCases[0]?.difficulty || 'Intermediate',
        rationale: 'Reviewing core physiological compensation patterns reinforces fundamental clinical assessment skills.',
        targetObjective: 'Master fundamental clinical deduction.',
        difficultyAdjustment: 'similar',
      });
    }

    // Identify lowest scoring topic
    let lowestTopic = 'Basic Observations Interpretation';
    let lowestScore = 100;
    Object.entries(topicMastery).forEach(([topic, score]) => {
      if (typeof score === 'number' && score < lowestScore) {
        lowestScore = score;
        lowestTopic = topic;
      }
    });

    // Find candidate matching lowest topic or unattempted
    const attemptedIds = new Set(history.map((h: any) => h.caseId));
    let chosen = candidateCases.find(c => c.subject === lowestTopic && !attemptedIds.has(c.id));
    if (!chosen) {
      chosen = candidateCases.find(c => !attemptedIds.has(c.id));
    }
    if (!chosen) {
      chosen = candidateCases[0];
    }

    let adjustment: 'easier' | 'similar' | 'more_challenging' = 'similar';
    let rationale = `Recommended to strengthen clinical competence in ${chosen.subject}.`;

    if (lowestScore < 60) {
      adjustment = 'easier';
      rationale = `Based on your recent practice in ${lowestTopic} (mastery ${Math.round(lowestScore)}%), this case provides targeted foundational practice with progressive scaffolding.`;
    } else if (lowestScore > 85) {
      adjustment = 'more_challenging';
      rationale = `With high demonstrated mastery (${Math.round(lowestScore)}%), this next scenario challenges multi-system synthesis and acute clinical decision boundaries.`;
    } else {
      adjustment = 'similar';
      rationale = `Solid developing performance. This scenario deepens practical application in ${chosen.subject} without overwhelming complexity.`;
    }

    res.json({
      caseId: chosen.id,
      caseTitle: chosen.title,
      subject: chosen.subject,
      difficulty: chosen.difficulty,
      rationale,
      targetObjective: chosen.learningObjectives[0] || 'Clinical reasoning mastery',
      difficultyAdjustment: adjustment,
    });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});

// 7. POST /api/educator/save-case
app.post('/api/educator/save-case', (req, res) => {
  try {
    const newCase = req.body;
    if (!newCase.title || !newCase.subject || !newCase.questions || newCase.questions.length === 0) {
      return res.status(400).json({ error: 'Case title, subject, and at least one question are required.' });
    }
    newCase.id = `custom-case-${Date.now()}`;
    newCase.isCustom = true;
    newCase.createdDate = new Date().toISOString();
    dynamicCases.unshift(newCase);
    res.json({ success: true, case: newCase });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create case' });
  }
});

// Mount Vite or static server
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI-CLINTUTOR server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
