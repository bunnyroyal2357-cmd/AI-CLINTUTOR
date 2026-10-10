import { ClinicalCase, RubricCriterion } from '../types/clinical';
import { APPROVED_KNOWLEDGE_BASE } from './approvedMaterials';

// Helper to create standardized rubric criteria
const createDefaultRubric = (
  evidenceDesc: string,
  conceptDesc: string,
  logicDesc: string,
  uncertaintyDesc: string,
  objectiveDesc: string
): RubricCriterion[] => [
  {
    category: 'evidenceIdentification',
    label: 'Evidence Identification',
    description: evidenceDesc,
    maxScore: 4,
    criteriaLevels: {
      1: 'Misses primary clinical findings or cites irrelevant data.',
      2: 'Identifies isolated cues but overlooks critical trends or subtle signs.',
      3: 'Extracts most key physiological findings and synthesizes vital signs.',
      4: 'Exemplary extraction of both overt and nuanced clinical cues with precise context.'
    }
  },
  {
    category: 'conceptualUnderstanding',
    label: 'Conceptual Understanding',
    description: conceptDesc,
    maxScore: 4,
    criteriaLevels: {
      1: 'Demonstrates fundamental misunderstandings of underlying pathophysiological mechanisms.',
      2: 'Recalls terms but misapplies them to the specific educational scenario.',
      3: 'Correctly applies core physiological/clinical concepts to explain observations.',
      4: 'Deep, integrated understanding linking cellular/organ mechanisms to clinical presentation.'
    }
  },
  {
    category: 'logicalReasoning',
    label: 'Logical Reasoning & Deduction',
    description: logicDesc,
    maxScore: 4,
    criteriaLevels: {
      1: 'Incoherent leaps of logic, unwarranted conclusions, or severe circular thinking.',
      2: 'Partial reasoning steps with unexplained assumptions or speculative jumps.',
      3: 'Clear, step-by-step rational deductions connecting clinical observations to conclusions.',
      4: 'Rigorous chain of clinical deduction, methodically evaluating and ruling out alternatives.'
    }
  },
  {
    category: 'recognitionOfUncertainty',
    label: 'Recognition of Uncertainty & Pitfalls',
    description: uncertaintyDesc,
    maxScore: 4,
    criteriaLevels: {
      1: 'Exhibits extreme premature closure or dogmatic certainty without verifying data.',
      2: 'Acknowledges uncertainty only when prompted, or remains overly reliant on single signs.',
      3: 'Identifies key clinical unknowns and mentions what additional data is needed.',
      4: 'Proactively identifies cognitive biases, missing laboratory parameters, and physiological boundaries.'
    }
  },
  {
    category: 'alignmentWithObjectives',
    label: 'Alignment with Learning Objectives',
    description: objectiveDesc,
    maxScore: 4,
    criteriaLevels: {
      1: 'Answers off-topic or completely bypasses the educational scenario goals.',
      2: 'Addresses part of the learning objective but veers into peripheral discussion.',
      3: 'Solid adherence to all stated educational learning objectives.',
      4: 'Comprehensive mastery of learning objectives with clear synthesis.'
    }
  }
];

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-hemodynamics-postop',
    title: 'The Compensatory Phase: Tachycardia in a Post-Operative Ward Patient',
    subtitle: 'Fictional ward scenario investigating baroreceptor reflex, pulse pressure, and occult volume deficit',
    subject: 'Anatomy & Physiology',
    difficulty: 'Intermediate',
    estimatedTimeMinutes: 15,
    learningObjectives: [
      'Explain how the autonomic nervous system compensates for reduced stroke volume.',
      'Differentiate between compensated and decompensated hypovolemic states.',
      'Recognize why resting normotension does not exclude occult hemorrhage or intravascular depletion.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 64,
        gender: 'Male',
        setting: 'Surgical Step-Down Ward (Post-Op Day 1)',
        chiefComplaint: 'Mild lightheadedness upon sitting up; feeling thirsty and tired'
      },
      narrative: 'Mr. Arthur Davies underwent an uneventful open hemicolectomy yesterday afternoon. He is currently resting in bed. Over the last four hours, his nursing observation chart indicates that his heart rate has gradually climbed from 82 bpm to 118 bpm. His blood pressure reads 106/74 mmHg (his pre-operative baseline was 134/80 mmHg). He complains of dry mouth and feeling "a bit drained," but tells you he feels fine as long as he stays completely flat in bed. His surgical drain has produced 280 mL of serosanguinous fluid over the shift. Urine output has measured 18 mL/hr over the past two hours (normal threshold >30 mL/hr).',
      vitalSigns: {
        bp: '106/74 mmHg (MAP 84 mmHg)',
        hr: '118 bpm (sinus tachycardia)',
        rr: '22 breaths/min',
        spo2: '96% on room air',
        temp: '37.3°C',
        painScore: '3/10 (well controlled on patient-controlled analgesia)',
        gcs: '15/15'
      },
      initialNotes: 'Estimated intraoperative blood loss was 350 mL. Maintenance IV crystalloids are infusing at 80 mL/hr. Abdomen is soft, mildly tender around incision site without involuntary guarding.',
      relevantLabOrHistory: [
        'History of well-controlled essential hypertension (taking ramipril, held on morning of surgery)',
        'Hemoglobin pre-op: 14.1 g/dL; immediate post-op morning check: 11.2 g/dL',
        'Capillary refill time: 3.5 seconds on nail beds',
        'Peripheral extremities: cool to touch'
      ]
    },
    questions: [
      {
        id: 'q-hemo-1',
        questionNumber: 1,
        questionText: 'Which physiological mechanisms explain why Mr. Davies’ heart rate is elevated while his systolic blood pressure remains above 100 mmHg?',
        clinicalPrompt: 'In your educational reasoning, identify the underlying cardiovascular reflexes and equations governing cardiac output and blood pressure regulation in this scenario.',
        type: 'concept_explanation',
        expectedReasoningPoints: [
          'Effective circulating volume and venous return are diminished (Frank-Starling mechanism leads to decreased stroke volume).',
          'Arterial baroreceptors in carotid sinus and aortic arch sense decreased stretch, triggering sympathetic nervous system disinhibition and vagal withdrawal.',
          'Tachycardia is a compensatory defense to maintain cardiac output (CO = HR × Stroke Volume).',
          'Sympathetic vasoconstriction (elevating SVR) preserves systolic and elevates diastolic pressure, resulting in a narrowed pulse pressure (106 - 74 = 32 mmHg).',
          'Normotension here represents active physiological compensation, not clinical stability.'
        ],
        commonMisconceptions: [
          'Assuming that because blood pressure is over 100 mmHg, perfusion is adequate and the patient cannot be hypovolemic.',
          'Attributing the tachycardia solely to pain or anxiety without integrating the cool extremities, oliguria, and pulse pressure narrowing.',
          'Believing blood pressure drops before heart rate changes during acute volume depletion.'
        ],
        rubric: createDefaultRubric(
          'Identification of tachycardia, narrowed pulse pressure, cool extremities, and oliguria.',
          'Accurate application of baroreceptor reflex, Frank-Starling law, and CO = HR × SV equation.',
          'Logical link between hypovolemia/occult bleeding and autonomic compensatory vasoconstriction.',
          'Explicit acknowledgment that systolic BP > 100 mmHg can obscure Class II shock (premature closure).',
          'Complete coverage of cardiovascular compensatory mechanisms and clinical indicators.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Look closely at the relationship between his stroke volume, his heart rate, and his pulse pressure (the difference between systolic and diastolic numbers). Note his urine output and capillary refill time.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Recall the formula Cardiac Output = Heart Rate × Stroke Volume. What reflex is initiated by high-pressure arterial baroreceptors when venous return falls?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'According to Miller & Ross (Foundations of Clinical Physiology, Ch. 14): When stroke volume drops due to hypovolemia, baroreceptor disinhibition drives a surge of sympathetic adrenergic tone. The heart rate accelerates to support cardiac output while peripheral vasoconstriction elevates systemic vascular resistance, narrowing pulse pressure. Systolic pressure is preserved until late compensatory breakdown.',
            approvedSourceReference: 'mat-hemodynamics-101'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[0]]
      },
      {
        id: 'q-hemo-2',
        questionNumber: 2,
        questionText: 'What cognitive assumption or clinical pitfall must be guarded against when reviewing Mr. Davies’ current observation chart, and what additional objective information is urgently needed?',
        clinicalPrompt: 'Explain how relying solely on a single blood pressure threshold creates risk, and detail which physiological parameters should be evaluated next.',
        type: 'reasoning',
        expectedReasoningPoints: [
          'Pitfall of "premature reassurance" or threshold bias: viewing BP 106/74 as "normal" while ignoring the 28 mmHg drop from baseline (134/80) and oliguria (18 mL/hr).',
          'Failure to recognize dynamic trends: the heart rate has risen progressively from 82 to 118 bpm.',
          'Need to assess postural vital signs cautiously or check fluid responsiveness (passive leg raise test or fluid challenge under supervision).',
          'Urgent need for repeat surgical drain inspection, repeat hemoglobin/hematocrit, serum lactate (evaluating tissue hypoperfusion), and fluid balance calculation.',
          'Recognition of potential occult intra-abdominal hemorrhage vs third-space sequestration vs inadequate post-op fluid replacement.'
        ],
        commonMisconceptions: [
          'Waiting for systolic BP to fall below 90 mmHg before escalating care.',
          'Assuming urine output of 18 mL/hr for two hours is acceptable because "the kidneys are waking up after anesthesia".'
        ],
        rubric: createDefaultRubric(
          'Identification of the trend data (progressive HR climb, baseline BP drop, low urine output).',
          'Understanding of threshold bias and compensatory limits before cardiovascular collapse.',
          'Sound clinical reasoning proposing structured re-evaluation (lactate, fluid balance, repeat labs).',
          'Recognition of uncertainty regarding the exact source of volume deficit (active bleeding vs dehydration).',
          'Clear alignment with clinical safety and objective monitoring objectives.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Compare his current reading with his pre-operative baseline and look at his urine output trend over time rather than a single static snapshot.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Consider "threshold bias"—treating 100 mmHg as an arbitrary safe boundary. What does oliguria (<0.5 mL/kg/hr) reveal about renal perfusion pressure despite the recorded cuff BP?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'Clinical physiology guidelines emphasize that end-organ perfusion (indicated by cerebral clarity, urine output, and skin perfusion) is compromised long before frank hypotension occurs. Oliguria under 0.5 mL/kg/hr reflects active renal vasoconstriction via angiotensin II and sympathetic tone.',
            approvedSourceReference: 'mat-hemodynamics-101'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[0]]
      }
    ]
  },
  {
    id: 'case-observations-respiratory',
    title: 'Deteriorating Respiratory Mechanics: Recognizing Type 1 Hypoxemic Failure',
    subtitle: 'Fictional acute ward case analyzing tachypnea, work of breathing, and pulse oximetry latency',
    subject: 'Basic Observations Interpretation',
    difficulty: 'Beginner',
    estimatedTimeMinutes: 12,
    learningObjectives: [
      'Explain why respiratory rate is the earliest and most sensitive vital sign of clinical deterioration.',
      'Differentiate between stable pulse oximetry and compensated work of breathing.',
      'Formulate structured reasoning for early oxygenation and ventilation assessment.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 71,
        gender: 'Female',
        setting: 'Medical Ward (Admitted for community-acquired pneumonia 24 hours ago)',
        chiefComplaint: 'Feeling "winded" even when speaking short sentences; unable to finish breakfast'
      },
      narrative: 'Mrs. Evelyn Clark was admitted yesterday with right lower lobe pneumonia and started on oral antibiotics. When the healthcare student reviews her bedside observations, her oxygen saturation reads 94% on room air, which the junior nurse notes as "satisfactory since it is above 92%." However, watching Mrs. Clark for 60 seconds reveals that she is breathing at 28 breaths per minute, using accessory sternocleidomastoid muscles, and unable to complete full sentences without pausing to catch her breath.',
      vitalSigns: {
        bp: '138/84 mmHg',
        hr: '104 bpm',
        rr: '28 breaths/min (labored, shallow)',
        spo2: '94% on room air',
        temp: '38.1°C',
        painScore: '4/10 (right-sided pleuritic chest pain on inspiration)'
      },
      initialNotes: 'Chest auscultation reveals bronchial breathing and coarse crackles over right lower lung field. Patient appears anxious and pale.',
      relevantLabOrHistory: [
        'Medical history: Mild osteoporosis, no prior chronic pulmonary disease',
        'Previous night RR: 18 breaths/min, SpO2: 97% on room air',
        'White cell count on admission: 14.8 × 10^9/L',
        'Chest X-ray shows right lower lobe consolidation with air bronchograms'
      ]
    },
    questions: [
      {
        id: 'q-resp-1',
        questionNumber: 1,
        questionText: 'Why is Mrs. Clark’s respiratory rate of 28/min a critical indicator of physiological deterioration, even though her SpO2 is recorded as 94%?',
        clinicalPrompt: 'Detail the physiological drive behind tachypnea and explain the danger of false reassurance from the pulse oximetry number alone.',
        type: 'reasoning',
        expectedReasoningPoints: [
          'Respiratory rate is the most sensitive early marker of physiological stress; tachypnea reflects increased minute ventilation in response to ventilation-perfusion (V/Q) mismatch.',
          'Peripheral chemoreceptors and pulmonary J-receptors stimulate the brainstem respiratory center.',
          'Mrs. Clark is sustaining an SpO2 of 94% ONLY at the cost of severe physiological work (RR 28/min and accessory muscle use).',
          'Relying solely on SpO2 (94%) represents a dangerous "single-parameter reassurance" error; when respiratory muscles fatigue, sudden desaturation and hypercapnia follow.',
          'Pleuritic pain also causes shallow tachypnea (splinting), aggravating atelectasis.'
        ],
        commonMisconceptions: [
          'Concluding that because SpO2 is above 92% or 93%, the patient has adequate respiratory reserve.',
          'Assuming tachypnea is simply an emotional reaction to feeling anxious about being in the hospital.',
          'Believing that pulse oximetry provides a complete assessment of ventilation and gas exchange.'
        ],
        rubric: createDefaultRubric(
          'Citing RR 28/min, accessory muscle use, speech fragmentation, and comparing to baseline RR 18/min.',
          'Explaining V/Q mismatch, work of breathing, respiratory muscle fatigue, and chemoreceptor drive.',
          'Deducing that normal/marginal SpO2 under massive ventilatory effort signals impending exhaustion.',
          'Recognizing that pulse oximetry measures oxygenation, not ventilatory adequacy or pCO2.',
          'Direct alignment with respiratory monitoring and early warning identification objectives.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Notice how hard she is working to achieve that 94% reading. Consider her respiratory rate (28/min) and her use of accessory muscles.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Remember that oxygen saturation indicates hemoglobin binding, but respiratory rate reflects ventilatory effort and neurological drive. What happens when the diaphragm tires?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'According to Davies & Vance (Principles of Applied Respiratory Care, Sec. 3): Tachypnea (>24/min) is the primary compensatory response to early alveolar compromise. If clinicians evaluate SpO2 in isolation, they overlook the exhaustive respiratory effort maintaining it. Impending respiratory exhaustion occurs rapidly once accessory muscles fatigue.',
            approvedSourceReference: 'mat-respiratory-mechanics'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[1]]
      }
    ]
  },
  {
    id: 'case-communication-sbar',
    title: 'Handover Under Pressure: Escalating an Unstable Patient Using SBAR',
    subtitle: 'Fictional simulation of interprofessional escalation, structured reasoning, and closed-loop communication',
    subject: 'Clinical Communication',
    difficulty: 'Intermediate',
    estimatedTimeMinutes: 15,
    learningObjectives: [
      'Structure an urgent telephone escalation using the Situation-Background-Assessment-Recommendation (SBAR) framework.',
      'Formulate specific, assertive recommendations with defined timeframes instead of open-ended ambiguity.',
      'Apply closed-loop communication to verify urgent medical instructions.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 52,
        gender: 'Male',
        setting: 'Medical Assessment Unit (MAU)',
        chiefComplaint: 'Acute onset confusion and shivering 6 hours post-endoscopy'
      },
      narrative: 'Mr. Marcus Vance underwent an elective diagnostic upper endoscopy this morning. Three hours later he developed sudden rigors, severe diaphoresis, and new agitation. When you reassess him, he is confused to time and place (baseline normal). His blood pressure has dropped to 88/54 mmHg, heart rate is 126 bpm, temperature is 39.2°C, and respiratory rate is 26 breaths/min. You recognize features of acute septic shock and need to phone the on-call medical registrar, who is currently managing a cardiac arrest in another pavilion.',
      vitalSigns: {
        bp: '88/54 mmHg (MAP 65 mmHg)',
        hr: '126 bpm (irregularly irregular on monitor)',
        rr: '26 breaths/min',
        spo2: '92% on room air',
        temp: '39.2°C',
        gcs: '13/15 (Eyes 4, Verbal 4, Motor 5)'
      },
      initialNotes: 'Peripheral IV cannula in left antecubital fossa patent. No urine recorded in drainage bag in last 3 hours. National Early Warning Score (NEWS2) = 11.',
      relevantLabOrHistory: [
        'History of cirrhosis (Child-Pugh B) secondary to alcohol dependence',
        'Endoscopy finding: Grade 2 esophageal varices banded without active bleeding',
        'Current medications: Propranolol, spironolactone'
      ]
    },
    questions: [
      {
        id: 'q-sbar-1',
        questionNumber: 1,
        questionText: 'Draft the exact SBAR briefing you will deliver when the busy registrar answers the phone, focusing especially on an unambiguous "Recommendation".',
        clinicalPrompt: 'Write out each of the four components (Situation, Background, Assessment, Recommendation) with objective data and an assertive, time-delimited request.',
        type: 'communication',
        expectedReasoningPoints: [
          'Situation: Identify self, clinical role, location, patient name/age, and headline emergency (septic shock / NEWS2 11 / systolic BP 88 mmHg).',
          'Background: Recent upper GI endoscopy with variceal banding today, underlying cirrhosis, sudden onset rigors and confusion.',
          'Assessment: Objective vitals (BP 88/54, HR 126, RR 26, Temp 39.2, GCS 13, anuria). State working physiological impression: suspected severe sepsis/bacteremia with septic shock.',
          'Recommendation: Assertive, actionable request: "I need you or a senior clinician to review Mr. Vance in person within 10–15 minutes." State initiated immediate actions: high-flow oxygen, 500 mL crystalloid fluid bolus, blood cultures and sepsis screen preparation.',
          'Use closed-loop read-back to confirm instructions.'
        ],
        commonMisconceptions: [
          'Vague descriptions such as "he does not look good" or "can someone pop by whenever they are free".',
          'Omitting the specific timeframe for bedside review.',
          'Failing to initiate appropriate immediate emergency bedside actions while waiting for the registrar.'
        ],
        rubric: createDefaultRubric(
          'Inclusion of vital statistics: BP 88/54, HR 126, Temp 39.2, GCS 13, NEWS2 11.',
          'Clear conceptual grasp of SBAR structural domains and sepsis pathophysiology.',
          'Logical linkage of recent invasive procedure to acute bacteremia and septic shock.',
          'Recognition of team constraints and graded assertiveness to ensure timely escalation.',
          'Explicit completion of all 4 SBAR sections with clear, actionable recommendation.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Make sure your "Situation" captures the emergency in the first 10 seconds. Check that your "Recommendation" specifies exactly what you need and how fast.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Remember the SBAR framework: Situation, Background, Assessment, Recommendation. Without a clear timeframe and specific intervention request, busy colleagues cannot prioritize the handover.'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'Per WHO & NHS Patient Safety Collaborative guidelines: Effective escalation requires stating the objective physiological scores (e.g. NEWS2 = 11) and framing an explicit recommendation with an agreed time for review (e.g. "within 15 minutes"), followed by closed-loop read-back of all orders.',
            approvedSourceReference: 'mat-sbar-communication'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[3]]
      }
    ]
  },
  {
    id: 'case-safety-medication',
    title: 'The Look-Alike Vials: Preventing Medication Administration Errors',
    subtitle: 'Fictional critical incident case investigating human factors, confirmation bias, and independent double-checking',
    subject: 'Patient Safety',
    difficulty: 'Beginner',
    estimatedTimeMinutes: 10,
    learningObjectives: [
      'Apply the Swiss Cheese Model to identify latent system hazards in medication preparation.',
      'Explain how cognitive confirmation bias leads clinicians to misread look-alike medication ampoules.',
      'Demonstrate how independent double-checking differs from passive confirmation.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 48,
        gender: 'Female',
        setting: 'Post-Anesthesia Care Unit (PACU)',
        chiefComplaint: 'Post-operative nausea and severe vomiting'
      },
      narrative: 'Nurse intern Chloe is assigned to administer 4 mg of intravenous Ondansetron (an antiemetic) to a recovering patient experiencing retching. The PACU is loud with multiple monitor alarms sounding. Chloe goes to the medication drawer where clear 2 mL glass ampoules are stored in adjacent plastic bins. Bin A holds Ondansetron 4 mg/2 mL; Bin B holds Ephedrine 30 mg/mL (a potent sympathomimetic vasopressor). Both ampoules have identical white labels, blue plastic snap caps, and black lettering. A colleague in the room asks Chloe for the time as she picks up the ampoule.',
      vitalSigns: {
        bp: '122/78 mmHg',
        hr: '76 bpm',
        rr: '16 breaths/min',
        spo2: '99% on 2L nasal cannula'
      },
      initialNotes: 'The drawer was restocked 30 minutes earlier by a floating pharmacy technician under severe time pressure.',
      relevantLabOrHistory: [
        'Hospital policy requires independent double-checking for all high-alert intravenous medications',
        'Previous near-miss report submitted 2 months ago regarding similar ampoule packaging between ondansetron and ephedrine'
      ]
    },
    questions: [
      {
        id: 'q-safe-1',
        questionNumber: 1,
        questionText: 'Explain how human cognitive factors and environmental conditions create an accident trajectory in this scenario, and how a true "independent double check" should be executed.',
        clinicalPrompt: 'Analyze the latent system hazards, confirmation bias, and describe the exact operational steps of an independent double check.',
        type: 'reasoning',
        expectedReasoningPoints: [
          'Latent conditions: Look-alike sound-alike (LASA) packaging (identical ampoule size, cap color, label design), adjacent storage bins in the same drawer, recent rushed restocking.',
          'Active environmental stressors: High auditory noise, monitor alarms, verbal interruption during selection.',
          'Cognitive trap: Confirmation bias—Chloe expects Ondansetron, so her visual heuristic reads the label confirming her expectation.',
          'Independent double check mechanics: The second practitioner must review the patient chart, prescription, calculation, and ampoule INDEPENDENTLY without being told what drug is held ("rubber-stamping").',
          'Systemic solutions: Physical separation of high-potency vasopressors, bar-code medication scanning (forcing function), distinct tall-man lettering.'
        ],
        commonMisconceptions: [
          'Blaming Chloe as "careless" or suggesting that personal vigilance alone prevents packaging errors.',
          'Thinking a double check means holding up the ampoule and asking "Can you check this ondansetron for me?" (which primes confirmation bias in the second checker).'
        ],
        rubric: createDefaultRubric(
          'Identification of LASA packaging, bin proximity, auditory distraction, and restock timing.',
          'Accurate application of Reason’s Swiss Cheese Model and cognitive confirmation bias heuristics.',
          'Clear reasoning differentiating individual vigilance from systemic defense barriers.',
          'Recognition of vulnerability to verbal priming and passive compliance.',
          'Complete coverage of independent double-check requirements and system-level safeguards.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Notice the physical packaging of the two ampoules and consider what happened when a colleague interrupted her right at the moment of selection.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'What is confirmation bias in visual perception? Why does asking someone "Is this Ondansetron?" compromise the independence of the verification?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'From Reason & Carthey (Human Factors in Healthcare, Ch. 7): Latent hazards like identical packaging provoke heuristic pattern-matching under stress. A true independent double-check requires the second clinician to inspect the prescription, calculation, and vial from scratch without verbal prompts.',
            approvedSourceReference: 'mat-human-factors-safety'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[4]]
      }
    ]
  },
  {
    id: 'case-ethics-consent',
    title: 'Navigating Treatment Ambiguity: Capacity and Informed Consent in Mild Delirium',
    subtitle: 'Fictional clinical ethics scenario evaluating decision-specific capacity, autonomy, and the four-box method',
    subject: 'Healthcare Ethics',
    difficulty: 'Advanced',
    estimatedTimeMinutes: 18,
    learningObjectives: [
      'Apply the four-stage clinical test for mental capacity to a fluctuating patient.',
      'Differentiate between an unwise decision made with capacity and a decision lacking legal/ethical capacity.',
      'Synthesize the principles of autonomy and beneficence when assessing refusal of treatment.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 79,
        gender: 'Male',
        setting: 'Orthopedic Ward (Post-Op Day 2, Hip Hemiarthroplasty)',
        chiefComplaint: 'Refusing subcutaneous low-molecular-weight heparin (LMWH) thromboprophylaxis injection'
      },
      narrative: 'Mr. Henry Bell underwent surgery 48 hours ago for a fractured neck of femur. He is at high risk for deep vein thrombosis (DVT) and pulmonary embolism. When the ward nurse approaches him with his prescribed evening enoxaparin injection, Mr. Bell pushes her hand away, declaring: "No more needles! They sting and you are just poking holes in me for no reason. I want to be left alone!" Mr. Bell had mild ' +
        'sundowning confusion yesterday evening, misidentifying the ward room as a hotel, but this morning he was oriented to place and conversed clearly with his daughter.',
      vitalSigns: {
        bp: '128/76 mmHg',
        hr: '78 bpm',
        rr: '16 breaths/min',
        spo2: '97% on room air',
        temp: '36.9°C'
      },
      initialNotes: 'Abdomen has several small hematomas from previous subcutaneous injections. Surgical incision healing well.',
      relevantLabOrHistory: [
        'Past medical history: Mild vascular cognitive impairment, osteoarthritis',
        'No designated enduring power of attorney for health decisions currently on file',
        'Daughter states: "Dad always hated needles, but he certainly does not want a blood clot in his lungs."'
      ]
    },
    questions: [
      {
        id: 'q-eth-1',
        questionNumber: 1,
        questionText: 'How should you systematically determine whether Mr. Bell possesses the mental capacity to refuse this specific thromboprophylaxis injection right now?',
        clinicalPrompt: 'Apply the decision-specific capacity criteria (Understand, Retain, Weigh, Communicate) and explain why an unwise decision does not automatically signify lack of capacity.',
        type: 'reasoning',
        expectedReasoningPoints: [
          'Presumption of capacity: Adults are presumed to possess capacity unless proven otherwise; capacity is decision-specific and time-specific.',
          'The 4-stage functional test: Can Mr. Bell 1) Understand the nature and purpose of LMWH and risks of refusal (DVT/PE)? 2) Retain this information long enough to deliberate? 3) Use/weigh the benefits vs pain? 4) Communicate his choice?',
          'Distinguishing an unwise choice from an incapacitated choice: A patient with capacity is legally and ethically entitled to refuse treatment even if refusal carries high medical risk.',
          'Fluctuating capacity optimization: Delirium/sundowning warrants assessment at an optimal time, with reassurance, clear non-jargon language, and involvement of trusted family.',
          'If capacity is genuinely lacking: Treatment must proceed under the "Best Interests" principle, weighing his past expressed wishes, current distress, and minimally restrictive alternatives.'
        ],
        commonMisconceptions: [
          'Assuming that because Mr. Bell was confused yesterday, he automatically lacks capacity for all decisions today.',
          'Assuming that refusing an injection that prevents a potentially fatal pulmonary embolism is itself "proof" that he lacks capacity.',
          'Administering the medication covertly or with physical restraint without an explicit capacity evaluation and best-interests assessment.'
        ],
        rubric: createDefaultRubric(
          'Citing history of mild cognitive impairment, fluctuating evening confusion, hematomas, and daughter’s collateral information.',
          'Rigorous application of the 4-part capacity criteria and distinction between wisdom and capacity.',
          'Step-by-step reasoning exploring patient education, minimizing discomfort, and formal assessment.',
          'Recognition of fluctuating cognitive states and uncertainty regarding baseline values vs transient delirium.',
          'Comprehensive fulfillment of clinical ethics and legal consent learning objectives.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Notice that capacity is not an all-or-nothing permanent trait—it is specific to the particular decision and the specific moment in time.'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Recall the four criteria for decision-making capacity: Understand, Retain, Weigh/Use, and Communicate. How does an "unwise decision" differ from an "incapacitated decision"?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'Per Jonsen, Siegler & Winslade (Clinical Ethics, Part 1): Patients with capacity have the ethical right of autonomy to refuse interventions. Capacity must be evaluated specifically for this decision by testing whether the patient understands the purpose and risks of blood clots, can retain the explanation, and can weigh it in their decision.',
            approvedSourceReference: 'mat-ethics-capacity'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[5]]
      }
    ]
  },
  {
    id: 'case-evidence-critical-appraisal',
    title: 'Evidence in the Clinic: Evaluating Relative Risk and Confounding in Drug Studies',
    subtitle: 'Fictional journal club scenario appraising observational findings, absolute risk reduction, and clinical applicability',
    subject: 'Evidence Evaluation',
    difficulty: 'Intermediate',
    estimatedTimeMinutes: 14,
    learningObjectives: [
      'Calculate and contrast Absolute Risk Reduction (ARR) versus Relative Risk Reduction (RRR).',
      'Identify confounding by indication in observational medical studies.',
      'Formulate evidence-grounded recommendations for clinical practice.'
    ],
    fictionalScenario: {
      patientSummary: {
        age: 58,
        gender: 'Male',
        setting: 'Outpatient Primary Care Clinic',
        chiefComplaint: 'Inquiring whether to start a new high-cost dietary supplement for cardiovascular prevention'
      },
      narrative: 'Mr. David Morales brings a printout of a recently published observational study headline claiming: "Novel Omega-Complex Supplement Reduces Heart Attack Risk by 50%!" The study followed 10,000 self-selected health club members over 5 years. In the supplement-taking cohort, 10 out of 1,000 participants suffered an event (1.0%), whereas in the non-supplement group, 20 out of 1,000 suffered an event (2.0%). Mr. Morales has no known cardiovascular disease, normal lipids, exercises regularly, and asks if he should spend $120/month on this formulation.',
      vitalSigns: {
        bp: '124/78 mmHg',
        hr: '68 bpm',
        rr: '14 breaths/min',
        spo2: '99% on room air'
      },
      initialNotes: 'Framingham 10-year cardiovascular risk score is low (estimated 3.2%). Patient is asymptomatic.',
      relevantLabOrHistory: [
        'Study design: Observational cohort (non-randomized)',
        'Healthy user effect noted in supplement cohort (higher median income, lower smoking rates, higher adherence to Mediterranean diet)'
      ]
    },
    questions: [
      {
        id: 'q-evi-1',
        questionNumber: 1,
        questionText: 'How would you explain the mathematical difference between the reported 50% relative risk reduction and the actual absolute risk reduction, and what study design flaw must you highlight?',
        clinicalPrompt: 'Calculate the ARR and Number Needed to Treat (NNT), explain confounding/healthy user effect, and provide an evidence-grounded communication response.',
        type: 'reasoning',
        expectedReasoningPoints: [
          'Relative Risk Reduction (RRR) calculation: (2.0% - 1.0%) / 2.0% = 50% reduction, which sounds very large.',
          'Absolute Risk Reduction (ARR) calculation: 2.0% - 1.0% = 1.0% (or 0.01 absolute difference).',
          'Number Needed to Treat (NNT) calculation: 1 / ARR = 1 / 0.01 = 100 patients must take the supplement for 5 years to prevent one cardiac event.',
          'Methodological flaw / bias: Observational study with profound "healthy user bias" and confounding by socioeconomic status, physical activity, and diet.',
          'Absence of randomized controlled trial (RCT) evidence showing causal benefit in low-risk individuals.',
          'Clinical recommendation: Advise patient against spending $120/month; encourage continued lifestyle and diet adherence.'
        ],
        commonMisconceptions: [
          'Accepting the 50% risk reduction figure literally as meaning the individual patient cuts their personal risk in half irrespective of baseline risk.',
          'Assuming that any observational association proves a causal pharmacological effect.'
        ],
        rubric: createDefaultRubric(
          'Accurate identification of numerical parameters (1% vs 2%), cohort nature, and healthy user characteristics.',
          'Clear understanding of RRR, ARR, NNT, and confounding by indication.',
          'Logical deduction demonstrating why observational association does not equal causation.',
          'Recognition of uncertainty and need for randomized clinical trials before changing practice.',
          'Direct alignment with critical appraisal and patient communication objectives.'
        ),
        hints: [
          {
            level: 1,
            type: 'attention',
            title: 'Direct Your Attention',
            text: 'Look at the baseline event rates: 2% in one group and 1% in the other. How much is the absolute difference, and how many people must be treated to prevent one event?'
          },
          {
            level: 2,
            type: 'concept',
            title: 'Underlying Concept',
            text: 'Calculate Absolute Risk Reduction (ARR = Baseline Risk - Treatment Risk) and NNT (1 / ARR). What is the "healthy user effect" in observational cohorts?'
          },
          {
            level: 3,
            type: 'explanation',
            title: 'Approved Source Explanation',
            text: 'Per Guyatt et al. (User’s Guides to the Medical Literature, Ch. 8): Relative risk reduction exaggerates apparent clinical impact when baseline event incidence is low. In non-randomized cohorts, confounding by diet and healthy behaviors frequently accounts for observed statistical differences.',
            approvedSourceReference: 'mat-evidence-evaluation'
          }
        ],
        approvedSources: [APPROVED_KNOWLEDGE_BASE[6]]
      }
    ]
  }
];
