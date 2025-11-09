import { QuestionCategory } from '../types';

const pythonDSCategory: QuestionCategory = {
    id: 'python_ds',
    title: 'Data Science Coding',
    icon: 'fa-chart-simple',
    description: 'Python questions focused on data manipulation and analysis using libraries like pandas and NumPy.',
    questions: [
        {
            id: 'pyds-1',
            question: 'What is the difference between a pandas Series and a DataFrame?',
            concepts: '**Series**: A one-dimensional labeled array capable of holding any data type.\n**DataFrame**: A two-dimensional, size-mutable, and potentially heterogeneous tabular data structure with labeled axes (rows and columns).',
            answer: 'The key difference is dimensionality.\n- A **Series** is a **1D** data structure, like a single column in a spreadsheet. It has one index.\n- A **DataFrame** is a **2D** data structure, like a full spreadsheet with rows and columns. It can be thought of as a dictionary of Series objects where the Series share the same index.',
            example: '---CODE_START---python\nimport pandas as pd\n\ndata = {\'Name\': [\'Alice\', \'Bob\'], \'Age\': [25, 30]}\ndf = pd.DataFrame(data)\n\n# df is a DataFrame\n# df[\'Age\'] is a Series\nprint(type(df))\nprint(type(df[\'Age\']))\n---CODE_END---'
        },
        {
            id: 'pyds-2',
            question: 'How do you handle missing data in pandas?',
            concepts: '**NaN (Not a Number)**: The standard missing data marker in pandas.\n**Imputation**: The process of replacing missing data with substituted values.',
            answer: 'Pandas provides several versatile methods:\n1.  **Detect Missing Data**: Use `df.isnull().sum()` to count `NaN` values in each column.\n2.  **Remove Missing Data**: Use `df.dropna()` to drop rows (or columns) with any missing values.\n3.  **Fill Missing Data (Impute)**: Use `df.fillna()` to replace `NaN`s with a specific value, like the mean, median, or mode of the column.',
            example: '---CODE_START---python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\'A\': [1, 2, np.nan], \'B\': [5, np.nan, np.nan]})\n\n# Drop rows with any NaN\ndf_dropped = df.dropna()\n\n# Fill NaN in column A with its mean\nmean_A = df[\'A\'].mean()\ndf_filled = df.fillna({\'A\': mean_A, \'B\': 0})\n---CODE_END---'
        },
        {
            id: 'pyds-3',
            question: 'Explain vectorization in NumPy. Why is it faster?',
            concepts: '**Vectorization**: The process of performing operations on entire arrays of data at once instead of iterating over them element by element.\n**Compiled Code**: Code that has been translated from a high-level language (like Python) to a lower-level language (like C or Fortran), which runs much faster.',
            answer: 'Vectorization means applying an operation to an entire array rather than looping through individual elements. NumPy achieves this by using pre-compiled, highly optimized C code under the hood.\n\nIt is faster because:\n- **Less Overhead**: The looping happens in fast, compiled C code instead of slower, interpreted Python.\n- **SIMD (Single Instruction, Multiple Data)**: Modern CPUs can perform the same operation on multiple data points simultaneously. Vectorized libraries leverage this hardware capability.',
            example: '---CODE_START---python\nimport numpy as np\nimport time\n\narr = np.arange(1_000_000)\n\n# Vectorized (fast)\nstart = time.time()\narr_squared_vec = arr * arr\nprint(f"Vectorized: {time.time() - start:.6f}s")\n\n# Loop (slow)\nstart = time.time()\narr_squared_loop = np.array([x*x for x in arr])\nprint(f"Loop: {time.time() - start:.6f}s")\n---CODE_END---'
        },
        {
            id: 'pyds-4',
            question: 'What is broadcasting in NumPy?',
            concepts: '**Broadcasting**: A powerful mechanism that allows NumPy to work with arrays of different shapes when performing arithmetic operations.',
            answer: 'Broadcasting describes the rules for how NumPy treats arrays with different shapes during arithmetic operations. Subject to certain constraints, the smaller array is "broadcast" across the larger array so that they have compatible shapes.\nThis avoids the need to explicitly create copies of the smaller array to match the larger one, making code more memory-efficient and faster.',
            example: '---CODE_START---python\nimport numpy as np\n\narr = np.array([[1, 2, 3], [4, 5, 6]]) # Shape (2, 3)\nscalar = 10\n\n# Broadcast scalar to the array\'s shape\nresult = arr + scalar\n# result is [[11, 12, 13], [14, 15, 16]]\n\nvector = np.array([1, 0, 1]) # Shape (1, 3)\n# Broadcast vector to each row of the array\nresult2 = arr + vector\n# result2 is [[2, 2, 4], [5, 5, 7]]\n---CODE_END---'
        },
        {
            id: 'pyds-5',
            question: 'How do you merge, join, and concatenate DataFrames?',
            concepts: '**Concatenate**: Stacking DataFrames along an axis (either rows or columns).\n**Merge/Join**: Combining DataFrames based on common columns or indices, similar to SQL joins.',
            answer: 'These are three ways to combine DataFrames:\n- **`pd.concat()`**: Used for stacking. Best for combining DataFrames with the same columns (stacking rows) or the same index (stacking columns side-by-side).\n- **`df.merge()`**: The most flexible method, similar to SQL joins (`inner`, `outer`, `left`, `right`). It combines DataFrames based on values in one or more common columns (keys).\n- **`df.join()`**: A convenience method for merging based on the DataFrame\'s **index** instead of columns.',
            example: '---CODE_START---python\nimport pandas as pd\ndf1 = pd.DataFrame({\'A\': [\'A0\'], \'B\': [\'B0\']}, index=[0])\ndf2 = pd.DataFrame({\'C\': [\'C0\'], \'D\': [\'D0\']}, index=[0])\ndf3 = pd.DataFrame({\'A\': [\'A0\'], \'E\': [\'E0\']}, index=[0])\n\n# Concatenate along columns\nconcatenated = pd.concat([df1, df2], axis=1)\n\n# Merge on column \'A\'\nmerged = pd.merge(df1, df3, on=\'A\', how=\'inner\')\n---CODE_END---'
        },
        {
            id: 'pyds-6',
            question: 'What is the difference between .loc and .iloc?',
            concepts: '**Label-based Indexing**: Selecting data based on the index labels or column names.\n**Integer-position based Indexing**: Selecting data based on its integer position in the index/columns (from 0 to length-1).',
            answer: '`.loc` and `.iloc` are the two primary methods for selecting data from a pandas DataFrame.\n- **`.loc`** is for **label-based** selection. You use the actual index names and column names. The endpoint is **inclusive** when slicing.\n- **`.iloc`** is for **integer-position based** selection. You use integer indices. The endpoint is **exclusive** when slicing, just like in standard Python lists.',
            example: '---CODE_START---python\nimport pandas as pd\ndf = pd.DataFrame({\'A\': [10, 20, 30]}, index=[\'x\', \'y\', \'z\'])\n\n# .loc uses labels\nprint(df.loc[\'y\', \'A\']) # Output: 20\nprint(df.loc[\'x\':\'y\']) # Includes both \'x\' and \'y\'\n\n# .iloc uses integer positions\nprint(df.iloc[1, 0]) # Output: 20\nprint(df.iloc[0:2]) # Includes rows 0 and 1, but excludes 2\n---CODE_END---'
        },
        {
            id: 'pyds-7',
            question: 'How do you detect and treat outliers using Python?',
            concepts: '**Outlier**: An observation that lies an abnormal distance from other values in a random sample from a population.\n**IQR (Interquartile Range)**: The range between the first quartile (25th percentile) and the third quartile (75th percentile).',
            answer: 'The most common statistical method is using the IQR.\n1.  **Calculate Quartiles**: Find the first quartile (Q1) and third quartile (Q3) of the data.\n2.  **Calculate IQR**: `IQR = Q3 - Q1`.\n3.  **Define Bounds**: The outlier bounds are typically `Q1 - 1.5 * IQR` and `Q3 + 1.5 * IQR`.\n4.  **Identify Outliers**: Any data point outside these bounds is considered an outlier.\n\n**Treatment**:\n- **Remove**: Drop the outlier rows.\n- **Cap (Winsorize)**: Replace outliers with the boundary value.',
            example: '---CODE_START---python\nimport numpy as np\n\ndata = np.array([1, 2, 3, 4, 5, 100])\n\nQ1 = np.percentile(data, 25)\nQ3 = np.percentile(data, 75)\nIQR = Q3 - Q1\n\nlower_bound = Q1 - 1.5 * IQR\nupper_bound = Q3 + 1.5 * IQR\n\noutliers = data[(data < lower_bound) | (data > upper_bound)]\nprint(outliers) # Output: [100]\n\n# Capping the outlier\ncapped_data = np.clip(data, lower_bound, upper_bound)\nprint(capped_data)\n---CODE_END---'
        },
        {
            id: 'pyds-8',
            question: 'What is the difference between apply(), map(), and applymap()?',
            concepts: '**Element-wise**: Operating on each element individually.\n**Series-wise / Row-wise**: Operating on an entire Series or row at once.',
            answer: 'These pandas methods are used to apply functions, but they operate at different levels:\n- **`apply()`**: Works on a **row/column basis** for a `DataFrame`. The function passed to `apply()` receives a Series as an argument.\n- **`applymap()`**: Works **element-wise** on a `DataFrame`. It applies a function to every single element.\n- **`map()`**: Works **element-wise** on a `Series` only.',
            example: '---CODE_START---python\nimport pandas as pd\ndf = pd.DataFrame({\'A\': [1, 2], \'B\': [10, 20]})\n\n# apply() on a DataFrame (e.g., get column sum)\ndf.apply(sum, axis=0)\n\n# applymap() on a DataFrame (e.g., square every element)\ndf.applymap(lambda x: x*x)\n\n# map() on a Series (e.g., format as currency)\ndf[\'A\'].map(lambda x: f"${x}.00")\n---CODE_END---'
        },
        {
            id: 'pyds-9',
            question: 'What is the difference between reshape(), ravel(), and flatten()?',
            concepts: '**View vs. Copy**: A view of an array is a new array object that looks at the same data. A copy is a new array with its own data.\n**Contiguous Memory**: How data is laid out in memory, which affects performance.',
            answer: 'These NumPy functions are used to change the shape of an array:\n- **`reshape()`**: Changes the shape of an array without changing its data. It returns a **view** if possible, otherwise it returns a copy.\n- **`ravel()`**: Returns a new, **1D flattened** array. It returns a **view** of the original array whenever possible.\n- **`flatten()`**: Returns a new, **1D flattened** array. It **always returns a copy**, never a view.',
            example: '`ravel()` is generally faster and more memory-efficient as it tries to return a view. Use `flatten()` when you need a separate copy of the array that won\'t be affected by changes to the original.'
        },
        {
            id: 'pyds-10',
            question: 'How do you remove duplicates in a dataset?',
            concepts: '**Deduplication**: The process of eliminating duplicate copies of repeating data.',
            answer: 'Pandas provides the `df.duplicated()` and `df.drop_duplicates()` methods.\n- **`df.duplicated()`**: Returns a boolean Series indicating whether each row is a duplicate of a previous one.\n- **`df.drop_duplicates()`**: Returns a DataFrame with duplicate rows removed.\n\nYou can specify a subset of columns to consider when identifying duplicates.',
            example: '---CODE_START---python\nimport pandas as pd\ndata = {\'brand\': [\'Yum Yum\', \'Yum Yum\', \'Indomie\'], \'style\': [\'cup\', \'cup\', \'pack\']}\ndf = pd.DataFrame(data)\n\n# Remove rows where all columns are duplicates\ndf_deduped = df.drop_duplicates()\n\n# Remove rows where \'brand\' is a duplicate\ndf_brand_deduped = df.drop_duplicates(subset=[\'brand\'])\n---CODE_END---'
        },
        {
            id: 'pyds-11',
            question: 'How do you read large datasets efficiently in pandas?',
            concepts: '**Chunking**: Processing a large dataset in smaller, manageable pieces.\n**Data Types**: Specifying more memory-efficient data types for columns.',
            answer: 'Reading a massive CSV directly into memory can cause a crash. Use these strategies:\n1.  **Chunking**: Use the `chunksize` parameter in `pd.read_csv`. This returns an iterator that lets you process the file in chunks of a specified number of rows.\n2.  **Specify Dtypes**: By default, pandas might use 64-bit integers/floats. If you know a column has smaller values, you can specify a more memory-efficient type like `int32` or `float32` using the `dtype` parameter.\n3.  **Select Columns**: If you only need a subset of columns, use the `usecols` parameter to load only those, saving significant memory.',
            example: '---CODE_START---python\nimport pandas as pd\n\n# Process a large file in chunks of 10,000 rows\nchunk_iter = pd.read_csv(\'large_file.csv\', chunksize=10000)\n\nfor chunk in chunk_iter:\n    # process each chunk here\n    print(chunk.shape)\n---CODE_END---'
        },
        {
            id: 'pyds-12',
            question: 'What is groupby and how does it work internally?',
            concepts: '**Split-Apply-Combine**: A powerful pattern for data analysis. You split the data into groups, apply a function to each group independently, and then combine the results.',
            answer: '`groupby` is a powerful pandas operation that follows the "Split-Apply-Combine" strategy:\n1.  **Split**: It first splits the DataFrame into groups based on the criteria you provide (e.g., values in a column).\n2.  **Apply**: It then applies a function (e.g., `sum`, `mean`, `count`, or a custom function) to each of these smaller groups independently.\n3.  **Combine**: Finally, it combines the results of the function applications into a new data structure (like a Series or DataFrame).',
            example: '---CODE_START---python\nimport pandas as pd\ndf = pd.DataFrame({\'Team\': [\'A\', \'B\', \'A\', \'B\'], \'Points\': [10, 12, 8, 15]})\n\n# Split by \'Team\', apply sum(), and combine results\nteam_scores = df.groupby(\'Team\')[\'Points\'].sum()\nprint(team_scores)\n# Output:\n# Team\n# A    18\n# B    27\n---CODE_END---'
        },
        {
            id: 'pyds-13',
            question: 'How do you write custom functions inside groupby?',
            concepts: '**Aggregation (`agg`)**: The process of applying a function to a group to produce a single summary value.\n**`lambda` functions**: Anonymous functions useful for simple, one-off operations.',
            answer: 'You can use the `.agg()` or `.apply()` methods after a `groupby`.\n- **`.agg()`**: Best for aggregations where your function takes a Series (a group) and returns a single value.\n- **`.apply()`**: More flexible. Your function can take a DataFrame (a group) and return a scalar, a Series, or even a DataFrame.\n\nYou can pass a regular function or a `lambda` function.',
            example: '---CODE_START---python\nimport pandas as pd\ndf = pd.DataFrame({\'Category\': [\'A\', \'A\', \'B\'], \'Value\': [10, 20, 100]})\n\n# Use .agg() with a lambda to find the range of values in each group\ndf.groupby(\'Category\')[\'Value\'].agg(lambda x: x.max() - x.min())\n\n# Use .apply() to normalize data within each group\ndef z_score(x):\n    return (x - x.mean()) / x.std()\ndf.groupby(\'Category\')[\'Value\'].apply(z_score)\n---CODE_END---'
        },
        {
            id: 'pyds-14',
            question: 'How do you measure the execution time of Python code?',
            concepts: '**Profiling**: Measuring the time or space complexity of code to identify bottlenecks.\n**Magic Commands**: Special commands in environments like IPython and Jupyter for enhanced productivity.',
            answer: 'There are several ways:\n- **`time` module**: Simple and effective for scripts. Record `time.time()` before and after the code block and find the difference.\n- **`timeit` module**: More accurate for measuring small code snippets because it runs the code multiple times to get a more stable average.\n- **`%timeit` magic command (in Jupyter/IPython)**: The easiest and most common way in an interactive environment. It automatically runs the code multiple times and gives you the mean and standard deviation of the execution time.',
            example: '---CODE_START---python\n# In a Jupyter Notebook cell:\n\nimport numpy as np\narr = np.arange(1000)\n\n%timeit -n 100 sum(arr)\n---CODE_END---'
        },
        {
            id: 'pyds-15',
            question: 'Explain one-hot encoding and label encoding in Python.',
            concepts: '**Categorical Data**: Variables that contain label values rather than numeric values.\n**Feature Engineering**: The process of using domain knowledge to create features that make machine learning algorithms work.',
            answer: 'These are two common techniques to convert categorical data into a numerical format for ML models.\n- **Label Encoding**: Assigns a unique integer to each category. This is suitable for **ordinal** variables where the order has meaning (e.g., "small" -> 0, "medium" -> 1, "large" -> 2).\n- **One-Hot Encoding**: Creates a new binary (0/1) column for each category. This is necessary for **nominal** variables where there is no intrinsic order (e.g., "color": "red", "green", "blue"). This prevents the model from assuming a false order.',
            example: '---CODE_START---python\nfrom sklearn.preprocessing import LabelEncoder, OneHotEncoder\nimport pandas as pd\n\ndf = pd.DataFrame({\'color\': [\'red\', \'blue\', \'green\', \'red\']})\n\n# One-Hot Encoding\ndf_ohe = pd.get_dummies(df, columns=[\'color\'], prefix=\'color\')\nprint(df_ohe)\n---CODE_END---'
        },
        {
            id: 'pyds-16',
            question: 'How do you handle categorical variables with pandas?',
            concepts: '**Categorical Dtype**: A pandas data type for columns that have a fixed and limited number of possible values.\n**Memory Efficiency**: Using data types that consume less memory.',
            answer: 'Pandas has a dedicated `category` data type which is highly recommended.\n1.  **Convert to Category**: Use `df[\'col\'] = df[\'col\'].astype(\'category\')`.\n2.  **Benefits**: This is more memory-efficient than storing strings, especially with many duplicates. It also enables some specialized methods.\n3.  **Get Dummies**: For machine learning, the easiest way to perform one-hot encoding is `pd.get_dummies(df)`.',
            example: '---CODE_START---python\nimport pandas as pd\ns = pd.Series([\'a\', \'b\', \'c\', \'a\'])\n\n# Convert to category dtype\ncat_s = s.astype(\'category\')\n\n# .cat accessor provides category-specific methods\nprint(cat_s.cat.codes)   # [0, 1, 2, 0]\nprint(cat_s.cat.categories) # [\'a\', \'b\', \'c\']\n---CODE_END---'
        },
        {
            id: 'pyds-17',
            question: 'What is pickle and why is it used?',
            concepts: '**Serialization**: The process of converting a data structure or object state into a format that can be stored or transmitted and reconstructed later.\n**Object Persistence**: Saving the state of an object to a storage medium.',
            answer: '`pickle` is Python\'s standard module for object serialization. It "pickles" a Python object by converting it into a byte stream, which can be written to a file, stored in a database, or transmitted over a network.\n\nIn data science, it is most commonly used to **save trained machine learning models** to disk. You can then load this saved file later to make predictions without having to retrain the model.',
            example: '---CODE_START---python\nimport pickle\nfrom sklearn.linear_model import LogisticRegression\n\n# Assume \'model\' is a trained sklearn model\nmodel = LogisticRegression().fit([[1],[2]], [0,1])\n\n# Save the model to a file\nwith open(\'model.pkl\', \'wb\') as f:\n    pickle.dump(model, f)\n\n# Load the model from the file\nwith open(\'model.pkl\', \'rb\') as f:\n    loaded_model = pickle.load(f)\n\nprint(loaded_model.predict([[1]]))\n---CODE_END---'
        },
        {
            id: 'pyds-18',
            question: 'How do you serialize a model in Python?',
            concepts: '**Serialization**: Converting an object into a storable format.\n**Interoperability**: The ability of computer systems or software to exchange and make use of information.',
            answer: 'The most common method is using the `pickle` library, as it can serialize almost any Python object. For scikit-learn models, `joblib` is often preferred as it can be more efficient for objects that carry large NumPy arrays.\n\nFor better interoperability with other languages and systems, formats like ONNX (Open Neural Network Exchange) are used, which define a common set of operators and a common file format.',
            example: '---CODE_START---python\nfrom sklearn.ensemble import RandomForestClassifier\nimport joblib\n\n# Assume \'model\' is a trained model\nmodel = RandomForestClassifier().fit([[1],[2]], [0,1])\n\n# Save with joblib\njoblib.dump(model, \'model.joblib\')\n\n# Load with joblib\nloaded_model = joblib.load(\'model.joblib\')\n---CODE_END---'
        },
        {
            id: 'pyds-19',
            question: 'How do you tune hyperparameters programmatically?',
            concepts: '**Hyperparameters**: Parameters that are not directly learned within estimators. They are passed as arguments to the constructor of the estimator classes.\n**Grid Search**: An exhaustive search over a specified parameter grid.\n**Random Search**: A search over a specified parameter space where a fixed number of parameter settings is sampled from the specified distributions.',
            answer: 'Scikit-learn provides automated tools for this:\n- **`GridSearchCV`**: Exhaustively tries every combination of the hyperparameters you specify. It is thorough but can be very slow.\n- **`RandomizedSearchCV`**: Samples a fixed number of parameter settings from specified distributions. It is much faster than Grid Search and often finds a very good combination of parameters.\n\nBoth methods use cross-validation to evaluate the performance of each hyperparameter combination.',
            example: '---CODE_START---python\nfrom sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\nfrom scipy.stats import randint\n\nparam_dist = {\'n_estimators\': randint(50, 500), \'max_depth\': randint(1, 20)}\n\n# Create a random forest classifier\nrf = RandomForestClassifier()\n\n# Use random search to find the best hyperparameters\nrand_search = RandomizedSearchCV(rf, param_distributions=param_dist, n_iter=5, cv=5)\n\n# Fit the random search object to the data (X, y)\n# rand_search.fit(X, y)\n# print(rand_search.best_params_)\n---CODE_END---'
        },
        {
            id: 'pyds-20',
            question: 'How do you evaluate ML models using Python (sklearn metrics)?',
            concepts: '**Classification Metrics**: `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `roc_auc_score`, `confusion_matrix`.\n**Regression Metrics**: `mean_squared_error`, `mean_absolute_error`, `r2_score`.',
            answer: 'The `sklearn.metrics` module provides a comprehensive set of functions for evaluating model performance.\nFor **classification**, you can generate a full report using `classification_report`, which includes precision, recall, and F1-score for each class. The `confusion_matrix` is also crucial for visualizing where the model is making errors.\nFor **regression**, common metrics like `mean_squared_error` (and its square root, RMSE) and `r2_score` are used to measure prediction error.',
            example: '---CODE_START---python\nfrom sklearn.metrics import classification_report, confusion_matrix\n\ny_true = [0, 1, 0, 1, 0, 1]\ny_pred = [0, 0, 0, 1, 0, 1]\n\n# Print a text report showing the main classification metrics\nprint(classification_report(y_true, y_pred))\n\n# Compute confusion matrix\nprint(confusion_matrix(y_true, y_pred))\n---CODE_END---'
        }
    ],
};

export default pythonDSCategory;
