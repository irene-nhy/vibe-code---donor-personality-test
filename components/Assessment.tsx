
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
    
    // Auto-advance after small delay for better UX
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
    <div className="max-w-3xl mx-auto px-4 py-12 flex-grow flex flex-col justify-center">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
            Step {currentIndex + 1} of {QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-slate-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <h2 className="text-3xl font-bold text-slate-900 mb-10 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                group p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between
                ${answers[currentQuestion.id] === option.id 
                  ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-50' 
                  : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 bg-white'
                }
              `}
            >
              <span className={`text-lg font-medium ${answers[currentQuestion.id] === option.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                {option.text}
              </span>
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                ${answers[currentQuestion.id] === option.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200 group-hover:border-indigo-300'}
              `}>
                {answers[currentQuestion.id] === option.id && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors
            ${currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            disabled={!isAnswered}
            className={`
              px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all
              ${isAnswered 
                ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1' 
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
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all
              ${isAnswered 
                ? 'text-indigo-600 hover:bg-indigo-50' 
                : 'text-slate-300 cursor-not-allowed'}
            `}
          >
            Next
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
