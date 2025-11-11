// FIX: Imported `InterviewQuestion` to resolve a 'Cannot find name' error on line 56.
import { QuestionCategory, InterviewQuestion } from '../types';
import { categoryMetadata } from './questions';

// This interface is needed for the dynamic import module mapping
interface QuestionModule {
  default: QuestionCategory;
}

// Type assertion for the dynamically imported module
type DynamicImportType = () => Promise<QuestionModule>;

export const getCategoryData = async (categoryId: string): Promise<QuestionCategory | null> => {
  let importFn: DynamicImportType | undefined;
  switch (categoryId) {
    case 'stats_foundations':
      importFn = () => import('./statistics_foundations');
      break;
    case 'sql':
      importFn = () => import('./sql');
      break;
    case 'python_core':
      importFn = () => import('./python_core');
      break;
    case 'data_manipulation':
      importFn = () => import('./data_manipulation');
      break;
    case 'data_analysis':
      importFn = () => import('./data_analysis');
      break;
    case 'ml_modeling':
      importFn = () => import('./ml_modeling');
      break;
    case 'ml_algorithms_scratch':
      importFn = () => import('./ml_algorithms_scratch');
      break;
    case 'evaluation':
      importFn = () => import('./evaluation');
      break;
    case 'pyspark':
      importFn = () => import('./pyspark');
      break;
    case 'power_bi':
      importFn = () => import('./power_bi');
      break;
    case 'mlops_deployment':
      importFn = () => import('./mlops_deployment');
      break;
    case 'langchain':
      importFn = () => import('./langchain');
      break;
    case 'communication_behavioral':
      importFn = () => import('./communication_behavioral');
      break;
    default:
      return null;
  }
  
  if (!importFn) {
    console.error(`No import function found for categoryId: ${categoryId}`);
    return null;
  }

  const module = await importFn();
  return module.default;
};

interface QuestionWithCategory extends InterviewQuestion {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
}

export const loadAllQuestions = async (): Promise<QuestionWithCategory[]> => {
    const allCategoryIds = categoryMetadata.map(c => c.id);
    const allCategoryData = await Promise.all(
        allCategoryIds.map(id => getCategoryData(id))
    );
    
    const allQuestions: QuestionWithCategory[] = [];

    allCategoryData.forEach(category => {
        if (category) {
            category.questions.forEach(q => {
                allQuestions.push({
                    ...q,
                    categoryId: category.id,
                    categoryTitle: category.title,
                    categoryIcon: category.icon,
                });
            });
        }
    });

    return allQuestions;
}