import React, { useState, useEffect } from 'react';
import {
  Library,
  Search,
  BookOpen,
  ShieldCheck,
  FileText,
  ExternalLink,
  Tag,
  CheckCircle2,
  Sparkles,
  Upload,
  Info
} from 'lucide-react';
import { fetchMaterials } from '../../services/api';
import { ApprovedKnowledgeItem, SubjectCategory } from '../../types/clinical';

export const ApprovedMaterialsView: React.FC = () => {
  const [materials, setMaterials] = useState<ApprovedKnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<ApprovedKnowledgeItem | null>(null);

  const subjects = [
    'All',
    'Anatomy & Physiology',
    'Clinical History-Taking',
    'Basic Observations Interpretation',
    'Clinical Communication',
    'Patient Safety',
    'Evidence Evaluation',
    'Healthcare Ethics'
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchMaterials(searchQuery, selectedSubject);
        setMaterials(data);
      } catch (err) {
        console.error('Failed to load materials', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchQuery, selectedSubject]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Authoritative Source Repository</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Approved Learning Materials
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Curated textbooks, consensus guidelines, and clinical frameworks that strictly anchor AI-CLINTUTOR’s reasoning feedback.
          </p>
        </div>

        {/* Note on institutional ingestion */}
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-800 max-w-sm">
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span>Anti-Hallucination Architecture:</span>
          </div>
          All tutor hints and explanations are bound directly to these approved excerpts. The AI is strictly barred from inventing citations.
        </div>
      </div>

      {/* Search and Discipline Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved texts by concept, author, or keyword (e.g., 'baroreceptors', 'SBAR', 'Swiss Cheese')..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((mat) => (
          <div
            key={mat.id}
            onClick={() => setSelectedItem(mat)}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {mat.subject}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {mat.id}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
                  {mat.title}
                </h3>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">
                  {mat.sourceDoc}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {mat.section}
                </div>
              </div>

              <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                {mat.summary}
              </p>

              {/* Key Concept Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {mat.keyConcepts.slice(0, 2).map((k, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-[200px]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-teal-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Full Excerpt <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Excerpt Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  {selectedItem.subject}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedItem.citationString}
                </p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Clinical Takeaway Banner */}
            <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 space-y-1">
              <span className="font-extrabold block text-teal-900 uppercase tracking-wider text-[11px]">
                Core Clinical Takeaway:
              </span>
              <p className="leading-relaxed font-medium">
                {selectedItem.clinicalTakeaway}
              </p>
            </div>

            {/* Full Grounded Excerpt */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Authorized Educational Text:
              </span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-sans text-xs sm:text-sm">
                "{selectedItem.fullExcerpt}"
              </div>
            </div>

            {/* Key Concepts */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Key Reasoning Concepts:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedItem.keyConcepts.map((k, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="text-slate-700 text-[11px] font-medium">{k}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
