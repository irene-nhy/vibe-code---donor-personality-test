
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Takes only 3 minutes
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Discover Your <span className="text-indigo-600">Giving Personality</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Every donor is unique. Take our evidence-based assessment to uncover your philanthropic motivations and find the most meaningful ways to make an impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:translate-y-0"
            >
              Start My Assessment
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i + 20}/64/64`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Join <span className="text-slate-900 font-bold">2,500+</span> donors who found their path.
            </p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 animate-pulse">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">❤️</div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 ml-6 scale-105 shadow-md">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🤝</div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-800 rounded w-2/3 mb-2"></div>
                  <div className="text-xs text-slate-500">Community Builder Profile</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📈</div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl rotate-12 -z-0 opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600 rounded-full -z-0 opacity-10 blur-xl"></div>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Answer Questions</h3>
              <p className="text-slate-600">Complete a short series of psychological prompts about your values and giving habits.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">View Analysis</h3>
              <p className="text-slate-600">Our engine calculates your primary giving dimension and creates a detailed profile.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Connect Better</h3>
              <p className="text-slate-600">Get personalized recommendations on how to engage with causes you care about most.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
