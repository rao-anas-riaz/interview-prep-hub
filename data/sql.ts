import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql-mastery',
    title: 'SQL Masterclass (Definitive Guide)',
    icon: 'fa-database',
    description: 'Master technical definitions, logical execution, and complex scenarios with detailed code examples.',
    questions: [
      // ---------------------------------------------------------
      // LEVEL 1: HOW THE ENGINE THINKS (The Foundation)
      // ---------------------------------------------------------
      {
        id: 'sql-1',
        question: 'What is the Order of Execution in an SQL query?',
        concepts: '**Logical Query Processing**: The sequence in which the database engine executes clauses, which differs from the order you write them.\n\n**The 7 Steps:**\n1. **FROM/JOIN**: Identifies tables and creates the working dataset.\n2. **WHERE**: Filters individual rows based on conditions. *Crucial: Aliases created later do not exist here.*\n3. **GROUP BY**: Aggregates rows into buckets.\n4. **HAVING**: Filters the aggregated buckets.\n5. **SELECT**: Computes columns, functions, and creates **Aliases**.\n6. **ORDER BY**: Sorts the final result.\n7. **LIMIT/OFFSET**: Discards rows to return a specific subset.',
        answer: 'You must understand that the **SELECT** clause (where you name your columns) runs **after** the **WHERE** clause. This is why you cannot use a column alias inside the WHERE clause—the engine hasn\'t created it yet. To fix this, you must either repeat the calculation in the WHERE clause or use a derived table (CTE/Subquery) to "materialize" the alias first.',
        example: '---CODE_START---sql\n-- SCENARIO: Filter sales where the calculated Tax is > 5.\n\n-- WRONG (Will Error): "Tax" does not exist when WHERE runs.\nSELECT Price * 0.1 AS Tax\nFROM Sales\nWHERE Tax > 5;\n\n-- CORRECT (Option 1): Repeat the math.\nSELECT Price * 0.1 AS Tax\nFROM Sales\nWHERE (Price * 0.1) > 5;\n\n-- CORRECT (Option 2 - Best for complex logic): Use a CTE.\nWITH CalculatedData AS (\n    -- The CTE runs first, creating the "Tax" column.\n    SELECT Price * 0.1 AS Tax \n    FROM Sales\n)\n-- Now the outer query sees "Tax" as a real column.\nSELECT * \nFROM CalculatedData \nWHERE Tax > 5;\n---CODE_END---',
        whatIfs: [
            '**What if you want to filter by the alias without a CTE?**\nSome databases (like MySQL/Postgres) allow aliases in `GROUP BY` or `HAVING`, but `WHERE` is strictly forbidden. You can force it by wrapping it in a subquery.\n---CODE_START---sql\nSELECT * \nFROM (\n  SELECT Price * 0.1 AS Tax FROM Sales\n) t\nWHERE Tax > 5;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-2',
        question: 'What is the difference between COUNT(*), COUNT(col), and COUNT(DISTINCT)?',
        concepts: '**Aggregation Functions**: Functions that calculate a single result from a set of input values.\n\n**The Definitions**:\n* **COUNT(*)**: Counts the cardinality (number of rows) of the result set. It **includes NULLs** and duplicates.\n* **COUNT(column)**: Counts the number of **non-NULL** values in a specific column. It ignores NULLs but counts duplicates.\n* **COUNT(DISTINCT column)**: Counts the number of **unique, non-NULL** values. It ignores duplicates and NULLs.',
        answer: 'The key difference is **NULL handling**. If you need the total number of records (e.g., "Total Users"), always use `COUNT(*)`. If you need to know how many users have entered a specific field (e.g., "Users with a Phone Number"), use `COUNT(phone)`. If you need to know how many unique categories exist, use `COUNT(DISTINCT category)`.',
        example: '---CODE_START---sql\n-- Table: Users (5 rows total)\n-- 1. Bob (Email: bob@test.com)\n-- 2. Bob (Email: bob@test.com) <- Duplicate\n-- 3. Alice (Email: alice@test.com)\n-- 4. John (Email: NULL)\n-- 5. Dave (Email: NULL)\n\nSELECT \n    COUNT(*) AS TotalRows,              -- Returns 5 (Counts everything)\n    COUNT(Email) AS ValidEmails,        -- Returns 3 (Ignores the 2 NULLs)\n    COUNT(DISTINCT Email) AS UniqueUsers -- Returns 2 (Bob, Alice. Ignores duplicates & NULLs)\nFROM Users;\n---CODE_END---',
        whatIfs: [
            '**What if you want to count the number of NULLs?**\nYou calculate the difference between the total rows and the non-null rows.\n---CODE_START---sql\nSELECT COUNT(*) - COUNT(Email) AS NullEmailCount\nFROM Users;\n---CODE_END---',
            '**What if you want to count unique pairs (e.g., distinct User + Device)?**\nConcatenate the columns inside the Distinct.\n---CODE_START---sql\nSELECT COUNT(DISTINCT CONCAT(UserID, \'-\', DeviceID))\nFROM UserLogins;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-3',
        question: 'Explain the difference between WHERE and HAVING.',
        concepts: '**Filtering**: The process of removing unwanted data.\n\n**The Definitions**:\n* **WHERE Clause**: A **Row-Level Filter**. It runs *before* data is grouped. It restricts which records are fed into the aggregation.\n* **HAVING Clause**: A **Group-Level Filter**. It runs *after* data is grouped. It restricts which aggregated buckets are displayed.\n* **Aggregate Functions**: `SUM`, `AVG`, `COUNT`, `MAX`. These **cannot** be used in `WHERE`.',
        answer: 'Use `WHERE` to filter raw data (e.g., "Last Year\'s Sales"). Use `HAVING` to filter calculated data (e.g., "Total Sales > $10k"). You often use them together: `WHERE` reduces the dataset size immediately (performance optimization), and `HAVING` applies the business logic rules to the final results.',
        example: '---CODE_START---sql\n-- GOAL: Find Departments with total salaries > $500k, excluding Interns.\n\nSELECT Department, SUM(Salary) as TotalSalary\nFROM Employees\n-- Step 1 (WHERE): Filter ROWS. Remove Interns before calculating.\nWHERE JobTitle <> \'Intern\'  \n-- Step 2: Aggregate the remaining rows.\nGROUP BY Department         \n-- Step 3 (HAVING): Filter GROUPS. Check the sum.\nHAVING SUM(Salary) > 500000;\n---CODE_END---',
        whatIfs: [
            '**What if you try to use HAVING without GROUP BY?**\nIt works, but it treats the entire result set as one single group. It behaves like an aggregate filter on the whole table.\n---CODE_START---sql\nSELECT COUNT(*)\nFROM Sales\nHAVING COUNT(*) > 100; -- Returns the count only if it exceeds 100\n---CODE_END---'
        ]
      },
      {
        id: 'sql-4',
        question: 'What is the difference between UNION and UNION ALL?',
        concepts: '**Set Operators**: Commands that combine the result sets of two or more SELECT queries into a single result set.\n\n**The Definitions**:\n* **UNION**: Combines results and **removes duplicates**. It performs a `DISTINCT` operation (sorting/hashing) implicitly.\n* **UNION ALL**: Combines results and **keeps duplicates**. It simply appends the second dataset to the first.\n* **Prerequisites**: Both queries must have the same number of columns in the same order, with compatible data types.',
        answer: 'Always default to `UNION ALL` for performance. The duplicate removal process in `UNION` is computationally expensive (requires sorting). Only use `UNION` if your business logic strictly requires a unique list and you cannot achieve it via upstream filtering.',
        example: '---CODE_START---sql\n-- SCENARIO: Combine Historical Archives with Current Data.\n\n-- Use UNION ALL because a record in 2022 cannot exist in 2023.\n-- Checking for duplicates is a waste of time here.\nSELECT Date, Sales FROM Sales_2022\nUNION ALL\nSELECT Date, Sales FROM Sales_2023;\n\n-- SCENARIO: Get a list of all unique customer emails from two different apps.\n-- Use UNION because the same user might exist in both apps.\nSELECT Email FROM App1_Users\nUNION\nSELECT Email FROM App2_Users;\n---CODE_END---',
        whatIfs: [
            '**What if the columns have different names?**\nSQL only cares about the **position** (1st column, 2nd column). The result will take the column names from the *first* query.\n---CODE_START---sql\nSELECT FullName FROM Users -- Result column will be called "FullName"\nUNION ALL\nSELECT UserName FROM Admins; -- This is valid if data types match\n---CODE_END---'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 2: DATA MANIPULATION (The Toolkit)
      // ---------------------------------------------------------
      {
        id: 'sql-5',
        question: 'How do you find duplicate records (e.g., duplicate emails)?',
        concepts: '**Data Quality**: Identifying redundant entries in a dataset.\n**Grouping Pattern**: The standard technique for finding frequency.\n\n**The Definitions**:\n* **GROUP BY**: Collapses identical values into a single row.\n* **HAVING**: Filters groups based on an aggregate condition.\n* **Frequency Distribution**: Counting how many times each unique value appears.',
        answer: 'To find duplicates, you group the data by the unique key (e.g., Email) and count the size of each group. If the count is greater than 1, the email is a duplicate.',
        example: '---CODE_START---sql\n-- GOAL: Identify emails that appear more than once.\n\nSELECT \n    email, \n    COUNT(*) as frequency\nFROM users\nGROUP BY email\n-- Filter to show only buckets with > 1 item\nHAVING COUNT(*) > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find the IDs associated with these duplicates?**\nYou cannot do this in a simple GROUP BY. You need a Window Function or Self Join.\n---CODE_START---sql\nSELECT *\nFROM (\n    SELECT *, COUNT(*) OVER(PARTITION BY email) as cnt\n    FROM users\n) t\nWHERE cnt > 1;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-6',
        question: 'How do you delete duplicate rows while keeping the one with the lowest/highest ID?',
        concepts: '**De-duplication**: The process of removing redundant copies while retaining one "Golden Record".\n**Window Functions (Row_Number)**: Assigning a sequential integer to rows within a partition.\n**CTE (Common Table Expression)**: A temporary named result set.',
        answer: 'The most efficient strategy is to "Rank and Delete". We define a "Partition" (the group of duplicates) and an "Order" (which one we want to keep). We assign Rank 1 to the keeper and Rank 2+ to the duplicates. Then we delete anything with Rank > 1.',
        example: '---CODE_START---sql\n-- GOAL: Keep the User with the LOWEST ID, delete the rest.\n\nWITH RankedUsers AS (\n    SELECT \n        ID, \n        Email,\n        -- Partition by Email (Group duplicates)\n        -- Order by ID ASC (Lowest ID gets RowNum 1)\n        ROW_NUMBER() OVER(PARTITION BY Email ORDER BY ID ASC) as rn\n    FROM Users\n)\n-- Delete rows where rank is 2, 3, 4...\nDELETE FROM RankedUsers \nWHERE rn > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to keep the NEWEST record (Highest ID)?**\nFlip the sorting order to DESC.\n---CODE_START---sql\nROW_NUMBER() OVER(PARTITION BY Email ORDER BY ID DESC)\n-- Now the Highest ID is Row 1\n---CODE_END---'
        ]
      },
      {
        id: 'sql-7',
        question: 'How do you Pivot data (Rows to Columns) without a PIVOT function?',
        concepts: '**Pivoting**: Transforming data from a long format (rows) to a wide format (columns).\n**Conditional Aggregation**: Using a `CASE` statement inside an aggregate function (SUM, MAX, COUNT).\n**Portability**: This method works in almost every SQL dialect (MySQL, Postgres, SQL Server, Oracle).',
        answer: 'You "bucket" the data manually. You scan the table once, and for each row, the `CASE` statement decides which column bucket the value belongs to. If it matches the condition, you add the value; if not, you add 0 (or NULL).',
        example: '---CODE_START---sql\n-- GOAL: Turn rows of (Year, Sales) into columns [Sales_2023, Sales_2024]\n\nSELECT \n    ProductID,\n    -- Bucket 1: 2023 Sales\n    SUM(CASE WHEN Year = 2023 THEN SalesAmount ELSE 0 END) AS Sales_2023,\n    -- Bucket 2: 2024 Sales\n    SUM(CASE WHEN Year = 2024 THEN SalesAmount ELSE 0 END) AS Sales_2024\nFROM Sales\nGROUP BY ProductID;\n---CODE_END---',
        whatIfs: [
            '**What if you have dynamic columns (e.g., unknown number of years)?**\nStandard SQL cannot handle dynamic columns. You would need to use **Dynamic SQL** (Stored Procedure generating a string) or handle the pivoting in your application layer (Python/Pandas).\n---CODE_START---sql\n-- Dynamic SQL Concept (Pseudo-code)\nEXEC(\'SELECT ... \' + @GeneratedColumns + \' FROM ...\')\n---CODE_END---'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 3: JOINS (The Connections)
      // ---------------------------------------------------------
      {
        id: 'sql-8',
        question: 'Find employees who earn more than their managers.',
        concepts: '**Self-Join**: A join where a table is joined with itself.\n**Aliasing**: Giving temporary names (e.g., `e`, `m`) to table instances to distinguish them.\n**Hierarchical Data**: Data where rows have parent-child relationships within the same table.',
        answer: 'Since the "Employee" and the "Manager" are both stored in the `Employees` table, we imagine we have two copies of the table. We alias one as `Emp` (the subordinate) and one as `Mgr` (the boss). We join them where `Emp.ManagerID` equals `Mgr.EmployeeID`.',
        example: '---CODE_START---sql\nSELECT \n    e.Name AS EmployeeName,\n    e.Salary AS EmpSalary,\n    m.Name AS ManagerName,\n    m.Salary AS MgrSalary\nFROM Employees e         -- Instance 1: The Worker\nJOIN Employees m         -- Instance 2: The Boss\n  ON e.ManagerID = m.ID  -- Connect Worker to Boss\nWHERE e.Salary > m.Salary; -- The Filter Condition\n---CODE_END---',
        whatIfs: [
            '**What if you want to find employees with NO manager?**\nA standard JOIN drops NULLs. You do not need a join for this.\n---CODE_START---sql\nSELECT * FROM Employees WHERE ManagerID IS NULL;\n---CODE_END---',
            '**What if you want to compare the employee to the Department Average?**\nUse a Window Function instead of a Self-Join.\n---CODE_START---sql\nSELECT *\nFROM (\n    SELECT Name, Salary, AVG(Salary) OVER(PARTITION BY DeptID) as AvgDeptSal\n    FROM Employees\n) t\nWHERE Salary > AvgDeptSal;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-9',
        question: 'Identify products that have never been sold (Finding Missing Records).',
        concepts: '**Exclusion Join**: A technique to find records in Table A that have no match in Table B.\n**LEFT JOIN**: Returns all rows from the left table, and matched rows from the right table (or NULL if no match).\n**IS NULL**: The condition used to filter for non-matches.',
        answer: 'Perform a `LEFT JOIN` from the "Master List" (Products) to the "Transaction List" (Sales). If a product has sales, the sales columns will be populated. If a product has ZERO sales, the sales columns will be `NULL`. Filter for these NULLs.',
        example: '---CODE_START---sql\nSELECT p.ProductName\nFROM Products p          -- Left Table (Keep all rows)\nLEFT JOIN Sales s        -- Right Table (Match if possible)\n  ON p.ProductID = s.ProductID\nWHERE s.SalesID IS NULL; -- Keep only rows where match failed\n---CODE_END---',
        whatIfs: [
            '**What if you use NOT IN instead?**\nBe careful. If the Sales table contains a NULL ProductID, `NOT IN` returns nothing.\n---CODE_START---sql\n-- Risky if NULLs exist in Sales\nSELECT Name FROM Products \nWHERE ID NOT IN (SELECT ProductID FROM Sales);\n\n-- Safer Alternative (NOT EXISTS)\nSELECT Name FROM Products p\nWHERE NOT EXISTS (SELECT 1 FROM Sales s WHERE s.ProductID = p.ID);\n---CODE_END---'
        ]
      },
      {
        id: 'sql-10',
        question: 'Find pairs of products frequently bought together (Market Basket Analysis).',
        concepts: '**Self-Join (Non-Equi)**: Joining a table to itself using inequality (`<` or `>`) instead of equality.\n**Combinatorics**: Generating unique pairs without duplicates or self-matches.\n**Aggregation**: Counting the frequency of these pairs.',
        answer: 'Join the `OrderItems` table to itself on `OrderID` to find items in the same basket. Use `ItemA.ID < ItemB.ID` to ensure that you get unique pairs (A-B) and avoid mirrors (B-A) or self-matches (A-A).',
        example: '---CODE_START---sql\nSELECT \n    a.ProductID AS Product_A,\n    b.ProductID AS Product_B,\n    COUNT(*) AS Frequency\nFROM OrderItems a\nJOIN OrderItems b \n  ON a.OrderID = b.OrderID      -- Same Order\n AND a.ProductID < b.ProductID  -- Force unique pairs (Avoids A=A and B-A)\nGROUP BY a.ProductID, b.ProductID\nORDER BY Frequency DESC;\n---CODE_END---',
        whatIfs: [
            '**What if you didn\'t use the < condition?**\nYou would get duplicates. If Order 1 has items [X, Y], you would get row X-Y AND row Y-X. Your counts would be double the reality.\n---CODE_START---sql\n-- BAD QUERY\nWHERE a.ProductID != b.ProductID -- Still returns both X-Y and Y-X\n---CODE_END---'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 4: WINDOW FUNCTIONS (The Power Tools)
      // ---------------------------------------------------------
      {
        id: 'sql-11',
        question: 'Explain RANK vs DENSE_RANK using a race analogy.',
        concepts: '**Window Functions**: Calculations performed across a set of table rows that are related to the current row.\n**Ranking Functions**:\n* **ROW_NUMBER()**: Assigns a unique integer (1, 2, 3) to rows. Ties are broken arbitrarily.\n* **RANK()**: Assigns a rank but **skips numbers** for ties (1, 1, 3).\n* **DENSE_RANK()**: Assigns a rank and **does not skip** numbers for ties (1, 1, 2).',
        answer: 'Use `DENSE_RANK()` when you need consecutive ranking groups (e.g., "Top 3 Salaries" where ties shouldn\'t exhaust the limit). Use `RANK()` when the "number of people ahead of you" matters.',
        example: '---CODE_START---sql\n-- DATA: Salaries [100, 100, 90, 80]\n\nSELECT \n    Salary,\n    ROW_NUMBER() OVER(ORDER BY Salary DESC) as RN,      -- 1, 2, 3, 4\n    RANK()       OVER(ORDER BY Salary DESC) as Rnk,     -- 1, 1, 3, 4\n    DENSE_RANK() OVER(ORDER BY Salary DESC) as DenseRnk -- 1, 1, 2, 3\nFROM Employees;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find the top 10% earners?**\nUse `NTILE`. It divides rows into equal buckets.\n---CODE_START---sql\nSELECT *, NTILE(10) OVER(ORDER BY Salary DESC) as Bucket\nFROM Employees;\n-- Bucket 1 contains the top 10%\n---CODE_END---'
        ]
      },
      {
        id: 'sql-12',
        question: 'Find the Top 2 highest-selling products for each category.',
        concepts: '**PARTITION BY**: Divides the result set into partitions (groups) to perform calculation independently (resets the counter).\n**CTE (Common Table Expression)**: Necessary here because you cannot filter a Window Function in the same level it is created.',
        answer: '1. Use `DENSE_RANK()` partitioned by Category. This creates a "Ranking 1, 2, 3..." that restarts for every category.\n2. Wrap this in a CTE.\n3. Filter the CTE where `Rank <= 2`.',
        example: '---CODE_START---sql\nWITH RankedProducts AS (\n    SELECT \n        Category,\n        ProductName,\n        Sales,\n        -- Rank restarts for each Category\n        DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC) as RankNum\n    FROM ProductSales\n)\nSELECT * \nFROM RankedProducts\nWHERE RankNum <= 2;\n---CODE_END---',
        whatIfs: [
            '**What if you strictly want only 2 rows per category, even if there is a tie?**\nSwitch to `ROW_NUMBER()`. It forces a unique sequence.\n---CODE_START---sql\nROW_NUMBER() OVER(PARTITION BY Category ORDER BY Sales DESC)\n---CODE_END---',
            '**What if you want the Lowest selling items?**\nChange the sort order to ASC.\n---CODE_START---sql\nDENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales ASC)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-13',
        question: 'Calculate a Rolling 7-Day Average (Window Frames).',
        concepts: '**Window Frame**: The specific set of rows relative to the current row that the function considers.\n**Frame Syntax**: `ROWS BETWEEN X PRECEDING AND Y FOLLOWING`.\n**Rolling/Moving Average**: Smoothing out data fluctuations by averaging a window of time.',
        answer: 'Standard Window Functions default to `UNBOUNDED PRECEDING` (Cumulative). For a "Moving" calculation, you must explicitly define the frame using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` (6 days back + today = 7 days).',
        example: '---CODE_START---sql\nSELECT \n    Date,\n    DailySales,\n    AVG(DailySales) OVER(\n        ORDER BY Date \n        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    ) as MovingAvg_7Day\nFROM SalesLog;\n---CODE_END---',
        whatIfs: [
            '**What if you want a Centered Average (3 days before, 3 days after)?**\nAdjust the frame bounds.\n---CODE_START---sql\nROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING\n---CODE_END---',
            '**What if you want a Cumulative Average (Average of all history up to today)?**\nUse the default frame (or explicit Unbounded).\n---CODE_START---sql\nROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n---CODE_END---'
        ]
      },
      {
        id: 'sql-14',
        question: 'Calculate Month-over-Month Growth (LAG/LEAD).',
        concepts: '**LAG()**: Returns the value from a previous row in the same result set.\n**LEAD()**: Returns the value from a following row.\n**Growth Formula**: `(NewValue - OldValue) / OldValue`.',
        answer: 'To calculate growth without self-joins, use `LAG(Sales) OVER(ORDER BY Month)` to create a new column containing "Last Month\'s Sales" on the current row. Then perform the arithmetic.',
        example: '---CODE_START---sql\nWITH MonthlyStats AS (\n    SELECT \n        Month,\n        Sales,\n        -- Grab previous row\'s sales\n        LAG(Sales) OVER(ORDER BY Month) as PrevSales\n    FROM MonthlySales\n)\nSELECT \n    Month,\n    Sales,\n    PrevSales,\n    -- Calculate Percentage Growth\n    (Sales - PrevSales) / PrevSales * 100.0 as GrowthRate\nFROM MonthlyStats;\n---CODE_END---',
        whatIfs: [
            '**What if it\'s the first month (NULL Previous)?**\nMath with NULL returns NULL. If you want it to show 0% growth or 100% growth, use COALESCE.\n---CODE_START---sql\n(Sales - COALESCE(PrevSales, Sales)) ...\n---CODE_END---',
            '**What if you want Year-over-Year (YoY) from monthly data?**\nOffset by 12 rows.\n---CODE_START---sql\nLAG(Sales, 12) OVER(ORDER BY Month)\n---CODE_END---'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 5: ALGORITHMS (The Brain Teasers)
      // ---------------------------------------------------------
      {
        id: 'sql-15',
        question: 'Solve the "Gaps and Islands" problem (Consecutive Streaks).',
        concepts: '**Gaps & Islands**: A classic SQL problem of grouping consecutive data points ("Islands") separated by missing data ("Gaps").\n**Row_Number Math**: The technique of comparing a Sequence (Row Number) to a Value (Date/ID). If both increment by 1, the difference is constant.',
        answer: '1. Create a `ROW_NUMBER()` ordered by date.\n2. Subtract `ROW_NUMBER` from the `Date` (`Date - RN`). This calculated date will remain static for every day in a consecutive streak.\n3. Group by this "Static Date" to aggregate the streak.',
        example: '---CODE_START---sql\nWITH StreakGroups AS (\n    SELECT \n        PlayerID,\n        LoginDate,\n        -- Logic: If I login Jan 1 (RN 1), Jan 2 (RN 2). \n        -- Jan 1 - 1 = Dec 31. Jan 2 - 2 = Dec 31. Difference is CONSTANT.\n        DATE_SUB(LoginDate, INTERVAL ROW_NUMBER() OVER(PARTITION BY PlayerID ORDER BY LoginDate) DAY) as GroupID\n    FROM Logins\n)\nSELECT \n    PlayerID,\n    COUNT(*) as StreakDays,\n    MIN(LoginDate) as StartDate,\n    MAX(LoginDate) as EndDate\nFROM StreakGroups\nGROUP BY PlayerID, GroupID;\n---CODE_END---',
        whatIfs: [
            '**What if you want streaks of Integer IDs instead of Dates?**\nSubtract the RowNumber from the ID.\n---CODE_START---sql\n(ID - ROW_NUMBER() OVER(ORDER BY ID)) as GroupID\n---CODE_END---'
        ]
      },
      {
        id: 'sql-16',
        question: 'Relational Division: Find users who bought ALL products.',
        concepts: '**Relational Division**: Identifying a subset of data that has a relationship with ALL rows of another set.\n**Set Comparison**: Comparing the count of a user\'s unique items vs the count of the master list.',
        answer: '1. Calculate the size of the Master List (e.g., Total Products = 5).\n2. For each user, count the Distinct Products they have bought.\n3. Filter for users where `UserCount = MasterCount`.',
        example: '---CODE_START---sql\nSELECT UserID\nFROM Sales\nGROUP BY UserID\n-- The User\'s unique product count must equal the Total Product count\nHAVING COUNT(DISTINCT ProductID) = (SELECT COUNT(*) FROM Products);\n---CODE_END---',
        whatIfs: [
            '**What if you only care about "Electronics"?**\nFilter both queries.\n---CODE_START---sql\nHAVING COUNT(DISTINCT ProductID) = (SELECT COUNT(*) FROM Products WHERE Category = \'Electronics\')\nAND ProductID IN (SELECT ID FROM Products WHERE Category = \'Electronics\') -- implied by join usually\n---CODE_END---'
        ]
      },
      {
        id: 'sql-17',
        question: 'Identify anomalies (Sales 50% below average).',
        concepts: '**Contextual Comparison**: Comparing a detail row to an aggregate value.\n**Window Functions vs Group By**: `GROUP BY` collapses rows (hiding anomalies). Window Functions (`AVG() OVER`) keep the rows visible.',
        answer: 'Use a Window Function to paint the "Average" onto every row as a new column. Then, in the outer query, compare the individual "Sales" column to the calculated "Average" column.',
        example: '---CODE_START---sql\nWITH Stats AS (\n    SELECT \n        Date,\n        Sales,\n        -- Calculate average for the whole dataset (or Partition by Month)\n        AVG(Sales) OVER() as AvgSales\n    FROM DailySales\n)\nSELECT *\nFROM Stats\nWHERE Sales < (0.5 * AvgSales); -- Find days with < 50% of average\n---CODE_END---',
        whatIfs: [
            '**What if you want to use the Median instead of Mean?**\nSince `MEDIAN` isn\'t standard, calculate percentile 0.5.\n---CODE_START---sql\nPERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Sales) OVER()\n---CODE_END---'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 6: CTES & RECURSION
      // ---------------------------------------------------------
      {
        id: 'sql-18',
        question: 'How does a Recursive CTE work? (e.g., generating an Org Chart).',
        concepts: '**Recursive CTE**: A query that references itself.\n**Anchor Member**: The initial result set (Base case).\n**Recursive Member**: The query that joins to the CTE to add the next layer.\n**Termination Condition**: When the recursive member returns no rows, the loop stops.',
        answer: 'Recursive CTEs are used for hierarchical data (Trees, Graphs). You define the starting point (Anchor), and then tell SQL how to find the "children" of the current set using a `UNION ALL` to the CTE name.',
        example: '---CODE_START---sql\n-- GOAL: Generate numbers 1 to 10 without a table.\n\nWITH RECURSIVE Counter AS (\n    -- 1. Anchor: Start at 1\n    SELECT 1 as Val\n    UNION ALL\n    -- 2. Recursive: Add 1 to the previous value\n    SELECT Val + 1 \n    FROM Counter\n    -- 3. Termination: Stop at 10\n    WHERE Val < 10\n)\nSELECT * FROM Counter;\n---CODE_END---',
        whatIfs: [
            '**What if you are traversing an Employee Hierarchy?**\nJoin Employees to the CTE on ManagerID.\n---CODE_START---sql\nWITH RECURSIVE Org AS (\n  SELECT ID, Name, 1 as Level FROM Emp WHERE ManagerID IS NULL -- CEO\n  UNION ALL\n  SELECT e.ID, e.Name, o.Level + 1 \n  FROM Emp e JOIN Org o ON e.ManagerID = o.ID -- Join Child to Parent\n)\nSELECT * FROM Org;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-19',
        question: 'How do you select every Nth row (Sampling)?',
        concepts: '**Modulo Operator (%)**: Returns the integer remainder of a division.\n**Sampling**: Selecting a representative subset of data.\n**Deterministic Sampling**: Generating the same sample every time (using IDs/RowNums).',
        answer: 'Use `ROW_NUMBER()` to generate a sequence, then apply the Modulo operator. `RowNum % N = 0` will select every Nth row.',
        example: '---CODE_START---sql\n-- GOAL: Select every 3rd row (Row 3, 6, 9...)\n\nWITH NumberedRows AS (\n    SELECT \n        *, \n        ROW_NUMBER() OVER(ORDER BY ID) as RN\n    FROM LargeTable\n)\nSELECT * \nFROM NumberedRows\nWHERE RN % 3 = 0;\n---CODE_END---',
        whatIfs: [
            '**What if you want Odd rows only?**\nRemainder is 1.\n---CODE_START---sql\nWHERE RN % 2 = 1\n---CODE_END---'
        ]
      }
    ],
};

export default sqlCategory;
