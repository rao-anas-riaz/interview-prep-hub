import { QuestionCategory } from '../types';

const dataManipulationCategory: QuestionCategory = {
    id: 'data_manipulation',
    title: 'Data Manipulation',
    icon: 'fa-table-cells',
    description: 'Practical data wrangling and analysis using libraries like pandas and NumPy.',
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
            id: 'pychal-8',
            question: 'Write code to detect outliers using z-score or IQR.',
            concepts: '**Core Concepts**: Outlier Detection, Statistical Rules.\n**Explanation**: Outliers can distort statistical analyses and model training. \n- **IQR Method**: A non-parametric method that defines outliers as points that fall a certain distance (typically 1.5 times the Interquartile Range) below the first quartile or above the third quartile.\n- **Z-score Method**: A parametric method that assumes a normal distribution. It measures how many standard deviations a data point is from the mean. A common threshold for outliers is a Z-score greater than 3 or less than -3.',
            answer: '---CODE_START---python\nimport numpy as np\n\ndef detect_outliers(data, method=\'iqr\', threshold=3.0):\n    if method == \'iqr\':\n        Q1 = np.percentile(data, 25)\n        Q3 = np.percentile(data, 75)\n        IQR = Q3 - Q1\n        lower_bound = Q1 - 1.5 * IQR\n        upper_bound = Q3 + 1.5 * IQR\n        outliers = (data < lower_bound) | (data > upper_bound)\n    elif method == \'zscore\':\n        mean = np.mean(data)\n        std = np.std(data)\n        z_scores = (data - mean) / std\n        outliers = np.abs(z_scores) > threshold\n    else:\n        raise ValueError("Method not supported. Use \'iqr\' or \'zscore\'.")\n    \n    return data[outliers]\n\ndata = np.array([1, 2, 2, 3, 3, 4, 4, 5, 5, 15, -10])\nprint("Outliers (IQR):", detect_outliers(data, method=\'iqr\'))\nprint("Outliers (Z-score):", detect_outliers(data, method=\'zscore\'))\n---CODE_END---',
            example: '**Code Explanation**:\nThe function uses NumPy for efficient calculations. \n- For the **\'iqr\' method**, it calculates the 25th and 75th percentiles to find the IQR, defines the upper and lower bounds based on the 1.5*IQR rule, and uses boolean indexing to return the values outside these bounds. \n- For the **\'zscore\' method**, it calculates the mean and standard deviation, computes the Z-score for every point, and returns the points whose absolute Z-score exceeds the threshold.'
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
            id: 'pychal-9',
            question: 'Write a custom groupby aggregation (e.g., weighted average).',
            concepts: '**Core Concepts**: Custom Aggregations, Split-Apply-Combine.\n**Explanation**: While pandas `groupby` has built-in aggregations like `mean()` and `sum()`, you often need to perform a custom calculation, like a weighted average. The `.apply()` method is perfect for this, as it passes each group as a DataFrame to a custom function you define.',
            answer: '---CODE_START---python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \'Category\': [\'A\', \'A\', \'B\', \'B\'],\n    \'Value\': [10, 20, 30, 40],\n    \'Weight\': [0.8, 0.2, 0.5, 0.5]\n})\n\n# Define a function to calculate the weighted average\ndef weighted_average(group):\n    return np.average(group[\'Value\'], weights=group[\'Weight\'])\n\n# Group by category and apply the custom function\nresult = df.groupby(\'Category\').apply(weighted_average)\n\nprint("Original DataFrame:\\n", df)\nprint("\\nWeighted Average by Category:\\n", result)\n---CODE_END---',
            example: '**Code Explanation**:\nFirst, we define a function `weighted_average` that takes a DataFrame `group` as input. Inside, we use `np.average`, which can compute a weighted average directly. Then, `df.groupby(\'Category\').apply(weighted_average)` performs the split-apply-combine logic: it splits `df` into groups for categories \'A\' and \'B\', passes each group\'s sub-DataFrame to our `weighted_average` function, and combines the single-value results into a new pandas Series.'
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
            id: 'pychal-1',
            question: 'Read a CSV, clean missing values, and output summary stats.',
            concepts: '**Core Concepts**: Data Ingestion, Data Cleaning (Imputation), and Descriptive Statistics.\n**Explanation**: This is the foundational workflow for nearly any data analysis task. You must first load the data, then handle imperfections like missing values to ensure your analysis is accurate, and finally, generate summary statistics to get a high-level understanding of the dataset\'s properties.',
            answer: '---CODE_START---python\nimport pandas as pd\nimport numpy as np\n\n# Create a dummy CSV for the example\ndata = {\'A\': [1, 2, np.nan, 4], \'B\': [5, np.nan, 7, 8], \'C\': [\'x\', \'y\', \'y\', \'z\']}\ndf = pd.DataFrame(data)\ndf.to_csv(\'sample.csv\', index=False)\n\n# --- Solution ---\ndef process_csv(filepath):\n    # 1. Read the CSV into a pandas DataFrame\n    df = pd.read_csv(filepath)\n    \n    # 2. Clean missing values\n    # For numeric columns, fill with the median (robust to outliers)\n    for col in df.select_dtypes(include=np.number).columns:\n        df[col].fillna(df[col].median(), inplace=True)\n    \n    # For categorical/object columns, fill with the mode (most frequent value)\n    for col in df.select_dtypes(include=\'object\').columns:\n        df[col].fillna(df[col].mode()[0], inplace=True)\n        \n    # 3. Output summary statistics\n    # describe() provides stats for numeric columns by default\n    # include=\'all\' shows stats for both numeric and categorical columns\n    summary = df.describe(include=\'all\')\n    return df, summary\n\ncleaned_df, summary_stats = process_csv(\'sample.csv\')\nprint("Cleaned DataFrame:\\n", cleaned_df)\nprint("\\nSummary Statistics:\\n", summary_stats)\n---CODE_END---',
            example: '**Code Explanation**:\nThe `process_csv` function automates a standard cleaning pipeline. It first identifies numeric columns (`select_dtypes(include=np.number)`) and fills any `NaN` values with the column\'s median. It then does the same for non-numeric columns (`object`), but uses the mode. This separation is crucial because you can\'t calculate the median of a string. Finally, `df.describe(include=\'all\')` generates key statistics like mean, count, standard deviation for numeric columns, and count, unique values, and frequency for categorical columns.'
        },
        {
            id: 'pychal-2',
            question: 'Merge two datasets on multiple keys.',
            concepts: '**Core Concepts**: Relational Algebra, Database-style Joins.\n**Explanation**: In real-world data, a single column is often not enough to uniquely link two tables. For instance, you might need to join data based on both a `user_id` and a `transaction_date`. Merging on multiple keys allows you to perform these more complex, precise joins.',
            answer: '---CODE_START---python\nimport pandas as pd\n\ndf_left = pd.DataFrame({\n    \'key1\': [\'K0\', \'K0\', \'K1\', \'K2\'],\n    \'key2\': [\'K0\', \'K1\', \'K0\', \'K1\'],\n    \'A\': [\'A0\', \'A1\', \'A2\', \'A3\']\n})\n\ndf_right = pd.DataFrame({\n    \'key1\': [\'K0\', \'K1\', \'K1\', \'K2\'],\n    \'key2\': [\'K0\', \'K0\', \'K0\', \'K0\'],\n    \'B\': [\'B0\', \'B1\', \'B2\', \'B3\']\n})\n\n# Perform an inner merge on the combination of \'key1\' and \'key2\'\nmerged_df = pd.merge(df_left, df_right, on=[\'key1\', \'key2\'], how=\'inner\')\n\nprint("Merged DataFrame (on [key1, key2]):\\n", merged_df)\n---CODE_END---',
            example: '**Code Explanation**:\nThe `pd.merge()` function is pandas\' primary tool for joining DataFrames. By passing a list of column names to the `on` parameter (e.g., `on=[\'key1\', \'key2\']`), you instruct pandas to find rows where the values in **both** specified key columns match in `df_left` and `df_right`. The `how=\'inner\'` argument ensures that only rows with matching key combinations in both DataFrames are included in the final result.'
        },
        {
            id: 'pychal-3',
            question: 'Create pivot tables and aggregated summaries.',
            concepts: '**Core Concepts**: Data Reshaping, Aggregation, Cross-Tabulation.\n**Explanation**: Datasets are often in a "long" format, where each row is a single observation. A pivot table reshapes or transforms this data into a "wide" format, which is often more human-readable and useful for analysis. It summarizes data by grouping categories along rows and columns and applying an aggregation function (like mean, sum, or count) to the values.',
            answer: '---CODE_START---python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "Region": ["North", "North", "South", "South", "North", "South"],\n    "Product": ["A", "B", "A", "B", "A", "B"],\n    "Sales": [100, 150, 200, 50, 80, 120],\n    "Quantity": [10, 12, 15, 8, 9, 11]\n})\n\n# Create a pivot table\n# Index: Rows of the pivot table\n# Columns: Columns of the pivot table\n# Values: The data to aggregate\n# Aggfunc: The aggregation function to apply\npivot = pd.pivot_table(df, \n                       values=["Sales", "Quantity"], \n                       index=["Region"], \n                       columns=["Product"], \n                       aggfunc={\'Sales\': np.sum, \'Quantity\': np.mean})\n\nprint("Pivot Table:\\n", pivot)\n---CODE_END---',
            example: '**Code Explanation**:\n`pd.pivot_table` is a powerful function for summarization. In this example:\n- `index=["Region"]` sets "North" and "South" as the rows.\n- `columns=["Product"]` sets "A" and "B" as the main columns.\n- `values=["Sales", "Quantity"]` specifies the numerical data we want to analyze.\n- `aggfunc` applies different functions to different value columns: it calculates the `sum` of `Sales` and the `mean` of `Quantity` for each Region/Product combination.'
        },
        {
            id: 'pychal-12',
            question: 'Sort a DataFrame based on multiple columns.',
            concepts: '**Core Concepts**: Data Sorting, Hierarchical Sorting.\n**Explanation**: Often, you need to sort data by more than one criterion. For example, sorting employees first by department, and then by salary within each department. This is known as a hierarchical or multi-level sort.',
            answer: '---CODE_START---python\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \'Department\': [\'Sales\', \'IT\', \'Sales\', \'IT\', \'HR\'],\n    \'Salary\': [70000, 80000, 65000, 95000, 72000],\n    \'HireDate\': [\'2020-03-10\', \'2019-07-15\', \'2021-05-20\', \'2018-01-05\', \'2020-03-10\']\n})\n\n# Sort by Department (ascending) and then by Salary (descending)\nsorted_df = df.sort_values(\n    by=[\'Department\', \'Salary\'], \n    ascending=[True, False]\n)\n\nprint("Sorted DataFrame:\\n", sorted_df)\n---CODE_END---',
            example: '**Code Explanation**:\nThe `df.sort_values()` method is used for sorting. \n- The `by` parameter takes a list of column names, specifying the order of sorting priority. Here, it will sort the entire DataFrame by `Department` first. \n- The `ascending` parameter takes a corresponding list of booleans. `True` means ascending (A-Z, 0-9) and `False` means descending. So, within each department group, it will then sort by `Salary` in descending order (highest to lowest).'
        },
        {
            id: 'pychal-18',
            question: 'Parse JSON data and convert it to a DataFrame.',
            concepts: '**Core Concepts**: Data Formats (JSON), Data Ingestion, Handling Semi-structured Data.\n**Explanation**: JSON (JavaScript Object Notation) is a very common format for sending data via APIs. Being able to parse a JSON string and load it into a structured format like a pandas DataFrame is a critical skill for data acquisition.',
            answer: '---CODE_START---python\nimport json\nimport pandas as pd\n\n# Sample JSON string (often comes from an API call)\njson_string = """\n[\n    {"id": 1, "name": "Alice", "city": "New York"},\n    {"id": 2, "name": "Bob", "city": "London"},\n    {"id": 3, "name": "Charlie", "city": "Paris"}\n]\n"""\n\n# 1. Parse the JSON string into a Python object (a list of dictionaries)\npython_data = json.loads(json_string)\n\n# 2. Load the Python object directly into a pandas DataFrame\ndf = pd.DataFrame(python_data)\n\nprint(df)\n---CODE_END---',
            example: '**Code Explanation**:\nThis is a two-step process:\n1. The `json.loads()` function (load string) takes a JSON-formatted string as input and converts it into a corresponding Python data structure. In this case, the JSON array of objects becomes a Python list of dictionaries.\n2. The `pd.DataFrame()` constructor is smart enough to accept a list of dictionaries. It automatically uses the dictionary keys as column headers and the values as the row data, creating the DataFrame in one step.'
        },
        {
            id: 'pychal-19',
            question: 'Given timestamps, compute rolling averages.',
            concepts: '**Core Concepts**: Time Series Analysis, Window Functions, Smoothing.\n**Explanation**: A rolling (or moving) average is a core time series technique used to smooth out short-term fluctuations in data and highlight longer-term trends. It works by creating a sliding window of a fixed size (e.g., 7 days) and calculating the average of the data within that window.',
            answer: '---CODE_START---python\nimport pandas as pd\nimport numpy as np\n\n# Create a sample time series DataFrame\ndates = pd.to_datetime(pd.date_range(\'2023-01-01\', periods=10, freq=\'D\'))\ndata = {\'Sales\': [10, 12, 15, 11, 13, 20, 22, 21, 25, 28]}\ndf = pd.DataFrame(data, index=dates)\n\n# Calculate the 3-day rolling average of Sales\n# The first two values will be NaN because the window is not full yet\ndf[\'Rolling_Avg_3D\'] = df[\'Sales\'].rolling(window=3).mean()\n\nprint(df)\n---CODE_END---',
            example: '**Code Explanation**:\nPandas makes this complex operation very simple with the `.rolling()` method. \n- `df[\'Sales\'].rolling(window=3)` creates a `Rolling` object. It doesn\'t compute anything yet; it just defines a sliding window of size 3 over the `Sales` Series.\n- Chaining `.mean()` to it tells pandas to apply the mean function to each of these 3-period windows. For the date \'2023-01-03\', the window contains [10, 12, 15] and the result is their average, 12.33. For \'2023-01-04\', the window slides to [12, 15, 11], and so on.'
        },
        {
            id: 'pyds-21',
            question: 'What is Pandas? How is it useful for data wrangling?',
            concepts: '**Library Architecture**, **Data Structures**. A foundational question for any data role.',
            answer: 'Pandas is an open-source Python library providing high-performance, easy-to-use data structures and data analysis tools.\n\nIt is useful for data wrangling because it offers:\n- **DataFrame Object**: A powerful 2D table object for data manipulation.\n- **File Support**: Easy reading/writing from CSV, Excel, SQL, JSON, etc.\n- **Cleaning Tools**: Functions to handle missing data, duplicates, and data type conversions.\n- **Merging/Joining**: SQL-like capabilities to combine datasets.',
            example: 'Instead of writing complex Python loops to parse a CSV file and calculate an average, you can do it in two lines: `df = pd.read_csv("data.csv")` and `print(df["sales"].mean())`.'
        }
    ],
};

export default dataManipulationCategory;