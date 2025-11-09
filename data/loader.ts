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
    case 'foundations':
      importFn = () => import('./foundations');
      break;
    case 'data_analysis':
      importFn = () => import('./data_analysis');
      break;
    case 'python_general':
      importFn = () => import('./python_general');
      break;
    case 'python_ds':
      importFn = () => import('./python_ds');
      break;
    case 'python_challenges':
      importFn = () => import('./python_challenges');
      break;
    case 'sql':
      importFn = () => import('./sql');
      break;
    case 'pyspark':
      importFn = () => import('./pyspark');
      break;
    case 'ml_modeling':
      importFn = () => import('./ml_modeling');
      break;
    case 'evaluation':
      importFn = () => import('./evaluation');
      break;
    case 'mlops_deployment':
      importFn = () => import('./mlops_deployment');
      break;
    case 'communication_behavioral':
      importFn = () => import('./communication_behavioral');
      break;
    default:
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
