
import React, { useState } from 'react';
import { AssessmentResult, DonorType } from '../types';
import { DONOR_TYPES_INFO } from '../constants';

interface ResultsProps {
  result: AssessmentResult;
  onSave: (userData: { name: string; email: string; status: string }) => void;
}

const Results: React.FC<ResultsProps> = ({ result, onSave }) => {
  const [formData, setFormData] = useState({ name: '', email: '', status: 'current' });
  const [isSubmitted, setIsSubmitted] = useState(!!result.userData);
  
  const typeInfo = DONOR_TYPES_INFO[result.donorType];
  const sortedScores = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${typeInfo.color}`}></div>
            
            <div className="mb-8">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 block">Donor Intelligence Report</span>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{typeInfo.icon}</span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">{result.donorType}</h1>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-6 my-6">
                "{typeInfo.description}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Values & Beliefs
                </h3>
                <ul className="space-y-3">
                  {typeInfo.characteristics.map((c, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <div className={`w-2 h-2 rounded-full ${typeInfo.color}`}></div>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Priority Issues
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.priorityIssues.map((issue, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-600">
                      {issue}
                    </span>
                  ))}
                </div>
                <div className="text-slate-500 text-xs italic mt-4">
                  {typeInfo.engagement}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-12">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Persona Alignment Score</h3>
              <div className="space-y-5">
                {sortedScores.map(([type, score]) => (
                  <div key={type} className="group">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className={`font-semibold transition-colors ${type === result.donorType ? typeInfo.accent : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {type}
                      </span>
                      <span className="font-mono text-slate-400">{Math.round((score / 40) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${type === result.donorType ? DONOR_TYPES_INFO[type as DonorType].color : 'bg-slate-300 opacity-40'}`}
                        style={{ width: `${Math.max(5, (score / 40) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Donor Roadmap</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold italic">B</div>
                  <p className="text-sm text-slate-300">Target barriers: Address concerns about money reach and local support priority.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold italic">E</div>
                  <p className="text-sm text-slate-300">Engagement: Leverage roadshows (54% effective) and social media channels.</p>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Impact Opportunities</h3>
              <div className="space-y-3">
                {typeInfo.opportunities.map((opp, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-indigo-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-indigo-700">{opp}</span>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">Info →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Form */}
        <div className="space-y-8">
          {!isSubmitted ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Your Stewardship Plan</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Connect your {result.donorType} profile with our team to receive an exclusive giving report based on 2026 data.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="john@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all mt-4 text-lg"
                >
                  Download Stewardship Report
                </button>
                <p className="text-[11px] text-slate-400 text-center leading-relaxed px-4">
                  Privacy compliant. Based on research of 4,406 respondents.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 sticky top-24 text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-emerald-200">✓</div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">Report Ready!</h3>
              <p className="text-emerald-700 leading-relaxed mb-8">
                Your personalized {result.donorType} stewardship pack is sent to <strong>{formData.email}</strong>.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-emerald-600 font-bold text-xs hover:underline block mx-auto"
              >
                Change Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
