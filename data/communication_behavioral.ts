import { QuestionCategory } from '../types';

const communicationBehavioralCategory: QuestionCategory = {
    id: 'communication_behavioral',
    title: 'Communication & Behavioral',
    icon: 'fa-comments',
    description: 'Assessing your ability to communicate complex ideas and reflect on your work.',
    questions: [
      {
        id: 'comm-1',
        question: 'You built a model that’s 10% more accurate – how do you explain its value to a non-technical exec?',
        concepts: '**Business Impact, KPI (Key Performance Indicator), Stakeholder Communication**. The focus is on translating a technical improvement into a tangible business outcome.',
        answer: '**Avoid technical jargon**. Translate the "10% more accurate" into a direct impact on a key business metric like **revenue, cost, or efficiency**.\n\nStructure your explanation like this:\n- **"The new model is 10% more accurate at..."** (State the technical improvement simply)\n- **"...which means we can now..."** (State the new business capability)\n- **"...and we project this will..."** (State the quantifiable business outcome)',
        example: '**Instead of**: "We improved model F1-score by 10%."\n\n**Say**: "Our new fraud model is **10% better at catching fraudulent transactions**. This means we can block more fraud in real time, and we project this will **save the company $500,000 this year**."',
      },
      {
        id: 'comm-2',
        question: 'Tell me about your most impactful project using the S.T.A.R. method.',
        concepts: '**STAR Method**: A structured manner of responding to a behavioral-based interview question by discussing the specific Situation, Task, Action, and Result of the situation you are describing.',
        answer: 'The STAR method is a framework for telling a concise story about your work.\n- **S (Situation)**: Briefly describe the context and the problem.\n- **T (Task)**: State your specific responsibility in the project.\n- **A (Action)**: Detail the key steps you took to solve the problem. This should be the longest part of your answer.\n- **R (Result)**: Quantify the outcome. What was the measurable impact of your work on the business?',
        example: '- **S**: Customer churn was high at 5% per month.\n- **T**: My task was to build a model to identify high-risk customers.\n- **A**: I analyzed user data, engineered features for engagement, trained an XGBoost model, and deployed it.\n- **R**: The model identified at-risk users with 85% accuracy. The retention team used this to create targeted campaigns, which **reduced churn by 15% and saved an estimated $50k per quarter**.',
      },
      {
        id: 'comm-3',
        question: 'Tell me about a time a project failed. What did you learn?',
        concepts: '**Resilience, Accountability, Learning Mindset**. This question assesses your ability to handle setbacks, take ownership of mistakes, and grow from experience.',
        answer: 'Choose a real, but not catastrophic, failure. Structure your answer to highlight what you learned.\n1. **Be Honest and Take Ownership**: Clearly explain the project and why it failed. Don\'t blame others.\n2. **Focus on the "Why"**: Analyze the root cause. Was it a technical issue, a planning failure, or a communication breakdown?\n3. **Emphasize the Learnings**: What did you learn from the experience? What process changes did you make to prevent it from happening again?\n4. **End on a Positive Note**: Explain how this experience has made you a better analyst/scientist.',
        example: '**Situation**: We launched a recommendation model that performed poorly, decreasing user engagement.\n**Reason for Failure**: We failed to account for a "cold start" problem for new users, so they received irrelevant recommendations.\n**Learning**: I learned the critical importance of testing for edge cases and segmenting users. Now, I always build a separate, simpler baseline model for new users and have a more rigorous pre-launch QA checklist.',
      }
    ],
};

export default communicationBehavioralCategory;
