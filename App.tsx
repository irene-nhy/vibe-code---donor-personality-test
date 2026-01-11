
import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Assessment from './components/Assessment';
import Results from './components/Results';
import AdminDashboard from './components/AdminDashboard';
import { AppState, AssessmentResult, DonorType } from './types';
import { QUESTIONS, DONOR_TYPES_INFO } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppState | 'calculating'>('landing');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [loadingText, setLoadingText] = useState('Analyzing your values...');

  const saveResult = useCallback((result: AssessmentResult) => {
    const stored = localStorage.getItem('donor_assessments');
    const allResults = stored ? JSON.parse(stored) : [];
    localStorage.setItem('donor_assessments', JSON.stringify([...allResults, result]));
  }, []);

  const runCalculation = (finalAnswers: Record<number, string>) => {
    setView('calculating');
    
    // Antimation loop for the "Calculating" state
    const phrases = [
      "Analyzing giving motivations...",
      "Mapping impact priorities...",
      "Identifying your donor superpower...",
      "Generating your stewardship roadmap...",
      "Finalizing your archetype..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(phrases[i % phrases.length]);
      i++;
    }, 800);

    // Actual calculation
    setTimeout(() => {
      clearInterval(interval);
      const scores: Record<DonorType, number> = {
        [DonorType.DEVOUT]: 0,
        [DonorType.REALIST]: 0,
        [DonorType.INNER_PEACE_SEEKER]: 0,
        [DonorType.ACTIVIST]: 0,
        [DonorType.COMMUNITARIAN]: 0,
        [DonorType.ADVOCATE]: 0,
        [DonorType.NETWORKER]: 0,
        [DonorType.RECOGNITION_SEEKER]: 0,
      };

      QUESTIONS.forEach(q => {
        const selectedOptionId = finalAnswers[q.id];
        const option = q.options.find(o => o.id === selectedOptionId);
        if (option) {
          Object.entries(option.weights).forEach(([type, weight]) => {
            scores[type as DonorType] += weight || 0;
          });
        }
      });

      let winningType: DonorType = DonorType.DEVOUT;
      let maxScore = -1;
      (Object.keys(scores) as DonorType[]).forEach(type => {
        if (scores[type] > maxScore) {
          maxScore = scores[type];
          winningType = type;
        }
      });

      const newResult: AssessmentResult = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        donorType: winningType,
        scores,
      };

      setCurrentResult(newResult);
      saveResult(newResult);
      setView('results');
      
      // Confetti reveal
      if ((window as any).confetti) {
        (window as any).confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00adef', '#ffc20e', '#80bc00', '#d80b8c']
        });
      }
    }, 3500);
  };

  const handleAssessmentComplete = (finalAnswers: Record<number, string>) => {
    setAnswers(finalAnswers);
    runCalculation(finalAnswers);
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentResult(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-unicef-cyan/30">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-unicef-cyan rounded-full flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform p-1">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">UNICEF <span className="text-unicef-cyan">Insights</span></span>
          </div>
          <nav className="flex items-center gap-6">
            <button onClick={() => setView('admin')} className="text-[10px] font-black text-slate-400 hover:text-unicef-cyan transition-colors uppercase tracking-[0.2em]">Dashboard</button>
            {view !== 'landing' && view !== 'assessment' && view !== 'calculating' && (
              <button onClick={resetAssessment} className="bg-unicef-cyan text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-unicef-cyan/20 transition-all">Reset</button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative">
        {view === 'landing' && <LandingPage onStart={() => setView('assessment')} />}
        {view === 'assessment' && <Assessment onComplete={handleAssessmentComplete} />}
        
        {view === 'calculating' && (
          <div className="flex-grow flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-unicef-cyan/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-unicef-cyan rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-unicef-cyan/5 rounded-full flex items-center justify-center text-4xl animate-bounce-slow">
                🔍
              </div>
            </div>
            <h2 className="text-3xl font-black text-unicef-dark mb-4 uppercase tracking-tighter">{loadingText}</h2>
            <div className="max-w-xs w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className="bg-unicef-cyan h-full animate-[progress_3.5s_ease-in-out_infinite]" style={{width: '60%'}}></div>
            </div>
          </div>
        )}

        {view === 'results' && currentResult && (
          <Results result={currentResult} onSave={(userData) => {
            const updated = { ...currentResult, userData };
            setCurrentResult(updated);
            const stored = localStorage.getItem('donor_assessments');
            if (stored) {
              const results = JSON.parse(stored);
              const index = results.findIndex((r: any) => r.id === currentResult.id);
              if (index !== -1) {
                results[index] = updated;
                localStorage.setItem('donor_assessments', JSON.stringify(results));
              }
            }
          }} />
        )}
        {view === 'admin' && <AdminDashboard />}
      </main>

      <footer className="bg-unicef-dark text-slate-500 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest">© 2026 UNICEF. For every child.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-unicef-cyan transition-colors text-[10px] font-black uppercase tracking-widest">Privacy</a>
            <a href="#" className="hover:text-unicef-cyan transition-colors text-[10px] font-black uppercase tracking-widest">Global Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
