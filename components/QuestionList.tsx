import React, { useEffect, useRef, memo } from 'react';
import { QuestionCategory, InterviewQuestion } from '../types';
import QuestionDetail from './QuestionDetail';

interface QuestionListItemProps {
  question: InterviewQuestion;
  index: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const QuestionListItem: React.FC<QuestionListItemProps> = memo(({ question, index, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(question.id)}
      className={`w-full text-left p-4 text-sm font-medium border-l-4 transition-colors duration-150 flex items-start gap-3 ${
        isActive
          ? 'bg-slate-800 border-sky-500 text-white'
          : `border-transparent text-slate-300 hover:bg-slate-800/50 hover:text-slate-100 ${
              !isActive && index % 2 !== 0 ? 'bg-slate-900' : ''
            }`
      }`}
    >
      <span className={`font-mono text-xs pt-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>{index + 1}.</span>
      <span className="flex-1">{question.question}</span>
    </button>
  );
});

interface QuestionListProps {
  category: QuestionCategory | null;
  isLoading: boolean;
  activeQuestionId: string | null;
  onQuestionSelect: (id: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ category, isLoading, activeQuestionId, onQuestionSelect }) => {
  const detailPanelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
    }
  }, [activeQuestionId]);
  
  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-500">
               <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
              <p>Loading Questions...</p>
            </div>
          </div>
      )
  }
  
  if (!category) {
    return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-slate-500">
            <p>Category not found or failed to load.</p>
          </div>
        </div>
    )
  }

  const showList = !activeQuestionId;
  const showDetail = !!activeQuestionId;

  return (
    <div className="h-full flex fade-in">
      <div className={`h-full bg-slate-950 flex-col w-full ${showList ? 'flex' : 'hidden'}`}>
        <div className={`px-4 border-b border-slate-800 flex-shrink-0 h-16 flex items-center`}>
            <span className="bg-slate-800 text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {category.questions.length} Questions
            </span>
        </div>
        <div className="overflow-y-auto flex-grow">
          {category.questions.map((question, index) => (
            <QuestionListItem 
              key={question.id}
              question={question}
              index={index}
              isActive={activeQuestionId === question.id}
              onSelect={onQuestionSelect}
            />
          ))}
        </div>
      </div>

      <div ref={detailPanelRef} className={`flex-1 h-full overflow-y-auto ${showDetail ? 'block' : 'hidden'}`}>
        {activeQuestionId && category.questions.find(q => q.id === activeQuestionId) ? (
          <>
            <div className="flex items-center p-2 border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
                Back to Questions
              </button>
            </div>
            <QuestionDetail question={category.questions.find(q => q.id === activeQuestionId)!} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-500">
               <i className="fas fa-hand-pointer text-4xl mb-4"></i>
              <p>Select a question from the list to view its details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;