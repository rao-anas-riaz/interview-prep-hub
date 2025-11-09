import { QuestionCategory } from '../types';

const dataAnalysisCategory: QuestionCategory = {
    id: 'data_analysis',
    title: 'Data Analysis',
    icon: 'fa-chart-pie',
    description: 'Techniques for exploring, cleaning, and transforming data to uncover insights and prepare it for modeling.',
    questions: [
      {
        id: 'da-1',
        question: 'How would you handle missing data for categorical vs. numeric features?',
        concepts: '**Missing Data Imputation**: The process of replacing missing data with substituted values. Common techniques include mean/median/mode imputation, or more advanced model-based methods.',
        answer: `The approach depends on the feature type.\n- **Numeric Features**: Impute with the **median** (robust to outliers) or **mean**.\n- **Categorical Features**: Impute with the **mode** (most frequent value) or create a new category like **"Unknown"**.---CODE_START---python\nimport pandas as pd\n\n# Numeric: Fill missing 'age' with the median\ndf['age'].fillna(df['age'].median(), inplace=True)\n\n# Categorical: Fill missing 'category' with the mode\ndf['category'].fillna(df['category'].mode()[0], inplace=True)\n---CODE_END---`,
        example: 'In a customer dataset, a missing **`age` (numeric)** could be filled with the **median age** of all customers. A missing **`city` (categorical)** could be filled with the **most common city (mode)** or labeled as **"Unknown"**.',
      },
      {
        id: 'da-2',
        question: 'How do you identify and treat outliers in a dataset?',
        concepts: '**Outlier**: An observation point that is distant from other observations. Outliers can be due to variability in the measurement or may indicate experimental errors.\n**Interquartile Range (IQR)**: A measure of statistical dispersion, being equal to the difference between 75th and 25th percentiles.',
        answer: 'Outliers can skew statistical measures and degrade model performance.\n\n**How to Detect**:\n- **Visualization**: Box plots and scatter plots are excellent for visually identifying outliers.\n- **Statistical Methods**: Use the **IQR method** (a data point is an outlier if it is below Q1 - 1.5*IQR or above Q3 + 1.5*IQR) or Z-scores (outlier if Z-score > 3).\n\n**How to Treat**:\n- **Remove**: If they are clear data entry errors.\n- **Cap (Winsorize)**: Set outlier values to a specified percentile (e.g., 1st and 99th).\n- **Transform**: Apply a log transformation to reduce the effect of outliers.',
        example: 'In a dataset of house prices, a price of **$50,000,000** is likely an outlier. Using the **IQR method**, you could identify this and decide to **cap** it at the 99th percentile value to prevent it from skewing your regression model.',
      },
      {
        id: 'da-3',
        question: 'How do you detect multicollinearity and what actions would you take?',
        concepts: '**Multicollinearity**: A phenomenon in which one predictor variable in a multiple regression model can be linearly predicted from the others with a substantial degree of accuracy.\n**Variance Inflation Factor (VIF)**: A measure of the amount of multicollinearity in a set of multiple regression variables.',
        answer: '**Multicollinearity** is when two or more features are highly correlated, which can destabilize linear models.\n\n**How to Detect**:\n- **Correlation Matrix**: Look for high correlation values (> 0.8) between features.\n- **VIF (Variance Inflation Factor)**: A VIF score > 10 is a strong sign of multicollinearity.\n\n**How to Fix**:\n- **Remove** one of the correlated features.\n- **Combine** the features into a single new feature.',
        example: 'In a housing model, **`square_footage` and `number_of_bathrooms` are highly correlated**. You could detect this with a high VIF score and fix it by **removing `number_of_bathrooms`**, as `square_footage` is a more comprehensive feature.',
      },
      {
        id: 'da-4',
        question: 'Explain One-Hot Encoding vs. Label Encoding.',
        concepts: '**One-Hot Encoding**: A process of converting categorical data variables so they can be provided to machine learning algorithms to improve predictions. One-hot encoding creates new columns indicating the presence (or absence) of each possible value in the original data.\n**Label Encoding**: A technique where each unique category is assigned an integer value.',
        answer: 'Both are methods for converting categorical data into numbers, but they are used in different situations.\n- **Label Encoding**: Assigns a unique integer to each category (e.g., "Red" -> 0, "Green" -> 1, "Blue" -> 2). **Use only for ordinal data** where the order matters (e.g., "Low", "Medium", "High").\n- **One-Hot Encoding**: Creates a new binary (0/1) column for each category. **Use for nominal data** where there is no intrinsic order. This prevents the model from assuming a false relationship between categories (e.g., that "Blue" is greater than "Green").',
        example: 'For a feature `size` with values `["small", "medium", "large"]`, **Label Encoding** is appropriate. For a feature `color` with values `["red", "green", "blue"]`, **One-Hot Encoding** is required to avoid implying that `blue > red`.',
      },
      {
        id: 'da-5',
        question: 'When is feature scaling not needed, and why?',
        concepts: '**Feature Scaling**: A method used to standardize the range of independent variables or features of data. Since the range of values of raw data varies widely, in some machine learning algorithms, objective functions will not work properly without normalization.',
        answer: 'Feature scaling is critical for models that are sensitive to distance or magnitude.\n- **Models that NEED scaling**: Linear/Logistic Regression, KNN, SVM, Neural Networks.\n- **Models that DO NOT need scaling**: Tree-based models like Decision Trees, Random Forest, and XGBoost.\n\n**Tree-based models** are not affected because they make splits on features based on their **rank order**, not their scale.',
        example: 'If you are building a customer churn model with **XGBoost**, you **don\'t need to scale** features like `account_balance` (from $0 to $1M) and `age` (from 18 to 90). The model can handle these different scales without issue.',
      }
    ]
};

export default dataAnalysisCategory;
