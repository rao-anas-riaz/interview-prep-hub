import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { categoryMetadata as categories } from './data/questions';
import { getCategoryData, loadAllQuestions } from './data/loader';
import Dashboard from './components/Dashboard';
import QuestionList from './components/QuestionList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { InterviewQuestion, QuestionCategory, QuestionCategoryMetadata } from './types';
import IridescenceBackground from './components/ui/IridescenceBackground';

interface QuestionWithCategory extends InterviewQuestion {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
}

const App: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeCategoryData, setActiveCategoryData] = useState<QuestionCategory | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  
  const [allQuestions, setAllQuestions] = useState<QuestionWithCategory[]>([]);
  const allQuestionsLoaded = useRef(false);

  useEffect(() => {
    const loadData = async (categoryId: string) => {
      setIsLoadingCategory(true);
      setActiveCategoryData(null);
      try {
        const data = await getCategoryData(categoryId);
        setActiveCategoryData(data);
      } catch (error) {
        console.error("Failed to load category data:", error);
        setActiveCategoryData(null); // Or handle error state
      } finally {
        setIsLoadingCategory(false);
      }
    };

    if (activeCategoryId) {
      loadData(activeCategoryId);
    } else {
      setActiveCategoryData(null);
    }
  }, [activeCategoryId]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const handleSetCategory = useCallback((categoryId: string | null) => {
    setActiveCategoryId(categoryId);
    setActiveQuestionId(null);
    setSearchTerm('');
    setIsMobileSidebarOpen(false);
  }, []);

  const handleQuestionSelect = useCallback((questionId: string, categoryId: string) => {
    if (activeCategoryId !== categoryId) {
       setActiveCategoryId(categoryId);
    }
    setActiveQuestionId(questionId);
    setSearchTerm('');
    setIsMobileSidebarOpen(false);
  }, [activeCategoryId]);
  
  const handleSearchTermChange = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setActiveCategoryId(null);
      setActiveQuestionId(null);
      if (!allQuestionsLoaded.current) {
        const loadedQuestions = await loadAllQuestions();
        setAllQuestions(loadedQuestions);
        allQuestionsLoaded.current = true;
      }
    }
  }

  const searchResults = useMemo((): QuestionWithCategory[] => {
    if (!searchTerm.trim()) return [];
    const lowercasedFilter = searchTerm.toLowerCase();
    
    return allQuestions.filter(q => 
      q.question.toLowerCase().includes(lowercasedFilter) ||
      q.concepts.toLowerCase().includes(lowercasedFilter) ||
      q.answer.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, allQuestions]);
  
  const activeCategoryMetadata = useMemo(() => {
    return categories.find(c => c.id === activeCategoryId) || null;
  }, [activeCategoryId]);

  const showDashboard = !activeCategoryId && searchTerm.trim().length === 0;
  const mainContentPadding = isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72';

  return (
    <div className="h-screen w-full flex bg-slate-900 text-slate-300 font-sans relative overflow-hidden">
      <IridescenceBackground isVisible={showDashboard} />
      <Sidebar 
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryClick={handleSetCategory}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <Header 
        onMenuClick={() => setIsMobileSidebarOpen(true)}
        categoryTitle={activeCategoryMetadata?.title}
      />
      <main className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${mainContentPadding} pt-16 lg:pt-0`}>
        <div className={`w-full ${showDashboard ? 'p-4 sm:p-6 lg:p-8' : 'h-full'}`}>
           {activeCategoryId === null ? (
             <Dashboard 
                categories={categories} 
                onCategoryClick={handleSetCategory}
                searchTerm={searchTerm}
                setSearchTerm={handleSearchTermChange}
                searchResults={searchResults}
                onSearchResultClick={handleQuestionSelect}
                isSearching={!!searchTerm.trim() && !allQuestionsLoaded.current}
              />
           ) : (
             <QuestionList 
                key={activeCategoryData?.id || 'loading'}
                category={activeCategoryData}
                isLoading={isLoadingCategory}
                activeQuestionId={activeQuestionId}
                onQuestionSelect={(qId) => setActiveQuestionId(qId)}
              />
           )}
        </div>
      </main>
    </div>
  );
};

export default App;