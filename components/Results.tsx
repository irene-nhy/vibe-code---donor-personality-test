
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
    <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden ring-1 ring-slate-100/50">
            <div className={`absolute top-0 left-0 w-full h-3 ${typeInfo.color}`}></div>
            
            <div className="mb-12">
              <span className="text-[10px] font-black text-unicef-cyan uppercase tracking-[0.4em] mb-3 block">For every child, the right insights</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                <span className="text-7xl drop-shadow-sm">{typeInfo.icon}</span>
                <h1 className="text-5xl lg:text-6xl font-black text-unicef-dark leading-tight uppercase tracking-tighter">{result.donorType}</h1>
              </div>
              <p className="text-2xl text-slate-600 leading-relaxed font-bold border-l-8 border-unicef-slate pl-8 my-10 italic">
                "{typeInfo.description}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <h3 className="text-sm font-black text-unicef-dark flex items-center gap-3 uppercase tracking-widest">
                  <div className="w-8 h-8 bg-unicef-cyan text-white rounded-lg flex items-center justify-center text-xs">V</div>
                  Values & Alignment
                </h3>
                <ul className="space-y-4">
                  {typeInfo.characteristics.map((c, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-600 font-bold">
                      <div className={`w-3 h-3 rounded-full ${typeInfo.color} ring-4 ring-slate-50`}></div>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-sm font-black text-unicef-dark flex items-center gap-3 uppercase tracking-widest">
                  <div className="w-8 h-8 bg-unicef-yellow text-white rounded-lg flex items-center justify-center text-xs">P</div>
                  Priority Causes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {typeInfo.priorityIssues.map((issue, i) => (
                    <span key={i} className="px-4 py-2 bg-unicef-slate border border-slate-200 rounded-xl text-[10px] font-black text-unicef-dark uppercase tracking-widest">
                      {issue}
                    </span>
                  ))}
                </div>
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                  {typeInfo.engagement}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-10 mt-14">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Persona Strength Matrix</h3>
              <div className="space-y-6">
                {sortedScores.map(([type, score]) => (
                  <div key={type} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-xs font-black uppercase tracking-wider transition-colors ${type === result.donorType ? 'text-unicef-cyan' : 'text-slate-400 group-hover:text-slate-600'}`}>
                        {type}
                      </span>
                      <span className="font-black text-[10px] text-slate-300 tracking-tighter">{Math.round((score / 40) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-unicef-slate rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${type === result.donorType ? DONOR_TYPES_INFO[type as DonorType].color : 'bg-slate-300 opacity-30'}`}
                        style={{ width: `${Math.max(5, (score / 40) * 100)}%` }}
                      >
                         <div className="w-full h-full bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-unicef-dark rounded-[2.5rem] p-10 text-white shadow-2xl">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Your 2026 Roadmap</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 bg-unicef-cyan text-white rounded-xl flex items-center justify-center text-xs font-black italic flex-shrink-0 shadow-lg shadow-unicef-cyan/20">01</div>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">Focus on child protection programs where your values map most directly to the 54% recruit success rate.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 bg-unicef-cyan text-white rounded-xl flex items-center justify-center text-xs font-black italic flex-shrink-0 shadow-lg shadow-unicef-cyan/20">02</div>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">Engage with social media campaigns designed for the {result.donorType} persona (61% preferred channel).</p>
                </li>
              </ul>
            </div>
            <div className="bg-unicef-cyan/5 rounded-[2.5rem] p-10 border-2 border-unicef-cyan/10 shadow-lg">
              <h3 className="text-xl font-black text-unicef-dark mb-6 uppercase tracking-tight">Impact Areas</h3>
              <div className="space-y-4">
                {typeInfo.opportunities.map((opp, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-unicef-cyan/20 flex items-center justify-between group hover:border-unicef-cyan transition-colors">
                    <span className="text-xs font-black text-unicef-dark uppercase tracking-wider">{opp}</span>
                    <button className="w-8 h-8 bg-unicef-cyan/10 text-unicef-cyan rounded-full flex items-center justify-center font-black group-hover:bg-unicef-cyan group-hover:text-white transition-all">→</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Form */}
        <div className="space-y-10">
          {!isSubmitted ? (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-24 ring-4 ring-unicef-slate">
              <h3 className="text-2xl font-black text-unicef-dark mb-4 uppercase tracking-tighter">Impact Report</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                Link your <span className="text-unicef-cyan font-black">{result.donorType}</span> profile to a full UNICEF stewardship package for 2026.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:ring-8 focus:ring-unicef-cyan/5 focus:border-unicef-cyan outline-none transition-all font-bold placeholder:text-slate-200"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:ring-8 focus:ring-unicef-cyan/5 focus:border-unicef-cyan outline-none transition-all font-bold placeholder:text-slate-200"
                    placeholder="jane@unicef.org"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-unicef-cyan text-white rounded-full font-black shadow-xl shadow-unicef-cyan/30 hover:bg-unicef-blue hover:-translate-y-1 transition-all mt-4 text-sm uppercase tracking-widest"
                >
                  Download Report
                </button>
                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest px-4 pt-4 leading-relaxed">
                  Trusted by <span className="text-unicef-cyan font-black">4,400+</span> global donors.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-unicef-green p-12 rounded-[2.5rem] text-center shadow-2xl shadow-unicef-green/20 sticky top-24">
              <div className="w-24 h-24 bg-white text-unicef-green rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl">✓</div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Confirmed!</h3>
              <p className="text-white font-bold leading-relaxed mb-10 opacity-90">
                The {result.donorType} stewardship pack is on its way to your inbox.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full py-4 bg-unicef-dark text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Change Details
              </button>
            </div>
          )}
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <h4 className="font-black text-unicef-dark text-[10px] uppercase tracking-[0.3em] mb-6">Promote Visibility</h4>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-unicef-cyan/10 text-unicef-cyan rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-unicef-cyan hover:text-white transition-all">Share Result</button>
              <button className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
