
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-unicef-cyan/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-unicef-green/5 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-unicef-cyan text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            3-Minute Donor Profile
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.1] uppercase tracking-tight">
            For Every Child, <br/>
            <span className="text-unicef-cyan">Your Support</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-medium">
            Discover how your personal values translate into impact. Take our psychological assessment to uncover your donor personality and find your unique path to helping children.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button
              onClick={onStart}
              className="px-10 py-5 bg-unicef-cyan text-white rounded-full font-black text-lg shadow-xl shadow-unicef-cyan/30 hover:bg-unicef-blue hover:-translate-y-1 transition-all active:translate-y-0 uppercase tracking-widest"
            >
              Start My Profile
            </button>
            <button className="px-10 py-5 bg-white text-unicef-cyan border-2 border-unicef-cyan rounded-full font-black text-lg hover:bg-unicef-cyan hover:text-white transition-all uppercase tracking-widest">
              Impact Stories
            </button>
          </div>
          
          <div className="mt-14 flex items-center gap-6 justify-center lg:justify-start border-t border-slate-100 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?u=unicef${i}`}
                  alt="Donor"
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-bold">
              Over <span className="text-unicef-cyan font-black">4,400+</span> individuals analyzed.
            </p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 ring-1 ring-slate-100/50">
            <div className="space-y-8">
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-unicef-slate border border-slate-200 animate-pulse">
                <div className="w-14 h-14 bg-unicef-cyan/20 rounded-full flex items-center justify-center text-3xl">🕊️</div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-slate-200 rounded-full w-4/5"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border-2 border-unicef-cyan ml-10 scale-110 shadow-xl shadow-unicef-cyan/10">
                <div className="w-16 h-16 bg-unicef-cyan text-white rounded-full flex items-center justify-center text-3xl font-bold">✊</div>
                <div className="flex-1">
                  <div className="h-5 bg-slate-800 rounded-full w-2/3 mb-2"></div>
                  <div className="text-[10px] text-unicef-cyan font-black uppercase tracking-widest">Activist Persona</div>
                </div>
              </div>
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-unicef-slate border border-slate-200">
                <div className="w-14 h-14 bg-unicef-green/20 rounded-full flex items-center justify-center text-3xl">🏙️</div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-slate-200 rounded-full w-4/5"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-unicef-yellow rounded-full -z-0 opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-unicef-magenta rounded-full -z-0 opacity-10 blur-3xl"></div>
        </div>
      </div>

      <div className="bg-unicef-slate py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-sm font-black text-unicef-cyan uppercase tracking-[0.3em] mb-4">Methodology</h2>
          <h2 className="text-4xl font-black text-unicef-dark mb-16 uppercase">The Science of Giving</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100">
              <div className="w-16 h-16 bg-unicef-cyan text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-8 rotate-3 group-hover:rotate-0 transition-transform">01</div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Psychographics</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Answer tailored questions mapping your values to established donor dimensions.</p>
            </div>
            <div className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100">
              <div className="w-16 h-16 bg-unicef-yellow text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-8 -rotate-3 group-hover:rotate-0 transition-transform">02</div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Type Discovery</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Our logic engine identifies your dominant profile from 8 scientifically-defined segments.</p>
            </div>
            <div className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100">
              <div className="w-16 h-16 bg-unicef-green text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-8 rotate-6 group-hover:rotate-0 transition-transform">03</div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Impact Roadmap</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Get a personalized stewardship plan to maximize your contribution to every child.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
