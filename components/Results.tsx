
import React, { useState, useEffect } from 'react';
import { AssessmentResult, DonorType } from '../types';
import { DONOR_TYPES_INFO } from '../constants';

interface ResultsProps {
  result: AssessmentResult;
  onSave: (userData: { name: string; email: string; status: string }) => void;
}

const Results: React.FC<ResultsProps> = ({ result, onSave }) => {
  const [formData, setFormData] = useState({ name: '', email: '', status: 'current' });
  const [isSubmitted, setIsSubmitted] = useState(!!result.userData);
  const [showReveal, setShowReveal] = useState(false);
  
  const typeInfo = DONOR_TYPES_INFO[result.donorType];
  const sortedScores = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const timer = setTimeout(() => setShowReveal(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSubmitted(true);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${showReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-unicef-cyan/10 text-unicef-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-4">Discovery Complete</span>
        <h2 className="text-5xl lg:text-7xl font-black text-unicef-dark uppercase tracking-tighter mb-4 leading-none">Your Archetype is <span className="text-unicef-cyan">Revealed</span></h2>
        <p className="text-slate-400 font-bold max-w-xl mx-auto">Based on your responses, we've mapped your unique donor psychology and impact roadmap.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Main Personality Card */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative group">
            <div className={`h-4 ${typeInfo.color} group-hover:h-6 transition-all duration-500`}></div>
            
            <div className="p-10 lg:p-16">
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                  <div className={`w-32 h-32 lg:w-48 lg:h-48 rounded-[2.5rem] ${typeInfo.color} flex items-center justify-center text-6xl lg:text-8xl shadow-2xl transition-transform hover:scale-105 duration-500`}>
                    {typeInfo.icon}
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-unicef-yellow text-unicef-dark px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl rotate-12">
                    Superpower
                  </div>
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <span className="text-[10px] font-black text-unicef-cyan uppercase tracking-[0.4em] mb-2 block">The Foundational Identity</span>
                  <h1 className="text-5xl lg:text-7xl font-black text-unicef-dark uppercase tracking-tighter mb-6 leading-tight">
                    {result.donorType}
                  </h1>
                  <p className="text-2xl text-slate-500 font-bold leading-relaxed mb-8 italic border-l-8 border-unicef-slate pl-8 py-2">
                    "{typeInfo.description}"
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {typeInfo.characteristics.map((c, i) => (
                      <span key={i} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${typeInfo.color}`}></div>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mt-20 border-t border-slate-50 pt-16">
                <div>
                  <h3 className="text-sm font-black text-unicef-dark uppercase tracking-widest mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-unicef-cyan text-white flex items-center justify-center text-xs">01</span>
                    Persona Strength Matrix
                  </h3>
                  <div className="space-y-6">
                    {sortedScores.slice(0, 5).map(([type, score]) => (
                      <div key={type} className="group">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${type === result.donorType ? 'text-unicef-cyan' : 'text-slate-400'}`}>
                            {type}
                          </span>
                          <span className="text-[10px] font-black text-slate-300">{Math.round((score / 40) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden p-0.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${type === result.donorType ? DONOR_TYPES_INFO[type as DonorType].color : 'bg-slate-200'}`}
                            style={{ width: `${Math.max(5, (score / 40) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-sm font-black text-unicef-dark uppercase tracking-widest mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-unicef-green text-white flex items-center justify-center text-xs">02</span>
                    Action Roadmap
                  </h3>
                  <div className="space-y-4">
                    {typeInfo.priorityIssues.map((issue, i) => (
                      <div key={i} className="p-4 bg-unicef-slate rounded-2xl flex items-center gap-4 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm group-hover:bg-unicef-cyan group-hover:text-white transition-colors">🎯</div>
                        <span className="text-xs font-black text-unicef-dark uppercase tracking-widest">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Strip */}
          <div className="bg-unicef-dark rounded-[3rem] p-10 lg:p-16 text-white shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-unicef-cyan/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="text-center md:text-left flex-grow">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Join the {result.donorType} Collective</h3>
                <p className="text-slate-400 font-bold mb-8 max-w-lg">We’ve prepared a specific stewardship journey for you. It includes impact reporting, exclusive briefings, and a direct line to our field experts.</p>
                <div className="flex flex-wrap gap-4">
                  {typeInfo.opportunities.slice(0, 2).map((opp, i) => (
                    <div key={i} className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-unicef-cyan transition-colors cursor-pointer">
                      {opp}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-[2.5rem] p-4 rotate-6 group-hover:rotate-0 transition-transform duration-700">
                <img src="https://unicef.org/sites/default/files/styles/hero_mobile/public/UN0336215.jpg?itok=zE1x_k6h" className="w-full h-full object-cover rounded-2xl" alt="Impact" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Conversion */}
        <div className="lg:col-span-4 space-y-10">
          {!isSubmitted ? (
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 sticky top-24 ring-4 ring-unicef-slate transition-all hover:ring-unicef-cyan/20">
              <div className="w-16 h-16 bg-unicef-magenta text-white rounded-[1.2rem] flex items-center justify-center text-2xl shadow-xl shadow-unicef-magenta/30 mb-8 mx-auto -mt-16 animate-bounce-slow">
                💌
              </div>
              <h3 className="text-3xl font-black text-unicef-dark text-center mb-4 uppercase tracking-tighter">Get Your Pack</h3>
              <p className="text-slate-400 text-sm text-center mb-8 font-medium">Connect your <span className="text-unicef-cyan font-black">{result.donorType}</span> archetype to our global mission.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">My Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-unicef-cyan focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                    placeholder="E.g. David Beckham"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Impact Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-unicef-cyan focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                    placeholder="hello@world.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-unicef-cyan text-white rounded-full font-black shadow-xl shadow-unicef-cyan/30 hover:bg-unicef-blue hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest mt-4"
                >
                  Claim My Roadmap
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-unicef-green rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-unicef-green/30 sticky top-24 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner ring-4 ring-white/30">
                ⭐
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Pack Sent!</h3>
              <p className="font-bold mb-10 opacity-90">Check your inbox, {formData.name.split(' ')[0]}. Your stewardship journey begins now.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full py-4 bg-white text-unicef-green rounded-full font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all"
              >
                Change Email
              </button>
            </div>
          )}
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl text-center flex flex-col items-center">
             <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=u${i}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white shadow-sm bg-unicef-yellow text-unicef-dark flex items-center justify-center text-[10px] font-black">+8k</div>
            </div>
            <h4 className="font-black text-unicef-dark text-[10px] uppercase tracking-[0.3em] mb-2">Join the Movement</h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">Share your Archetype online</p>
            <div className="flex gap-4 w-full">
              <button className="flex-1 py-4 bg-unicef-cyan/10 text-unicef-cyan rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-unicef-cyan hover:text-white transition-all">Instagram</button>
              <button className="flex-1 py-4 bg-unicef-cyan/10 text-unicef-cyan rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-unicef-cyan hover:text-white transition-all">LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
