import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql-mastery',
    title: 'SQL Masterclass (Interview Prep)',
    icon: 'fa-database',
    description: 'The complete interview loop: Execution order, tricky NULL logic, complex Window Functions, and recursive algorithms.',
    questions: [
      // ---------------------------------------------------------
      // LEVEL 1: FOUNDATIONS & TRICKY LOGIC
      // ---------------------------------------------------------
      {
        id: 'sql-1',
        question: 'What is the Order of Execution in an SQL query?',
        concepts: '**Execution Order**: FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.\n**Why it matters**: This explains why you cannot use a column alias defined in `SELECT` inside the `WHERE` clause[cite: 1, 2].',
        answer: 'SQL is not executed in the order it is written. The logical processing order is:\n1. **FROM/JOIN**: Load tables and merge data.\n2. **WHERE**: Filter rows (pre-aggregation).\n3. **GROUP BY**: Aggregate into buckets.\n4. **HAVING**: Filter the buckets.\n5. **SELECT**: Calculate columns and aliases.\n6. **ORDER BY**: Sort the result.\n7. **LIMIT**: Restrict rows.',
        example: '`SELECT total * 0.1 AS tax FROM sales WHERE tax > 5` will **fail** because `tax` is created in step 5, but `WHERE` runs in step 2. You must use `WHERE total * 0.1 > 5`.'
      },
      {
        id: 'sql-2',
        question: 'What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?',
        concepts: '**NULL Handling**: `COUNT(col)` ignores NULLs; `COUNT(*)` counts them[cite: 3, 6].\n**Performance**: `COUNT(*)` is often faster as it avoids checking column values.',
        answer: '- **`COUNT(*)`**: Counts **total rows**, including NULLs.\n- **`COUNT(column)`**: Counts all **non-NULL** values in that column.\n- **`COUNT(DISTINCT column)`**: Counts unique, non-NULL values.',
        example: 'If you have a table with 5 rows, and one row has a NULL email:\n`COUNT(*)` returns 5.\n`COUNT(email)` returns 4.'
      },
      {
        id: 'sql-3',
        question: 'Explain the difference between WHERE and HAVING.',
        concepts: '**Timing**: `WHERE` filters before grouping; `HAVING` filters after grouping[cite: 1, 2].',
        answer: '- **WHERE** filters individual records **before** `GROUP BY`.\n- **HAVING** filters aggregated groups **after** `GROUP BY`.\nYou cannot use aggregate functions (like `SUM()`) in a `WHERE` clause[cite: 2, 3].',
        example: 'To find departments with > $10k sales: First `WHERE date > \'2023-01-01\'` (filter rows), then `GROUP BY dept`, then `HAVING SUM(sales) > 10000` (filter groups)[cite: 4].'
      },
      {
        id: 'sql-4',
        question: 'What is the difference between UNION and UNION ALL?',
        concepts: '**Performance Trap**: `UNION` performs a sort to remove duplicates; `UNION ALL` does not[cite: 7, 8].',
        answer: '- **UNION**: Combines results and **removes duplicates**. Slower.\n- **UNION ALL**: Stacks results and **keeps duplicates**. Much faster[cite: 9].',
        example: 'Use `UNION ALL` for logging tables where duplicates are allowed or impossible, to save performance cost[cite: 10].'
      },
      {
        id: 'sql-5',
        question: 'The "NOT IN" Trap: What happens if your subquery returns a NULL?',
        concepts: '**Three-Valued Logic**: `NOT IN (1, 2, NULL)` returns UNKNOWN for everything.\n**Fix**: Use `NOT EXISTS` or filter `IS NOT NULL`[cite: 6].',
        answer: 'If you use `WHERE ID NOT IN (Select ID from B)` and Table B contains even a single `NULL` value, the entire query will return **zero rows** (empty set). This is because `X <> NULL` is logically "Unknown", so the database cannot confirm X is "NOT IN" the list.',
        example: 'Always ensure your subquery has `WHERE ID IS NOT NULL` or use `NOT EXISTS` which handles NULLs safely.'
      },

      // ---------------------------------------------------------
      // LEVEL 2: DATA MANIPULATION & CLEANING
      // ---------------------------------------------------------
      {
        id: 'sql-6',
        question: 'How do you find duplicate records (e.g., duplicate emails) in a table?',
        concepts: '**Aggregation Pattern**: `GROUP BY` + `HAVING COUNT > 1`[cite: 23].',
        answer: 'Group by the column(s) that should be unique, then filter for groups containing more than one row.',
        example: '---CODE_START---sql\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n---CODE_END--- [cite: 24]'
      },
      {
        id: 'sql-7',
        question: 'How do you delete duplicate rows while keeping the one with the lowest/highest ID?',
        concepts: '**CTE** + **ROW_NUMBER()**.\n**Logic**: Rank the duplicates and delete those with rank > 1[cite: 51, 52].',
        answer: 'The modern approach uses a CTE with `ROW_NUMBER()`.\n1. Partition by the duplicate keys (e.g., email).\n2. Order by ID (ASC to keep first, DESC to keep last).\n3. Delete rows where `row_num > 1`.',
        example: '---CODE_START---sql\nWITH CTE AS (\n    SELECT *, \n    ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) as rn\n    FROM users\n)\nDELETE FROM CTE WHERE rn > 1;\n---CODE_END---'
      },
      {
        id: 'sql-8',
        question: 'How do you Pivot data (Rows to Columns) without a PIVOT function?',
        concepts: '**Conditional Aggregation**: `CASE WHEN` inside `SUM` or `MAX`[cite: 116, 117].\n**Portability**: Works in every SQL dialect.',
        answer: 'Use `SUM(CASE WHEN condition THEN value ELSE 0 END)`. This scans the table once and "buckets" data into columns[cite: 118].',
        example: '---CODE_START---sql\nSELECT \n    product_id,\n    SUM(CASE WHEN year=2023 THEN sales ELSE 0 END) as sales_2023,\n    SUM(CASE WHEN year=2024 THEN sales ELSE 0 END) as sales_2024\nFROM revenue\nGROUP BY product_id;\n---CODE_END--- [cite: 119]'
      },
      {
        id: 'sql-9',
        question: 'Extract the domain name from a list of email addresses.',
        concepts: '**String Manipulation**: `SUBSTRING`, `CHARINDEX` (or `POSITION`), `LEN`.\n**Logic**: Find the `@` symbol and take everything after it.',
        answer: 'You need to find the index of `@` and substring from there to the end.\n- **Standard SQL**: `SUBSTRING(email, POSITION(\'@\' IN email) + 1, LEN(email))`',
        example: '`john@gmail.com` -> The function finds `@` at pos 5, then takes the substring starting at 6.'
      },

      // ---------------------------------------------------------
      // LEVEL 3: JOINS & RELATIONSHIPS
      // ---------------------------------------------------------
      {
        id: 'sql-10',
        question: 'Find employees who earn more than their managers.',
        concepts: '**Self-Join**: Joining a table to itself [cite: 18].\n**Concept**: Alias the table as `e` (Employee) and `m` (Manager)[cite: 19].',
        answer: 'Join the table to itself on `Employee.ManagerID = Manager.ID`. Then filter where `Employee.Salary > Manager.Salary`[cite: 20, 21].',
        example: '---CODE_START---sql\nSELECT e.Name \nFROM Employee e\nJOIN Employee m ON e.ManagerId = m.Id\nWHERE e.Salary > m.Salary;\n---CODE_END---'
      },
      {
        id: 'sql-11',
        question: 'Identify products that have never been sold (Finding Missing Records).',
        concepts: '**LEFT JOIN Exclusion**: The standard pattern for "A minus B"[cite: 56, 187].',
        answer: 'Perform a `LEFT JOIN` from `Products` (left) to `Sales` (right). Any product with no sales will have `NULL` in the `Sales` columns. Filter for these NULLs[cite: 59, 60].',
        example: '---CODE_START---sql\nSELECT p.Name\nFROM Products p\nLEFT JOIN Sales s ON p.Id = s.ProductId\nWHERE s.Id IS NULL;\n---CODE_END--- [cite: 337, 339]'
      },
      {
        id: 'sql-12',
        question: 'Find pairs of products frequently bought together (Market Basket Analysis).',
        concepts: '**Self-Join Inequality**: `p1.id < p2.id` to avoid duplicates like (A, B) and (B, A)[cite: 35, 376].',
        answer: 'Join `OrderItems` to itself on `OrderID`. Use `WHERE A.ProductId < B.ProductId` to ensure unique pairs and avoid self-matches[cite: 36, 37].',
        example: '---CODE_START---sql\nSELECT a.ProductId, b.ProductId, COUNT(*)\nFROM OrderItems a\nJOIN OrderItems b ON a.OrderId = b.OrderId\nWHERE a.ProductId < b.ProductId\nGROUP BY 1, 2\nORDER BY 3 DESC;\n---CODE_END--- [cite: 38]'
      },
      {
        id: 'sql-13',
        question: 'What is a Cross Join and when would you use it?',
        concepts: '**Cartesian Product**: Every row meets every row [cite: 95].\n**Use Case**: Generating combinations (e.g., Sizes x Colors)[cite: 96].',
        answer: 'A `CROSS JOIN` returns the Cartesian product (A rows * B rows). It has no `ON` clause. It is useful for generating "Master Lists" of combinations[cite: 94].',
        example: 'Joining a table of `Days` (Mon-Sun) with `Shifts` (Morning, Night) to generate a blank schedule grid[cite: 98].'
      },
      {
        id: 'sql-14',
        question: 'When should you use a FULL OUTER JOIN?',
        concepts: '**Set Theory**: A U B (Union of both sets).\n**Use Case**: Comparing two lists where both sides might have missing data.',
        answer: '`FULL OUTER JOIN` returns all rows when there is a match in *either* the left or right table. It combines the results of both `LEFT` and `RIGHT` joins. Use this when you need a complete picture of two datasets, retaining non-matching rows from both.',
        example: 'Comparing a "Sales List" and a "Budget List". Some items have sales but no budget; some have budget but no sales. Full Outer Join catches both.'
      },

      // ---------------------------------------------------------
      // LEVEL 4: WINDOW FUNCTIONS (THE INTERVIEW CORE)
      // ---------------------------------------------------------
      {
        id: 'sql-15',
        question: 'Rank employees by salary within each department. Explain RANK vs DENSE_RANK.',
        concepts: '**Partitioning**: `PARTITION BY` resets the math for each group [cite: 140].\n**Tie-breaking**: How gaps are handled[cite: 142].',
        answer: '- **RANK()**: Leaves gaps for ties (1, 1, 3).\n- **DENSE_RANK()**: No gaps (1, 1, 2) [cite: 142].\n- **ROW_NUMBER()**: Unique IDs (1, 2, 3) regardless of ties[cite: 281].',
        example: '---CODE_START---sql\nSELECT Name, Dept, Salary,\n  DENSE_RANK() OVER(PARTITION BY Dept ORDER BY Salary DESC) as Rank\nFROM Employees;\n---CODE_END--- [cite: 43]'
      },
      {
        id: 'sql-16',
        question: 'Find the Top 2 highest-selling products for each category.',
        concepts: '**Filtering Window Functions**: You cannot use a window function in a `WHERE` clause.\n**Solution**: Use a CTE or Subquery[cite: 232].',
        answer: '1. Rank the products inside a CTE using `DENSE_RANK()` or `RANK()`[cite: 237]. \n2. Select from the CTE where `Rank <= 2`[cite: 245].',
        example: '---CODE_START---sql\nWITH Ranked AS (\n  SELECT *, DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC) as rnk\n  FROM Sales\n)\nSELECT * FROM Ranked WHERE rnk <= 2;\n---CODE_END---'
      },
      {
        id: 'sql-17',
        question: 'Calculate a Rolling 7-Day Average of daily sales.',
        concepts: '**Frame Spec**: `ROWS BETWEEN`[cite: 47, 394].\n**Trap**: Default frame is `UNBOUNDED PRECEDING`, which is a running total, not a moving average.',
        answer: 'Use `AVG(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. This specifically averages the current row plus the 6 rows before it[cite: 48].',
        example: 'Without `ROWS BETWEEN`, SQL will average *all* previous days, which is incorrect for a "7-day" view.'
      },
      {
        id: 'sql-18',
        question: 'Calculate the Cumulative Sum (Running Total) of sales.',
        concepts: '**Unbounded Preceding**: The default frame for `ORDER BY`[cite: 192].\n**Analysis**: Visualizing growth over time.',
        answer: 'Use `SUM(amount) OVER (ORDER BY date)`. Without a `PARTITION`, it runs across the whole result set. With `PARTITION BY Year`, it resets every year[cite: 13, 319].',
        example: '---CODE_START---sql\nSELECT date, amount, \n  SUM(amount) OVER(ORDER BY date) as running_total\nFROM Sales;\n---CODE_END---'
      },
      {
        id: 'sql-19',
        question: 'Calculate Year-over-Year (YoY) or Month-over-Month (MoM) growth.',
        concepts: '**LAG() / LEAD()**: Accessing previous rows without a self-join [cite: 155, 193].\n**Math**: `(Current - Previous) / Previous`[cite: 158].',
        answer: 'Use `LAG(sales) OVER (ORDER BY date)` to retrieve the previous period\'s sales on the current row. Then apply the growth formula[cite: 157].',
        example: '---CODE_START---sql\nWITH Monthly AS (\n   -- Aggregate by month first\n   SELECT month, SUM(sales) as total FROM sales GROUP BY 1\n)\nSELECT month, total,\n  (total - LAG(total) OVER(ORDER BY month)) / LAG(total) OVER(ORDER BY month) as growth_pct\nFROM Monthly;\n---CODE_END---'
      },

      // ---------------------------------------------------------
      // LEVEL 5: COMPLEX ALGORITHMS & LOGIC
      // ---------------------------------------------------------
      {
        id: 'sql-20',
        question: 'Solve the "Gaps and Islands" problem (Find consecutive streaks).',
        concepts: '**Row_Number Math**: The hardest standard interview question [cite: 50].\n**Logic**: `Date - Row_Number` is constant for consecutive sequences[cite: 52].',
        answer: '1. Generate a `ROW_NUMBER()` ordered by date.\n2. Subtract the row number from the date. This creates a "Group ID"[cite: 53].\n3. Group by this ID to find the `MIN(start)` and `MAX(end)` of the streak.',
        example: 'Used to find "Longest daily login streak" or "Consecutive winning days".'
      },
      {
        id: 'sql-21',
        question: 'Calculate the Median salary for each department.',
        concepts: '**Median**: Harder than Average because it requires sorting[cite: 274].\n**Logic**: The value at position `(Count + 1) / 2`.',
        answer: 'Since there is no `MEDIAN()` function in most SQL dialects:\n1. Use `ROW_NUMBER()` to sort rows[cite: 281].\n2. Use `COUNT()` to get total rows.\n3. Filter where `Row_Num` is in the middle range[cite: 286].',
        example: '---CODE_START---sql\nWITH CTE AS (\n  SELECT salary, \n  ROW_NUMBER() OVER(ORDER BY salary) as rn, \n  COUNT(*) OVER() as cnt\n  FROM salaries\n)\nSELECT AVG(salary) FROM CTE \nWHERE rn BETWEEN cnt/2.0 AND cnt/2.0 + 1;\n---CODE_END---'
      },
      {
        id: 'sql-22',
        question: 'Find customers who have bought products from ALL available categories (Relational Division).',
        concepts: '**Universal Quantifier**: "For all X, there exists Y" [cite: 287].\n**Logic**: Compare `Count(Distinct CustomerCategories)` vs `Count(Distinct TotalCategories)`[cite: 302].',
        answer: '1. Count the total distinct categories in the `Products` table[cite: 297].\n2. Group the `Sales` table by Customer and count their distinct categories[cite: 291].\n3. Filter where `CustomerCategoryCount = TotalCategoryCount`.',
        example: 'Identifying "Power Users" who use every feature of an app.'
      },
      {
        id: 'sql-23',
        question: 'Identify anomalies where sales are 50% lower than the product average.',
        concepts: '**Mixing Detail and Aggregate**: Comparing a row to the group mean[cite: 246].\n**Window approach**: `Value / AVG(Value) OVER()`.',
        answer: 'Calculate the average sales per product (using a Window Function or CTE), then filter rows where `DailySale < 0.5 * AverageSale`[cite: 257].',
        example: '---CODE_START---sql\nSELECT *\nFROM (\n  SELECT *, AVG(amount) OVER(PARTITION BY product_id) as avg_amt\n  FROM Sales\n) t\nWHERE amount < 0.5 * avg_amt;\n---CODE_END---'
      },
      {
        id: 'sql-24',
        question: 'Fill missing dates in a report (Data Densification).',
        concepts: '**Recursive CTE** or **Calendar Table**[cite: 186].\n**Problem**: `GROUP BY date` hides days with zero sales.',
        answer: '1. Use a Recursive CTE to generate a continuous list of dates (e.g., Jan 1 to Jan 31)[cite: 188].\n2. `LEFT JOIN` your sales data to this list.\n3. Use `COALESCE(sales, 0)` to turn NULLs into zeros[cite: 188].',
        example: '---CODE_START---sql\nWITH RECURSIVE Dates AS (...)\nSELECT d.date, COALESCE(SUM(s.amt), 0)\nFROM Dates d\nLEFT JOIN Sales s ON d.date = s.date\nGROUP BY d.date;\n---CODE_END---'
      },
      {
        id: 'sql-25',
        question: 'Reactivation: Find customers who purchased this month but NOT in the previous 6 months.',
        concepts: '**Complex Time Intervals**[cite: 350].\n**Logic**: Inclusion Criteria AND Exclusion Criteria.',
        answer: '1. Identify users active in the current month[cite: 358].\n2. Use `NOT EXISTS` or `LEFT JOIN ... WHERE NULL` to ensure they are NOT in the set of users active in the prior 6 months[cite: 366].',
        example: 'Used for Growth Accounting (New vs. Resurrected vs. Churned users).'
      },
      {
        id: 'sql-26',
        question: 'Calculate Retention Rate (Cohort Analysis).',
        concepts: '**Cohort Analysis**[cite: 29, 33].\n**Definition**: % of users from Month A who returned in Month B.',
        answer: '1. Assign users to a "Cohort" (their signup month)[cite: 30].\n2. Left join user activity to the cohort[cite: 31].\n3. Group by `CohortMonth` and `ActivityMonth`.\n4. Divide `ActiveUsers` by `CohortSize`[cite: 33].',
        example: 'Commonly visualized as a "Heatmap" or "Triangle Chart" in analytics.'
      },

      // ---------------------------------------------------------
      // LEVEL 6: CTES & RECURSION
      // ---------------------------------------------------------
      {
        id: 'sql-27',
        question: 'What is a CTE (Common Table Expression) and why use it over a Subquery?',
        concepts: '**Readability**: CTEs break complex logic into named steps [cite: 16].\n**Reusability**: A CTE can be referenced multiple times in the main query[cite: 105].',
        answer: 'A CTE (`WITH Name AS ...`) defines a temporary result set. It is preferred over subqueries because it is more readable (linear logic) and allows for recursion[cite: 104].',
        example: 'Instead of `SELECT * FROM (SELECT ...) JOIN (SELECT ...)`, you write `WITH A AS (...), B AS (...) SELECT * FROM A JOIN B`.'
      },
      {
        id: 'sql-28',
        question: 'How does a Recursive CTE work? (e.g., generating an Org Chart).',
        concepts: '**Anchor & Recursive Member**[cite: 16].\n**Structure**: Base Case UNION ALL Recursive Step.',
        answer: '1. **Anchor**: Select the top-level parent (e.g., CEO, ManagerID is NULL).\n2. **Recursive Step**: Select employees joining to the CTE on `Employee.ManagerID = CTE.EmployeeID`.\n3. The DB repeats step 2 until no new rows are returned[cite: 188].',
        example: 'Used for hierarchical data (Org charts, Folder structures) or generating number sequences.'
      },
      {
        id: 'sql-29',
        question: 'How do you select every Nth row (e.g., Odd/Even rows)?',
        concepts: '**Modulo Arithmetic**: The `%` operator returns the remainder[cite: 152].\n**Sampling**: Technique for random sampling or formatting.',
        answer: 'Use `ID % 2 <> 0` to find odd numbers. Use `ROW_NUMBER() % N = 0` to find every Nth row (e.g., every 10th record)[cite: 152].',
        example: '---CODE_START---sql\nSELECT * FROM Users WHERE UserID % 2 = 1; -- Selects Odd IDs\n---CODE_END---'
      },

      // ---------------------------------------------------------
      // LEVEL 7: OPTIMIZATION & SYSTEM DESIGN
      // ---------------------------------------------------------
      {
        id: 'sql-30',
        question: 'How do you optimize a slow SQL query?',
        concepts: '**Checklist**: Indexes, Execution Plan, SARGable, Selectivity[cite: 109, 110].\n**Process**: Identify the bottleneck.',
        answer: '1. **Analyze Plan**: Check `EXPLAIN` for "Full Table Scans"[cite: 111].\n2. **Indexes**: Ensure filter/join columns are indexed[cite: 109].\n3. **SARGable**: Remove functions from `WHERE` columns (e.g., `YEAR(date)` -> `BETWEEN`)[cite: 115].\n4. **Selectivity**: Are you filtering for 1% of data (Index good) or 90% (Index bad)?',
        example: 'Changing `WHERE LEFT(name, 1) = "A"` to `WHERE name LIKE "A%"` allows the database to use the index.'
      },
      {
        id: 'sql-31',
        question: 'What is the difference between a Clustered and Non-Clustered Index?',
        concepts: '**Physical vs. Logical**[cite: 207].\n**Analogy**: Dictionary (Clustered) vs. Textbook Index (Non-Clustered).',
        answer: '- **Clustered Index**: Reorders the **actual physical data** on the disk. Only 1 per table (usually the Primary Key).\n- **Non-Clustered Index**: A separate structure that points to the data rows. You can have many[cite: 207].',
        example: 'Searching by Primary Key is fast because the data is physically stored there. Searching by "Email" requires a Non-Clustered index to find the pointer to the row.'
      },
      {
        id: 'sql-32',
        question: 'Why should you avoid `SELECT *` in production?',
        concepts: '**I/O Overhead**: Network traffic and memory usage[cite: 112].\n**Index Usage**: Prevents "Covering Indexes".',
        answer: '1. **Network**: Transfers unnecessary data.\n2. **Performance**: Prevents the use of "Covering Indexes" (where the index alone answers the query without reading the table)[cite: 113].\n3. **Maintenance**: If columns change, code might break.',
        example: 'If an index exists on `(ID, Name)`, `SELECT ID, Name` is instant. `SELECT *` forces the DB to look up the rest of the row data.'
      },
      {
        id: 'sql-33',
        question: 'What is a "SARGable" query?',
        concepts: '**Search ARGument ABLE**[cite: 114].\n**Rule**: Do not perform math/functions on the column side of the comparison.',
        answer: 'A query capable of using an index. Functions on columns in the `WHERE` clause blind the optimizer[cite: 114].',
        example: '- **Bad**: `WHERE YEAR(date) = 2023` (Calculates year for every row, ignores index).\n- **Good**: `WHERE date >= "2023-01-01" AND date < "2024-01-01"` (Uses index range scan)[cite: 115].'
      },
      {
        id: 'sql-34',
        question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
        concepts: '**Transaction Logs**: Rollback capability[cite: 25].\n**Speed**: DDL vs DML.',
        answer: '- **DELETE**: Removes rows one by one. Slow. Can be rolled back[cite: 26].\n- **TRUNCATE**: Deletes all pages. Fast. Resets identity. Hard to rollback [cite: 27].\n- **DROP**: Deletes the table structure entirely[cite: 28].',
        example: 'Use `TRUNCATE` for staging tables. Use `DELETE` for removing specific users.'
      },
      {
        id: 'sql-35',
        question: 'How would you design a query to handle a Daily vs Weekly reporting toggle?',
        concepts: '**Dynamic Grouping**: `GROUPING SETS` or `ROLLUP`[cite: 200].\n**Application**: Dashboard backends.',
        answer: 'Use `GROUP BY GROUPING SETS ((Day), (Week))` to calculate both levels of aggregation in a single query pass, rather than running two separate queries[cite: 201].',
        example: 'Efficiency technique for dashboards that let users zoom in/out of time ranges.'
      },
       {
        id: 'sql-36',
        question: 'You have a query that works fast in Dev but slow in Prod. Why?',
        concepts: '**Parameter Sniffing**, **Data Volume**, **Statistics**[cite: 173].\n**Debugging**: Environment differences.',
        answer: '1. **Data Volume**: Prod has millions of rows; Dev has hundreds[cite: 176].\n2. **Statistics**: Prod stats might be stale, leading to bad execution plans[cite: 177].\n3. **Parameter Sniffing**: The plan was cached for a "small" parameter but is now used for a "large" one.',
        example: 'A plan optimized for "User ID 1" (1 order) might crash when used for "User ID 2" (1 million orders).'
      },
      {
        id: 'sql-37',
        question: 'What is the difference between a Temporary Table and a CTE?',
        concepts: '**Scope & Storage**.\n**Physical vs. Logical**[cite: 15].',
        answer: '- **CTE**: Exists only for the duration of a single query. Logic is often inline.\n- **Temp Table**: Physically stored in `TempDB`. Can be indexed. Persists for the session.',
        example: 'Use a **CTE** for readability in a single report. Use a **Temp Table** if you need to process data, index it, and then run multiple different queries against that intermediate result.'
      },
      {
        id: 'sql-38',
        question: 'Create a procedure to select employees with salary < X.',
        concepts: '**Stored Procedures**: Encapsulating logic and parameters[cite: 148].',
        answer: 'Stored procedures allow you to save a query on the server and pass parameters (like `@SalaryThreshold`) to it at runtime, making the logic reusable and secure.',
        example: '---CODE_START---sql\nCREATE PROCEDURE GetLowSalary (@Threshold INT)\nAS\nSELECT * FROM Employees WHERE Salary < @Threshold;\n---CODE_END--- [cite: 148]'
      }
    ],
};

export default sqlCategory;
