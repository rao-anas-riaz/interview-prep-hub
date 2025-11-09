import { QuestionCategory } from '../types';

const mlModelingCategory: QuestionCategory = {
    id: 'ml_modeling',
    title: 'Machine Learning Modeling',
    icon: 'fa-robot',
    description: 'Concepts related to building, training, and understanding machine learning models.',
    questions: [
      {
        id: 'ml-1',
        question: 'What is the difference between Linear Regression and Logistic Regression?',
        concepts: '**Linear Regression**: A model for predicting a **continuous** target variable.\n**Logistic Regression**: A model for predicting a **categorical** (binary) target variable.',
        answer: 'The key difference is the **type of output** they predict.\n- **Linear Regression** predicts a **continuous value**. Its output can be any number (e.g., price, temperature).\n- **Logistic Regression** predicts a **probability** that an input belongs to a certain class. Its output is always between 0 and 1, which is then mapped to a class (e.g., Yes/No, True/False).',
        example: 'Use **Linear Regression** to predict a house\'s **price in dollars**. Use **Logistic Regression** to predict **whether or not a customer will churn** (a yes/no outcome).',
      },
      {
        id: 'ml-2',
        question: 'What happens if you apply a linear regression model to a non-linear dataset?',
        concepts: '**Linear Regression**: A statistical model that assumes a linear relationship between the independent and dependent variables.\n**Non-linear Data**: Data where the relationship between variables cannot be represented by a straight line.',
        answer: 'Applying a linear regression model to inherently non-linear data will result in a model with **high bias (underfitting)**. The model will fail to capture the underlying trend, leading to **poor predictive performance** on both the training and test sets. The straight line of the model will be a poor approximation of the curved pattern in the data.',
        example: 'Imagine trying to predict a company\'s user growth, which follows an **exponential curve**. A linear regression model would just draw a **straight line** through the curve, severely underestimating future growth and overestimating past growth. A more appropriate model would be a polynomial regression or another non-linear model that can capture the curve.',
      },
      {
        id: 'ml-3',
        question: 'How does a Decision Tree work?',
        concepts: '**Decision Tree**: A non-parametric supervised learning method used for classification and regression. It is a tree-like model of decisions where each internal node represents a "test" on an attribute, each branch represents the outcome of the test, and each leaf node represents a class label or continuous value.',
        answer: 'A decision tree makes predictions by learning a series of **if/else questions** about the features. It recursively splits the data on the feature that best separates the target variable, aiming to create "pure" leaf nodes (nodes containing mostly one class).\n\nFor example, to predict if someone will play tennis, it might ask:\n1. Is the **outlook sunny**? (Yes/No)\n2. Is the **humidity high**? (Yes/No)\n3. Is the **wind strong**? (Yes/No)\nBy following the path down the tree, you arrive at a final prediction.',
        example: 'A bank uses a decision tree to classify loan applications. The first split might be on **`credit_score > 700`**. The next split under the "Yes" branch might be on **`income > $50,000`**. Each leaf node would be a final decision: "Approve" or "Deny".',
      },
      {
        id: 'ml-4',
        question: 'What are the main differences between Bagging and Boosting?',
        concepts: '**Bagging (Bootstrap Aggregating)**: An ensemble technique where multiple independent models are trained **in parallel** on different random subsets of the training data. Their predictions are then averaged to produce a final result. The goal is to **reduce variance**.\n**Boosting**: An ensemble technique where models are trained **sequentially**. Each new model focuses on correcting the errors made by the previous ones. The goal is to **reduce bias**.',
        answer: 'Both combine many "weak" decision trees into one "strong" model, but they do it differently.\n- **Bagging** (e.g., Random Forest): Trains trees **in parallel** on random data samples. It averages their predictions to **reduce variance**.\n- **Boosting** (e.g., XGBoost): Trains trees **sequentially**. Each new tree focuses on fixing the mistakes of the previous one to **reduce bias**.',
        example: '**Bagging** is like getting a second opinion from many independent doctors. **Boosting** is like seeing a series of specialists, where each one refines the diagnosis of the last.',
      },
      {
        id: 'ml-5',
        question: 'Explain Random Forest. Why is it said to reduce variance?',
        concepts: '**Random Forest**: An ensemble learning method that operates by constructing a multitude of decision trees at training time. It uses bagging and feature randomness.\n**Variance**: The error from sensitivity to small fluctuations in the training set.',
        answer: 'This is a common misconception. The primary strength of Random Forest is that it significantly **reduces *variance*, not bias**. Individual decision trees in the ensemble are typically deep, meaning they have **low bias but very high variance** (they overfit to their specific subset of data). By averaging the predictions of many different, uncorrelated trees (thanks to bagging and feature randomness), Random Forest cancels out the noise and **reduces this high variance**, resulting in a robust model that generalizes well.',
        example: 'Think of one deep decision tree as a single, **overconfident expert** who has studied a small part of a problem. They might have a low-bias view but are highly variable. A Random Forest is like a **committee of these experts**. Each has their own high-variance opinion, but by averaging their votes, the committee\'s final decision is much more stable, reliable, and has **lower overall variance** than any single expert.',
      },
       {
        id: 'ml-6',
        question: 'What is Gradient Boosting and what makes XGBoost so powerful?',
        concepts: '**Gradient Boosting**: A machine learning technique for regression and classification problems, which produces a prediction model in the form of an ensemble of weak prediction models, typically decision trees. It builds the model in a stage-wise fashion like other boosting methods do, and it generalizes them by allowing optimization of an arbitrary differentiable loss function.\n**XGBoost**: An optimized distributed gradient boosting library designed to be highly efficient, flexible and portable.',
        answer: 'Gradient Boosting is a powerful boosting algorithm where new trees are trained to correct the **residuals (errors)** of the previous trees. It uses gradient descent to minimize the loss when adding new models.\n\n**XGBoost (Extreme Gradient Boosting)** is a popular implementation that is so effective because of:\n- **Regularization**: It has built-in L1 and L2 regularization, which helps prevent overfitting.\n- **Parallel Processing**: It can train on multiple CPU cores, making it much faster.\n- **Handling Missing Values**: It has a smart, built-in way to handle missing data.',
        example: 'XGBoost is often the winning algorithm in Kaggle competitions. For a problem like predicting customer churn, XGBoost can effectively model complex interactions between features like `monthly_charges`, `tenure`, and `contract_type` to achieve state-of-the-art accuracy.',
      },
      {
        id: 'ml-7',
        question: 'Logistic Regression vs. Random Forest – how do you pick one for a real business problem?',
        concepts: '**Logistic Regression**: A linear model for binary classification that is highly interpretable.\n**Random Forest**: An ensemble of decision trees that is non-linear, generally more powerful, but less interpretable.',
        answer: 'The choice is a tradeoff between **interpretability** and **predictive power**.\n- Use **Logistic Regression** when you need to **explain** the results. Its coefficients tell you the "why" behind a prediction.\n- Use **Random Forest** when you need the **best possible accuracy**. It automatically handles complex, non-linear patterns but is harder to interpret.',
        example: '**A bank uses Logistic Regression** for loan decisions because they must legally explain why someone was denied. **An e-commerce site uses Random Forest** for product recommendations because showing the most relevant item is more important than explaining the choice.',
      },
      {
        id: 'ml-8',
        question: 'How do you know your model is overfitting without looking at code?',
        concepts: '**Overfitting**: A modeling error that occurs when a function is too closely fit to a limited set of data points. An overfit model has high variance and low bias.\n**Generalization**: The ability of a model to adapt properly to new, previously unseen data, drawn from the same distribution as the one used to create the model.',
        answer: 'The classic sign is a **large performance gap between your training and test data**.\n- If your model has **99% accuracy on the training set** (data it has seen before)... \n- ...but **only 75% accuracy on the test set** (new data)... \n...it is **overfitting**. It has "memorized" the training data instead of learning a general rule.',
        example: 'You build a model to predict house prices. On your training data, its error is only **$1,000**. On new houses in the test set, its error jumps to **$50,000**. This massive drop in performance indicates overfitting.',
      },
       {
        id: 'ml-9',
        question: 'What is regularization and why is it useful?',
        concepts: '**Regularization**: A technique used to prevent overfitting by adding a penalty term to the model\'s loss function. L1 (Lasso) and L2 (Ridge) are the most common types.',
        answer: '**Regularization** is a technique to **prevent overfitting** by penalizing model complexity. It keeps the model from learning noise.\n- **L1 Regularization (Lasso)**: Can shrink feature coefficients to **exactly zero**, effectively acting as a form of **automatic feature selection**.\n- **L2 Regularization (Ridge)**: Shrinks coefficients **towards zero** but not completely. It is useful for handling correlated features.',
        example: 'In a model with 100 features, **L1 regularization** might find that only 20 are truly predictive, setting the coefficients for the other 80 to zero. This simplifies the model and makes it more robust.',
      },
      {
        id: 'ml-10',
        question: 'What is dimensionality reduction and why is it useful?',
        concepts: '**Dimensionality Reduction**: The process of reducing the number of random variables or features under consideration, via obtaining a set of principal variables. The most common technique is PCA.',
        answer: 'It\'s the process of **reducing the number of features** in a dataset while retaining as much important information as possible.\n\nWhy it\'s useful:\n- **Prevents the "curse of dimensionality"** and reduces overfitting.\n- **Speeds up model training**.\n- **Allows for visualization** of high-dimensional data.',
        example: 'A dataset of customer behavior might have 500 features. Using **Principal Component Analysis (PCA)**, you could reduce this to 20 "principal components" that capture the most important patterns, making it much easier and faster to train a churn prediction model.',
      },
    ],
};

export default mlModelingCategory;
