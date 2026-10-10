import { ApprovedKnowledgeItem } from '../types/clinical';

export const APPROVED_KNOWLEDGE_BASE: ApprovedKnowledgeItem[] = [
  {
    id: 'mat-hemodynamics-101',
    title: 'Compensatory Mechanisms in Hypovolemia and Shock',
    subject: 'Anatomy & Physiology',
    topic: 'Cardiovascular Physiology & Hemodynamics',
    sourceDoc: 'Foundations of Clinical Physiology (4th Ed.)',
    section: 'Chapter 14: Regulation of Arterial Pressure & Microcirculation, pp. 218–224',
    citationString: 'Miller & Ross (2023). Foundations of Clinical Physiology, Ch. 14, pp. 218–224.',
    summary: 'Explains how the autonomic nervous system uses arterial baroreceptors to defend mean arterial pressure during volume depletion, causing early tachycardia and peripheral vasoconstriction before hypotension manifests.',
    keyConcepts: [
      'Baroreceptor reflex and sympathetic surge',
      'Stroke volume reduction compensated by heart rate increase (CO = HR × SV)',
      'Narrowed pulse pressure as an early clinical indicator',
      'Blood pressure as a late, decompensatory marker of hypovolemia'
    ],
    fullExcerpt: 'When effective circulating arterial volume decreases, venous return to the right heart falls, lowering end-diastolic ventricular filling and stroke volume (Frank-Starling law). High-pressure arterial baroreceptors in the carotid sinus and aortic arch decrease their baseline inhibitory firing to the medullary vasomotor center. This disinhibition produces a rapid surge in sympathetic adrenergic outflow and vagal withdrawal. Consequently: 1) Heart rate accelerates (sinus tachycardia) to sustain cardiac output (CO = HR × SV); 2) Arteriolar vasoconstriction (alpha-1 stimulation) elevates systemic vascular resistance; 3) Venoconstriction mobilizes splanchnic blood reservoirs. Clinicians must recognize that normal or borderline blood pressure frequently masks class II shock because compensatory vasoconstriction maintains systolic pressure while diastolic pressure rises, narrowing the pulse pressure. Deferring fluid assessment until hypotension occurs represents a critical reasoning pitfall.',
    clinicalTakeaway: 'Tachycardia with a narrowed pulse pressure is an active compensatory defense against hypoperfusion. Normotension does NOT rule out significant intravascular volume loss.'
  },
  {
    id: 'mat-respiratory-mechanics',
    title: 'Mechanics of Gas Exchange and Early Hypoxemic Failure',
    subject: 'Basic Observations Interpretation',
    topic: 'Respiratory Physiology & Observation Monitoring',
    sourceDoc: 'Principles of Applied Respiratory Care (6th Ed.)',
    section: 'Section 3: Ventilatory Dynamics and Work of Breathing, pp. 92–98',
    citationString: 'Davies & Vance (2024). Principles of Applied Respiratory Care, Sec. 3, pp. 92–98.',
    summary: 'Details why respiratory rate is the single most sensitive early physiological indicator of clinical deterioration, preceding pulse oximetry desaturation in early gas exchange impairment.',
    keyConcepts: [
      'Ventilatory drive stimulated by arterial chemoreceptors and pulmonary mechanoreceptors',
      'Tachypnea as an active compensatory work-of-breathing increase',
      'SpO2 maintenance via high minute ventilation until respiratory muscle exhaustion',
      'V/Q mismatch and early shunting'
    ],
    fullExcerpt: 'Respiratory rate (RR) is consistently demonstrated in clinical trials to be the most sensitive early predictor of systemic physiological compromise. In early acute alveolar filling or microatelectasis, localized ventilation-perfusion (V/Q) mismatch activates J-receptors and irritant receptors in the pulmonary parenchyma, alongside peripheral chemoreceptors responding to microscopic alveolar hypoxia. The respiratory center in the brainstem increases respiratory frequency and tidal depth. At this stage, oxygen saturation (SpO2) measured peripherally may remain near normal (e.g., 95–97%) because the student or observer fails to appreciate that this saturation is maintained only through exhaustive compensatory hyperventilation (e.g., RR 26–30/min). If the clinician assesses only the SpO2 number without contextualizing the respiratory rate and work of breathing (accessory muscle recruitment, intercostal indrawing), they risk missing impending diaphragmatic exhaustion.',
    clinicalTakeaway: 'Never interpret oxygen saturation in isolation. A normal SpO2 in the presence of tachypnea (>24/min) indicates strained physiological compensation, not clinical stability.'
  },
  {
    id: 'mat-history-taking',
    title: 'Cognitive Traps and Systematic Questioning in History-Taking',
    subject: 'Clinical History-Taking',
    topic: 'Diagnostic Reasoning & Patient Interviewing',
    sourceDoc: 'Essential Clinical Interviewing & Reasoning Guide',
    section: 'Chapter 4: Beyond the Chief Complaint: Hypothesis-Driven Exploration, pp. 58–67',
    citationString: 'Kaufman et al. (2022). Essential Clinical Interviewing & Reasoning Guide, Ch. 4, pp. 58–67.',
    summary: 'Explains how cognitive biases like premature closure and availability bias lead to misdiagnosis during patient history gathering, and provides a structured hypothesis-driven framework.',
    keyConcepts: [
      'Premature closure and framing effect',
      'SOCRATES/OPQRST frameworks for symptom characterization',
      'Review of systems to test competing physiological hypotheses',
      'Open-to-closed question cones to avoid leading the patient'
    ],
    fullExcerpt: 'Diagnostic error research reveals that cognitive biases contribute to over 75% of clinical reasoning missteps during history taking. The two most pervasive biases are premature closure—the tendency to accept an initial diagnostic impression before considering plausible alternatives—and search satisficing—terminating the interview as soon as one plausible explanation is found. When evaluating a symptom such as dyspnea or chest discomfort, experienced clinicians use a "cone of questioning": starting with broad, non-directive open questions ("Describe what you felt when this started"), transitioning to targeted symptom dimensions (timing, aggravating/relieving factors, postural changes), and concluding with targeted closed questions to rule in or out red flag symptoms. Critical reasoning requires actively seeking evidence that contradicts the primary working hypothesis rather than solely gathering confirmatory data.',
    clinicalTakeaway: 'Always generate at least two contrasting pathophysiological hypotheses during history-taking and actively ask questions designed to challenge your initial assumption.'
  },
  {
    id: 'mat-sbar-communication',
    title: 'The SBAR Structured Escalation Protocol in Interprofessional Care',
    subject: 'Clinical Communication',
    topic: 'Interprofessional Team Communication & Crisis Handover',
    sourceDoc: 'Patient Safety & Clinical Communication Handbook',
    section: 'Module 2: Structured Escalation in Deteriorating Patients, pp. 31–38',
    citationString: 'World Health Organization (WHO) & NHS Safety Collaborative (2021). Structured Communication Guide, Mod. 2.',
    summary: 'Presents the Situation-Background-Assessment-Recommendation (SBAR) structure for clinical handover, focusing on how to formulate unambiguous, assertive recommendations.',
    keyConcepts: [
      'SBAR structural domains (Situation, Background, Assessment, Recommendation)',
      'Assertive escalation and graded assertiveness (PACE model)',
      'Closed-loop communication and read-back protocols',
      'Objective physiological data anchoring rather than subjective feelings'
    ],
    fullExcerpt: 'Vague descriptions such as "the patient does not look right" or "vital signs are slightly off" frequently fail to convey urgency during telephone or bedside handovers. SBAR provides a standardized cognitive framework: Situation (identify oneself, patient identity, immediate headline concern within 10 seconds); Background (admitting diagnosis, date of admission, key surgical/medical context, current baseline); Assessment (objective physiological trends, NEWS2 score, specific organ system involved, what you believe the problem is); Recommendation (explicit request: "I need you to review this patient in person within 15 minutes", specific immediate interventions: "I am starting supplemental O2 and IV fluids now"). Explicit recommendations prompt active shared mental models and prevent clinical hesitation.',
    clinicalTakeaway: 'An effective handover does not end with describing the problem. It must articulate a clear, assertive recommendation with a defined timeframe for response.'
  },
  {
    id: 'mat-human-factors-safety',
    title: 'Systems Theory and Human Factors in Medication Administration',
    subject: 'Patient Safety',
    topic: 'Systems Safety, Latent Errors, & Cognitive Ergonomics',
    sourceDoc: 'Human Factors in Healthcare: Systems Engineering Approach',
    section: 'Chapter 7: Medication Safety, Look-Alike Sound-Alike Hazards, pp. 142–151',
    citationString: 'Reason & Carthey (2023). Human Factors in Healthcare, Ch. 7, pp. 142–151.',
    summary: 'Analyzes James Reason’s Swiss Cheese Model and cognitive ergonomics in high-risk medication administration, explaining how environmental cues, confirmation bias, and vial similarities provoke latent failures.',
    keyConcepts: [
      'Swiss Cheese Model of systemic accidents',
      'Confirmation bias in visual verification (seeing what is expected)',
      'Independent double check vs dependent rubber-stamping',
      'Forcing functions and error-tolerant system design'
    ],
    fullExcerpt: 'In traditional blame-based cultures, medication administration errors are treated as individual negligence. Modern human factors engineering demonstrates that active failures at the sharp end (the practitioner administering the drug) almost invariably reflect latent system conditions: look-alike sound-alike (LASA) packaging, high-distraction environments, circadian fatigue, and unstandardized storage shelves. When two vials share identical color caps, typography, or volume, human visual processing relies on automated heuristics. Under cognitive load, confirmation bias causes the clinician to read the label and perceive the expected medication name rather than the actual printed text. True independent double-checking requires two clinicians to verify the prescription, patient identity, calculation, and ampoule independently without prompting or verbal coaching from the first practitioner.',
    clinicalTakeaway: 'Errors are consequences, not root causes. Safe clinical practice requires building multiple barrier defenses—especially independent verification and environmental distraction reduction.'
  },
  {
    id: 'mat-ethics-capacity',
    title: 'Assessing Decision-Making Capacity and the Four Principles of Biomedical Ethics',
    subject: 'Healthcare Ethics',
    topic: 'Clinical Ethics, Autonomy, & Fluctuating Capacity',
    sourceDoc: 'Clinical Ethics: A Practical Approach to Ethical Decisions in Clinical Medicine',
    section: 'Part 1: Beneficence, Autonomy, and Competency Assessment, pp. 45–54',
    citationString: 'Jonsen, Siegler & Winslade (2022). Clinical Ethics (9th Ed.), Part 1, pp. 45–54.',
    summary: 'Outlines the legal and ethical test for mental capacity, emphasizing that capacity is decision-specific and time-specific, and must not be conflated with the reasonableness of the decision.',
    keyConcepts: [
      'Four core ethical principles: Autonomy, Beneficence, Non-maleficence, Justice',
      'Decision-specific and time-specific nature of capacity',
      'The four-element test for capacity: Understand, Retain, Weigh/Use, Communicate',
      'Distinction between an unwise decision and an incapacitated decision'
    ],
    fullExcerpt: 'A competent adult patient possesses the ethical and legal right to decline medical treatment, even if that decision appears unwise or leads to serious harm. Capacity is decision-specific: a patient suffering from mild delirium may lack capacity to make complex decisions regarding complex surgical procedures, yet retain full capacity to consent to or refuse a blood draw or dietary choices. To possess capacity for a specific decision, a person must be able to: 1) Understand the relevant information about the nature, purpose, and risks of the intervention and non-intervention; 2) Retain that information long enough to deliberate; 3) Weigh or use the information as part of a reasoning process; 4) Communicate their decision by any viable means. Clinicians must take all practicable steps to optimize decision-making conditions (e.g., treating reversible metabolic disturbances, choosing optimal time of day) before determining incapacity.',
    clinicalTakeaway: 'Capacity is always decision-specific and time-specific. An unorthodox or unwise choice does not establish lack of capacity.'
  },
  {
    id: 'mat-evidence-evaluation',
    title: 'Critical Appraisal: Distinguishing Association from Causation in Clinical Studies',
    subject: 'Evidence Evaluation',
    topic: 'Evidence-Based Practice, Confounding, & Diagnostic Accuracy',
    sourceDoc: 'User’s Guides to the Medical Literature: Essentials of Evidence-Based Clinical Practice',
    section: 'Chapter 8: Therapy and Harm: Interpreting Relative Risk and Confounders, pp. 110–118',
    citationString: 'Guyatt et al. (2023). User’s Guides to the Medical Literature (4th Ed.), Ch. 8, pp. 110–118.',
    summary: 'Guides students through the hierarchy of clinical evidence, assessing confounding variables, absolute vs relative risk reduction, and avoiding uncritical adoption of observational findings.',
    keyConcepts: [
      'Hierarchy of evidence and limitations of observational cohorts',
      'Confounding by indication in clinical treatment studies',
      'Absolute risk reduction (ARR) vs Relative risk reduction (RRR)',
      'Number Needed to Treat (NNT) and baseline risk contextualization'
    ],
    fullExcerpt: 'When evaluating clinical research claims, students must recognize the hazard of unmeasured confounding, particularly confounding by indication. In non-randomized observational cohorts, sicker patients frequently receive more intensive therapies, making that therapy appear harmful if baseline illness severity is not rigorously controlled. Furthermore, pharmaceutical and trial reports frequently emphasize Relative Risk Reduction (e.g., "50% reduction in mortality"), which can sound dramatic even when the Absolute Risk Reduction is tiny (e.g., from 2% down to 1%, yielding an ARR of 1% and an NNT of 100). Sound clinical reasoning requires translating relative claims into absolute numbers and evaluating whether study inclusion criteria genuinely match the clinical scenario at hand.',
    clinicalTakeaway: 'Always demand the absolute risk reduction and consider confounding before applying published study claims to individual patient scenarios.'
  }
];
