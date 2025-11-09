import { QuestionCategory } from '../types';

const foundationsCategory: QuestionCategory = {
    id: 'foundations',
    title: 'Data Science Foundations',
    icon: 'fa-landmark',
    description: 'Core concepts that form the basis of data science and machine learning.',
    questions: [
      {
        id: 'foundations-1',
        question: 'What is the difference between AI, ML, Deep Learning, and Data Science?',
        concepts: '**Artificial Intelligence (AI)**: A broad field of computer science concerned with building smart machines capable of performing tasks that typically require human intelligence.\n**Machine Learning (ML)**: A subset of AI that gives computers the ability to learn without being explicitly programmed.\n**Deep Learning (DL)**: A subfield of ML that uses neural networks with many layers (deep neural networks) to learn from large amounts of data. It excels at complex pattern recognition.\n**Data Science (DS)**: An interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.',
        answer: 'Think of them as nested and overlapping concepts:\n- **AI (Artificial Intelligence)**: The broad goal of creating intelligent machines.\n- **ML (Machine Learning)**: A subset of AI that uses data to train algorithms to make predictions.\n- **DL (Deep Learning)**: A subfield of ML that uses complex, multi-layered neural networks. It\'s the engine behind many state-of-the-art AI applications.\n- **DS (Data Science)**: An interdisciplinary field that uses ML (including DL), statistics, and domain knowledge to extract insights from data.',
        example: 'A **self-driving car** is an application of **AI**. The specific system that learns to **identify pedestrians** from camera data is **ML**, and the powerful neural network used for this image recognition is an example of **Deep Learning (DL)**. The entire process of **collecting data, building the model, and analyzing its safety performance** is **Data Science**.',
      },
      {
        id: 'foundations-2',
        question: 'What is the difference between supervised and unsupervised learning?',
        concepts: '**Supervised Learning**: Machine learning tasks that learn a function that maps an input to an output based on example input-output pairs. It uses **labeled data**.\n**Unsupervised Learning**: Machine learning tasks that infer patterns from a dataset without reference to known, or labeled, outcomes.',
        answer: 'The difference is the data you use.\n- **Supervised Learning**: Uses **labeled data** (data with the "right answer"). Its goal is to **predict an outcome**.\n- **Unsupervised Learning**: Uses **unlabeled data** (no "right answer" provided). Its goal is to **discover hidden patterns**.',
        example: '- **Supervised**: Predicting a house price (a specific number) based on **labeled** historical sales data.\n- **Unsupervised**: Grouping customers into different segments based on their purchase history, **without any predefined labels** for those groups.',
      },
       {
        id: 'foundations-3',
        question: 'What are the main types of data? (Categorical vs. Numeric)',
        concepts: '**Numeric Data**: Data that can be measured on a numerical scale. It can be continuous (e.g., height) or discrete (e.g., number of cars).\n**Categorical Data**: Data that represents characteristics and can be divided into groups. It can be nominal (no order, e.g., colors) or ordinal (has order, e.g., "low", "medium", "high").',
        answer: 'Data is primarily split into two types, and knowing the difference is critical for feature engineering and model selection.\n- **Numeric Data**: Represents quantities. You can perform mathematical operations on it. Examples include **age, salary, temperature**.\n- **Categorical Data**: Represents labels or categories. You can count them, but not perform math. Examples include **city, gender, product category**.',
        example: 'In a customer dataset, **`age` is numeric**, while **`country_of_residence` is categorical**. You would use a regression model to predict `age`, but a classification model to predict `country_of_residence`.',
      },
      {
        id: 'foundations-4',
        question: 'What is the real difference between correlation and causation, and how do you prove it?',
        concepts: '**Correlation**: A statistical measure that expresses the extent to which two variables are linearly related.\n**Causation**: Indicates that one event is the result of the occurrence of the other event; i.e., there is a causal relationship between the two events.',
        answer: 'Correlation means two things happen together. Causation means one thing **makes** the other happen.\n- **Correlation does not imply causation**.\n- The only way to prove causation is with a **controlled experiment** (like an A/B test) where you change one variable and measure its direct effect on another, keeping all else constant.',
        example: '**Example**: Ice cream sales and crime rates are correlated (both rise in summer). The **heat is the cause** for both; ice cream does not cause crime. To prove it, you would need an experiment, like giving away free ice cream in one city and seeing if crime rates change compared to a control city.',
      },
      {
        id: 'foundations-5',
        question: 'If you add 10 to every value in a dataset, how does that affect the mean and variance?',
        concepts: '**Mean**: The average of a set of numbers.\n**Variance**: A measure of how spread out the data points are from the mean.',
        answer: 'Adding a constant value (like 10) to every data point **shifts the entire distribution**, but does not change its shape or spread.\n- The **Mean will increase** by that constant value (10).\n- The **Variance will remain unchanged**. Variance is calculated based on the distance of each point from the mean, and since both the points and the mean shifted by the same amount, their relative distances are the same.',
        example: '**Dataset**: [2, 4, 6]. Mean is 4. Variance is 2.67.\n**New Dataset**: [12, 14, 16]. The **new Mean is 14** (4 + 10). The **new Variance is still 2.67** because the spread between the numbers hasn\'t changed.',
      },
      {
        id: 'foundations-6',
        question: 'Can the variance of a dataset be negative?',
        concepts: '**Variance**: The average of the squared differences from the Mean. The formula involves squaring deviations, which is a key property.',
        answer: '**No, variance can never be negative**. Variance is calculated by taking the average of the **squared** differences between each data point and the mean. Since the square of any real number (positive or negative) is always non-negative, the sum of these squared differences will also be non-negative. Therefore, the variance is always greater than or equal to zero.\n- A **variance of zero** means all values in the dataset are identical.',
        example: 'If you have the dataset [5, 5, 5], the mean is 5. The difference for each point is (5-5) = 0. The squared difference is 0. The average is 0. If you have [3, 5, 7], the differences are -2, 0, 2. The squared differences are 4, 0, 4. The average is (4+0+4)/3 = 2.67. **You can\'t get a negative result**.',
      },
      {
        id: 'foundations-7',
        question: 'What is a training set vs. a test set?',
        concepts: '**Training Set**: The subset of data used to train a model. The model "learns" the relationships between features and the target variable from this data.\n**Test Set**: The subset of data used to provide an unbiased evaluation of a final model fit on the training dataset.',
        answer: 'You split your data to check for **overfitting**.\n- **Training Set (~80% of data)**: The data the model **"studies"** to learn patterns.\n- **Test Set (~20% of data)**: Held-back data used for a **"final exam"** to evaluate how well the model performs on new, unseen data.\n\nThis separation is critical to ensure your model can **generalize** to real-world problems.',
        example: 'To predict customer churn, you train your model on **800 customers (training set)**. You then evaluate its final performance on the **remaining 200 customers (test set)** to get a realistic measure of its accuracy.',
      },
      {
        id: 'foundations-8',
        question: 'Explain the Bias-Variance Tradeoff as if you\'re teaching a new analyst.',
        concepts: '**Bias**: The error from erroneous assumptions in the learning algorithm. High bias can cause an algorithm to miss the relevant relations between features and target outputs (underfitting).\n**Variance**: The error from sensitivity to small fluctuations in the training set. High variance can cause an algorithm to model the random noise in the training data, rather than the intended outputs (overfitting).',
        answer: 'It\'s a balancing act to prevent a model from being too simple or too complex.\n- **High Bias (Underfitting)**: The model is **too simple**. It misses the real patterns and is inaccurate on both training and test data.\n- **High Variance (Overfitting)**: The model is **too complex**. It learns the noise, not the pattern. It\'s great on training data but fails on new, unseen data.\n\nThe goal is to find the sweet spot: a model with **low bias and low variance** that generalizes well.',
        example: '**When predicting house prices**:\n- A model using only "**number of rooms**" is too simple (**high bias**).\n- A model using 500 features including "**front door color**" is too complex (**high variance**).\n- A model using key features like "**square footage**," "**location**," and "**age**" is the right balance.',
      },
    ],
};

export default foundationsCategory;
