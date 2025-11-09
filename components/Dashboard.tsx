import React from 'react';
import { QuestionCategoryMetadata, InterviewQuestion } from '../types';
import Card from './ui/Card';

interface QuestionWithCategory extends InterviewQuestion {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
}

interface DashboardProps {
  categories: QuestionCategoryMetadata[];
  onCategoryClick: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: QuestionWithCategory[];
  onSearchResultClick: (questionId: string, categoryId: string) => void;
  isSearching: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ categories, onCategoryClick, searchTerm, setSearchTerm, searchResults, onSearchResultClick, isSearching }) => {
  const hasSearchTerm = searchTerm.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-6 md:mb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-lexend">
          Interview Prep Hub
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          Your comprehensive guide to mastering the data science interview landscape.
        </p>
        
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-md rounded-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 block w-full p-3 sm:p-4 placeholder-slate-500"
              placeholder="Search all questions (e.g., 'SQL joins', 'overfitting')..."
            />
          </div>
        </div>
      </div>

      {hasSearchTerm ? (
        <div className="fade-in">
          <h2 className="text-xl font-bold text-white mb-4 font-lexend">
            {isSearching ? 'Searching...' : `${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${searchTerm}"`}
          </h2>
          {isSearching ? (
             <div className="text-center py-16">
                 <div className="mx-auto w-16 h-16 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center text-2xl animate-spin">
                    <i className="fas fa-spinner"></i>
                 </div>
                <p className="text-slate-400 text-lg mt-4">Loading questions...</p>
              </div>
          ) : (
            <div className="space-y-3">
              {searchResults.length > 0 ? (
                searchResults.map((question) => (
                  <Card
                    key={question.id}
                    className="cursor-pointer transition-all duration-200 hover:border-sky-500/50 hover:bg-slate-800/50"
                    onClick={() => onSearchResultClick(question.id, question.categoryId)}
                  >
                    <div className="p-4">
                      <p className="font-medium text-slate-200 mb-2">{question.question}</p>
                      <div className="flex items-center gap-2 text-sm text-sky-400">
                        <i className={`fas ${question.categoryIcon} w-4 text-center`}></i>
                        <span>{question.categoryTitle}</span>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center text-2xl">
                      <i className="fas fa-search"></i>
                  </div>
                  <p className="text-slate-400 text-lg mt-4">No questions found.</p>
                  <p className="text-slate-500">Try searching for a different keyword.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="fade-in-delay">
          <h2 className="text-xl font-bold text-center text-white mb-6 font-lexend">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer group"
                onClick={() => onCategoryClick(category.id)}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500/10">
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white font-lexend">{category.title}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-4 flex-grow">{category.description}</p>
                   <div className="text-right text-sky-400/80 opacity-0 group-hover:opacity-100 transition-opacity mt-4">
                      View Questions <i className="fas fa-arrow-right text-xs ml-1"></i>
                    </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
