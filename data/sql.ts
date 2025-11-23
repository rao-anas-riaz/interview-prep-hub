import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql-mastery',
    title: 'SQL Masterclass (Mental Models & Scenarios)',
    icon: 'fa-database',
    description: 'Deep dive into SQL logic with "What If" scenarios to handle interview curveballs.',
    questions: [
      // ---------------------------------------------------------
      // LEVEL 1: HOW THE ENGINE THINKS (The Foundation)
      // ---------------------------------------------------------
      {
        id: 'sql-1',
        question: 'What is the Order of Execution in an SQL query?',
        concepts: '**The Funnel Metaphor**: SQL starts with a huge table and slowly filters it down.\n**Key Rule**: You cannot use an alias (nickname) before you have created it.',
        answer: 'Think of SQL execution as a funnel. It doesn\'t read top-to-bottom; it reads from the data source outwards.\n1. **FROM/JOIN**: "Get the raw data."\n2. **WHERE**: "Filter rows immediately." (The Alias `Tax` doesn\'t exist yet!)\n3. **GROUP BY**: "Bucket the data."\n4. **HAVING**: "Filter the buckets."\n5. **SELECT**: "Calculate the math and name the columns (Aliases created here)."\n6. **ORDER BY/LIMIT**: "Sort and cut the final list."',
        example: 'If you write `SELECT Price * 0.1 AS Tax ... WHERE Tax > 5`, it fails. Why? Because `WHERE` happens at Step 2, but `Tax` isn\'t created until Step 5.',
        whatIfs: [
            '**What if you absolutely need to filter by the alias?**\nWrap it in a CTE or Subquery. The outer query sees the CTE as a finished table, so the alias exists.\n`WITH calc AS (SELECT Price * 0.1 AS Tax FROM Sales) SELECT * FROM calc WHERE Tax > 5`'
        ]
      },
      {
        id: 'sql-2',
        question: 'What is the difference between COUNT(*), COUNT(col), and COUNT(DISTINCT)?',
        concepts: '**The Blindfold Test**: `COUNT(*)` wears a blindfold; it just counts rows. `COUNT(col)` looks at the value and skips if it sees NULL.',
        answer: 'This is a test of how you handle NULLs.\n- **`COUNT(*)`**: The engine counts every row, even if it\'s full of NULLs. It is usually the fastest.\n- **`COUNT(column)`**: The engine peeks at that specific column. If it sees a `NULL`, it ignores it. It counts **Values**, not Rows.\n- **`COUNT(DISTINCT column)`**: Counts unique values, ignoring NULLs.',
        example: 'Table has 5 users, but 1 user has a NULL email.\n`COUNT(*)` = 5 (Rows).\n`COUNT(email)` = 4 (Actual Emails).',
        whatIfs: [
            '**What if you want to count NULLs specifically?**\nUse `COUNT(*) - COUNT(email)`. The difference is the number of rows with NULL emails.',
            '**What if you want to count a combination of columns?**\n`COUNT(DISTINCT CONCAT(col1, col2))` counts unique pairs.'
        ]
      },
      {
        id: 'sql-3',
        question: 'Explain the difference between WHERE and HAVING.',
        concepts: '**Individual vs. Group**: Do you want to filter *people* or *teams*?\n**Timing**: Before or After the `GROUP BY`.',
        answer: 'Use the timeline of the query:\n- **WHERE**: Filters **Rows** before they are grouped. (e.g., "Exclude Sales from 2022").\n- **HAVING**: Filters **Aggregates** after they are grouped. (e.g., "Show Departments where Total Sales > $10k").\n\n*Tip: You cannot write `WHERE SUM(sales) > 100` because the sum hasn\'t been calculated yet!*',
        example: '`SELECT Dept, SUM(Salary) FROM Emp WHERE Age > 30 GROUP BY Dept HAVING SUM(Salary) > 100k`.\nWe first remove young people (WHERE), then group the rest, then check the total (HAVING).',
        whatIfs: [
            '**What if you need to filter by a calculated window function?**\nNeither WHERE nor HAVING works directly. You must use a CTE.\n`WITH T AS (SELECT rank() OVER(...) as rnk) SELECT * FROM T WHERE rnk = 1`'
        ]
      },
      {
        id: 'sql-4',
        question: 'What is the difference between UNION and UNION ALL?',
        concepts: '**The Duplicate Check**: One does extra work to ensure uniqueness; the other blindly stacks data.\n**Performance**: Doing less work is always faster.',
        answer: '- **UNION**: Stacks two lists, but then pauses to Sort and Deduplicate them. This is "Expensive" (Slow).\n- **UNION ALL**: Just pastes the second list to the bottom of the first. It keeps duplicates, but it is "Cheap" (Fast).\n\n*Rule: Always default to UNION ALL unless you specifically need to remove duplicates.*',
        example: 'If you combine a table of "Jan Sales" and "Feb Sales", a transaction can\'t be in both months. So use `UNION ALL` to save processing time.',
        whatIfs: [
            '**What if you need to combine 3 tables?**\nJust chain them: `SELECT * FROM A UNION ALL SELECT * FROM B UNION ALL SELECT * FROM C`.',
            '**What if the columns are in different orders?**\n`UNION` matches by position, not name. You must explicitly select columns in the same order: `SELECT name, age FROM A UNION ALL SELECT name, age FROM B`.'
        ]
      },
      {
        id: 'sql-5',
        question: 'The "NOT IN" Trap: What happens if your subquery returns a NULL?',
        concepts: '**The Poison Pill**: One `NULL` ruins the whole batch.\n**Logic**: `5 != NULL` is not TRUE, it is "UNKNOWN".',
        answer: 'If you ask: "Give me users NOT IN this list of IDs", and the list contains a single `NULL`, SQL panics. It can\'t be sure if the user is in the `NULL` spot or not, so it returns **Empty Results** (Zero rows) to be safe.\n\n*Fix: Always filter `WHERE ID IS NOT NULL` inside your subquery.*',
        example: '`SELECT * FROM Users WHERE ID NOT IN (1, 2, NULL)` returns **Nothing**. Even if User 3 exists.',
        whatIfs: [
            '**What if you want to avoid this risk entirely?**\nUse `NOT EXISTS`. It handles NULLs safely because it checks for the *existence* of a row, not the value match directly.\n`SELECT * FROM Users u WHERE NOT EXISTS (SELECT 1 FROM BadUsers b WHERE u.id = b.id)`'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 2: DATA MANIPULATION (The Toolkit)
      // ---------------------------------------------------------
      {
        id: 'sql-6',
        question: 'How do you find duplicate records (e.g., duplicate emails)?',
        concepts: '**The Bucket Count**: Put everyone with the same email in a bucket. If the bucket has > 1 item, it\'s a duplicate.',
        answer: 'This is the standard "Aggregation" pattern:\n1. `GROUP BY` the column that is supposed to be unique (Email).\n2. Count how many rows are in each group.\n3. `HAVING` count > 1 tells you which emails appear multiple times.',
        example: '---CODE_START---sql\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to return the entire row for the duplicates, not just the email?**\nUse a Window Function instead of Group By.\n`SELECT * FROM (SELECT *, COUNT(*) OVER(PARTITION BY email) as cnt FROM users) t WHERE cnt > 1`',
            '**What if you treat "Bob@gmail.com" and "bob@gmail.com" as duplicates?**\nConvert to lower case first: `GROUP BY LOWER(email)`.'
        ]
      },
      {
        id: 'sql-7',
        question: 'How do you delete duplicate rows while keeping the one with the lowest/highest ID?',
        concepts: '**The Rank & Delete**: Don\'t try to join the table to itself. Just rank them and kill the losers.',
        answer: 'Imagine assigning a rank (1, 2, 3) to each duplicate group. The "original" gets #1, the duplicates get #2, #3.\n1. Use a **CTE** with `ROW_NUMBER()`.\n2. Partition by the duplicate key (Email).\n3. Order by ID (to decide who is #1).\n4. Delete everything where Rank > 1.',
        example: '---CODE_START---sql\nWITH Ranked AS (\n    SELECT *, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id ASC) as rn\n    FROM users\n)\nDELETE FROM Ranked WHERE rn > 1;\n---CODE_END---',
        whatIfs: [
            '**What if you want to keep the NEWEST record (Highest ID)?**\nChange the `ORDER BY` to `DESC`: `ORDER BY id DESC`. Now the newest one gets rank #1.',
            '**What if the table doesn\'t have an ID?**\nYou can use `ctid` (Postgres) or `ROWID` (Oracle) or create a composite sorting key (e.g., `ORDER BY created_at DESC`).'
        ]
      },
      {
        id: 'sql-8',
        question: 'How do you Pivot data (Rows to Columns) without a PIVOT function?',
        concepts: '**The Conditional Bucket**: You want to create columns based on logic.\n**Trick**: `CASE WHEN` acts like a filter inside the SUM.',
        answer: 'Think of it as scanning the table once. For every row, you ask: "Does this belong in Column A or Column B?"\n- `SUM(CASE WHEN Year=2023 THEN Amount ELSE 0 END)`\nThis adds the amount to the "2023 Bucket" if it matches, otherwise adds 0.',
        example: 'Turning a "Sales Log" (vertical) into a "Report" (horizontal with columns: Jan_Sales, Feb_Sales).',
        whatIfs: [
            '**What if you want to calculate the Percentage Difference between the pivoted columns?**\nYou can do math on the `SUM`s directly in the SELECT:\n`... (SUM(CASE WHEN Year=2024...) - SUM(CASE WHEN Year=2023...)) / SUM(CASE WHEN Year=2023...)`'
        ]
      },
      {
        id: 'sql-9',
        question: 'Extract the domain name from a list of email addresses.',
        concepts: '**The Anchor Point**: You need a reference point to cut the string.\n**Tool**: Find the position of the `@` symbol.',
        answer: 'You can\'t just "get the end" because emails are different lengths. You must:\n1. Find the index number of the `@` symbol (`CHARINDEX` or `POSITION`).\n2. Take the `SUBSTRING` starting from `@ + 1` to the end.',
        example: '`bob@gmail.com`. `@` is at position 4. Substring starting at 5 gives `gmail.com`.',
        whatIfs: [
            '**What if you want the username (everything BEFORE the @)?**\nUse `SUBSTRING(email, 1, POSITION(\'@\' IN email) - 1)`.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 3: JOINS (The Connections)
      // ---------------------------------------------------------
      {
        id: 'sql-10',
        question: 'Find employees who earn more than their managers.',
        concepts: '**The Mirror Technique**: You have one table, but you need to compare rows *within* it.\n**Solution**: Pretend you have two tables.',
        answer: 'This is a **Self-Join**. Imagine cloning the `Employees` table.\n- Table A is "The Employees".\n- Table B is "The Managers".\nYou link them by saying: `A.ManagerID = B.EmployeeID`. Now you can compare `A.Salary > B.Salary`.',
        example: '---CODE_START---sql\nSELECT e.Name \nFROM Employee e\nJOIN Employee m ON e.ManagerId = m.Id\nWHERE e.Salary > m.Salary;\n---CODE_END---',
        whatIfs: [
            '**What if you want to find employees who DO NOT have a manager (e.g. the CEO)?**\nNo join needed. Just `SELECT * FROM Employees WHERE ManagerId IS NULL`.',
            '**What if you want to find employees who earn more than the AVERAGE salary of their department?**\nThis requires a Window Function, not a Self Join.\n`SELECT * FROM (SELECT *, AVG(Salary) OVER(PARTITION BY Dept) as avg_sal FROM Emp) t WHERE Salary > avg_sal`'
        ]
      },
      {
        id: 'sql-11',
        question: 'Identify products that have never been sold (Finding Missing Records).',
        concepts: '**The Ghost Hunt**: How do you find what *isn\'t* there?\n**Pattern**: LEFT JOIN + IS NULL.',
        answer: '1. Take the Master List (Products).\n2. `LEFT JOIN` the Transaction List (Sales). This keeps ALL products.\n3. If a product was never sold, the Sales columns will be `NULL` for that row.\n4. Filter for those `NULL`s.',
        example: '---CODE_START---sql\nSELECT p.Name\nFROM Products p\nLEFT JOIN Sales s ON p.Id = s.ProductId\nWHERE s.Id IS NULL;\n---CODE_END---',
        whatIfs: [
            '**What if you want to use Set Theory instead of Joins?**\nYou can use `EXCEPT` (or `MINUS` in Oracle).\n`SELECT ProductID FROM Products EXCEPT SELECT ProductID FROM Sales`.'
        ]
      },
      {
        id: 'sql-12',
        question: 'Find pairs of products frequently bought together (Market Basket).',
        concepts: '**The Handshake**: You want to see who is holding hands with whom in the same order.\n**Trick**: Avoid "Mirror Pairs".',
        answer: 'Join the `OrderItems` table to itself on `OrderID` (same bucket). But, you must ensure you don\'t match a product to itself (A=A) or list pairs twice (A-B and B-A).\n*Fix*: Use `On A.ID < B.ID`. This forces a one-way pair (Alphabetical order).',
        example: 'If order #1 has items [A, B], the join creates a row: {Item1: A, Item2: B}. You then Count these rows.',
        whatIfs: [
            '**What if you want to find triplets (3 items bought together)?**\nYou need two joins: `OrderItems A JOIN OrderItems B ... JOIN OrderItems C`. Condition: `A.ID < B.ID AND B.ID < C.ID`.'
        ]
      },
      {
        id: 'sql-13',
        question: 'What is a Cross Join and when would you use it?',
        concepts: '**The Grid Generator**: It creates every possible combination.\n**Math**: 5 rows x 4 rows = 20 rows.',
        answer: 'Most joins act as filters. A **CROSS JOIN** acts as a multiplier. It pairs every row from Table A with every row from Table B.\n**Use Case**: You want to build a "Report Grid" showing every Product for every Month, even if there were zero sales.',
        example: '`Select * From Months CROSS JOIN Products`. Now you have a row for Jan-Widget, Jan-Gadget, Feb-Widget...',
        whatIfs: [
            '**What if you want to avoid Cross Join but get the same result?**\nWait... why? But you can do `SELECT * FROM A, B` (Comma join) which is the legacy way of writing a Cross Join.'
        ]
      },
      {
        id: 'sql-14',
        question: 'When should you use a FULL OUTER JOIN?',
        concepts: '**The Inclusive Compare**: You have two lists and neither is the "Master".',
        answer: 'Use this when you want to see everything from both sides. \n- Matches are linked.\n- Non-matches from Left are shown (with NULLs on right).\n- Non-matches from Right are shown (with NULLs on left).\nIt is basically `Left Join` + `Right Join` combined.',
        example: 'Comparing "Budget" vs "Actual Spending". You want to see budgets that weren\'t spent, AND spending that wasn\'t budgeted.',
        whatIfs: [
            '**What if your database (like MySQL) doesn\'t support FULL JOIN?**\nYou simulate it using `UNION ALL`.\n`(SELECT * FROM A LEFT JOIN B) UNION ALL (SELECT * FROM A RIGHT JOIN B WHERE A.id IS NULL)`'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 4: WINDOW FUNCTIONS (The Power Tools)
      // ---------------------------------------------------------
      ,
      {
        id: 'sql-15',
        question: 'Explain RANK vs DENSE_RANK using a race analogy.',
        concepts: '**The Tie Breaker**: How do you handle gold medal ties?',
        answer: 'Imagine a race where two people tie for 1st place.\n- **ROW_NUMBER**: The photo finish camera decides. One is #1, one is #2. (No duplicates).\n- **RANK**: They both get Gold (#1). The next person gets Bronze (#3). (Skips numbers).\n- **DENSE_RANK**: They both get Gold (#1). The next person gets Silver (#2). (No gaps).',
        example: 'Use `DENSE_RANK` to find the "2nd Highest Salary" so you don\'t accidentally skip it if two people tie for 1st.',
        whatIfs: [
            '**What if you want to find the top 10% of employees?**\nUse `NTILE(10)`. It divides the rows into 10 equal buckets. You select `WHERE bucket = 1`.',
            '**What if you want the lowest salary to be Rank #1?**\nJust flip the sort order: `ORDER BY Salary ASC`.'
        ]
      },
      {
        id: 'sql-16',
        question: 'Find the Top 2 highest-selling products for each category.',
        concepts: '**The Layered Query**: You can\'t filter a rank while you are calculating it.',
        answer: 'Window functions happen *after* the `WHERE` clause. So you can\'t say `WHERE RANK() < 2`.\n**Solution**: Wrap the ranking logic in a CTE (Common Table Expression). Now the rank is just a normal column you can filter.',
        example: '---CODE_START---sql\nWITH Ranked AS (\n  SELECT *, DENSE_RANK() OVER(PARTITION BY Category ORDER BY Sales DESC) as rnk\n  FROM Sales\n)\nSELECT * FROM Ranked WHERE rnk <= 2;\n---CODE_END---',
        whatIfs: [
            '**What if there is a tie for 2nd place?**\nIf you use `DENSE_RANK`, both will show up (you might get 3 rows). If you strictly need only 2 rows, use `ROW_NUMBER()`.',
            '**What if you want the lowest selling product?**\nChange the Window Function to `ORDER BY Sales ASC`. Then filter `WHERE rnk = 1`.'
        ]
      },
      {
        id: 'sql-17',
        question: 'Calculate a Rolling 7-Day Average (The Window Frame).',
        concepts: '**The Moving Box**: You need to define how many rows the engine "looks at" for each calculation.',
        answer: 'Standard `AVG()` looks at the whole group. `AVG() OVER(...)` looks at a "Window".\n- **`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`**: This tells SQL: "For the current row, look back 6 rows + the current one (7 days total), and average those numbers."',
        example: 'Crucial for smoothing out stock market or sales data graphs.',
        whatIfs: [
            '**What if you want a Centered Average (3 days before + 3 days after)?**\nUse `ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING`.',
            '**What if you want the average of ALL previous days up to today (Cumulative Avg)?**\nUse `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.'
        ]
      },
      {
        id: 'sql-18',
        question: 'Calculate Cumulative Sum (Running Total).',
        concepts: '**The Snowball Effect**: The value gets bigger as you go down the rows.',
        answer: 'If you use `SUM(Sales) OVER(ORDER BY Date)`, SQL adds the current row\'s sales to the sum of all previous rows.\n- Without `ORDER BY`, it\'s just a Grand Total.\n- With `ORDER BY`, it becomes a Running Total.',
        example: 'Row 1: 10 (Total 10)\nRow 2: 20 (Total 30)\nRow 3: 5 (Total 35)',
        whatIfs: [
            '**What if you want the Running Total to reset every Month?**\nAdd a Partition: `SUM(Sales) OVER(PARTITION BY Month ORDER BY Date)`.',
            '**What if you want a Running Total of the last 3 rows only?**\nLimit the frame: `SUM(Sales) OVER(ORDER BY Date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.'
        ]
      },
      {
        id: 'sql-19',
        question: 'Calculate Month-over-Month Growth (Lag/Lead).',
        concepts: '**Time Travel**: Looking at the previous row without joining tables.',
        answer: 'You need to compare "This Month" vs "Last Month".\n- **`LAG(Sales)`**: "Reach up one row and grab that value."\n- **Formula**: `(Current - Previous) / Previous`.\nThis lets you calculate growth in a single select statement.',
        example: 'If Jan=100 and Feb=110. `LAG` on Feb returns 100. (110-100)/100 = 10%.',
        whatIfs: [
            '**What if there is no previous month (First row)?**\nLAG returns NULL. The math `(100 - NULL)` becomes NULL. Use `COALESCE(LAG(Sales), 0)` if you want to treat it as 0.',
            '**What if you want to compare to the same month LAST YEAR?**\nUse `LAG(Sales, 12)` to look back 12 rows (assuming you have a row for every month).'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 5: ALGORITHMS (The Brain Teasers)
      // ---------------------------------------------------------
      {
        id: 'sql-20',
        question: 'Solve the "Gaps and Islands" problem (Consecutive Streaks).',
        concepts: '**The Magic Math**: How to ID a consecutive streak? The "Difference" is constant.',
        answer: 'This is tricky. Imagine two counters incrementing: Calendar Days and a Row Number.\n- If you log in every day, both counters go up by 1. The difference (`Date - RowNum`) stays the same.\n- If you skip a day, the Date jumps, but RowNum just goes +1. The difference changes.\n**Solution**: Group by `(Date - RowNum)` to identify the streaks.',
        example: 'Used to find "Longest Login Streak" or "Consecutive Winning Days".',
        whatIfs: [
            '**What if you are looking for consecutive IDs instead of Dates?**\nSame logic! `ID - ROW_NUMBER()` will be constant for consecutive IDs (e.g., IDs 4,5,6 minus RN 1,2,3 all equal 3).',
            '**What if you need to find streaks of at least 3 days?**\nGroup by the difference, calculate `COUNT(*)`, and filter `HAVING COUNT(*) >= 3`.'
        ]
      },
      {
        id: 'sql-21',
        question: 'Calculate the Median salary.',
        concepts: '**The Middle Child**: SQL has AVG() but usually no MEDIAN().',
        answer: 'To find the median, you need to sort the rows and pick the middle one.\n1. `ROW_NUMBER()` sorts them.\n2. `COUNT(*)` gives you the total.\n3. Filter for the row where `RN = (Total + 1) / 2`.',
        example: 'If you have 5 rows, you want row #3. If you have 100, you want #50.5 (Average of 50 and 51).',
        whatIfs: [
            '**What if the total count is Even?**\nYou have two middle numbers. You need to average them: `WHERE rn IN (FLOOR((Total+1)/2), CEIL((Total+1)/2))`.',
            '**What if you want the Median per Department?**\nAdd `PARTITION BY Dept` to both the `ROW_NUMBER` and the `COUNT` window functions.'
        ]
      },
      {
        id: 'sql-22',
        question: 'Relational Division: Find users who bought ALL products.',
        concepts: '**The Checklist**: Does User\'s Checklist == Master Checklist?',
        answer: '1. Count how many total products exist (e.g., 5).\n2. Count how many *distinct* products each user bought.\n3. If `UserCount == TotalCount`, they bought everything.',
        example: 'Finding "Super Users" who have used every feature in the app.',
        whatIfs: [
            '**What if you only want users who bought all "Electronic" products?**\nFilter the Master Checklist (Step 1) to only count Electronics. Filter the User\'s purchases (Step 2) to only count Electronics. Compare.',
            '**What if a user bought the same product twice?**\nCrucial: Use `COUNT(DISTINCT ProductID)` for the user. If you just use `COUNT`, buying the same item 5 times looks like buying 5 items.'
        ]
      },
      {
        id: 'sql-23',
        question: 'Identify anomalies (Sales 50% below average).',
        concepts: '**The Context Switch**: Comparing "Me" to "Everyone Else".',
        answer: 'You need a value (Sales) and a context (Average Sales) in the same row.\nUse `AVG(Sales) OVER()` to put the average on every row. Then simply check `WHERE Sales < 0.5 * Average`.',
        example: 'Detecting credit card fraud where a transaction is much larger/smaller than the user\'s history.',
        whatIfs: [
            '**What if you want to compare to the Median instead of Average?**\n(See the Median question). Median is better for anomalies because Averages are skewed by billionaires/outliers.',
            '**What if you want to flag top 5% highest transactions?**\nUse `NTILE(20)`. The 20th bucket is the top 5%.'
        ]
      },
      {
        id: 'sql-24',
        question: 'Fill missing dates in a report (Data Densification).',
        concepts: '**The Backbone**: Your transaction table has holes. You need a solid spine.',
        answer: 'Standard SQL `GROUP BY Date` only shows dates that exist in the data. To show "Zero Sales" days, you need a "Calendar Table" (or generate one with a Recursive CTE).\n**Logic**: `Left Join` from Calendar (All dates) to Sales. Use `COALESCE(Sales, 0)` to fill the gaps.',
        example: 'Turning a sparse list of sales into a continuous daily chart.',
        whatIfs: [
            '**What if you want to fill the gap with the "Previous Known Value" (Forward Fill) instead of 0?**\nTricky! You use `LAST_VALUE(Sales) IGNORE NULLS OVER (ORDER BY Date)`. This carries the last valid number forward.'
        ]
      },
      {
        id: 'sql-25',
        question: 'Reactivation: Users who purchased this month but NOT in the last 6 months.',
        concepts: '**Set Subtraction**: (Current Users) MINUS (Recent Users).',
        answer: '1. Get the list of users who bought "Now".\n2. Use `NOT EXISTS` or `LEFT JOIN...NULL` to ensure they do NOT appear in the list of users from "Month -1 to Month -6".',
        example: 'Identifying "Resurrected" customers.',
        whatIfs: [
            '**What if you want "New Users" (Never bought before)?**\nCheck if their `MIN(OrderDate)` equals the current month.',
            '**What if you want "Churned Users" (Bought last month, but not this month)?**\nFlip the logic: Select users from Last Month who DO NOT EXIST in This Month.'
        ]
      },
      {
        id: 'sql-26',
        question: 'Calculate Retention Rate (Cohort Analysis).',
        concepts: '**The Class Photo**: Track the "Class of Jan 2023" over time.',
        answer: 'Retention is tracking a specific group (Cohort) over time.\n1. "Stamp" every user with their Join Date (Cohort Month).\n2. For every subsequent month, count how many of *those specific users* showed up.\n3. Divide by the starting count.',
        example: 'Month 0: 100 users. Month 1: 40 returned. Retention = 40%.',
        whatIfs: [
            '**What if a user buys twice in Month 1?**\nUse `COUNT(DISTINCT UserID)`. Retention is about *people*, not *transactions*.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 6: CTES & RECURSION
      // ---------------------------------------------------------
      {
        id: 'sql-27',
        question: 'Why use a CTE (Common Table Expression) over a Subquery?',
        concepts: '**Readability**: Don\'t nest; Build blocks.',
        answer: 'A Subquery is like a run-on sentence. A CTE breaks the logic into paragraphs.\n**Technical Benefit**: You can name a CTE `ActiveUsers` and then query it multiple times in the same statement. You can\'t do that with a subquery.',
        example: '`WITH Sales AS (...), Costs AS (...) SELECT * FROM Sales JOIN Costs` is readable. The subquery version is a mess.',
        whatIfs: [
            '**What if you need to update a table based on a complex selection?**\nYou can actually `UPDATE` a CTE in some databases (like SQL Server/Postgres) if it maps directly to a table.'
        ]
      },
      {
        id: 'sql-28',
        question: 'How does a Recursive CTE work? (e.g., Org Chart).',
        concepts: '**The Loop**: It calls itself until it hits a wall.',
        answer: 'Think of it as a loop.\n1. **Anchor**: Start with the Boss (Who has no manager).\n2. **Recursive Step**: "Find everyone who reports to the people found in Step 1."\n3. **Repeat**: "Find everyone who reports to the people found in Step 2."\n4. Stop when no one is found.',
        example: 'Walking down a folder tree structure in a file system.',
        whatIfs: [
            '**What if the hierarchy is infinite (a loop)?**\nThe query runs forever until it crashes. You should add a limit: `WHERE recursion_depth < 100`.',
            '**What if you want to generate numbers 1 to 100?**\nAnchor: `SELECT 1`. Recursive: `SELECT N+1 FROM CTE WHERE N < 100`. This is a quick way to create mock data.'
        ]
      },
      {
        id: 'sql-29',
        question: 'How do you select every Nth row (Sampling)?',
        concepts: '**Modulo Math**: The Remainder Operator (%).',
        answer: 'The modulo operator `%` gives you the remainder of division.\n- `RowID % 2 = 1` means Odd numbers (Remainder 1).\n- `RowID % 2 = 0` means Even numbers.\n- `RowID % 10 = 0` means every 10th row.',
        example: 'Useful for taking a random sample of a massive dataset for testing.',
        whatIfs: [
            '**What if the IDs are not sequential (gaps)?**\nDo NOT use `ID % 2`. Generate a `ROW_NUMBER()` first, then use modulo on the row number: `rn % 2 = 0`.'
        ]
      },

      // ---------------------------------------------------------
      // LEVEL 7: OPTIMIZATION (Under the Hood)
      // ---------------------------------------------------------
      {
        id: 'sql-30',
        question: 'How do you optimize a slow SQL query?',
        concepts: '**The Detective Work**: Don\'t guess. Look at the plan.',
        answer: '1. **Explain Plan**: Run `EXPLAIN` to see if it\'s doing a "Full Table Scan" (Reading the whole book) or "Index Seek" (Using the cheat sheet).\n2. **SARGable**: Did you hide the data inside a function? (e.g. `WHERE Year(Date) = 2023`). Change it to a Range (`WHERE Date BETWEEN...`) so the Index works.\n3. **Selectivity**: An index is useless if you are selecting 90% of the table (like "Gender"). Indexes work best for needles in haystacks.',
        example: 'Removing a wildcard from the start of a LIKE string (`%ABC` -> `ABC%`) drastically improves speed.',
        whatIfs: [
            '**What if you added an index but the DB refuses to use it?**\nThe DB thinks scanning the table is faster (maybe the table is small, or your filter matches too many rows). Force it using "Index Hints" (rarely needed) or update statistics.'
        ]
      },
      {
        id: 'sql-31',
        question: 'Clustered vs. Non-Clustered Index.',
        concepts: '**The Phone Book vs. The Cheat Sheet**: Physical sorting vs. Logical lookup.',
        answer: '- **Clustered Index**: This **IS** the table. The data is physically stored on the hard drive in this order (usually by ID). You can only have ONE (because you can only sort the physical book one way).\n- **Non-Clustered Index**: This is a separate "Cheat Sheet" or "Appendix" at the back of the book. It lists "Email -> Page Number". You can have MANY of these.',
        example: 'Searching by ID is instant (Clustered). Searching by Email is slow... UNLESS you `CREATE INDEX` on Email (Non-Clustered).',
        whatIfs: [
            '**What if you want a "Covering Index"?**\nAdd the columns you are selecting to the index: `CREATE INDEX idx_name ON Users(Email) INCLUDE (Phone)`. Now the DB never touches the main table, just the index.'
        ]
      },
      {
        id: 'sql-32',
        question: 'Why avoid `SELECT *` in production?',
        concepts: '**The Baggage**: Don\'t carry what you don\'t need.',
        answer: '1. **I/O Traffic**: You are sending useless data over the network.\n2. **Breaking Code**: If someone adds a new column to the DB, your code might crash if it wasn\'t expecting it.\n3. **Covering Index Failure**: If you only needed "ID" and "Name" (which are in the index), `SELECT *` forces the DB to go read the slow physical table to get "Address" and "Phone" too.',
        example: 'Selecting just the columns you need often allows the query to run entirely in Memory (RAM) without touching the Disk.',
        whatIfs: [
            '**What if you are just doing an ad-hoc check?**\nThen `SELECT *` is fine! This rule applies to *Production Application Code*, not your personal debugging.'
        ]
      },
      {
        id: 'sql-33',
        question: 'What is a "SARGable" query?',
        concepts: '**Search ARGument ABLE**: Can the index "see" the value?',
        answer: 'If you wrap a column in a function (e.g., `LEFT(Name, 1) = "A"`), the Index effectively goes blind. It has to open every single row, run the function, and check the result.\n**SARGable** means writing the query so the Index can be used directly (e.g., `Name LIKE "A%"`).',
        example: 'Bad: `WHERE Year(Date) = 2023`.\nGood: `WHERE Date >= "2023-01-01" AND Date < "2024-01-01"`.',
        whatIfs: [
            '**What if you need to search case-insensitive?**\n`LOWER(Name) = "bob"` is NOT SARGable. Use a case-insensitive Collation instead.'
        ]
      },
      {
        id: 'sql-34',
        question: 'DELETE vs TRUNCATE vs DROP.',
        concepts: '**The Undo Button**: Logging vs. Wiping.',
        answer: '- **DELETE**: "Go to row 1, delete. Write in log. Go to row 2, delete. Write in log." (Slow, Safer, Can Rollback).\n- **TRUNCATE**: "Burn the contents of the book." (Instant, Minimal Logging, Cannot usually undo).\n- **DROP**: "Throw the book in the trash." (Table is gone).',
        example: 'Use `TRUNCATE` for refreshing temporary data. Use `DELETE` for removing a specific user.',
        whatIfs: [
            '**What if the table has an Identity (Auto Increment) ID?**\n`DELETE` keeps the counter going (ID 100 -> 101). `TRUNCATE` resets it back to 1.'
        ]
      },
      {
        id: 'sql-35',
        question: 'Daily vs Weekly reporting toggle in one query.',
        concepts: '**Grouping Sets**: Multiple levels of zoom in one go.',
        answer: 'Instead of running two queries (one for Day, one for Week), use `GROUP BY GROUPING SETS ((Day), (Week))`. The database calculates both totals in a single pass over the data, returning rows for daily sums AND rows for weekly sums.',
        example: 'Great for dashboards where the user toggles between "Daily View" and "Weekly View" instantly.',
        whatIfs: [
            '**What if you want a Grand Total row as well?**\nAdd `()` to the sets: `GROUPING SETS ((Day), (Week), ())`.'
        ]
      },
       {
        id: 'sql-36',
        question: 'Why is a query fast in Dev but slow in Prod?',
        concepts: '**Parameter Sniffing**: The engine guessed wrong.',
        answer: 'SQL creates a "Plan" based on the first value it sees. \n- Dev: "Select orders for User A" (User A has 1 order). SQL picks a plan for small data.\n- Prod: "Select orders for Amazon" (Amazon has 1M orders). SQL reuses the small plan, and it crashes/slows down.\nAlso: Prod has more data (Volume) and potentially old statistics.',
        example: 'This is usually fixed by updating statistics or using `OPTION (RECOMPILE)`.',
        whatIfs: [
            '**What if the data volume is the same?**\nCheck "Blocking". Maybe another user is locking the table for an update while you are trying to read it.'
        ]
      },
      {
        id: 'sql-37',
        question: 'Temp Table vs CTE.',
        concepts: '**Persistence**: How long does it live?',
        answer: '- **CTE**: A thought bubble. It exists only for that one statement. It\'s logical.\n- **Temp Table**: A real scratchpad. It is written to disk (TempDB). You can index it. It lives until you close your connection.\n*Rule: Use Temp Tables if you need to process the same data multiple times.*',
        example: 'If you need to calculate a result, then Update it, then Join it... use a Temp Table.',
        whatIfs: [
            '**What if the CTE is very slow?**\nThe DB might be re-running the CTE logic multiple times for every join. Dump the CTE into a Temp Table to "Materialize" it once.'
        ]
      },
      {
        id: 'sql-38',
        question: 'Stored Procedures: Why use them?',
        concepts: '**Security & Reuse**: Lock it down.',
        answer: '1. **Security**: Prevents SQL Injection (hackers). You pass parameters, not raw code.\n2. **Network**: instead of sending 100 lines of SQL text over the network, you send `EXEC Job`.\n3. **Maintenance**: Change the logic in the DB, and you don\'t have to update the App code.',
        example: 'Code: `EXEC GetUser(@ID=5)` is safer than concatenating strings in your app.',
        whatIfs: [
            '**What if you need to return a table to be used in another query?**\nYou cannot select from a Procedure. Use a "Table-Valued Function" instead.'
        ]
      }
    ],
};

export default sqlCategory;
