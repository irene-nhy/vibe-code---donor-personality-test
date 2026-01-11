
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';

interface AssessmentProps {
  onComplete: (answers: Record<number, string>) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setIsTransitioning(false);
        }, 200);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const isAnswered = !!answers[currentQuestion.id];

  const handleFinish = () => {
    if (isAnswered) {
      onComplete(answers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 flex-grow flex flex-col justify-center">
      {/* Progress Bar */}
      <div className="mb-16">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-unicef-cyan uppercase tracking-[0.3em] block">Question Journey</span>
            <span className="text-2xl font-black text-slate-900">
              {currentIndex + 1} <span className="text-slate-300">/ {QUESTIONS.length}</span>
            </span>
          </div>
          <span className="text-xs font-black text-unicef-cyan uppercase tracking-widest bg-unicef-cyan/10 px-3 py-1 rounded-full">
            {Math.round(progress)}% Processed
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div 
            className="h-full bg-unicef-cyan rounded-full transition-all duration-700 ease-in-out relative" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 h-full w-4 bg-white/20 skew-x-12"></div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <h2 className="text-3xl font-black text-slate-900 mb-12 leading-tight uppercase tracking-tight">
          {currentQuestion.text}
        </h2>

        <div className="grid gap-5">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                group p-7 text-left rounded-3xl border-2 transition-all duration-300 flex items-center justify-between
                ${answers[currentQuestion.id] === option.id 
                  ? 'border-unicef-cyan bg-unicef-cyan/5 ring-8 ring-unicef-cyan/5' 
                  : 'border-slate-100 hover:border-unicef-cyan/30 hover:bg-slate-50 bg-white'
                }
              `}
            >
              <span className={`text-lg font-bold transition-colors ${answers[currentQuestion.id] === option.id ? 'text-unicef-dark' : 'text-slate-600'}`}>
                {option.text}
              </span>
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${answers[currentQuestion.id] === option.id ? 'border-unicef-cyan bg-unicef-cyan scale-110' : 'border-slate-200 group-hover:border-unicef-cyan/50'}
              `}>
                {answers[currentQuestion.id] === option.id && (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all
            ${currentIndex === 0 ? 'text-slate-200 cursor-not-allowed opacity-50' : 'text-slate-400 hover:text-unicef-cyan hover:bg-unicef-cyan/5'}
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            disabled={!isAnswered}
            className={`
              px-12 py-5 rounded-full font-black text-lg shadow-2xl transition-all uppercase tracking-widest
              ${isAnswered 
                ? 'bg-unicef-cyan text-white shadow-unicef-cyan/30 hover:bg-unicef-blue hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            Show My Results
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            disabled={!isAnswered}
            className={`
              flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all
              ${isAnswered 
                ? 'text-unicef-cyan bg-unicef-cyan/10 hover:bg-unicef-cyan/20' 
                : 'text-slate-300 cursor-not-allowed'}
            `}
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
