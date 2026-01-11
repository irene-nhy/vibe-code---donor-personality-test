
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';

interface AssessmentProps {
  onComplete: (answers: Record<number, string>) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setDirection('next');
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setIsTransitioning(false);
        }, 250);
      }
    }, 400);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 250);
    }
  };

  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const isAnswered = !!answers[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex-grow flex flex-col justify-center perspective-1000">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-unicef-cyan uppercase tracking-[0.4em] block">Your Path to Impact</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-unicef-dark">{currentIndex + 1}</span>
              <span className="text-slate-300 font-bold">of {QUESTIONS.length}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
             <span className="px-3 py-1 bg-unicef-cyan/10 text-unicef-cyan rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
               Analyzing...
             </span>
          </div>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner ring-1 ring-slate-200/50">
          <div 
            className="h-full bg-unicef-cyan rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 h-full w-8 bg-white/20 -skew-x-12 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ${isTransitioning ? (direction === 'next' ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12') : 'opacity-100 translate-x-0'}`}>
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-black text-unicef-dark mb-4 uppercase tracking-tighter leading-[1.1]">
            {currentQuestion.text}
          </h2>
          <p className="text-slate-400 font-medium">Choose the answer that feels most authentic to you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                group p-6 lg:p-8 text-left rounded-[2rem] border-2 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden card-float
                ${answers[currentQuestion.id] === option.id 
                  ? 'border-unicef-cyan bg-unicef-cyan text-white shadow-2xl shadow-unicef-cyan/40 -translate-y-2' 
                  : 'border-white bg-white hover:border-unicef-cyan/20 shadow-xl shadow-slate-200/50 text-slate-700'
                }
              `}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {answers[currentQuestion.id] === option.id && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -mr-8 -mt-8 rounded-full blur-2xl"></div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black transition-all ${answers[currentQuestion.id] === option.id ? 'bg-white text-unicef-cyan border-white' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {answers[currentQuestion.id] === option.id && (
                   <svg className="w-6 h-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <span className={`text-lg lg:text-xl font-black uppercase leading-tight tracking-tight ${answers[currentQuestion.id] === option.id ? 'text-white' : 'text-unicef-dark'}`}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isTransitioning}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all
            ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-unicef-cyan hover:bg-unicef-cyan/5'}
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        {isLastQuestion && isAnswered && !isTransitioning ? (
          <button
            onClick={() => onComplete(answers)}
            className="px-10 py-5 bg-unicef-magenta text-white rounded-full font-black text-lg shadow-2xl shadow-unicef-magenta/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest animate-bounce-slow"
          >
            Discover My Persona
          </button>
        ) : (
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic animate-pulse">
            Your selection will auto-advance
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
