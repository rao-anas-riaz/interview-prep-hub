import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql-mastery',
    title: 'SQL Masterclass (Definitions, Logic & Scenarios)',
    icon: 'fa-database',
    description: 'Comprehensive deep-dive: Definitions, detailed logic, code examples, and "What If" scenarios for interview mastery.',
    questions: [
      // ---------------------------------------------------------
      // LEVEL 1: HOW THE ENGINE THINKS (The Foundation)
      // ---------------------------------------------------------
      {
        id: 'sql-1',
        question: 'What is the Order of Execution in an SQL query?',
        concepts: '**Lexical Order vs. Logical Order**: The order you write code is NOT the order the computer runs it.\n**The Funnel**: Data starts large and gets filtered down step-by-step.',
        answer: 'To fix bugs, you must understand the timeline of a query. \n\n**The Definitions:**\n1. **FROM/JOIN**: The database finds the tables on the hard drive and merges them into a raw dataset.\n2. **WHERE**: It filters rows immediately to reduce the workload. **Crucial Note**: Column aliases (nicknames) created in SELECT do not exist yet.\n3. **GROUP BY**: It collapses the remaining rows into "buckets" or groups.\n4. **HAVING**: It filters the *buckets* (e.g., removing groups with low totals).\n5. **SELECT**: It finally calculates the math, functions, and assigns Aliases (names).\n6. **ORDER BY**: It sorts the final result.\n7. **LIMIT**: It cuts off the rows you don\'t need.',
        example: 'Query: `SELECT Price * 0.1 AS Tax FROM Sales WHERE Tax > 5`\n\n**Why it fails**: The `WHERE` clause runs at Step 2. The alias `Tax` is defined at Step 5. The database doesn\'t know what "Tax" is yet.',
        whatIfs: [
            '**What if you absolutely need to filter by the alias?**\nWrap the query in a CTE or Subquery. The outer query treats the CTE as a finished table, so the alias "exists" to the outer WHERE clause.\n`WITH Calc AS (SELECT Price * 0.1 AS Tax FROM Sales) SELECT * FROM Calc WHERE Tax > 5`'
        ]
      },
      {
        id: 'sql-2',
        question: 'What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT)?',
        concepts: '**NULL Handling**: The most important concept in aggregation. Does the engine look at the data, or just the row?',
        answer: 'These functions behave differently when they encounter `NULL` (empty) values.\n\n**1. COUNT(*)**: This counts **Rows**. The engine puts a blindfold on and just counts how many records exist, regardless of what is inside them. It includes rows full of NULLs.\n**2. COUNT(column)**: This counts **Non-Null Values**. The engine checks the specific column. If it sees a value, count +1. If it sees `NULL`, it ignores it.\n**3. COUNT(DISTINCT column)**: This counts **Unique, Non-Null Values**. It looks at the column, throws away duplicates, throws away NULLs, and counts what is left.',
        example: 'Imagine a "Users" table with 5 rows. One user has a `NULL` email.\n- `COUNT(*)` returns **5** (5 rows exist).\n- `COUNT(email)` returns **4** (only 4 rows have an email).\n- `COUNT(DISTINCT email)` returns **4** (assuming no duplicate emails).',
        whatIfs: [
            '**What if you want to count the number of NULLs specifically?**\nUse math: `COUNT(*) - COUNT(email)`. The difference between "Total Rows" and "Rows with Emails" is the count of NULLs.',
            '**What if you want to count unique pairs (e.g., User + Product)?**\nUse `COUNT(DISTINCT CONCAT(UserID, ProductID))`. This combines them into a single string and counts unique combinations.'
        ]
      },
      {
        id: 'sql-3',
        question: 'Explain the difference between WHERE and HAVING.',
        concepts: '**Pre-Aggregation vs. Post-Aggregation**: Filtering raw data vs. filtering summary data.',
        answer: 'Both clauses are used to filter data, but they apply at different times in the execution timeline.\n\n**1. WHERE (The Row Filter)**:\n- Defined **Before** `GROUP BY`.\n- Filters individual **rows**.\n- Cannot use aggregate functions (like `SUM`, `AVG`) because the groups haven\'t been built yet.\n\n**2. HAVING (The Group Filter)**:\n- Defined **After** `GROUP BY`.\n- Filters **groups** or **aggregates**.\n- Can use functions like `SUM(Salary) > 10000`.\n\n**Optimization Tip**: Always use `WHERE` first to reduce the dataset size before the database has to do the heavy work of grouping.',
        example: 'Query: Find departments with total salaries over $100k, but exclude Interns.\n\n`SELECT Dept, SUM(Salary) FROM Emp WHERE JobTitle != \'Intern\' GROUP BY Dept HAVING SUM(Salary) > 100000`\n\n- **WHERE**: Removes Interns (Rows).\n- **GROUP BY**: Buckets the remaining employees.\n- **HAVING**: Checks the total salary of the bucket.',
        whatIfs: [
            '**What if you need to filter by a calculated Window Function (like Rank)?**\nNeither WHERE nor HAVING works directly. You must wrap it in a CTE.\n`WITH Ranked AS (SELECT RANK() OVER(...) as rnk FROM T) SELECT * FROM Ranked WHERE rnk = 1`'
        ]
      },
      {
        id: 'sql-4',
        question: 'What is the difference between UNION and UNION ALL?',
        concepts: '**Set Operations**: Combining two lists into one.\n**Performance Cost**: Deduplication requires sorting/hashing.',
        answer: 'These operators combine the result sets of two or more SELECT statements.\n\n**1. UNION (The Expensive One)**:\n- Combines results and **removes duplicates**.\n- **Mechanism**: It stacks the data, then performs a heavy sort or hash operation to find and delete identical rows.\n- **Speed**: Slower.\n\n**2. UNION ALL (The Fast One)**:\n- Combines results and **keeps duplicates**.\n- **Mechanism**: It simply appends the second result set to the end of the first.\n- **Speed**: Very Fast.\n\n**Best Practice**: Always default to `UNION ALL`. Only use `UNION` if you strictly require a unique list and don\'t want to handle it via `DISTINCT`.',
        example: '`SELECT * FROM Jan_Sales UNION ALL SELECT * FROM Feb_Sales`\n\nSince a sale made in January cannot be the same record as a sale in February, checking for duplicates is a waste of server resources. Use `UNION ALL`.',
        whatIfs: [
            '**What if the columns are in different orders in the two tables?**\n`UNION` matches by **position**, not name. You must explicitly select columns in the same order.\nCorrect: `SELECT Name, Age FROM A UNION ALL SELECT Name, Age FROM B`.'
        ]
      },
      {
        id: 'sql-5',
        question: 'The "NOT IN" Trap: What happens if your subquery returns a NULL?',
        concepts: '**Three-Valued Logic**: SQL has True, False, and Unknown (NULL).\n**The Poison Pill**: A single NULL can crash your logic.',
        answer: 'This is a classic interview trap involving `NOT IN`.\n\n**The Scenario**: You want to find users NOT in a specific list. `SELECT * FROM Users WHERE ID NOT IN (1, 2, NULL)`.\n\n**The Logic Failure**:\n- SQL checks: "Is UserID 5 not equal to 1?" -> True.\n- "Is UserID 5 not equal to 2?" -> True.\n- "Is UserID 5 not equal to NULL?" -> **UNKNOWN**.\n\nBecause one check is "Unknown", the entire condition becomes "Unknown" (not True). SQL interprets this as False and returns **Zero Rows**.\n\n**The Fix**: Always use `WHERE ID IS NOT NULL` inside your subquery, or use `NOT EXISTS`.',
        example: 'Bad: `SELECT * FROM Orders WHERE UserID NOT IN (SELECT UserID FROM BadUsers)` (If BadUsers has a NULL, this returns nothing).\n\nGood: `SELECT * FROM Orders WHERE UserID NOT IN (SELECT UserID FROM BadUsers WHERE UserID IS NOT NULL)`',
        whatIfs: [
            '**What if you use NOT EXISTS instead?**\n`NOT EXISTS` is safe. It checks for the *presence* of a row, not the direct value comparison. It handles NULLs correctly without extra filtering.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 2: DATA MANIPULATION (The Toolkit)
      // ---------------------------------------------------------
      {
        id: 'sql-6',
        question: 'How do you find duplicate records (e.g., duplicate emails)?',
        concepts: '**Aggregation Pattern**: The standard approach to data quality checks.\n**Logic**: Grouping by the unique key and counting the size of the group.',
        answer: 'To find duplicates, you need to group data by the column that *should* be unique (like Email) and check if any group has more than 1 entry.\n\n**The Steps**:\n1. **SELECT** the column (Email).\n2. **GROUP BY** that column. This collapses all identical emails into one row.\n3. **COUNT(*)** to see how many rows were collapsed.\n4. **HAVING COUNT(*) > 1** to filter and show only the emails that appeared multiple times.',
        example: '---CODE_START---sql\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to see the full row details of the duplicates, not just the email?**\nUse a Window Function. `COUNT(*) OVER(PARTITION BY email)` adds a count column to every row. You can then wrap this in a subquery and filter `WHERE count > 1`.',
            '**What if "Bob@gmail" and "bob@gmail" are strictly different?**\nSQL is often case-insensitive by default. To force case sensitivity, you might need to cast to `BINARY` or change the collation.'
        ]
      },
      {
        id: 'sql-7',
        question: 'How do you delete duplicate rows while keeping the one with the lowest/highest ID?',
        concepts: '**De-duplication Strategy**: Ranking items to identify the "Survivor".\n**CTE usage**: Modifying a table based on a calculated rank.',
        answer: 'You want to remove the "extra" copies. The most robust way is using a CTE with a Window Function.\n\n**The Logic**:\n1. Create a temporary view (CTE).\n2. Use `ROW_NUMBER()` to assign a rank (1, 2, 3...) to each row within the duplicate group (`PARTITION BY email`).\n3. `ORDER BY ID` determines who gets rank #1 (The Survivor).\n4. **DELETE** from the CTE where the rank is greater than 1.\n\nThis method is safer than self-joins because it handles groups of 3+ duplicates easily.',
        example: '---CODE_START---sql\nWITH Ranked AS (\n    SELECT *, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id ASC) as rn\n    FROM users\n)\nDELETE FROM Ranked WHERE rn > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to keep the NEWEST record (Highest ID)?**\nChange the sort order: `ORDER BY id DESC`. Now the newest ID gets Rank 1 and survives.',
            '**What if the table doesn\'t have a primary key ID?**\nYou can use internal system columns like `ctid` (Postgres) or `ROWID` (Oracle) to uniquely identify rows.'
        ]
      },
      {
        id: 'sql-8',
        question: 'How do you Pivot data (Rows to Columns) without a PIVOT function?',
        concepts: '**Conditional Aggregation**: The manual way to pivot data.\n**Logic**: "Bucketing" data into columns using `CASE WHEN`.',
        answer: 'Standard SQL stores data vertically (rows). Reporting often needs data horizontally (columns). You can achieve this manually using `CASE` statements inside an aggregate function.\n\n**The Technique**:\n- `SUM(CASE WHEN condition THEN value ELSE 0 END)`\n- You scan the table once. For every row, you ask: "Does this belong in Bucket A? If yes, add it. If no, add 0."\n- Finally, `GROUP BY` the row identifier.',
        example: 'Turning a vertical "Sales Log" into columns for each year:\n\n`SELECT ProductID,`\n`SUM(CASE WHEN Year=2023 THEN Sales ELSE 0 END) as Sales_2023,`\n`SUM(CASE WHEN Year=2024 THEN Sales ELSE 0 END) as Sales_2024`\n`FROM SalesTable GROUP BY ProductID`',
        whatIfs: [
            '**What if you want to calculate the % growth between the new columns?**\nYou can do math on the SUMs directly in the SELECT:\n`(SUM(CASE WHEN Year=2024...) - SUM(CASE WHEN Year=2023...)) / SUM(CASE WHEN Year=2023...)`'
        ]
      },
      {
        id: 'sql-9',
        question: 'Extract the domain name from a list of email addresses.',
        concepts: '**String Manipulation**: Parsing text based on delimiters.\n**Functions**: `SUBSTRING`, `CHARINDEX` (or `POSITION`/`INSTR`).',
        answer: 'Since email addresses have different lengths (bob@gmail.com vs alexandra@yahoo.com), you cannot use hardcoded positions. You must use a **dynamic anchor**.\n\n**The Steps**:\n1. **Find the Anchor**: Locate the position of the `@` symbol using `CHARINDEX(\'@\', email)`.\n2. **Cut the String**: Use `SUBSTRING(string, start, length)`.\n   - Start: The position of `@` + 1.\n   - Length: The length of the full email (to ensure you get the rest).',
        example: 'Email: `bob@gmail.com`\n- `CHARINDEX` finds `@` at position 4.\n- `SUBSTRING` starts at 4+1 (5).\n- Result: `gmail.com`',
        whatIfs: [
            '**What if you want the username (everything BEFORE the @)?**\nUse `SUBSTRING(email, 1, CHARINDEX(\'@\', email) - 1)`. This starts at 1 and stops right before the `@`.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 3: JOINS (The Connections)
      // ---------------------------------------------------------
      {
        id: 'sql-10',
        question: 'Find employees who earn more than their managers.',
        concepts: '**Self-Join**: Joining a table to itself.\n**Mental Model**: Treating one physical table as two logical roles (Employee vs Manager).',
        answer: 'Normally, you join Table A to Table B. Here, the "Manager" info is in the same table as the "Employee" info. \n\n**The Definition**:\nA **Self-Join** is a regular join, but you alias the table twice (e.g., `FROM Employee E JOIN Employee M`).\n\n**The Logic**:\n1. Alias `Employee E` (The Worker).\n2. Alias `Employee M` (The Boss).\n3. **Connect them**: `E.ManagerID = M.EmployeeID` (The Worker\'s boss ID is the Boss\'s own ID).\n4. **Filter**: `WHERE E.Salary > M.Salary`.',
        example: '---CODE_START---sql\nSELECT E.Name \nFROM Employee E\nJOIN Employee M ON E.ManagerId = M.Id\nWHERE E.Salary > M.Salary;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find employees with NO manager (e.g. the CEO)?**\nYou don\'t need a join. Just query `SELECT * FROM Employee WHERE ManagerID IS NULL`.',
            '**What if you want to compare salary to the Department Average instead?**\nUse a Window Function: `AVG(Salary) OVER(PARTITION BY DeptID)`. A self-join is inefficient for group averages.'
        ]
      },
      {
        id: 'sql-11',
        question: 'Identify products that have never been sold (Finding Missing Records).',
        concepts: '**Exclusion Join**: Finding "A minus B".\n**Pattern**: `LEFT JOIN` ... `WHERE IS NULL`.',
        answer: 'This is a set theory question: You have a Master List (Products) and a Transaction List (Sales). You want items in Master that are NOT in Transactions.\n\n**The Logic**:\n1. **LEFT JOIN**: Take `Products` (Left) and join `Sales` (Right). This returns ALL products.\n2. **Match Check**: If a product was sold, the Sales columns will have data. If it was NEVER sold, the Sales columns will be `NULL`.\n3. **Filter**: `WHERE Sales.ID IS NULL`.',
        example: '---CODE_START---sql\nSELECT p.Name\nFROM Products p\nLEFT JOIN Sales s ON p.Id = s.ProductId\nWHERE s.Id IS NULL;\n---CODE_END---',
        whatIfs: [
            '**What if you want to use "NOT IN" instead?**\nYou can: `WHERE ProductID NOT IN (SELECT ProductID FROM Sales)`. However, remember the "NOT IN Trap" (NULLs will break this query).',
            '**What if you want to use "EXCEPT"?**\n`SELECT ID FROM Products EXCEPT SELECT ProductID FROM Sales`. This is cleaner syntax but essentially does the same work.'
        ]
      },
      {
        id: 'sql-12',
        question: 'Find pairs of products frequently bought together (Market Basket Analysis).',
        concepts: '**Self-Join on Inequality**: Pairing rows within the same group.\n**Problem**: Duplicate pairs (A-B, B-A, A-A).',
        answer: 'You want to find items that share the same `OrderID`. This requires a Self-Join on `OrderItems`.\n\n**The Trick**: If you just join on `OrderID`, you get:\n- Item A matches Item A (Self-match: Useless)\n- Item A matches Item B\n- Item B matches Item A (Duplicate pair)\n\n**The Fix**: Use a non-equi join condition: `AND A.ProductID < B.ProductID`. This ensures you only get pairs where the first item is alphabetically/numerically smaller than the second, eliminating self-matches and duplicates.',
        example: '---CODE_START---sql\nSELECT A.ProductID, B.ProductID, COUNT(*)\nFROM OrderItems A\nJOIN OrderItems B ON A.OrderID = B.OrderID\nWHERE A.ProductID < B.ProductID\nGROUP BY 1, 2\nORDER BY 3 DESC;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find Triplets (3 items)?**\nYou need 3 joins: `Table A join Table B join Table C`. Condition: `A.ID < B.ID AND B.ID < C.ID`.'
        ]
      },
      {
        id: 'sql-13',
        question: 'What is a Cross Join and when would you use it?',
        concepts: '**Cartesian Product**: The Multiplier.\n**Use Case**: Generating grids, combinations, or test data.',
        answer: 'Most joins (Inner, Left) act as **Filters** (matching rows). A **Cross Join** acts as a **Multiplier**.\n\n**Definition**:\nIt combines **every** row from Table A with **every** row from Table B. If Table A has 10 rows and Table B has 10 rows, the result is 100 rows (10x10).\n\n**When to use it**:\nWhen you need to generate a master list of combinations. For example, you want a report showing "Sales per Product per Month", but some months have zero sales. You Cross Join `Products` table with `Months` table to create a grid of all possibilities, then Left Join the actual sales.',
        example: '`SELECT * FROM Products CROSS JOIN Months`\nResult: \n- Widget, Jan\n- Widget, Feb\n- Gadget, Jan\n- Gadget, Feb...',
        whatIfs: [
            '**What if you run a Cross Join on two massive tables by accident?**\nYou will crash the database. 1 million rows x 1 million rows = 1 Trillion rows. This is a common performance incident.'
        ]
      },
      {
        id: 'sql-14',
        question: 'When should you use a FULL OUTER JOIN?',
        concepts: '**Full Inclusion**: A Union of Left and Right Joins.\n**Scenario**: Comparing two incomplete lists.',
        answer: 'A `FULL OUTER JOIN` ensures you don\'t lose data from either side of the relationship.\n\n**Definition**:\nIt returns all rows when there is a match in **either** table. \n- If Table A has a row with no match in B, it shows A (with NULLs for B).\n- If Table B has a row with no match in A, it shows B (with NULLs for A).\n\n**Use Case**: "Reconciliation". You have a list of "Expected Payments" and "Actual Payments". You want to see:\n1. Matches (Paid as expected)\n2. Expected but not Paid (Left side)\n3. Paid but not Expected (Right side)',
        example: '`SELECT * FROM Budget FULL OUTER JOIN Spending ON Budget.Dept = Spending.Dept`',
        whatIfs: [
            '**What if your database (like MySQL) does not support FULL OUTER JOIN?**\nYou must simulate it. Combine a Left Join and a Right Join using `UNION ALL`. \n`(SELECT * FROM A LEFT JOIN B) UNION ALL (SELECT * FROM A RIGHT JOIN B WHERE A.id IS NULL)`'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 4: WINDOW FUNCTIONS (The Power Tools)
      // ---------------------------------------------------------
      {
        id: 'sql-15',
        question: 'Explain RANK vs DENSE_RANK using a race analogy.',
        concepts: '**Window Functions**: Calculations across a set of rows related to the current row.\n**The Concept**: Handling ties in sorting.',
        answer: 'When ranking data (like Highest Sales), you often hit ties (two people with equal sales). Different functions handle this differently.\n\n**1. ROW_NUMBER()**: "The Unique ID".\nIt forces a unique number (1, 2, 3) even if values are tied. The tie-break is arbitrary unless specified.\n\n**2. RANK()**: "The Olympics".\nIf two people tie for Gold (1st), the next person gets Bronze (3rd). It **skips** numbers (1, 1, 3).\n\n**3. DENSE_RANK()**: "The Fair Rank".\nIf two people tie for 1st, the next person gets 2nd. It **does not skip** numbers (1, 1, 2).',
        example: 'Query: `DENSE_RANK() OVER(ORDER BY Salary DESC)`.\nIf Salaries are: [100, 100, 90]\n- Rank: 1, 1, 3\n- Dense_Rank: 1, 1, 2\n\nUse `DENSE_RANK` when finding the "Nth highest" value so gaps don\'t mess up your count.',
        whatIfs: [
            '**What if you want to divide the employees into 4 equal groups (Quartiles)?**\nUse `NTILE(4) OVER(ORDER BY Salary)`. This assigns a bucket number (1-4) to each row.'
        ]
      },
      {
        id: 'sql-16',
        question: 'Find the Top 2 highest-selling products for each category.',
        concepts: '**Partitioning**: Resetting the rank for each group.\n**Filtering Window Functions**: Why you need a CTE.',
        answer: 'This requires ranking items *within* their category.\n\n**Step 1: The Rank**\nUse `DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC)`. \n- `PARTITION BY Category`: Tells SQL to restart the counter (Rank 1) whenever the Category changes.\n\n**Step 2: The Filter (The Trick)**\nWindow functions are calculated **after** the WHERE clause. You cannot write `WHERE RANK() <= 2`. \n\n**Solution**: Wrap the query in a **CTE** (or Subquery) to "materialize" the rank column. Then filter the CTE.',
        example: '---CODE_START---sql\nWITH RankedItems AS (\n  SELECT Product, Category, Sales,\n         DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC) as rnk\n  FROM SalesTable\n)\nSELECT * FROM RankedItems WHERE rnk <= 2;\n---CODE_END---',
        whatIfs: [
            '**What if you want the lowest selling products?**\nChange `ORDER BY Sales DESC` to `ORDER BY Sales ASC`.',
            '**What if you strictly need exactly 2 rows per category, ignoring ties?**\nUse `ROW_NUMBER()` instead of `DENSE_RANK()`. Row Number guarantees unique ranks, so you will never get 3 items if there is a tie.'
        ]
      },
      {
        id: 'sql-17',
        question: 'Calculate a Rolling 7-Day Average (The Window Frame).',
        concepts: '**Window Frames**: Defining the "Looking Glass" for the calculation.\n**Keywords**: `ROWS BETWEEN`, `PRECEDING`, `FOLLOWING`.',
        answer: 'A standard `AVG()` collapses the whole group into one number. A "Rolling" average stays at the row level but looks at "neighbors".\n\n**The Definition**:\n`AVG(Sales) OVER (...)` needs a specific "Frame" to know how far back to look.\n\n**The Syntax**:\n`ORDER BY Date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`.\n- **6 PRECEDING**: Look at the 6 rows before me.\n- **CURRENT ROW**: Include me.\n- Total: 7 rows (7 Days).',
        example: 'Query: `AVG(Sales) OVER(ORDER BY Date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`\n\nIf you omit the `ROWS BETWEEN` clause, SQL defaults to `UNBOUNDED PRECEDING`, which means "Average of all history up to today" (Cumulative Average), not a 7-day moving average.',
        whatIfs: [
            '**What if you want a Centered Average (3 days before + 3 days after)?**\n`ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING`.\n',
            '**What if you have missing dates (gaps) in your data?**\n`ROWS` counts physical rows. If days are missing, "6 rows back" might be 6 months ago! You might need to use `RANGE BETWEEN` (if supported) or fill the date gaps first.'
        ]
      },
      {
        id: 'sql-18',
        question: 'Calculate Cumulative Sum (Running Total).',
        concepts: '**Unbounded Preceding**: The default frame for accumulation.\n**Business Value**: Tracking year-to-date progress.',
        answer: 'A Running Total adds the current value to the sum of all previous values.\n\n**The Logic**:\nUse `SUM(Sales) OVER(ORDER BY Date)`.\n- By adding `ORDER BY`, you force SQL to process rows sequentially.\n- The default behavior for `SUM` with `ORDER BY` is "Add everything from the start up to the current row".\n\n**Partitioning**:\nUsually, you want the running total to reset periodically (e.g., every year). Use `PARTITION BY Year` to reset the sum to 0 when the year changes.',
        example: '---CODE_START---sql\nSELECT Date, Sales,\n  SUM(Sales) OVER(PARTITION BY Year(Date) ORDER BY Date) as RunningTotal\nFROM SalesLog;\n---CODE_END---',
        whatIfs: [
            '**What if you want a Running Total of only the last 3 transactions?**\nYou combine this with the Frame concept: `SUM(Sales) OVER(ORDER BY Date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.'
        ]
      },
      {
        id: 'sql-19',
        question: 'Calculate Month-over-Month Growth (Lag/Lead).',
        concepts: '**Offset Functions**: Accessing data from other rows without joining.\n**LAG vs LEAD**: Past vs Future.',
        answer: 'To calculate growth (`(New - Old) / Old`), you need data from the "Current Row" and the "Previous Row" available at the same time.\n\n**Definitions**:\n- **`LAG(col, n)`**: Look "n" rows **backwards**.\n- **`LEAD(col, n)`**: Look "n" rows **forwards**.\n\n**The Logic**:\n1. Get Previous Month Sales: `LAG(Sales) OVER(ORDER BY Month)`.\n2. Apply Math: `(Sales - PreviousSales) / PreviousSales`.\n3. This creates a "Growth" column instantly.',
        example: 'If Jan = 100 and Feb = 110.\nRow Feb: `Sales`=110. `LAG(Sales)`=100.\nResult: (110-100)/100 = 0.10 (10% Growth).',
        whatIfs: [
            '**What if it is the first month (No previous data)?**\n`LAG` returns `NULL`. Any math with NULL becomes NULL. If you want to default it to 0, use `COALESCE(LAG(Sales), 0)`.\n',
            '**What if you want Year-over-Year comparison?**\nUse `LAG(Sales, 12)` to look back 12 rows (assuming one row per month).'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 5: ALGORITHMS (The Brain Teasers)
      // ---------------------------------------------------------
      {
        id: 'sql-20',
        question: 'Solve the "Gaps and Islands" problem (Consecutive Streaks).',
        concepts: '**Row Number Math**: The gold standard for complex SQL logic.\n**The Pattern**: Comparing two sequences to find a constant difference.',
        answer: 'This is used to find "Streaks" (e.g., Login Streaks, Winning Streaks). \n\n**The Problem**: How do you tell SQL that Jan 1, Jan 2, and Jan 3 are a "group", but Jan 5 is a new group?\n\n**The Solution**:\n1. Generate a `ROW_NUMBER()` ordered by Date.\n2. Subtract the Row Number from the Date (`Date - RowNum`).\n3. **The Magic**: If dates are consecutive, the difference is **constant**. \n   - Jan 1 (Row 1) -> Diff 0\n   - Jan 2 (Row 2) -> Diff 0\n   - Jan 4 (Row 3) -> Diff 1 (New Group!)\n4. Group by this "Difference" value to aggregate the streaks.',
        example: '---CODE_START---sql\nWITH Grps AS (\n    SELECT Date, Date - INTERVAL ROW_NUMBER() OVER(ORDER BY Date) DAY as GrpID\n    FROM Logins\n)\nSELECT GrpID, COUNT(*) as StreakLength, MIN(Date), MAX(Date)\nFROM Grps GROUP BY GrpID;\n---CODE_END---',
        whatIfs: [
            '**What if you need consecutive IDs (Integers) instead of Dates?**\nEasier! Just calculate `ID - ROW_NUMBER()`. The logic holds identical.',
            '**What if you only want streaks longer than 3 days?**\nAdd `HAVING COUNT(*) >= 3` to the final Group By.'
        ]
      },
      {
        id: 'sql-21',
        question: 'Calculate the Median salary.',
        concepts: '**Statistical Aggregation**: Finding the middle value.\n**Constraint**: SQL usually lacks a `MEDIAN` function.',
        answer: 'The Median is the value at the 50th percentile. Since we often can\'t just type `MEDIAN()`, we build it manually.\n\n**The Algorithm**:\n1. Sort the data: `ROW_NUMBER() OVER(ORDER BY Salary)`.\n2. Count the data: `COUNT(*) OVER()`. (Window count lets us keep individual rows).\n3. **Filter**: Select the row where the Row Number is in the middle.\n   - Formula: `Where RowNum IN ((Count+1)/2, (Count+2)/2)`.\n4. **Average**: If there are 2 middle numbers (Even count), Average them.',
        example: 'Data: 100, 200, 300, 400, 500 (Count 5).\nMiddle is (5+1)/2 = 3rd item (300).',
        whatIfs: [
            '**What if you need the Median per Department?**\nAdd `PARTITION BY Dept` to both the `ROW_NUMBER` and the `COUNT` functions.'
        ]
      },
      {
        id: 'sql-22',
        question: 'Relational Division: Find users who bought ALL products.',
        concepts: '**Universal Quantifier**: Checking for "Completeness".\n**Logic**: Set Comparison.',
        answer: 'This is the "Checklist" problem. Does the User\'s checklist match the Master checklist?\n\n**The Steps**:\n1. **Master Count**: Calculate the total number of unique products available (e.g., 5).\n2. **User Count**: Group the Sales table by User and count how many *distinct* products they bought.\n3. **Compare**: Filter `HAVING Count(Distinct Product) = (Select Count(*) From Products)`.',
        example: '---CODE_START---sql\nSELECT UserID\nFROM Sales\nGROUP BY UserID\nHAVING COUNT(DISTINCT ProductID) = (SELECT COUNT(*) FROM Products);\n---CODE_END---',
        whatIfs: [
            '**What if you only care about "Electronics" products?**\nFilter both sides. 1. Count Total Electronics. 2. Count User\'s Electronic purchases.',
            '**What if a user bought the same product 5 times?**\nThat is why `COUNT(DISTINCT ProductID)` is mandatory. Without DISTINCT, 5 purchases of the same item would look like 5 different items.'
        ]
      },
      {
        id: 'sql-23',
        question: 'Identify anomalies (Sales 50% below average).',
        concepts: '**Contextual Comparison**: Comparing a specific row to the group average.\n**Technique**: Mixing Detail and Aggregate data.',
        answer: 'To detect outliers, you need to compare `MySales` vs `AvgSales`. Standard Group By collapses the data, losing the individual row. Window Functions keep the row.\n\n**The Logic**:\n1. Use `AVG(Sales) OVER()` to calculate the average and paste it onto every row as a new column.\n2. In the outer query, compare `Sales < 0.5 * AvgSales`.\n\nThis allows you to see the specific transaction that triggered the anomaly.',
        example: '---CODE_START---sql\nSELECT *\nFROM (\n  SELECT *, AVG(amount) OVER(PARTITION BY product_id) as avg_amt\n  FROM Sales\n) t\nWHERE amount < 0.5 * avg_amt;\n---CODE_END---',
        whatIfs: [
            '**What if you want to compare to the Median instead (to avoid skew)?**\nUse the Median CTE approach defined in the previous question.',
            '**What if you want to detect the Top 1% of transactions?**\nUse `NTILE(100) OVER(ORDER BY Sales DESC)`. Filter for Bucket 1.'
        ]
      },
      {
        id: 'sql-24',
        question: 'Fill missing dates in a report (Data Densification).',
        concepts: '**Data Sparsity**: The database only stores what happened, not what didn\'t happen.\n**Solution**: Generating a "Spine" or Calendar.',
        answer: 'If you `GROUP BY Date`, days with 0 sales simply disappear from the result. To report "0", you must force the date to exist.\n\n**The Steps**:\n1. **Generate Dates**: Use a Recursive CTE (or a static Calendar table) to create a list of every single day in the month.\n2. **Left Join**: Join FROM the Calendar TO the Sales data.\n3. **Handle Nulls**: Use `COALESCE(SUM(Sales), 0)`. If no match is found, the SUM is NULL, so we flip it to 0.',
        example: '---CODE_START---sql\nWITH RECURSIVE Dates AS (...)\nSELECT d.date, COALESCE(SUM(s.amt), 0)\nFROM Dates d\nLEFT JOIN Sales s ON d.date = s.date\nGROUP BY d.date;\n---CODE_END---',
        whatIfs: [
            '**What if you want to "Forward Fill" (carry the last known value)?**\nUse `LAST_VALUE(Sales) IGNORE NULLS OVER(ORDER BY Date)`. This is advanced syntax available in BigQuery/Snowflake/Postgres.'
        ]
      },
      {
        id: 'sql-25',
        question: 'Reactivation: Find users who purchased this month but NOT in the last 6 months.',
        concepts: '**Complex Intervals**: Defining specific time windows.\n**Logic**: Inclusion Criteria + Exclusion Criteria.',
        answer: 'This defines "Resurrected Users".\n\n**The Logic**:\n1. **Inclusion**: Find distinct users who bought something in the `Current Month`.\n2. **Exclusion**: Ensure these users DO NOT EXIST in the sales records from `Current Month - 6` to `Current Month - 1`.\n3. Use `NOT EXISTS` or `LEFT JOIN ... WHERE NULL` for the exclusion.',
        example: '---CODE_START---sql\nSELECT DISTINCT UserID FROM Sales \nWHERE Month = \'2023-07\'\nAND UserID NOT IN (\n    SELECT UserID FROM Sales WHERE Month BETWEEN \'2023-01\' AND \'2023-06\'\n);\n---CODE_END---',
        whatIfs: [
            '**What if you want New Users (Never bought before)?**\nCheck if `MIN(OrderDate) = Current Month`.',
            '**What if you want Churned Users (Bought last month, zero this month)?**\nFlip the logic: Select from Last Month, Exclude This Month.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 6: CTES & RECURSION
      // ---------------------------------------------------------
      {
        id: 'sql-27',
        question: 'What is a CTE (Common Table Expression) and why use it over a Subquery?',
        concepts: '**Scope & Definition**: Named temporary result sets.\n**Code Quality**: Readability as a feature.',
        answer: 'Both Subqueries and CTEs are "Queries within Queries", but they are structured differently.\n\n**1. Subquery (The Nested Block)**:\n- Defined *inside* the main query (e.g., in the WHERE clause or FROM list).\n- **Pros**: Quick for simple filters.\n- **Cons**: Hard to read (nested layers), cannot be reused easily.\n\n**2. CTE (The Named Block)**:\n- Defined *before* the main query using `WITH Name AS (...)`.\n- **Pros**: Reads top-to-bottom (linear), can be referenced multiple times, supports Recursion.\n\n**Why CTE?**\nIf you need to use the same logic twice (e.g., compare `Department Avg` to `Company Avg`), you calculate the CTE once and reference it twice. With subqueries, you\'d have to copy-paste the code block.',
        example: '---CODE_START---sql\n-- Readable CTE\nWITH DeptTotals AS (SELECT Dept, SUM(Sales) as Total FROM Sales GROUP BY Dept)\nSELECT * FROM DeptTotals WHERE Total > 1000;\n---CODE_END---',
        whatIfs: [
            '**What if the query is very slow?**\nSometimes CTEs are not "Materialized" (saved), meaning the DB runs the code every time you mention it. In that case, swapping to a `TEMP TABLE` might be faster.'
        ]
      },
      {
        id: 'sql-28',
        question: 'How does a Recursive CTE work? (e.g., generating an Org Chart).',
        concepts: '**Recursion**: A function that calls itself.\n**Structure**: Anchor + Recursive Member + Termination.',
        answer: 'Recursive CTEs allow SQL to handle hierarchies (Trees, Graphs) or generate sequences.\n\n**The Structure**:\n1. **Anchor Member**: The starting point (e.g., The CEO who has no boss, or the number 1).\n2. **UNION ALL**: The connector.\n3. **Recursive Member**: The query that references *the CTE itself*. It joins the CTE to the original table to find the "next level" (e.g., employees whose boss is the person found in Step 1).\n4. **Termination**: The loop stops when Step 3 returns no new rows.',
        example: 'Generating numbers 1 to 10:\n`WITH RECURSIVE Cnt AS (`\n`  SELECT 1 as Val` (Anchor)\n`  UNION ALL`\n`  SELECT Val + 1 FROM Cnt WHERE Val < 10` (Recursive)\n`) SELECT * FROM Cnt;`',
        whatIfs: [
            '**What if you create an infinite loop?**\n(e.g., Val + 1 without a WHERE clause). The DB will run until it hits a memory limit or a "Max Recursion Depth" error.',
            '**What if you need to track the "Level" (Depth) of the employee?**\nAdd a column to the CTE: `SELECT 1 as Level`. In the recursive part: `SELECT Level + 1`.'
        ]
      },
      {
        id: 'sql-29',
        question: 'How do you select every Nth row (Sampling)?',
        concepts: '**Modulo Arithmetic**: The Remainder Operator (`%`).\n**Technique**: Filtering based on math.',
        answer: 'To sample data (e.g., "Select 10% of users"), you can use the Modulo operator.\n\n**The Definition**:\n`A % B` returns the **remainder** when A is divided by B.\n- `10 % 3` = 1.\n- `10 % 2` = 0 (Even number).\n\n**The Logic**:\n1. Generate a `ROW_NUMBER()` for every row.\n2. Filter `WHERE RowNum % 10 = 0`. This selects row 10, 20, 30... giving you a 10% sample.',
        example: '---CODE_START---sql\nWITH Numbered AS (\n    SELECT *, ROW_NUMBER() OVER(ORDER BY ID) as rn FROM Users\n)\nSELECT * FROM Numbered WHERE rn % 2 = 1; -- Selects Odd rows (1, 3, 5)\n---CODE_END---',
        whatIfs: [
            '**What if you use ID % 2 instead of RowNumber?**\nIt works if IDs are sequential. If you deleted IDs 2, 4, and 6, `ID % 2` might return nothing. Always use `ROW_NUMBER` for consistent sampling.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 7: OPTIMIZATION (Under the Hood)
      // ---------------------------------------------------------
      {
        id: 'sql-30',
        question: 'How do you optimize a slow SQL query?',
        concepts: '**Query Tuning**: The checklist for performance issues.\n**Tools**: `EXPLAIN`, Indexing, Rewriting.',
        answer: 'When a query crawls, don\'t guess. Follow this process:\n\n**1. Explain Plan**: Run `EXPLAIN SELECT...`. Look for **Full Table Scans**. This means the DB is reading the entire book instead of the index.\n**2. Indexing**: Are you filtering by a column (e.g., `WHERE Email = ...`) that isn\'t indexed? Add one.\n**3. SARGable**: Check if you are "blinding" the index with functions (e.g., `WHERE LEFT(Name,1) = \'A\'`).\n**4. Selectivity**: Indexes are useless for low-variance data (e.g., "Gender"). Ensure you are filtering for specific data.',
        example: 'Scenario: `SELECT * FROM Logs WHERE YEAR(Date) = 2023` is slow.\nFix: `SELECT * FROM Logs WHERE Date BETWEEN \'2023-01-01\' AND \'2023-12-31\'`. \nWhy: The first one runs a math function on every row. The second one jumps straight to the date range in the index.',
        whatIfs: [
            '**What if the query is waiting on "Locks"?**\nIt might not be the query\'s fault. Another transaction might be Updating the table, forcing your Select to wait. Check `sys.dm_tran_locks` (SQL Server) or `pg_locks` (Postgres).'
        ]
      },
      {
        id: 'sql-31',
        question: 'Clustered vs. Non-Clustered Index.',
        concepts: '**Physical vs Logical Storage**: The Textbook Analogy.\n**Limit**: One Clustered vs Many Non-Clustered.',
        answer: 'Indexes make reads fast but writes slow. You must know the difference.\n\n**1. Clustered Index (The Book)**:\n- This **reorders the physical data** on the hard drive.\n- A table can have only **ONE** (because you can only sort a physical book one way).\n- Usually the Primary Key.\n\n**2. Non-Clustered Index (The Index at the back)**:\n- This is a separate list that points to the data.\n- "Value X is on Page Y".\n- You can have **MANY**.\n\n**Performance**: Clustered is faster (the data is right there). Non-clustered requires an extra "lookup" step.',
        example: 'If you frequently search by `Email`, create a Non-Clustered index on the `Email` column. The DB creates a sorted list of emails pointing to the user rows.',
        whatIfs: [
            '**What is a "Covering Index"?**\nA Non-Clustered index that includes *all* the columns you asked for. \n`CREATE INDEX idx ON Users(Email) INCLUDE (Phone)`. \nIf you `SELECT Phone FROM Users WHERE Email = ...`, the DB finds the answer in the Index and *never touches the main table*. This is instant.'
        ]
      },
      {
        id: 'sql-32',
        question: 'Why avoid `SELECT *` in production?',
        concepts: '**I/O Overhead**: Bandwidth and Memory waste.\n**Schema Fragility**: Breaking downstream code.',
        answer: 'Using `SELECT *` is lazy and dangerous in production apps.\n\n**Reasons**:\n1. **Network Traffic**: You are fetching columns you don\'t need (e.g., huge text blobs), clogging the network.\n2. **Index Usage**: It prevents "Covering Indexes". If you select `*`, the DB *must* read the full table row, ignoring your optimized indexes.\n3. **Code Stability**: If someone adds a new column to the DB, your code might crash if it expects exactly 5 columns and now gets 6.',
        example: 'Query: `SELECT * FROM Users` vs `SELECT ID, Name FROM Users`.\nThe second query might run 100x faster if `ID` and `Name` are in an index, because it never reads the disk.',
        whatIfs: [
            '**Is SELECT * ever okay?**\nYes, for ad-hoc debugging or when using `EXISTS` (because `SELECT *` in an EXISTS clause is optimized out by the engine).'
        ]
      },
      {
        id: 'sql-33',
        question: 'What is a "SARGable" query?',
        concepts: '**Search ARGument ABLE**: Writing code that Indexes can understand.\n**Rule**: Avoid math on the left side of the `=` sign.',
        answer: 'An index works like a sorted dictionary. It lets you jump to "Apple" instantly.\n\n**Non-SARGable (Bad)**:\n`WHERE LEFT(Name, 1) = \'A\'`.\nTo check this, the DB must read every single name in the dictionary, calculate the first letter, and compare it. The sort order is useless.\n\n**SARGable (Good)**:\n`WHERE Name LIKE \'A%\'`.\nThe DB knows "A" is at the start of the dictionary. It jumps there, reads the "A"s, and stops. 1000x faster.',
        example: 'Bad: `WHERE Year(Date) = 2023`.\nGood: `WHERE Date >= \'2023-01-01\' AND Date < \'2024-01-01\'`.',
        whatIfs: [
            '**What if you need Case Insensitive search?**\n`LOWER(Name) = \'bob\'` is NOT SARGable. You should use a case-insensitive Collation on the database column instead.'
        ]
      },
      {
        id: 'sql-34',
        question: 'DELETE vs TRUNCATE vs DROP.',
        concepts: '**DML vs DDL**: Data Manipulation vs Data Definition.\n**Rollback**: The ability to undo.',
        answer: 'All three remove data, but differently.\n\n**1. DELETE (The Sniper)**:\n- DML Command.\n- Removes rows one by one.\n- **Slow**. Logs every deletion.\n- **Undo**: Can be Rolled Back.\n- Can use `WHERE`.\n\n**2. TRUNCATE (The Nuke)**:\n- DDL Command.\n- Deletes the data pages (resets the table).\n- **Fast**. Minimal logging.\n- **Undo**: Harder (Transaction dependent).\n- Resets Auto-Increment IDs.\n\n**3. DROP (The Black Hole)**:\n- DDL Command.\n- Deletes the Table Structure entirely.\n- Data is gone. Schema is gone.',
        example: 'Use `TRUNCATE` to clear a Staging table before a nightly load. Use `DELETE` to remove a specific user.',
        whatIfs: [
            '**What if the table has a Foreign Key pointing to it?**\nYou usually cannot TRUNCATE a table referenced by a FK. You must delete the children first or drop the constraint.'
        ]
      },
      {
        id: 'sql-35',
        question: 'Daily vs Weekly reporting toggle in one query.',
        concepts: '**Grouping Sets**: Advanced Aggregation.\n**Efficiency**: Doing two jobs in one pass.',
        answer: 'Dashboards often let users toggle between "Daily View" and "Weekly View". Running two separate queries is inefficient.\n\n**The Solution**: `GROUP BY GROUPING SETS`.\nThis tells SQL: "Group by Day and calculate Sum. Then, reusing the same data, Group by Week and calculate Sum."\n\nThe result contains rows for both daily data and weekly totals, distinguishable by a NULL in the non-aggregated column.',
        example: '`SELECT Day, Week, SUM(Sales) FROM Sales GROUP BY GROUPING SETS ((Day), (Week))`',
        whatIfs: [
            '**What if you want a Grand Total too?**\nAdd `()` to the sets: `GROUPING SETS ((Day), (Week), ())`.'
        ]
      },
       {
        id: 'sql-36',
        question: 'Why is a query fast in Dev but slow in Prod?',
        concepts: '**Parameter Sniffing**: The plan cache trap.\n**Data Distribution**: Skewed data.',
        answer: 'This is a common nightmare. Code works on your machine but hangs in production.\n\n**Reason 1: Parameter Sniffing**\nSQL compiles a plan based on the first input it sees. \n- Dev: You test with `User=Test` (1 row). SQL picks a simple lookup plan.\n- Prod: User searches `User=Amazon` (1M rows). SQL reuses the "simple" plan, which is terrible for 1M rows, and it crashes.\n\n**Reason 2: Stats**\nProduction data changes fast. If the "Statistics" (metadata about row counts) are old, SQL guesses wrong about which index to use.',
        example: 'Fix: Update Statistics, or use `OPTION(RECOMPILE)` to force a new plan for every run.',
        whatIfs: [
            '**What if the data volume is the same?**\nCheck for **Blocking**. In Prod, other users might be Updating the table, locking it. Your Select query has to wait in line.'
        ]
      },
      {
        id: 'sql-37',
        question: 'Temp Table vs CTE.',
        concepts: '**Persistence**: Memory vs Disk.\n**Scope**: Statement vs Session.',
        answer: 'Where should you store intermediate data?\n\n**1. CTE (`WITH...`)**:\n- **Logical**: It exists only for the split second the query runs.\n- **Scope**: The single statement.\n- **Use**: Readability, Recursion.\n\n**2. Temp Table (`#Table`)**:\n- **Physical**: It is written to `TempDB` on disk/RAM.\n- **Scope**: The whole session (you can run 5 queries against it).\n- **Use**: Heavy processing. You can add **Indexes** to a Temp Table. You cannot index a CTE.',
        example: 'Scenario: You need to calculate a complex dataset, then Update it, then Delete bad rows, then Select it. \nUse a **Temp Table**. A CTE cannot be modified in steps.',
        whatIfs: [
            '**What if the CTE is extremely slow?**\nThe database might be calculating the CTE multiple times (once for every join). Materializing it into a Temp Table forces it to calculate once.'
        ]
      },
      {
        id: 'sql-38',
        question: 'Stored Procedures: Why use them?',
        concepts: '**Encapsulation**: Treating SQL like a function.\n**Security**: Prevention of Injection.',
        answer: 'A Stored Procedure is a saved script in the database.\n\n**Why use it?**\n1. **Security**: It prevents SQL Injection. Users pass parameters (`@ID=5`), they don\'t type raw SQL.\n2. **Network Traffic**: Instead of sending a 500-line query over the internet, you send `EXEC RunJob`. Fast.\n3. **Maintenance**: You can change the query logic inside the DB without changing and redeploying the Java/Python application code.',
        example: '`CREATE PROCEDURE GetUser(@id INT) AS SELECT * FROM Users WHERE ID = @id`.\nApp calls: `EXEC GetUser 5`.',
        whatIfs: [
            '**What if you need to return a table to join in another query?**\nYou cannot select FROM a procedure. You must use a **Table-Valued Function** instead.'
        ]
      }
    ],
};

export default sqlCategory;
