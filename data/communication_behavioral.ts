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
      },
      {
        id: 'comm-4',
        question: 'Tell me about a project where you implemented data validation and monitoring. What metrics did you track?',
        concepts: '**Data Quality, Monitoring, Proactive Problem Solving, STAR Method**. This question assesses your understanding of data reliability and operational excellence.',
        answer: 'Use the STAR method to structure your answer.\n- **S (Situation)**: "In my previous role, we had a critical dashboard for the sales team that was sourced from a nightly ETL pipeline. We discovered that the revenue numbers would occasionally be incorrect due to upstream data entry errors, which eroded trust in the data."\n- **T (Task)**: "My task was to design and implement a robust data validation and monitoring system to catch these errors before they reached the final dashboard and to alert the data team."\n- **A (Action)**: "I implemented a solution using Great Expectations within our Databricks pipeline. For each batch, I added a validation step that checked for key data quality metrics. We tracked: (1) **Null Counts**: ensuring critical columns like `transaction_id` were never null. (2) **Range Checks**: making sure `sale_amount` was always positive. (3) **Freshness**: verifying that the data was from the expected date. (4) **Uniqueness**: checking for duplicate transaction IDs. If any of these checks failed, the pipeline would halt and send an alert to a Slack channel."\n- **R (Result)**: "This new validation step caught three major data quality issues in the first month alone, preventing incorrect data from reaching stakeholders. It increased the data team\'s confidence in our pipeline and rebuilt the sales team\'s trust in the dashboard, leading to a 30% increase in its daily usage."',
        example: 'Focus on specific, quantifiable metrics you tracked and the direct business impact of your monitoring solution. Show that you think about data not just as a one-time analysis, but as a product that needs to be reliable.'
      },
      {
        id: 'comm-5',
        question: 'Share an example of a Databricks job optimization you performed. What cost or time improvements did you achieve?',
        concepts: '**Performance Tuning, Cost Optimization, Profiling, STAR Method**. This question evaluates your hands-on experience with big data performance and your ability to deliver business value through efficiency gains.',
        answer: 'Use the STAR method to frame your experience.\n- **S (Situation)**: "We had a daily Databricks job that processed user session data to generate product recommendations. The job was taking over 3 hours to run, which was delaying the availability of fresh recommendations and costing a significant amount in cluster compute time."\n- **T (Task)**: "My goal was to profile the job, identify the performance bottlenecks, and reduce the runtime by at least 50% while also lowering the cost."\n- **A (Action)**: "First, I used the Spark UI to analyze the job\'s execution DAG. I discovered a massive shuffle operation during a join between the large session table and a smaller product metadata table. The metadata table was small enough to fit in memory, so I refactored the code to use a **broadcast join**. I also noticed we were reading the full session table every day, so I partitioned the source data by date, allowing the job to only read the latest daily partition instead of scanning the entire history. Finally, I switched the cluster from standard VMs to memory-optimized VMs which were better suited for the workload."\n- **R (Result)**: "These changes had a huge impact. The broadcast join eliminated the shuffle bottleneck, and the partitioning reduced the data read from 500GB to just 10GB daily. The total job runtime **decreased from 3 hours to just 20 minutes** (an 88% reduction), and the daily compute **cost was reduced by over 60%**."',
        example: 'Be specific about the technical changes you made (e.g., "broadcast join", "partitioning", "changing instance type") and the quantifiable business outcomes (time and money saved). This demonstrates deep, practical expertise.'
      },
      {
        id: 'comm-6',
        question: 'If two team members misunderstand the requirement due to miscommunication, how will you resolve the situation?',
        concepts: '**Conflict Resolution**, **Active Listening**, **Clarification**. Demonstrates leadership and soft skills.',
        answer: 'Miscommunication is common. The goal is to align everyone without assigning blame.\n\n**Steps to Resolve:**\n1.  **Bring them together**: Host a quick sync call.\n2.  **Listen actively**: Let each person explain their understanding.\n3.  **Identify the gap**: Point out where the interpretations differ.\n4.  **Refer to source**: Check the original documentation or ask the product owner.\n5.  **Document the decision**: Update the ticket/docs so it doesn\'t happen again.',
        example: '"I noticed Dev A thought we needed a new API, while Dev B thought we were updating the old one. I called a 10-min sync, clarified we needed to update the old API to save time, and updated the Jira ticket with bold text to ensure clarity."'
      },
      {
        id: 'comm-7',
        question: 'Tell us about yourself and your current job responsibilities.',
        concepts: '**Elevator Pitch**, **Professional Summary**, **Relevance**. This is usually the first question in an interview and sets the tone.',
        answer: 'This is your "elevator pitch". Keep it concise (2-3 minutes) and structured:\n1.  **Present**: Briefly state your current role and key responsibilities (e.g., "I am currently a Data Analyst at X, where I maintain ETL pipelines and build Power BI dashboards...").\n2.  **Past**: Highlight relevant experience and education that led you here (e.g., "Before that, I worked in... where I honed my SQL skills...").\n3.  **Future**: Explain why you are interested in *this* specific role and how your background fits (e.g., "I\'m looking to move into a more engineering-focused role, which is why I\'m excited about this Data Engineer position...").',
        example: '"I am a Data Analyst with 4 years of experience specializing in business intelligence. Currently, at TechCorp, I lead the reporting for the marketing team, where I manage our SQL data warehouse and maintain a suite of Power BI dashboards used by 50+ stakeholders. Prior to this, I was a Junior Analyst at FinGroup, where I automated daily reporting using Python. I enjoy the technical challenge of optimizing data flows, which is why I\'m excited about this opportunity to work on larger-scale data infrastructure."'
      }
    ],
};

export default communicationBehavioralCategory;