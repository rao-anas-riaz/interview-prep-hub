
import { QuestionCategory } from '../types';

const dataAnalysisCategory: QuestionCategory = {
    id: 'data_analysis',
    title: 'Data Analysis & Preprocessing',
    icon: 'fa-chart-pie',
    description: 'Techniques for EDA, cleaning, feature engineering, and preparing data for modeling.',
    questions: [
      {
        id: 'foundations-3',
        question: 'What are the main types of data? (Categorical vs. Numeric)',
        concepts: '**Numeric Data**: Data that can be measured on a numerical scale. It can be continuous (e.g., height) or discrete (e.g., number of cars).\n**Categorical Data**: Data that represents characteristics and can be divided into groups. It can be nominal (no order, e.g., colors) or ordinal (has order, e.g., "low", "medium", "high").',
        answer: 'Data is primarily split into two types, and knowing the difference is critical for feature engineering and model selection.\n- **Numeric Data**: Represents quantities. You can perform mathematical operations on it. Examples include **age, salary, temperature**.\n- **Categorical Data**: Represents labels or categories. You can count them, but not perform math. Examples include **city, gender, product category**.',
        example: 'In a customer dataset, **`age` is numeric**, while **`country_of_residence` is categorical**. You would use a regression model to predict `age`, but a classification model to predict `country_of_residence`.',
      },
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
      },
      {
        id: 'pychal-20',
        question: 'Write balanced dataset sampling manually.',
        concepts: '**Core Concepts**: Imbalanced Data, Resampling, Undersampling.\n**Explanation**: When one class in a classification problem is much more frequent than another (e.g., 99% non-fraud vs. 1% fraud), models can become biased towards the majority class. Resampling techniques create a new, balanced dataset for training. Undersampling, shown here, reduces the number of samples from the majority class to match the number in the minority class.',
        answer: '---CODE_START---python\nimport pandas as pd\n\n# Create an imbalanced DataFrame\ndata = {\'feature\': range(20), \'target\': [0]*18 + [1]*2}\ndf = pd.DataFrame(data)\n\n# --- Manual Undersampling Solution ---\ndef balance_dataframe(df, target_col):\n    # 1. Get class counts and identify minority class\n    class_counts = df[target_col].value_counts()\n    minority_class = class_counts.idxmin()\n    minority_size = class_counts.min()\n\n    # 2. Separate majority and minority classes\n    df_minority = df[df[target_col] == minority_class]\n    df_majority = df[df[target_col] != minority_class]\n\n    # 3. Downsample the majority class\n    df_majority_downsampled = df_majority.sample(n=minority_size, random_state=42)\n\n    # 4. Concatenate the balanced dataframes\n    df_balanced = pd.concat([df_majority_downsampled, df_minority])\n\n    return df_balanced.sample(frac=1, random_state=42).reset_index(drop=True)\n\nbalanced_df = balance_dataframe(df, \'target\')\nprint("Original Counts:\\n", df[\'target\'].value_counts())\nprint("\\nBalanced Counts:\\n", balanced_df[\'target\'].value_counts())\nprint("\\nBalanced DataFrame:\\n", balanced_df)\n---CODE_END---',
        example: '**Code Explanation**:\n1. The function first determines which class is the minority and its size.\n2. It splits the original DataFrame into two: one with only minority class samples and one with only majority class samples.\n3. The key step is `df_majority.sample(n=minority_size)`. This randomly selects a number of rows from the majority DataFrame equal to the size of the minority class.\n4. Finally, it combines this smaller majority sample with the original minority sample using `pd.concat` and shuffles the result to create the final balanced training set.'
      },
      {
        id: 'da-6',
        question: 'In a customer dataset, you notice inconsistent NULL handling across different columns. How would you clean and standardize the data before analysis?',
        concepts: '**Data Cleaning**, **Standardization**, **Imputation**, **Coalesce**. Preparing messy data for consumption.',
        answer: 'Inconsistent NULLs (e.g., actual `NULL`, string "NULL", empty string "", "N/A") are a common issue.\n1.  **Profile the Data**: First, identify all the variations of "missing" values.\n2.  **Standardize to NULL**: Convert all placeholder strings ("N/A", "", "Unknown") to actual SQL/Pandas `NULL` or `NaN`. This allows functions like `COALESCE` or `fillna` to work consistently.\n3.  **Impute or Handle**: Once standardized, decide on a strategy: drop the rows, fill with a default value (0, "Unknown"), or impute using statistical methods (mean/median).\n\nExample in SQL: `UPDATE Table SET Col = NULL WHERE Col IN (\'\', \'N/A\', \'NULL\')`.',
        example: 'I worked with a dataset where the `Email` column had empty strings and the text "NULL" mixed with actual NULLs. I first updated all empty strings and "NULL" text to actual NULL values. Then, I calculated the percentage of missing emails to decide whether to drop those rows or treat them as "Guest" users.'
      }
    ]
};

export default dataAnalysisCategory;
