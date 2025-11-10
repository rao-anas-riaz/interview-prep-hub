import { QuestionCategory } from '../types';

const evaluationCategory: QuestionCategory = {
    id: 'evaluation',
    title: 'Experimentation & Evaluation',
    icon: 'fa-chart-line',
    description: 'Methods for testing hypotheses and evaluating the performance of models and products.',
    questions: [
        {
            id: 'eval-1',
            question: 'What metrics would you use for imbalanced classification, and why is accuracy misleading?',
            concepts: '**Imbalanced Classification**: A classification problem where the number of observations per class is not equally distributed.\n**Accuracy**: The ratio of correctly predicted observations to the total observations.\n**Precision**: The ratio of correctly predicted positive observations to the total predicted positive observations. Formula: TP / (TP + FP)\n**Recall (Sensitivity)**: The ratio of correctly predicted positive observations to all observations in the actual class. Formula: TP / (TP + FN)\n**F1-Score**: The harmonic mean of Precision and Recall. Formula: 2 * (Precision * Recall) / (Precision + Recall)',
            answer: '**Accuracy is misleading** because a model can achieve 99% accuracy on a fraud dataset by simply predicting "not fraud" every time. Better metrics are:\n- **Precision**: Of all my positive predictions, how many were actually correct? (Focuses on minimizing **false positives**).\n- **Recall**: Of all the actual positives, how many did I find? (Focuses on minimizing **false negatives**).\n- **F1-Score**: A single metric that balances precision and recall.\n- **AUC-ROC**: Measures the model\'s ability to distinguish between classes.',
            example: 'For a **cancer detection model**, **recall is the most important metric**. You want to find every real case of cancer, even if it means you get some false alarms (lower precision). **Missing a case (false negative) is the worst possible outcome**.\nFor an **email spam filter**, **precision is more important**. You want to be very sure that an email is spam before sending it to the spam folder, to avoid hiding important emails (false positives).',
        },
        {
            id: 'eval-2',
            question: 'What are common regression evaluation metrics?',
            concepts: '**Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), R-Squared (R²)**. These are metrics used to measure the performance of a regression model, which predicts continuous values.',
            answer: 'These metrics measure the error between predicted and actual values:\n- **MAE (Mean Absolute Error)**: The average absolute difference. Easy to interpret.\n- **RMSE (Root Mean Squared Error)**: The most common metric. It **penalizes large errors** more heavily than MAE.\n- **R-Squared (R²)**: Explains what **percentage of the variance** in the target is explained by your model. A score of 0.8 means your model explains 80% of the price variability.',
            example: 'When predicting house prices, an **RMSE of $25,000** means your model\'s predictions are typically off by about $25,000. An **R-squared of 0.75** means your features (square footage, location) explain 75% of the differences in house prices.',
        },
        {
            id: 'eval-3',
            question: 'What is cross-validation, and why is it useful?',
            concepts: '**Cross-Validation**: A resampling procedure used to evaluate machine learning models on a limited data sample. The most common form is k-fold cross-validation.',
            answer: 'Cross-validation provides a more **robust estimate of model performance** than a simple train-test split. In **k-fold cross-validation**:\n1. The data is split into **k** equal-sized folds (e.g., k=5).\n2. The model is trained **k times**. Each time, one fold is used as the test set, and the other k-1 folds are used for training.\n3. The final performance metric is the **average** of the metrics from the k runs.\n\nThis is useful because it ensures that every observation gets a chance to be in the test set, reducing the risk that the performance score was just a lucky result of one particular train-test split.',
            example: 'With **5-fold cross-validation**, you get five different accuracy scores (e.g., 85%, 87%, 84%, 88%, 86%). The final reported accuracy is the average, **86%**. This gives you much more confidence in the model\'s true performance than a single score from one train-test split.',
        },
        {
            id: 'eval-4',
            question: 'Walk me through how you\'d design an A/B test for a pricing change.',
            concepts: '**A/B Test**: A randomized experiment with two variants, A and B. It is a way to compare two versions of a single variable, typically by testing a subject\'s response to variant A against variant B, and determining which of the two variants is more effective.\n**Statistical Significance**: The probability that the observed difference between two groups is not due to random chance.',
            answer: 'Here is a step-by-step process:\n1. **Hypothesis**: State a clear, testable hypothesis. (e.g., "Changing the price from $10 to $12 will not significantly decrease conversion.")\n2. **Metrics**: Define your primary metric (e.g., conversion rate) and secondary metrics (e.g., revenue per user).\n3. **Randomization**: Randomly split users into a control group (A: $10) and a variant group (B: $12).\n4. **Sample Size**: Calculate the required sample size to ensure statistical significance.\n5. **Run & Analyze**: Run the test for a fixed period, then use a statistical test (e.g., chi-squared) to determine if the change in metrics is statistically significant (**p-value < 0.05**).',
            example: 'An e-commerce site wants to test a new checkout button color. They randomly show **50% of users the old green button (control)** and **50% the new blue button (variant)**. After one week, they measure which button had a statistically higher click-through rate.',
        },
        {
            id: 'eval-5',
            question: 'What is a confusion matrix and how do you interpret it?',
            concepts: '**Confusion Matrix**: A table used to describe the performance of a classification model. It visualizes where the model is making correct and incorrect predictions.\n**True Positive (TP)**: Correctly predicted positive.\n**True Negative (TN)**: Correctly predicted negative.\n**False Positive (FP)**: Incorrectly predicted positive (Type I Error).\n**False Negative (FN)**: Incorrectly predicted negative (Type II Error).',
            answer: 'A confusion matrix is a table that breaks down the performance of a classification model. It shows you exactly where the model is getting confused.\n\nThe matrix has four quadrants:\n- **True Positives (TP)**: The model correctly predicted "Yes".\n- **True Negatives (TN)**: The model correctly predicted "No".\n- **False Positives (FP)**: The model incorrectly predicted "Yes" (a false alarm).\n- **False Negatives (FN)**: The model incorrectly predicted "No" (a miss).\n\nAll the core classification metrics (Accuracy, Precision, Recall) can be calculated directly from this matrix.',
            example: 'Imagine a model that predicts if an email is spam.\n- **TP**: An email was spam, and the model correctly flagged it.\n- **TN**: An email was not spam, and the model correctly left it in the inbox.\n- **FP**: An email was not spam, but the model incorrectly sent it to the spam folder.\n- **FN**: An email was spam, but the model incorrectly left it in the inbox (the most dangerous error).\n---CODE_START---text\n          Predicted No   Predicted Yes\nActual No      [ TN ]         [ FP ]\nActual Yes     [ FN ]         [ TP ]\n---CODE_END---',
        },
        {
            id: 'eval-6',
            question: 'What are some common techniques for handling imbalanced datasets?',
            concepts: '**Imbalanced Dataset**: A dataset where the classes are not represented equally.\n**Resampling**: Techniques that modify a dataset to have a more balanced class distribution.\n**Oversampling**: Creating new synthetic samples in the minority class (e.g., SMOTE).\n**Undersampling**: Removing samples from the majority class.',
            answer: 'Training on an imbalanced dataset can lead to a biased model that just predicts the majority class. Besides using appropriate metrics like Precision and Recall, you can rebalance the data itself:\n1.  **Undersampling**: Randomly remove samples from the **majority class**. This is fast but you might lose important information.\n2.  **Oversampling**: Randomly duplicate samples from the **minority class**. This can lead to overfitting.\n3.  **SMOTE (Synthetic Minority Over-sampling TEchnique)**: A more advanced form of oversampling. It creates new **synthetic** minority class samples by interpolating between existing ones, rather than just duplicating them. This is often the most effective approach.',
            example: 'In a fraud detection dataset with 99% non-fraud and 1% fraud transactions:\n- **Undersampling** might remove a large number of non-fraud transactions to create a 50/50 split.\n- **SMOTE** would look at the few fraud transactions, and create new, artificial fraud examples that are similar but not identical, giving the model more diverse fraud patterns to learn from.',
        },
        {
            id: 'eval-7',
            question: 'What are Type I and Type II errors? Provide a business example.',
            concepts: '**Type I Error (False Positive)**: Rejecting a true null hypothesis. In business terms, it\'s a "false alarm".\n**Type II Error (False Negative)**: Failing to reject a false null hypothesis. In business terms, it\'s a "missed detection".',
            answer: 'These are two types of errors in statistical hypothesis testing, with different business consequences.\n- **Type I Error (False Positive)**: You incorrectly conclude there is an effect when there isn\'t one. The model says "Yes" when the real answer is "No".\n- **Type II Error (False Negative)**: You fail to detect an effect that is actually there. The model says "No" when the real answer is "Yes".\n\nThere is often a tradeoff: reducing one type of error may increase the other.',
            example: '**Scenario**: A model predicts if a machine part will fail.\n- **Type I Error**: The model predicts a part **will fail**, so you replace it. The part was actually fine. **Cost**: The cost of a new part and unnecessary maintenance.\n- **Type II Error**: The model predicts a part **will NOT fail**, so you leave it. The part then breaks, causing the entire assembly line to shut down. **Cost**: Catastrophic failure, massive downtime, and high repair costs.\nIn this case, a Type II error is far more costly, so you would tune the model to minimize false negatives.',
        },
    ],
};

export default evaluationCategory;