import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql-mastery-part1',
    title: 'SQL Masterclass (Part 1: Foundations & Logic)',
    icon: 'fa-database',
    description: 'Detailed deep-dive into Execution Order, NULL logic, Data Cleaning, and Joins (Questions 1-10).',
    questions: [
      // =========================================================
      // LEVEL 1: HOW THE ENGINE THINKS (The Foundation)
      // =========================================================
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
      {
        id: 'sql-5',
        question: 'The "NOT IN" Trap: What happens if your subquery returns a NULL?',
        concepts: '**Three-Valued Logic**: SQL has True, False, and Unknown (NULL).\n**The Poison Pill**: A single NULL can crash your logic.',
        answer: 'This is a classic interview trap involving `NOT IN`. If you ask: "Give me users NOT IN this list of IDs", and the list contains a single `NULL`, SQL panics. It can\'t be sure if the user is in the `NULL` spot or not, so it returns **Empty Results** (Zero rows) to be safe. **The Fix**: Always use `WHERE ID IS NOT NULL` inside your subquery, or use `NOT EXISTS`.',
        example: '---CODE_START---sql\n-- SCENARIO: Find Users who are NOT in the "Banned" list.\n\n-- BAD: If "Banned" table has a NULL ID, this returns ZERO rows.\nSELECT * FROM Users \nWHERE ID NOT IN (SELECT ID FROM Banned);\n\n-- GOOD: Filter out NULLs first.\nSELECT * FROM Users \nWHERE ID NOT IN (SELECT ID FROM Banned WHERE ID IS NOT NULL);\n---CODE_END---',
        whatIfs: [
            '**What if you use NOT EXISTS instead?**\n`NOT EXISTS` is safer. It checks for row presence, not value equality.\n---CODE_START---sql\nSELECT * FROM Users u\nWHERE NOT EXISTS (SELECT 1 FROM Banned b WHERE u.ID = b.ID);\n---CODE_END---'
        ]
      },

      // =========================================================
      // LEVEL 2: DATA MANIPULATION (The Toolkit)
      // =========================================================
      {
        id: 'sql-6',
        question: 'How do you find duplicate records (e.g., duplicate emails)?',
        concepts: '**Data Quality**: Identifying redundant entries in a dataset.\n**Grouping Pattern**: The standard technique for finding frequency.\n\n**The Definitions**:\n* **GROUP BY**: Collapses identical values into a single row.\n* **HAVING**: Filters groups based on an aggregate condition.\n* **Frequency Distribution**: Counting how many times each unique value appears.',
        answer: 'To find duplicates, you group the data by the unique key (e.g., Email) and count the size of each group. If the count is greater than 1, the email is a duplicate.',
        example: '---CODE_START---sql\n-- GOAL: Identify emails that appear more than once.\n\nSELECT \n    email, \n    COUNT(*) as frequency\nFROM users\nGROUP BY email\n-- Filter to show only buckets with > 1 item\nHAVING COUNT(*) > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find the IDs associated with these duplicates?**\nYou cannot do this in a simple GROUP BY. You need a Window Function or Self Join.\n---CODE_START---sql\nSELECT *\nFROM (\n    SELECT *, COUNT(*) OVER(PARTITION BY email) as cnt\n    FROM users\n) t\nWHERE cnt > 1;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-7',
        question: 'How do you delete duplicate rows while keeping the one with the lowest/highest ID?',
        concepts: '**De-duplication**: The process of removing redundant copies while retaining one "Golden Record".\n**Window Functions (Row_Number)**: Assigning a sequential integer to rows within a partition.\n**CTE (Common Table Expression)**: A temporary named result set.',
        answer: 'The most efficient strategy is to "Rank and Delete". We define a "Partition" (the group of duplicates) and an "Order" (which one we want to keep). We assign Rank 1 to the keeper and Rank 2+ to the duplicates. Then we delete anything with Rank > 1.',
        example: '---CODE_START---sql\n-- GOAL: Keep the User with the LOWEST ID, delete the rest.\n\nWITH RankedUsers AS (\n    SELECT \n        ID, \n        Email,\n        -- Partition by Email (Group duplicates)\n        -- Order by ID ASC (Lowest ID gets RowNum 1)\n        ROW_NUMBER() OVER(PARTITION BY Email ORDER BY ID ASC) as rn\n    FROM Users\n)\n-- Delete rows where rank is 2, 3, 4...\nDELETE FROM RankedUsers \nWHERE rn > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to keep the NEWEST record (Highest ID)?**\nFlip the sorting order to DESC.\n---CODE_START---sql\nROW_NUMBER() OVER(PARTITION BY Email ORDER BY ID DESC)\n-- Now the Highest ID is Row 1\n---CODE_END---'
        ]
      },
      {
        id: 'sql-8',
        question: 'How do you Pivot data (Rows to Columns) without a PIVOT function?',
        concepts: '**Pivoting**: Transforming data from a long format (rows) to a wide format (columns).\n**Conditional Aggregation**: Using a `CASE` statement inside an aggregate function (SUM, MAX, COUNT)].\n**Portability**: This method works in almost every SQL dialect (MySQL, Postgres, SQL Server, Oracle).',
        answer: 'You "bucket" the data manually. You scan the table once, and for each row, the `CASE` statement decides which column bucket the value belongs to. If it matches the condition, you add the value; if not, you add 0 (or NULL).',
        example: '---CODE_START---sql\n-- GOAL: Turn rows of (Year, Sales) into columns [Sales_2023, Sales_2024]\n\nSELECT \n    ProductID,\n    -- Bucket 1: 2023 Sales\n    SUM(CASE WHEN Year = 2023 THEN SalesAmount ELSE 0 END) AS Sales_2023,\n    -- Bucket 2: 2024 Sales\n    SUM(CASE WHEN Year = 2024 THEN SalesAmount ELSE 0 END) AS Sales_2024\nFROM Sales\nGROUP BY ProductID;\n---CODE_END---',
        whatIfs: [
            '**What if you have dynamic columns (e.g., unknown number of years)?**\nStandard SQL cannot handle dynamic columns. You would need to use **Dynamic SQL** (Stored Procedure generating a string) or handle the pivoting in your application layer (Python/Pandas).\n---CODE_START---sql\n-- Dynamic SQL Concept (Pseudo-code)\nEXEC(\'SELECT ... \' + @GeneratedColumns + \' FROM ...\')\n---CODE_END---'
        ]
      },
      {
        id: 'sql-9',
        question: 'Extract the domain name from a list of email addresses.',
        concepts: '**String Manipulation**: Parsing text based on delimiters.\n**Functions**: `SUBSTRING`, `CHARINDEX` (or `POSITION`/`INSTR`), `LEN`.\n**Dynamic Anchor**: Finding the split point (e.g., "@") dynamically.',
        answer: 'Since email addresses have different lengths (bob@gmail.com vs alexandra@yahoo.com), you cannot use hardcoded positions. You must find the index of the `@` symbol and take the substring after it.',
        example: '---CODE_START---sql\n-- GOAL: Extract "gmail.com" from "bob@gmail.com"\n\nSELECT \n    Email,\n    -- Start at Index of "@" + 1. Take length of string.\n    SUBSTRING(Email, CHARINDEX(\'@\', Email) + 1, LEN(Email)) as Domain\nFROM Users;\n---CODE_END---',
        whatIfs: [
            '**What if you want the username (everything BEFORE the @)?**\nUse `SUBSTRING(email, 1, CHARINDEX(\'@\', email) - 1)`. This starts at 1 and stops right before the `@`.\n---CODE_START---sql\nSUBSTRING(Email, 1, CHARINDEX(\'@\', Email) - 1)\n---CODE_END---'
        ]
      },

      // =========================================================
      // LEVEL 3: JOINS (The Connections)
      // =========================================================
      {
        id: 'sql-10',
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
        id: 'sql-11',
        question: 'Identify products that have never been sold (Finding Missing Records).',
        concepts: '**Exclusion Join**: A technique to find records in Table A that have no match in Table B.\n**LEFT JOIN**: Returns all rows from the left table, and matched rows from the right table (or NULL if no match).\n**IS NULL**: The condition used to filter for non-matches.',
        answer: 'Perform a `LEFT JOIN` from the "Master List" (Products) to the "Transaction List" (Sales). If a product has ZERO sales, the sales columns will be `NULL`. Filter for these NULLs to isolate the unsold items.',
        example: '---CODE_START---sql\nSELECT p.ProductName\nFROM Products p          -- Left Table (Keep all rows)\nLEFT JOIN Sales s        -- Right Table (Match if possible)\n  ON p.ProductID = s.ProductID\nWHERE s.SalesID IS NULL; -- Keep only rows where match failed (SalesID is NULL)\n---CODE_END---',
        whatIfs: [
            '**What if you want to use Set Theory instead of Joins?**\nUse `EXCEPT` (SQL Server/Postgres) or `MINUS` (Oracle). It returns rows from the first query that are not in the second.\n---CODE_START---sql\nSELECT ProductID FROM Products\nEXCEPT\nSELECT ProductID FROM Sales;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-12',
        question: 'Find pairs of products frequently bought together (Market Basket Analysis).',
        concepts: '**Self-Join (Non-Equi)**: Joining a table to itself using inequality (`<` or `>`) instead of equality.\n**Combinatorics**: Generating unique pairs without duplicates or self-matches.\n**Aggregation**: Counting the frequency of these pairs.',
        answer: 'Join the `OrderItems` table to itself on `OrderID` to find items in the same basket. Use `ItemA.ID < ItemB.ID` to ensure that you get unique pairs (A-B) and avoid mirrors (B-A) or self-matches (A-A).',
        example: '---CODE_START---sql\nSELECT \n    a.ProductID AS Product_A,\n    b.ProductID AS Product_B,\n    COUNT(*) AS Frequency\nFROM OrderItems a\nJOIN OrderItems b \n  ON a.OrderID = b.OrderID      -- Same Order\n AND a.ProductID < b.ProductID  -- Force unique pairs (Avoids A=A and B-A)\nGROUP BY a.ProductID, b.ProductID\nORDER BY Frequency DESC;\n---CODE_END---',
        whatIfs: [
            '**What if you didn\'t use the < condition?**\nYou would get duplicates. If Order 1 has items [X, Y], you would get row X-Y AND row Y-X.\n---CODE_START---sql\n-- BAD QUERY: Double counts pairs\nWHERE a.ProductID != b.ProductID \n---CODE_END---'
        ]
      },
      {
        id: 'sql-13',
        question: 'What is a Cross Join and when would you use it?',
        concepts: '**Cartesian Product**: The Multiplier. Combines every row of Table A with every row of Table B.\n**Use Case**: Generating grids, combinations, or test data (Data Densification).',
        answer: 'Use a `CROSS JOIN` when you need to generate a master list of all possible combinations. For example, creating a report grid showing "Sales per Product per Month", even if some months have zero sales.',
        example: '---CODE_START---sql\n-- GOAL: Generate a grid of All Products x All Months\nSELECT \n    p.ProductName,\n    m.MonthName\nFROM Products p\nCROSS JOIN Months m;\n-- Result: Widget-Jan, Widget-Feb, Gadget-Jan, Gadget-Feb...\n---CODE_END---',
        whatIfs: [
            '**What if you run this on massive tables?**\nIt causes a performance crash. 1M rows x 1M rows = 1 Trillion rows. Always ensure one table is very small (like "Months" or "Categories").'
        ]
      },
      {
        id: 'sql-14',
        question: 'When should you use a FULL OUTER JOIN?',
        concepts: '**Full Inclusion**: A Union of Left and Right Joins.\n**Scenario**: Comparing two incomplete lists (Reconciliation/Symmetric Difference).',
        answer: 'Use this when you want to see everything from both sides. Matches are linked. Non-matches from Left are shown (with NULLs on right). Non-matches from Right are shown (with NULLs on left). Useful for comparing "Budget" vs "Actuals".',
        example: '---CODE_START---sql\n-- GOAL: Compare Budget vs Actual Spending\nSELECT \n    COALESCE(b.Dept, s.Dept) as Dept,\n    b.BudgetAmount,\n    s.SpendAmount\nFROM Budget b\nFULL OUTER JOIN Spending s\n  ON b.Dept = s.Dept;\n---CODE_END---',
        whatIfs: [
            '**What if your DB doesn\'t support FULL JOIN (e.g., MySQL)?**\nSimulate with UNION ALL.\n---CODE_START---sql\n(SELECT * FROM A LEFT JOIN B)\nUNION ALL\n(SELECT * FROM A RIGHT JOIN B WHERE A.ID IS NULL)\n---CODE_END---'
        ]
      },

      // =========================================================
      // LEVEL 4: WINDOW FUNCTIONS (The Power Tools)
      // =========================================================
      {
        id: 'sql-15',
        question: 'Explain RANK vs DENSE_RANK using a race analogy.',
        concepts: '**Window Functions**: Calculations performed across a set of table rows related to the current row.\n**Ranking Functions**:\n* **ROW_NUMBER()**: Unique integer (1, 2, 3).\n* **RANK()**: Skips numbers for ties (1, 1, 3).\n* **DENSE_RANK()**: No gaps for ties (1, 1, 2).',
        answer: 'Use `DENSE_RANK()` when you need consecutive ranking groups (e.g., "Top 3 Salaries" where ties shouldn\'t exhaust the limit). Use `RANK()` when the "number of people ahead of you" matters.',
        example: '---CODE_START---sql\n-- DATA: Salaries [100, 100, 90]\n\nSELECT \n    Salary,\n    ROW_NUMBER() OVER(ORDER BY Salary DESC) as RN,      -- 1, 2, 3\n    RANK()       OVER(ORDER BY Salary DESC) as Rnk,     -- 1, 1, 3\n    DENSE_RANK() OVER(ORDER BY Salary DESC) as DenseRnk -- 1, 1, 2\nFROM Employees;\n---CODE_END---',
        whatIfs: [
            '**What if you want to divide rows into 4 equal buckets (Quartiles)?**\nUse `NTILE`.\n---CODE_START---sql\nNTILE(4) OVER(ORDER BY Salary DESC)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-16',
        question: 'Find the Top 2 highest-selling products for each category.',
        concepts: '**PARTITION BY**: Resets the rank counter for each group.\n**CTE Requirement**: Window functions cannot be filtered in the `WHERE` clause because they are calculated *after* filtering.',
        answer: '1. Use `DENSE_RANK()` partitioned by Category. \n2. Wrap this in a CTE (Common Table Expression).\n3. Filter the CTE where `Rank <= 2`.',
        example: '---CODE_START---sql\nWITH RankedProducts AS (\n    SELECT \n        Category,\n        ProductName,\n        Sales,\n        -- Rank restarts (1, 2, 3...) for each Category\n        DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC) as RankNum\n    FROM ProductSales\n)\nSELECT * \nFROM RankedProducts\nWHERE RankNum <= 2;\n---CODE_END---',
        whatIfs: [
            '**What if you want exactly 2 rows per category, ignoring ties?**\nUse `ROW_NUMBER()`. It forces a unique sequence so you never get 3 items.\n---CODE_START---sql\nROW_NUMBER() OVER(PARTITION BY Category ORDER BY Sales DESC)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-17',
        question: 'Calculate a Rolling 7-Day Average (Window Frames).',
        concepts: '**Window Frame**: The "Looking Glass" of rows to consider.\n**Syntax**: `ROWS BETWEEN X PRECEDING AND Y FOLLOWING`.\n**Default**: `UNBOUNDED PRECEDING` (Cumulative), not Rolling.',
        answer: 'Standard Window Functions default to Cumulative. For a "Moving" calculation, you must explicitly define the frame boundaries using `ROWS BETWEEN`. For a 7-day average, look at the 6 prior rows + current row.',
        example: '---CODE_START---sql\nSELECT \n    Date,\n    DailySales,\n    AVG(DailySales) OVER(\n        ORDER BY Date \n        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    ) as MovingAvg_7Day\nFROM SalesLog;\n---CODE_END---',
        whatIfs: [
            '**What if you want a Centered Average (3 days before + 3 days after)?**\n---CODE_START---sql\nROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING\n---CODE_END---'
        ]
      },
      {
        id: 'sql-18',
        question: 'Calculate Cumulative Sum (Running Total).',
        concepts: '**Unbounded Preceding**: The default frame for `ORDER BY`. It adds everything from the start up to the current row.\n**Analysis**: Visualizing growth over time (Year-to-Date).',
        answer: 'Use `SUM(Sales) OVER(ORDER BY Date)`. To reset the total every year, add `PARTITION BY Year`.',
        example: '---CODE_START---sql\nSELECT \n    Date, \n    Sales,\n    -- Resets to 0 at the start of each year\n    SUM(Sales) OVER(PARTITION BY Year(Date) ORDER BY Date) as RunningTotal\nFROM SalesLog;\n---CODE_END---',
        whatIfs: [
            '**What if you want a Running Total of only the last 3 rows (Moving Sum)?**\n---CODE_START---sql\nSUM(Sales) OVER(ORDER BY Date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-19',
        question: 'Calculate Month-over-Month Growth (LAG/LEAD).',
        concepts: '**LAG()**: Look "backwards" to previous rows.\n**LEAD()**: Look "forwards" to future rows.\n**Math**: `(New - Old) / Old` = Growth Rate.',
        answer: 'Use `LAG(Sales) OVER(ORDER BY Month)` to create a new column containing "Last Month\'s Sales". Then perform the arithmetic between the `Sales` column and the `Lag` column.',
        example: '---CODE_START---sql\nWITH MonthlyStats AS (\n    SELECT \n        Month, Sales,\n        LAG(Sales) OVER(ORDER BY Month) as PrevSales\n    FROM MonthlySales\n)\nSELECT \n    Month, Sales, PrevSales,\n    -- Calculate Percentage Growth\n    (Sales - PrevSales) * 100.0 / PrevSales as GrowthRate\nFROM MonthlyStats;\n---CODE_END---',
        whatIfs: [
            '**What if it\'s the first month (NULL)?**\nMath with NULL returns NULL. Use COALESCE if you want to force it to 0.\n---CODE_START---sql\n(Sales - COALESCE(PrevSales, Sales)) ...\n---CODE_END---'
        ]
      },
      {
        id: 'sql-20',
        question: 'Solve the "Gaps and Islands" problem (Consecutive Streaks).',
        concepts: '**Gaps & Islands**: Grouping consecutive data points.\n**Logic**: `Date - RowNum` = Constant. If you increment the date by 1 day and the row number by 1, the difference between them stays the same.',
        answer: '1. Create a `ROW_NUMBER()` ordered by date.\n2. Subtract `ROW_NUMBER` from the `Date`. This calculated date will remain static for every day in a consecutive streak.\n3. Group by this "Static Date" (The Group ID).',
        example: '---CODE_START---sql\nWITH StreakGroups AS (\n    SELECT \n        PlayerID, LoginDate,\n        -- Magic: This date stays the same for consecutive logins\n        DATE_SUB(LoginDate, INTERVAL ROW_NUMBER() OVER(ORDER BY LoginDate) DAY) as GroupID\n    FROM Logins\n)\nSELECT PlayerID, COUNT(*) as StreakDays\nFROM StreakGroups\nGROUP BY PlayerID, GroupID;\n---CODE_END---',
        whatIfs: [
            '**What if you want consecutive Integers instead of Dates?**\nSimply subtract the Row Number from the ID.\n---CODE_START---sql\n(ID - ROW_NUMBER() OVER(ORDER BY ID)) as GroupID\n---CODE_END---'
        ]
      },
	  {
        id: 'sql-21',
        question: 'Calculate the Median salary for each department.',
        concepts: '**Statistical Aggregation**: Finding the value at the 50th percentile.\n**Sorting vs. Averaging**: Mean is easy (`SUM/COUNT`). Median requires sorting.\n**Parity Logic**: Handling Even vs. Odd row counts.',
        answer: 'Since standard SQL often lacks a `MEDIAN()` function, you must implement the algorithm manually.\n\n**The Logic:**\n1. **Sort**: Assign a `ROW_NUMBER()` to every salary within the department.\n2. **Count**: Calculate the total number of employees in the department (`COUNT(*) OVER`).\n3. **Filter**: Select the row(s) located at the middle index.\n   - If Count is Odd (5): Pick row 3.\n   - If Count is Even (4): Pick rows 2 and 3, then average them.',
        example: '---CODE_START---sql\nWITH OrderedSalaries AS (\n    SELECT \n        DeptID, \n        Salary,\n        -- Sort rows 1..N\n        ROW_NUMBER() OVER(PARTITION BY DeptID ORDER BY Salary) as RN,\n        -- Get total count N\n        COUNT(*) OVER(PARTITION BY DeptID) as TotalCount\n    FROM Employees\n)\nSELECT \n    DeptID,\n    -- Average the middle values (Handles both Odd and Even cases)\n    AVG(Salary) as MedianSalary\nFROM OrderedSalaries\nWHERE RN IN (FLOOR((TotalCount + 1) / 2.0), CEIL((TotalCount + 1) / 2.0))\nGROUP BY DeptID;\n---CODE_END---',
        whatIfs: [
            '**What if you can use the PERCENTILE_CONT function?**\nThis is the modern/clean way (available in Postgres/SQL Server).\n---CODE_START---sql\nSELECT DISTINCT DeptID,\nPERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Salary) OVER(PARTITION BY DeptID)\nFROM Employees;\n---CODE_END---'
        ]
      },
      {
        id: 'sql-22',
        question: 'Relational Division: Find users who bought ALL products.',
        concepts: '**Universal Quantifier**: Translating "For all X..." into SQL.\n**Set Comparison**: Comparing the cardinality (size) of two sets.\n**Relational Division**: Identifying a subset of data that relates to *every* row of another table.',
        answer: 'This is the "Checklist Problem". You want to find users whose "Purchased List" is the same size as the "Master Catalog List".\n\n**The Logic:**\n1. **Master Count**: Calculate how many unique products exist (e.g., 10).\n2. **User Count**: For each user, count how many *distinct* products they have bought.\n3. **Compare**: If User\'s Count == Master Count, they bought everything.',
        example: '---CODE_START---sql\n-- GOAL: Find users who bought every single product available.\n\nSELECT UserID\nFROM Sales\nGROUP BY UserID\n-- The User\'s distinct item count must equal the Total item count\nHAVING COUNT(DISTINCT ProductID) = (SELECT COUNT(*) FROM Products);\n---CODE_END---',
        whatIfs: [
            '**What if you only care about a specific category (e.g., "Electronics")?**\nYou must filter *both* the Master Count and the User Count.\n---CODE_START---sql\nHAVING COUNT(DISTINCT ProductID) = \n    (SELECT COUNT(*) FROM Products WHERE Category = \'Electronics\')\nAND ProductID IN \n    (SELECT ID FROM Products WHERE Category = \'Electronics\') -- Usually implied by join\n---CODE_END---',
            '**What if you want users who bought NOTHING?**\nUse `NOT IN` or `LEFT JOIN ... NULL`.\n---CODE_START---sql\nSELECT ID FROM Users WHERE ID NOT IN (SELECT UserID FROM Sales);\n---CODE_END---'
        ]
      },
      {
        id: 'sql-23',
        question: 'Identify anomalies (Sales 50% below average).',
        concepts: '**Contextual Comparison**: Comparing a detail row to an aggregate context.\n**Granularity Mismatch**: Trying to compare "Row Level" data to "Group Level" data.\n**Window Functions**: The solution to mixing granularity.',
        answer: 'To detect outliers, you need to compare `MySales` vs `AvgSales`. A standard `GROUP BY` collapses the data, hiding the individual transaction. A Window Function (`AVG() OVER`) paints the average onto every row as a new column, allowing direct comparison.\n\n**The Steps:**\n1. Calculate the Average (or Median) in a CTE or Subquery.\n2. Filter in the outer query where the individual value deviates from the average.',
        example: '---CODE_START---sql\nWITH SalesStats AS (\n    SELECT \n        TransactionID,\n        Amount,\n        ProductID,\n        -- Calculate the average for this specific product\n        AVG(Amount) OVER(PARTITION BY ProductID) as AvgAmt\n    FROM Sales\n)\nSELECT *\nFROM SalesStats\nWHERE Amount < (0.5 * AvgAmt); -- Find transactions < 50% of the average\n---CODE_END---',
        whatIfs: [
            '**What if you want to use Standard Deviation (Z-Score) for better anomaly detection?**\nCalculate `(Value - Avg) / StdDev`. If the result is > 3 or < -3, it is an extreme outlier.\n---CODE_START---sql\n(Amount - AVG(Amount) OVER()) / STDEV(Amount) OVER()\n---CODE_END---'
        ]
      },
      {
        id: 'sql-24',
        question: 'Fill missing dates in a report (Data Densification).',
        concepts: '**Data Sparsity**: The database only stores events that *happened*. It does not store "Nothing happened".\n**The Spine Technique**: Creating a continuous list of dimensions (Dates) to Left Join against.\n**Recursive CTE**: Generating a sequence of data on the fly.',
        answer: 'If you `GROUP BY Date`, days with 0 sales simply disappear. To report "0", you must force the date to exist.\n\n**The Logic:**\n1. **Generate the Spine**: Use a Recursive CTE to create a list of every single day in the month.\n2. **Preserve the Spine**: `LEFT JOIN` from the Calendar (Left) to the Sales (Right).\n3. **Handle Nulls**: Use `COALESCE(SUM(Sales), 0)` to turn the NULLs (missing days) into 0.',
        example: '---CODE_START---sql\n-- 1. Generate Dates from Jan 1 to Jan 5\nWITH RECURSIVE DateSpine AS (\n    SELECT DATE(\'2023-01-01\') as DayVal\n    UNION ALL\n    SELECT DATE_ADD(DayVal, INTERVAL 1 DAY) \n    FROM DateSpine WHERE DayVal < \'2023-01-05\'\n)\n-- 2. Join to actual sales\nSELECT \n    d.DayVal,\n    COALESCE(SUM(s.Amount), 0) as TotalSales\nFROM DateSpine d\nLEFT JOIN Sales s ON d.DayVal = s.SaleDate\nGROUP BY d.DayVal;\n---CODE_END---',
        whatIfs: [
            '**What if you want to "Forward Fill" (carry the last known value forward)?**\nUse `LAST_VALUE` with `IGNORE NULLS` (Advanced Windowing).\n---CODE_START---sql\nLAST_VALUE(Amount) IGNORE NULLS OVER(ORDER BY Date)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-25',
        question: 'Reactivation: Users who purchased this month but NOT in the last 6 months.',
        concepts: '**Complex Intervals**: Defining specific time windows for inclusion/exclusion.\n**Set Difference**: `CurrentUsers` MINUS `RecentUsers`.\n**Growth Accounting**: Categorizing users into New, Resurrected, Churned, and Retained.',
        answer: 'This metric identifies "Resurrected Users".\n\n**The Logic:**\n1. **Inclusion**: Find distinct users who bought something in the `Current Month`.\n2. **Exclusion**: Ensure these users DO NOT EXIST in the sales records from `Current Month - 6` to `Current Month - 1`.\n3. **Implementation**: Use `NOT EXISTS` or `LEFT JOIN ... WHERE NULL`.',
        example: '---CODE_START---sql\nSELECT DISTINCT UserID \nFROM Sales \nWHERE SaleDate BETWEEN \'2023-07-01\' AND \'2023-07-31\' -- Active Now\nAND UserID NOT IN (\n    -- Not active in prior 6 months\n    SELECT UserID \n    FROM Sales \n    WHERE SaleDate BETWEEN \'2023-01-01\' AND \'2023-06-30\'\n);\n---CODE_END---',
        whatIfs: [
            '**What if you want New Users (Never bought before)?**\nCheck if their very first purchase date is in the current month.\n---CODE_START---sql\nGROUP BY UserID HAVING MIN(SaleDate) >= \'2023-07-01\'\n---CODE_END---',
            '**What if you want Churned Users?**\nActive Last Month AND NOT Active This Month.\n---CODE_START---sql\nSELECT ID FROM LastMonthSales \nWHERE ID NOT IN (SELECT ID FROM ThisMonthSales)\n---CODE_END---'
        ]
      },
      {
        id: 'sql-26',
        question: 'Calculate Retention Rate (Cohort Analysis).',
        concepts: '**Cohort Analysis**: Tracking a specific group of users (e.g., "Class of Jan") over time.\n**Retention**: The percentage of the cohort that returns in subsequent periods.\n**Self-Join / Cross-Check**: Comparing user activity in Month 0 vs Month N.',
        answer: '1. **Define Cohort**: Find the "Start Date" (First purchase month) for every user.\n2. **Track Activity**: Left Join the user\'s full activity log against their Start Date.\n3. **Calculate Offset**: `Month_Diff = ActivityMonth - StartMonth`.\n4. **Aggregate**: Count distinct users for each Offset (Month 0, Month 1, Month 2...).',
        example: '---CODE_START---sql\nWITH UserCohorts AS (\n    -- Step 1: Find Join Month\n    SELECT UserID, MIN(DATE_TRUNC(\'month\', SaleDate)) as CohortMonth\n    FROM Sales GROUP BY UserID\n)\nSELECT \n    c.CohortMonth,\n    -- Step 3: Calculate Gap (Month 0, 1, 2...)\n    DATE_DIFF(DATE_TRUNC(\'month\', s.SaleDate), c.CohortMonth, MONTH) as MonthOffset,\n    -- Step 4: Count Survivors\n    COUNT(DISTINCT c.UserID) as RetainedUsers\nFROM UserCohorts c\nJOIN Sales s ON c.UserID = s.UserID -- Step 2: Join Activity\nGROUP BY 1, 2\nORDER BY 1, 2;\n---CODE_END---',
        whatIfs: [
            '**What if you want "Rolling Retention" (Returned on OR AFTER Day X)?**\nInstead of checking `MonthOffset = 1`, check `DateDiff >= 30`.',
            '**What if you want strictly "Day 1 Retention"?**\nFilter for activity where `SaleDate = CohortDate + 1`.'
        ]
      },

      // =========================================================
      // LEVEL 6: CTEs & RECURSION
      // =========================================================
      {
        id: 'sql-27',
        question: 'What is a CTE (Common Table Expression) and why use it over a Subquery?',
        concepts: '**Scope & Definition**: A named temporary result set defined using `WITH`. It exists only for the duration of the query.\n**Code Quality**: Readability, Modularity, and Linearity.\n**DRY Principle**: Don\'t Repeat Yourself.',
        answer: 'Both Subqueries and CTEs are "Queries within Queries", but CTEs are superior for engineering.\n\n**Why use a CTE?**\n1. **Readability**: Logic flows Top-to-Bottom (CTE -> Main Query), whereas subqueries force you to read Inside-Out.\n2. **Reusability**: You can define a CTE *once* and reference it *multiple times* in the main query. A subquery must be copy-pasted every time you need it.',
        example: '---CODE_START---sql\n-- SCENARIO: Compare Dept Sales to the Company Average.\n\n-- CTE: Calculate Company Average ONCE.\nWITH CompanyStats AS (\n    SELECT AVG(TotalSales) as GlobalAvg FROM DepartmentSales\n)\n-- Reference it easily\nSELECT \n    d.DeptName, \n    d.TotalSales,\n    c.GlobalAvg\nFROM DepartmentSales d\nCROSS JOIN CompanyStats c -- Reusing the logic\nWHERE d.TotalSales > c.GlobalAvg;\n---CODE_END---',
        whatIfs: [
            '**What if the CTE logic is very heavy/slow?**\nCTEs are often "inlined" (run every time they are referenced). If you reference a heavy CTE 5 times, it might run 5 times. In that case, dump the data into a **Temp Table** (`SELECT * INTO #Temp`) to calculate it once physically.'
        ]
      },
      {
        id: 'sql-28',
        question: 'How does a Recursive CTE work? (e.g., generating an Org Chart).',
        concepts: '**Recursion**: A function/query that calls itself.\n**Anchor Member**: The starting point (Base Case).\n**Recursive Member**: The loop step that joins to the CTE itself.\n**Termination**: The condition that stops the loop.',
        answer: 'Recursive CTEs allow SQL to iterate. They are primarily used for **Hierarchical Data** (Org Charts, Folder Trees, Bill of Materials).\n\n**The Structure:**\n1. **Anchor**: Select the root nodes (e.g., The CEO, who has no boss).\n2. **UNION ALL**: Connects the root to the children.\n3. **Recursive Step**: Select employees whose `ManagerID` matches the `EmployeeID` found in the previous step (The CTE).',
        example: '---CODE_START---sql\n-- GOAL: Build an Org Chart with Levels (Level 1=CEO, Level 2=VP...)\n\nWITH RECURSIVE OrgHierarchy AS (\n    -- 1. Anchor: Find the CEO\n    SELECT EmployeeID, Name, ManagerID, 1 as Level \n    FROM Employees \n    WHERE ManagerID IS NULL\n\n    UNION ALL\n\n    -- 2. Recursive: Find people who report to the Hierarchy found so far\n    SELECT e.EmployeeID, e.Name, e.ManagerID, h.Level + 1\n    FROM Employees e\n    JOIN OrgHierarchy h ON e.ManagerID = h.EmployeeID\n)\nSELECT * FROM OrgHierarchy;\n---CODE_END---',
        whatIfs: [
            '**What if the hierarchy has a loop (A -> B -> A)?**\nThe query will run forever until it errors out. You can limit this using `OPTION (MAXRECURSION 100)` (SQL Server) or by adding a depth check `WHERE Level < 20`.',
            '**What if you want to create a Breadcrumb trail (CEO > VP > Manager)?**\nConcat the names in the recursive step: `h.Path + \' > \' + e.Name`.'
        ]
      },
      {
        id: 'sql-29',
        question: 'How do you select every Nth row (Sampling)?',
        concepts: '**Modulo Operator (%)**: Returns the integer remainder of a division (e.g., `5 % 2 = 1`).\n**Deterministic Sampling**: Selecting a predictable subset of data.\n**Row Numbering**: Creating a reliable sequence to filter against.',
        answer: 'To sample data (e.g., "Select every 10th user"), use the Modulo operator on a generated Row Number.\n\n**The Logic:**\n1. Generate a `ROW_NUMBER()`.\n2. Filter `WHERE RowNum % N = 0`.\n- `Row % 2 = 1` -> Odd Rows (1, 3, 5)\n- `Row % 2 = 0` -> Even Rows (2, 4, 6)\n- `Row % 10 = 0` -> Decimation (10, 20, 30)',
        example: '---CODE_START---sql\n-- GOAL: Select a 33% sample (Every 3rd row)\n\nWITH NumberedRows AS (\n    SELECT \n        *, \n        ROW_NUMBER() OVER(ORDER BY UserID) as RN\n    FROM Users\n)\nSELECT * \nFROM NumberedRows\nWHERE RN % 3 = 0;\n---CODE_END---',
        whatIfs: [
            '**What if you want a RANDOM sample?**\nDo not use Modulo. Use `ORDER BY RAND()` (MySQL) or `ORDER BY NEWID()` (SQL Server) combined with `LIMIT`.\n---CODE_START---sql\nSELECT * FROM Users ORDER BY RAND() LIMIT 100\n---CODE_END---'
        ]
      },
      {
        id: 'sql-30',
        question: 'How do you optimize a slow SQL query?',
        concepts: '**Query Tuning**: The methodology of improving query performance.\n**Explain Plan**: The database\'s roadmap for executing the query.\n**Bottlenecks**: Full Table Scans, Missing Indexes, Poor Joins.',
        answer: 'Optimization is a detective process. Do not guess; measure.\n\n**The Optimization Checklist:**\n1. **EXPLAIN**: Run the query with `EXPLAIN` (or "Display Execution Plan"). Look for **Full Table Scans** on large tables.\n2. **Indexes**: Are you filtering by a column (`WHERE Email = ...`) that isn\'t indexed? Add one.\n3. **Selectivity**: Indexes only help if you select a *small* percentage of rows. If you select 90% of rows, the DB ignores the index.\n4. **SARGable**: Remove functions from columns in the WHERE clause.',
        example: '---CODE_START---sql\n-- SLOW: The DB must calculate YEAR() for 1 million rows to check the match.\nSELECT * FROM Orders WHERE YEAR(OrderDate) = 2023;\n\n-- FAST: The DB looks at the Index, jumps to 2023-01-01, and stops at 2023-12-31.\nSELECT * FROM Orders WHERE OrderDate BETWEEN \'2023-01-01\' AND \'2023-12-31\';\n---CODE_END---',
        whatIfs: [
            '**What if the query is stuck on "Waiting"?**\nIt might be a Locking issue. Other transactions might be writing to the table. Check `sys.dm_tran_locks` or `pg_locks`.',
            '**What if you are selecting too many columns?**\n`SELECT *` prevents "Covering Indexes". Selecting only `SELECT ID, Date` might run instantly from the index without touching the table.'
        ]
      },
	  {
        id: 'sql-31',
        question: 'Clustered vs. Non-Clustered Index.',
        concepts: '**Indexing**: Data structures that improve the speed of data retrieval operations.\n\n**The Definitions**:\n* **Clustered Index (The Book)**: It determines the **physical order** of data on the disk. A table can have only **ONE** Clustered Index (usually the Primary Key).\n* **Non-Clustered Index (The Appendix)**: A separate structure that contains a copy of the indexed column pointing to the address of the row. A table can have **MANY**.',
        answer: 'Think of a Dictionary. The words are physically sorted A-Z; this is the **Clustered Index**. You don\'t need a lookup list to find "Apple", you just flip to the "A" section.\n\nNow imagine you want to find words by "Origin" (Latin, Greek). The book isn\'t sorted by Origin. You go to the back of the book (Index), find "Latin", and it lists the page numbers. This is the **Non-Clustered Index**.',
        example: '---CODE_START---sql\n-- 1. Clustered Index (Physical Sort)\n-- Created automatically with Primary Key usually\nCREATE CLUSTERED INDEX idx_ID ON Users(UserID);\n\n-- 2. Non-Clustered Index (Logical Lookup)\n-- Created to speed up searches by Email\nCREATE INDEX idx_Email ON Users(Email);\n---CODE_END---',
        whatIfs: [
            '**What is a "Covering Index"? (Crucial Optimization)**\nA Non-Clustered index that includes *extra* columns so the DB never has to look at the main table.\n---CODE_START---sql\n-- If I only query Email and Phone, this index answers it 100%\nCREATE INDEX idx_Covering ON Users(Email) INCLUDE (Phone);\n---CODE_END---'
        ]
      },
      {
        id: 'sql-32',
        question: 'Why should you avoid `SELECT *` in production?',
        concepts: '**I/O Overhead**: Reading more data from the disk/network than necessary.\n**Schema Binding**: Code dependency on the exact number/order of columns.\n**Covering Index Failure**: Preventing the optimizer from using efficient indexes.',
        answer: 'Using `SELECT *` is lazy coding that causes three major problems:\n1.  **Network Traffic**: You might pull "Blob" columns (images, huge text) when you only needed an ID, clogging the bandwidth.\n2.  **Breaks Covering Indexes**: Even if you have a perfect index on `Name`, `SELECT *` forces the DB to read the slow hard drive to fetch the other unindexed columns.\n3.  **Fragility**: If a DBA adds a new column, your application code (which expects 5 columns) might crash when it receives 6.',
        example: '---CODE_START---sql\n-- INEFFICIENT: Reads the whole row from disk (Table Scan)\nSELECT * FROM Users WHERE Name = \'Alice\';\n\n-- EFFICIENT: Uses the Index on "Name" only (Index Seek)\n-- Never touches the heavy physical table\nSELECT ID, Name FROM Users WHERE Name = \'Alice\';\n---CODE_END---',
        whatIfs: [
            '**Is `SELECT *` ever acceptable?**\nYes, in two cases:\n1. Ad-hoc querying/debugging.\n2. Inside an `EXISTS` clause (e.g., `WHERE EXISTS (SELECT * ...)`), because the engine optimizes the `*` away instantly.'
        ]
      },
      {
        id: 'sql-33',
        question: 'What is a "SARGable" query?',
        concepts: '**SARGable (Search ARGument ABLE)**: A condition that allows the database engine to leverage an index.\n**The Golden Rule**: Never perform a function/math on the **Column side** (Left side) of the comparison.',
        answer: 'If you wrap a column in a function (e.g., `YEAR(Date)`), the database cannot use the index tree structure. It must "scan" every single row, run the math function, and *then* compare. This turns an instant search into a slow process. Always move the math to the Value side (Right side).',
        example: '---CODE_START---sql\n-- BAD (Non-SARGable): Index on OrderDate is ignored.\n-- DB must calculate YEAR() for every single row in the table.\nSELECT * FROM Orders WHERE YEAR(OrderDate) = 2023;\n\n-- GOOD (SARGable): Index on OrderDate is used.\n-- DB jumps straight to the range in the index tree.\nSELECT * FROM Orders \nWHERE OrderDate >= \'2023-01-01\' \n  AND OrderDate < \'2024-01-01\';\n---CODE_END---',
        whatIfs: [
            '**What about Case-Insensitive searches?**\n`LOWER(Name) = \'bob\'` is Non-SARGable. To fix this, don\'t use functions; verify if your database Collation is already case-insensitive (SQL Server usually is) or use `ILIKE` (Postgres).'
        ]
      },
      {
        id: 'sql-34',
        question: 'DELETE vs TRUNCATE vs DROP.',
        concepts: '**DML (Data Manipulation)**: Editing data (DELETE).\n**DDL (Data Definition)**: Editing structure (TRUNCATE, DROP).\n**Transaction Logs**: The record of changes allowing rollbacks.',
        answer: 'All three remove data, but the mechanism differs:\n\n**1. DELETE (The Surgical Knife)**:\n- Removes specific rows (`WHERE`).\n- **Slow**: Logs every single row deletion.\n- **Undo**: Can be rolled back easily.\n\n**2. TRUNCATE (The Reset Button)**:\n- Removes ALL rows.\n- **Fast**: Deallocates the data pages instead of deleting rows.\n- **Reset**: Resets Identity (Auto-Increment) counters to 1.\n\n**3. DROP (The Nuke)**:\n- Removes the Table Structure itself.\n- Everything is gone.',
        example: '---CODE_START---sql\n-- Scenario: Cleaning up user "Bob"\nDELETE FROM Users WHERE ID = 5; -- Logs the single delete\n\n-- Scenario: Emptying a Staging table before nightly load\nTRUNCATE TABLE Staging_Users; -- Instant, minimal logging\n\n-- Scenario: Decommissioning a feature\nDROP TABLE Legacy_Users; -- Table ceases to exist\n---CODE_END---',
        whatIfs: [
            '**What if the table has a Foreign Key pointing to it?**\n`TRUNCATE` will fail. You cannot truncate a parent table referenced by a child. You must drop the constraint first or use `DELETE`.'
        ]
      },
      {
        id: 'sql-35',
        question: 'Daily vs Weekly reporting toggle in one query.',
        concepts: '**Grouping Sets**: An advanced extension of `GROUP BY` that calculates multiple levels of aggregation in a single pass.\n**Rollup/Cube**: Specific types of grouping sets for hierarchies.',
        answer: 'Dashboards often allow users to toggle "View by Day" or "View by Week". Running two separate queries is inefficient. `GROUPING SETS` allows you to define multiple groups. The result will contain rows for Daily sums (where Week is NULL) and rows for Weekly sums (where Day is NULL).',
        example: '---CODE_START---sql\nSELECT \n    Day, \n    Week, \n    SUM(Sales) as TotalSales\nFROM SalesData\n-- Calculate sum for Day, AND sum for Week separately\nGROUP BY GROUPING SETS (\n    (Day), \n    (Week)\n);\n---CODE_END---',
        whatIfs: [
            '**What if you want a "Grand Total" row as well?**\nAdd an empty set `()` to the grouping sets.\n---CODE_START---sql\nGROUP BY GROUPING SETS ((Day), (Week), ())\n---CODE_END---'
        ]
      },
      {
        id: 'sql-36',
        question: 'Why is a query fast in Dev but slow in Prod?',
        concepts: '**Parameter Sniffing**: When the database compiles a plan for a "Small" parameter but reuses it for a "Huge" parameter.\n**Statistics**: Metadata about data distribution (e.g., "How many distinct values?").',
        answer: 'This is usually **Parameter Sniffing**. \n\n**The Story**: You run a report for `User = "TestUser"` (1 row). The DB creates a plan optimized for small data (Nested Loop). Later, someone runs it for `User = "Amazon"` (1M rows). The DB *reuses* the cached "TestUser" plan, which is terrible for 1M rows, causing a timeout.\n\n**Other Causes**: \n- **Stale Statistics**: Prod data changed, but the DB metadata is old.\n- **Data Volume**: Prod has 1TB of data; Dev has 1GB.',
        example: '---CODE_START---sql\n-- FIX 1: Force a new plan every time (CPU heavy, but safe)\nSELECT * FROM Orders WHERE ID = @ID \nOPTION (RECOMPILE);\n\n-- FIX 2: Update the metadata\nUPDATE STATISTICS Orders;\n---CODE_END---',
        whatIfs: [
            '**What if the query is waiting on "Locks"?**\nIt\'s not the query\'s fault. Another transaction is writing to the table, blocking reads. Check `sp_who2` (SQL Server) or `pg_stat_activity` (Postgres).'
        ]
      },
      {
        id: 'sql-37',
        question: 'Temp Table vs CTE.',
        concepts: '**Persistence**: Memory vs Disk.\n**Scope**: Statement vs Session.\n**Indexing**: The ability to optimize the intermediate result.',
        answer: 'This is a question of "How heavy is the logic?"\n\n**1. CTE (`WITH`)**:\n- **Scope**: Exists only for the single statement.\n- **Pros**: Readable, Recursion.\n- **Cons**: Cannot be indexed. If referenced twice, it might run twice (No caching).\n\n**2. Temp Table (`#Table`)**:\n- **Scope**: Exists for the whole session/procedure.\n- **Pros**: **Can be Indexed**. Great for multi-step processing (Insert -> Update -> Join).\n- **Cons**: Writes to disk (`TempDB`), slightly more I/O.',
        example: '---CODE_START---sql\n-- CTE: Good for simple, one-pass logic\nWITH Sales AS (SELECT * FROM RawSales) ...\n\n-- TEMP TABLE: Good for heavy processing\nSELECT * INTO #ProcessedSales FROM RawSales;\n-- Creating an index on the temp table to speed up the next steps\nCREATE INDEX idx_tmp ON #ProcessedSales(CustomerID);\nUPDATE #ProcessedSales SET ...\n---CODE_END---',
        whatIfs: [
            '**What if you have a CTE that is referenced 5 times in a join?**\nThe DB might calculate it 5 times! Materialize it into a Temp Table first to force it to calculate once.'
        ]
      },
      {
        id: 'sql-38',
        question: 'Stored Procedures: Why use them?',
        concepts: '**Encapsulation**: Bundling logic into a named object.\n**Security**: Preventing SQL Injection.\n**Performance**: Reducing network traffic.',
        answer: 'A Stored Procedure is a saved script on the server.\n\n**Top 3 Reasons to use them:**\n1.  **Security**: Applications call `EXEC GetUser @ID=5`. They never send raw SQL (`SELECT * FROM...`). This prevents hackers from injecting malicious code.\n2.  **Maintenance**: You can fix a bug in the SQL logic without recompiling/deploying the Java/Python application.\n3.  **Network**: Instead of sending 1000 lines of SQL text over the wire, you send 1 line (`EXEC Name`).',
        example: '---CODE_START---sql\n-- Definition\nCREATE PROCEDURE GetUserOrders (@UserID INT)\nAS\nBEGIN\n    SELECT * FROM Orders WHERE UserID = @UserID;\nEND\n\n-- Application Call\nEXEC GetUserOrders 101;\n---CODE_END---',
        whatIfs: [
            '**What if you need to return a table to be used in a JOIN?**\nYou cannot join a Procedure. You must use a **Table-Valued Function (TVF)** instead.\n---CODE_START---sql\nSELECT * FROM Users u \nJOIN dbo.GetRecentOrders(u.ID) f ON ...\n---CODE_END---'
        ]
      }
    ],
};

export default sqlCategory;
