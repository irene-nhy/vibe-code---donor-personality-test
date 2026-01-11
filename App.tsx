
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
    // Fix: Corrected DonorType member names and initialized all required keys for Record<DonorType, number>
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

    // Determine winning type
    // Fix: Updated default winningType to a valid DonorType member
    let winningType = DonorType.DEVOUT;
    let maxScore = -1;

    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winningType = type as DonorType;
      }
    });

    const newResult: AssessmentResult = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      donorType: winningType,
      scores,
    };

    setCurrentResult(newResult);
    setView('results');
    // Save to local storage for admin view
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
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('landing')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-indigo-700 transition-colors">
              D
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">DonorVision</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <button 
              onClick={() => setView('admin')}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Admin Dashboard
            </button>
            {view !== 'landing' && view !== 'assessment' && (
              <button 
                onClick={resetAssessment}
                className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors"
              >
                Restart Test
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
              // In a real app, we'd update the record in the DB here
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

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-white font-bold mb-4">About DonorVision</h4>
            <p className="text-sm leading-relaxed">
              Empowering organizations to build lasting relationships through deep donor understanding and psychological insights.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><button onClick={() => setView('landing')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setView('admin')} className="hover:text-white transition-colors">Admin Dashboard</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Support</h4>
            <p className="text-sm">support@donorvision.io</p>
            <p className="text-xs mt-4">© 2026 DonorVision. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
