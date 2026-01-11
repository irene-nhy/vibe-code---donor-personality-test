
import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Assessment from './components/Assessment';
import Results from './components/Results';
import AdminDashboard from './components/AdminDashboard';
import { AppState, AssessmentResult, DonorType } from './types';
import { QUESTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('landing');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);

  // Persistence logic for results (Admin Dashboard)
  const saveResult = useCallback((result: AssessmentResult) => {
    const stored = localStorage.getItem('donor_assessments');
    const allResults = stored ? JSON.parse(stored) : [];
    localStorage.setItem('donor_assessments', JSON.stringify([...allResults, result]));
  }, []);

  const calculateResults = (finalAnswers: Record<number, string>) => {
    // Initialize scores for all types defined in the enum
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

    // Calculate weighted scores
    QUESTIONS.forEach(q => {
      const selectedOptionId = finalAnswers[q.id];
      const option = q.options.find(o => o.id === selectedOptionId);
      if (option) {
        Object.entries(option.weights).forEach(([type, weight]) => {
          if (type in scores) {
            scores[type as DonorType] += weight || 0;
          }
        });
      }
    });

    // Find the donor type with the maximum score
    let winningType: DonorType | null = null;
    let maxScore = -1;

    // Use a defined order for consistency, but winner is determined by actual max score
    const types = Object.keys(scores) as DonorType[];
    types.forEach(type => {
      if (scores[type] > maxScore) {
        maxScore = scores[type];
        winningType = type;
      }
    });

    // Final fallback: If no questions answered or all 0, pick based on the first question's first answer logic or return null
    // Here we default to the first in the loop if maxScore is 0, but only if winningType was set
    const finalWinningType = winningType || DonorType.DEVOUT;

    const newResult: AssessmentResult = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      donorType: finalWinningType,
      scores,
    };

    setCurrentResult(newResult);
    setView('results');
    saveResult(newResult);
  };

  const handleAssessmentComplete = (finalAnswers: Record<number, string>) => {
    setAnswers(finalAnswers);
    calculateResults(finalAnswers);
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentResult(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('landing')}
          >
            <div className="w-10 h-10 bg-unicef-cyan rounded-full flex items-center justify-center text-white font-bold group-hover:bg-unicef-blue transition-colors overflow-hidden p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">UNICEF <span className="text-unicef-cyan">Insights</span></span>
          </div>
          
          <nav className="flex items-center gap-4">
            <button 
              onClick={() => setView('admin')}
              className="text-sm font-bold text-slate-500 hover:text-unicef-cyan transition-colors uppercase tracking-wider"
            >
              Analytics
            </button>
            {view !== 'landing' && view !== 'assessment' && (
              <button 
                onClick={resetAssessment}
                className="bg-unicef-cyan text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-unicef-blue transition-colors shadow-lg shadow-unicef-cyan/20"
              >
                Retake
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {view === 'landing' && <LandingPage onStart={() => setView('assessment')} />}
        {view === 'assessment' && <Assessment onComplete={handleAssessmentComplete} />}
        {view === 'results' && currentResult && (
          <Results 
            result={currentResult} 
            onSave={(userData) => {
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
            }} 
          />
        )}
        {view === 'admin' && <AdminDashboard />}
      </main>

      <footer className="bg-unicef-dark text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">UNICEF Insights</h4>
            <p className="text-sm leading-relaxed">
              Helping UNICEF understand the unique motivations of every individual donor to better serve children everywhere.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Navigation</h4>
            <ul className="text-sm space-y-2 font-bold">
              <li><button onClick={() => setView('landing')} className="hover:text-unicef-cyan transition-colors">Start Assessment</button></li>
              <li><button onClick={() => setView('admin')} className="hover:text-unicef-cyan transition-colors">Staff Dashboard</button></li>
              <li><a href="#" className="hover:text-unicef-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Connect</h4>
            <p className="text-sm">stewardship@unicef.org</p>
            <p className="text-xs mt-4">© 2026 UNICEF. For every child.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
