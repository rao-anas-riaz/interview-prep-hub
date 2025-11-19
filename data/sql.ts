
import { QuestionCategory } from '../types';

const sqlCategory: QuestionCategory = {
    id: 'sql',
    title: 'SQL & Database Concepts',
    icon: 'fa-database',
    description: 'Questions focused on SQL queries, database design, and data manipulation.',
    questions: [
      {
        id: 'sql-1',
        question: 'What is the difference between WHERE and HAVING?',
        concepts: '**WHERE Clause**: Filters rows before any groupings are made.\n**HAVING Clause**: Filters groups after the GROUP BY clause has been applied.',
        answer: 'The key difference is timing:\n- **WHERE** filters individual rows **before** aggregation (`GROUP BY`).\n- **HAVING** filters groups **after** aggregation (`GROUP BY`).\n\nYou cannot use aggregate functions like `COUNT()` in a `WHERE` clause; you must use them in `HAVING`.---CODE_START---sql\n-- Use HAVING to filter on an aggregated count\nSELECT department, COUNT(*)\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 10;\n---CODE_END---',
        example: 'Use `WHERE sale_amount > 100` to find **individual sales** over $100. Use `HAVING SUM(sale_amount) > 5000` to find **departments** whose total sales exceed $5,000.',
      },
       {
        id: 'sql-2',
        question: 'What is the difference between INNER JOIN and LEFT JOIN?',
        concepts: '**INNER JOIN**: Returns records that have **matching values in both tables**.\n**LEFT JOIN** (or LEFT OUTER JOIN): Returns **all records from the left table**, and the matched records from the right table. The result is NULL from the right side if there is no match.',
        answer: 'The difference is how they handle non-matching rows:\n- **INNER JOIN**: Returns only rows where the join key exists in **both** tables.\n- **LEFT JOIN**: Returns **all** rows from the left table. If there is no match in the right table, its columns will be `NULL`.',
        example: 'Joining `Customers` and `Orders`:\n- An **`INNER JOIN`** shows only customers **who have placed an order**.\n- A **`LEFT JOIN`** shows **all customers**, and those who haven\'t ordered will have `NULL` for the order details.',
      },
      {
        id: 'sql-3',
        question: 'Explain the difference between UNION and UNION ALL.',
        concepts: '**UNION**: Combines the result sets of two or more SELECT statements and **removes duplicate rows**.\n**UNION ALL**: Combines the result sets but **includes all rows**, including duplicates.',
        answer: 'Both stack query results, but differ on duplicates and performance:\n- **UNION**: Removes duplicate rows. **Slower** because it needs to check for duplicates.\n- **UNION ALL**: Keeps all rows, including duplicates. **Much faster**.\n\nRule of thumb: **Use `UNION ALL`** unless you specifically need to remove duplicates.',
        example: 'To get a single, **unique list** of customer emails from `ActiveUsers` and `CanceledUsers` tables, use **`UNION`**. To get a **complete log** of all website visits from a `January_Logs` and `February_Logs` table, use **`UNION ALL`**.',
      },
      {
        id: 'sql-4',
        question: 'What are window functions and why are they useful?',
        concepts: '**Window Functions**: A type of SQL function that performs a calculation across a set of table rows that are somehow related to the current row. This is comparable to the type of calculation that can be done with an aggregate function. But unlike regular aggregate functions, use of a window function **does not cause rows to become grouped** into a single output row.',
        answer: 'Window functions perform calculations over a "window" (or set) of rows while **keeping the individual rows intact**. This is their key advantage over `GROUP BY`, which collapses rows.\n\nThey are useful for calculating:\n- **Running totals**\n- **Moving averages**\n- **Rankings within groups** (e.g., top N per category)---CODE_START---sql\n-- Rank employees by salary within each department\nSELECT \n    employee_name, \n    department, \n    salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank\nFROM employees;\n---CODE_END---',
        example: 'You need to find the **top 3 selling products within each product category**. A window function like `RANK() OVER (PARTITION BY category ORDER BY sales DESC)` makes this a simple query, avoiding complex self-joins.',
      },
      {
        id: 'sql-5',
        question: 'What are Common Table Expressions (CTEs) and why should you use them?',
        concepts: '**CTE (Common Table Expression)**: A temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. CTEs are defined using the `WITH` clause.',
        answer: 'CTEs make complex queries **more readable and organized**. They act like temporary, single-query tables.\n\n**Key Benefits**:\n- **Readability**: Breaks down a long query into logical, readable blocks.\n- **Recursion**: Allows for recursive queries, which are useful for hierarchical data (e.g., org charts).\n- **Reusability**: You can reference the same CTE multiple times within a single query.---CODE_START---sql\n-- Using a CTE to find average department salary\nWITH DepartmentSales AS (\n  SELECT department, SUM(sales) as total_sales\n  FROM sales_data\n  GROUP BY department\n)\nSELECT AVG(total_sales) FROM DepartmentSales;\n---CODE_END---',
        example: 'Instead of nesting a subquery to calculate regional sales totals before finding the average, you can define a `RegionalSales` **CTE**. The main query then becomes a simple `SELECT AVG(total_sales) FROM RegionalSales`, which is much cleaner.',
      },
       {
        id: 'sql-6',
        question: 'Given an Employee table with `id`, `name`, `salary`, and `managerId`, write a query to find employees who earn more than their managers.',
        concepts: '**Self-Join**: A regular join, but the table is joined with itself. This is useful for querying hierarchical data or comparing rows within the same table.',
        answer: 'To solve this, you need to join the `Employee` table to itself. You can alias one instance as the "employee" and the other as the "manager".\n1.  **Join Condition**: The key is to link the employee\'s `managerId` to the manager\'s `id` (`e.managerId = m.id`).\n2.  **Filter Condition**: After joining, you filter the results to keep only rows where the employee\'s salary is greater than the manager\'s salary (`e.salary > m.salary`).---CODE_START---sql\nSELECT e.Name AS Employee\nFROM Employee e\nJOIN Employee m ON e.ManagerId = m.Id\nWHERE e.Salary > m.Salary;\n---CODE_END---',
        example: 'If employee "Joe" has a salary of $70k and his manager "Sam" has an ID that matches Joe\'s managerId and a salary of $60k, this query would return "Joe" in the results.'
      },
      {
        id: 'sql-7',
        question: 'How do you find duplicate emails in a customer table?',
        concepts: '**GROUP BY, HAVING, COUNT()**. These clauses are used together to group data by a specific column and then filter those groups based on an aggregate condition.',
        answer: 'The standard method is to group by the email column and filter for groups with a count greater than one.\n1. **`GROUP BY email`**\n2. **`HAVING COUNT(email) > 1`**---CODE_START---sql\nSELECT email, COUNT(email)\nFROM customers\nGROUP BY email\nHAVING COUNT(email) > 1;\n---CODE_END---',
        example: 'A marketing team runs this query to clean its customer list, ensuring they don\'t send multiple promotional emails to the same person and can merge duplicate records.',
      },
      {
        id: 'sql-8',
        question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
        concepts: '**DELETE**: A DML (Data Manipulation Language) command that removes rows from a table based on a WHERE clause.\n**TRUNCATE**: A DDL (Data Definition Language) command that removes all rows from a table quickly.\n**DROP**: A DDL command that removes an entire database object (like a table) completely.',
        answer: 'They remove data at different levels:\n- **DELETE**: Removes **specific rows** using a `WHERE` clause. It is slow but can be **rolled back**.\n- **TRUNCATE**: Removes **all rows** from a table. It is very fast and **cannot be rolled back**.\n- **DROP**: Removes the **entire table**, including its structure. The table will no longer exist.',
        example: '- Use **`DELETE`** to remove a single inactive user.\n- Use **`TRUNCATE`** to clear a temporary staging table before a nightly data load.\n- Use **`DROP`** to remove an old, archived table that is no longer needed.',
      },
      {
        id: 'sql-9',
        question: 'How do you find the Monthly Retention Rate of Users?',
        concepts: '**User Retention**: A key metric that measures how many users return to a product over time.\n**SQL Concepts**: `LEFT JOIN`, `DATE functions` (e.g., `DATE_TRUNC` or `FORMAT_DATE`), `COUNT(DISTINCT)`, `GROUP BY`.',
        answer: 'The approach is to identify each user\'s signup month, then check if they had any activity in the following month.\n1. Create a CTE to get each user\'s signup month.\n2. Create another CTE for user activity per month from the `Logins` table.\n3. `LEFT JOIN` the signup cohort to the activity table on `user_id`.\n4. For each signup cohort, count the total users and the number of users who returned the next month.---CODE_START---sql\nWITH user_monthly_activity AS (\n    SELECT DISTINCT\n        user_id,\n        STRFTIME(\'%Y-%m\', login_date) AS activity_month\n    FROM Logins\n),\ncohorts AS (\n    SELECT \n        user_id,\n        STRFTIME(\'%Y-%m\', signup_date) AS cohort_month\n    FROM Users\n)\nSELECT\n    c.cohort_month,\n    COUNT(DISTINCT c.user_id) AS total_users,\n    COUNT(DISTINCT CASE \n        WHEN a.activity_month = STRFTIME(\'%Y-%m\', DATE(c.cohort_month || \'-01\', \'+1 month\')) \n        THEN c.user_id \n    END) AS retained_users\nFROM cohorts c\nLEFT JOIN user_monthly_activity a ON c.user_id = a.user_id\nGROUP BY 1\nORDER BY 1;\n---CODE_END---',
        example: 'A SaaS company uses this query to measure product stickiness. A high retention rate indicates that users find long-term value in the service.',
      },
      {
        id: 'sql-10',
        question: 'How do you identify products frequently bought together?',
        concepts: '**Market Basket Analysis**: A data mining technique used to discover co-occurrence relationships among activities performed by specific individuals or groups.\n**SQL Concepts**: `Self-JOIN`, `GROUP BY`, `COUNT`, `HAVING`.',
        answer: 'The goal is to find pairs of products that appear in the same order. You can do this by joining the `Order_Items` table to itself.\n1. `Self-JOIN` the `Order_Items` table on `order_id`.\n2. Add a condition `oi1.product_id < oi2.product_id` to avoid duplicate pairs (A,B) and (B,A) and self-pairs (A,A).\n3. `GROUP BY` the product pair and `COUNT` the number of orders they appear in together.\n4. Filter using `HAVING` to find pairs that meet a certain frequency threshold.---CODE_START---sql\nSELECT\n    oi1.product_id AS product_A,\n    oi2.product_id AS product_B,\n    COUNT(oi1.order_id) AS frequency\nFROM Order_Items oi1\nJOIN Order_Items oi2 ON oi1.order_id = oi2.order_id\nWHERE oi1.product_id < oi2.product_id\nGROUP BY 1, 2\nORDER BY 3 DESC\nLIMIT 10;\n---CODE_END---',
        example: 'An e-commerce site like Amazon uses this logic for its "Frequently bought together" feature to increase the average order value.',
      },
      {
        id: 'sql-11',
        question: 'How do you find the 2nd Highest Salary in Each Department?',
        concepts: '**Ranking per Group**: A common analytical task to find top N items within specific categories.\n**SQL Concepts**: `Window Function`, `DENSE_RANK()`, `PARTITION BY`, `CTE`.',
        answer: 'This is a perfect use case for a window function. `GROUP BY` would not work as it would collapse the employee rows.\n1. Use the `DENSE_RANK()` window function to assign a rank to each employee based on salary.\n2. Use `PARTITION BY department_id` to make the ranking restart for each department.\n3. Wrap this logic in a CTE.\n4. Select from the CTE where the rank is 2. `DENSE_RANK()` is used instead of `RANK()` to handle ties correctly.---CODE_START---sql\nWITH RankedSalaries AS (\n    SELECT\n        employee_id,\n        department_id,\n        salary,\n        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as salary_rank\n    FROM Employees\n)\nSELECT\n    department_id,\n    salary\nFROM RankedSalaries\nWHERE salary_rank = 2;\n---CODE_END---',
        example: 'An HR department uses this query to analyze compensation structures and ensure fair pay distribution across different teams.',
      },
      {
        id: 'sql-12',
        question: 'How do you calculate the Rolling 7-Day Average of Daily Sales?',
        concepts: '**Time-Series Analysis**: Analyzing data points collected over a period of time. Rolling averages are used to smooth out short-term fluctuations and highlight longer-term trends.\n**SQL Concepts**: `Window Function`, `AVG()`, `ROWS BETWEEN`, `ORDER BY`.',
        answer: 'A window function is the most efficient way to compute rolling averages.\n1. First, aggregate sales by date to get total daily sales.\n2. Use the `AVG()` window function over the daily sales.\n3. Define the "window" using `ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`. This tells SQL to average the current day\'s sales with the previous 6 days.---CODE_START---sql\nWITH DailySales AS (\n    SELECT\n        date,\n        SUM(total_amount) as daily_sales\n    FROM Sales\n    GROUP BY 1\n)\nSELECT\n    date,\n    daily_sales,\n    AVG(daily_sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as rolling_7_day_avg\nFROM DailySales;\n---CODE_END---',
        example: 'A retail company tracks the rolling 7-day average to monitor sales trends without overreacting to daily noise (e.g., a slow Tuesday).',
      },
      {
        id: 'sql-13',
        question: 'How do you find the Longest Streak of Daily Logins for Each User?',
        concepts: '**Gaps and Islands Problem**: A type of SQL problem that involves finding consecutive sequences (islands) of data, separated by gaps.\n**SQL Concepts**: `Window Functions`, `ROW_NUMBER()`, `DATE functions`, `GROUP BY`.',
        answer: 'This is a classic "gaps and islands" problem. The trick is to create a grouping ID for each consecutive streak.\n1. Get distinct daily logins per user.\n2. Use `ROW_NUMBER()` to create two sequential counters: one over all login dates, and another partitioned by user.\n3. The difference between these two row numbers will be constant for any consecutive streak of dates. This difference serves as the `streak_id`.\n4. Group by `user_id` and `streak_id` to find the length of each streak.\n5. Select the maximum streak length per user.---CODE_START---sql\nWITH daily_logins AS (\n    SELECT DISTINCT user_id, DATE(login_date) as login_day FROM User_Logins\n),\nranked_logins AS (\n    SELECT\n        user_id,\n        login_day,\n        (login_day - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_day)) as streak_id\n    FROM daily_logins\n)\nSELECT\n    user_id,\n    MAX(streak_count) as longest_streak\nFROM (\n    SELECT user_id, streak_id, COUNT(*) as streak_count\n    FROM ranked_logins\n    GROUP BY user_id, streak_id\n) as streaks\nGROUP BY user_id;\n---CODE_END---',
        example: 'A gaming or social media app uses this metric to identify and reward its most highly engaged users, encouraging daily activity.',
      },
      {
        id: 'sql-14',
        question: 'How do you identify Products with Zero Sales in the Last 30 Days?',
        concepts: '**Data Reconciliation**: Finding items in one list that are missing from another.\n**SQL Concepts**: `LEFT JOIN`, `WHERE IS NULL`, `Date Filtering`.',
        answer: 'The key is to use a `LEFT JOIN` from the `Products` table to the `Sales` table.\n1. `LEFT JOIN` `Products` (left table) to `Sales` (right table) on `product_id`.\n2. Filter the `Sales` data to include only sales within the last 30 days *before* the join.\n3. A product with no sales in that period will have `NULL` values for all columns from the `Sales` table.\n4. Filter for rows where a key column from the `Sales` table `IS NULL`.---CODE_START---sql\nSELECT p.product_id\nFROM Products p\nLEFT JOIN Sales s ON p.product_id = s.product_id\n    AND s.sale_date >= DATE(\'now\', \'-30 days\')\nWHERE s.sale_id IS NULL;\n---CODE_END---',
        example: 'An inventory manager runs this query to identify slow-moving or obsolete stock that may need to be discounted or removed from the catalog.',
      },
      {
        id: 'sql-15',
        question: 'How do you list Customers Who Made Purchases Every Month for the Last 6 Months?',
        concepts: '**Loyalty Analysis**: Identifying consistent and valuable customers.\n**SQL Concepts**: `GROUP BY`, `HAVING`, `COUNT(DISTINCT)`, `Date functions`.',
        answer: 'This query checks for consistent purchasing behavior over a specific period.\n1. Filter the `Orders` table to include only orders from the last 6 months.\n2. `GROUP BY customer_id`.\n3. Use a `HAVING` clause with `COUNT(DISTINCT ...)` on the month of the `order_date`.\n4. If the distinct count of months is 6, the customer has purchased every month in that period.---CODE_START---sql\nSELECT customer_id\nFROM Orders\nWHERE order_date >= DATE(\'now\', \'-6 months\')\nGROUP BY customer_id\nHAVING COUNT(DISTINCT STRFTIME(\'%Y-%m\', order_date)) = 6;\n---CODE_END---',
        example: 'A subscription-based business might use this to identify highly loyal customers for a special rewards program or feedback session.',
      },
      {
        id: 'sql-16',
        question: 'How do you calculate Conversion Rate from Signup to First Purchase?',
        concepts: '**Funnel Analysis**: A method to understand the steps required to reach a goal, used to see how many users continue from one step to the next.\n**SQL Concepts**: `LEFT JOIN`, `COUNT`, `Conditional Aggregation (CASE WHEN)`, `Casting`.',
        answer: 'The conversion rate is the number of users who made a purchase divided by the total number of users who signed up.\n1. `LEFT JOIN` the `Users` table to the `Orders` table on `user_id`.\n2. The join should find the *first* purchase, which can be done by grouping orders by user and taking the `MIN(order_date)`.\n3. Count the total number of users (from the left table) and the total number of users with a non-null order date (from the right table).\n4. Divide the counts and cast to a float to get the percentage.---CODE_START---sql\nWITH first_purchase AS (\n    SELECT user_id, MIN(order_date) as first_purchase_date\n    FROM Orders\n    GROUP BY user_id\n)\nSELECT\n    CAST(COUNT(DISTINCT fp.user_id) AS REAL) * 100 / COUNT(DISTINCT u.user_id) AS conversion_rate\nFROM Users u\nLEFT JOIN first_purchase fp ON u.user_id = fp.user_id\n    AND fp.first_purchase_date >= u.signup_date;\n---CODE_END---',
        example: 'A marketing team tracks this KPI to measure the effectiveness of its user onboarding process and initial product experience.',
      },
      {
        id: 'sql-17',
        question: 'How do you find Orders Where the Total Quantity Exceeds 100 Units?',
        concepts: '**Order Analysis**: Aggregating item-level data to the order level to find specific types of transactions.\n**SQL Concepts**: `GROUP BY`, `SUM`, `HAVING`.',
        answer: 'This is a straightforward aggregation problem using `GROUP BY` and `HAVING`.\n1. `GROUP BY order_id` to aggregate all items within each order.\n2. Use `SUM(quantity)` to calculate the total number of units for each order.\n3. Use a `HAVING` clause to filter these groups, keeping only those where the sum is greater than 100.---CODE_START---sql\nSELECT\n    order_id,\n    SUM(quantity) AS total_quantity\nFROM Order_Details\nGROUP BY order_id\nHAVING SUM(quantity) > 100;\n---CODE_END---',
        example: 'A warehouse logistics team uses this query to identify large, bulk orders that may require special packaging or freight shipping arrangements.',
      },
       {
        id: 'sql-18',
        question: 'How would you increase the salary of all employees in the IT department by 10%?',
        concepts: '**DML (Data Manipulation Language)**, `UPDATE` statement, `WHERE` clause.',
        answer: 'This task requires an `UPDATE` statement to modify existing records in a table.\n1.  **`UPDATE employees`**: Specify the table you want to change.\n2.  **`SET salary = salary * 1.10`**: Define the column to modify and the new value. Here, we increase the current salary by 10%.\n3.  **`WHERE department = \'IT\'`**: This is a crucial step to limit the update to only the employees in the IT department. Without a `WHERE` clause, you would update the salary for **all** employees in the table.',
        example: '---CODE_START---sql\nUPDATE employees\nSET salary = salary * 1.10\nWHERE department = \'IT\';\n---CODE_END---'
      },
      {
        id: 'sql-19',
        question: 'Write a query to find all numbers that appear at least three times consecutively.',
        concepts: '**Window Functions**, `LAG`, `LEAD`, Consecutive Sequences.',
        answer: 'This problem can be solved efficiently using window functions like `LAG` or `LEAD` to check preceding or succeeding rows.\n1.  Use a CTE to access the value of the previous row (`LAG(Num, 1)`) and the row before that (`LAG(Num, 2)`).\n2.  The `OVER (ORDER BY Id)` clause ensures the rows are processed in the correct sequence.\n3.  In the outer query, select the numbers where the current `Num` is equal to both of the preceding numbers.---CODE_START---sql\nWITH ConsecutiveNums AS (\n    SELECT\n        Num,\n        LAG(Num, 1) OVER (ORDER BY Id) as PrevNum1,\n        LAG(Num, 2) OVER (ORDER BY Id) as PrevNum2\n    FROM Logs\n)\nSELECT DISTINCT Num\nFROM ConsecutiveNums\nWHERE Num = PrevNum1 AND Num = PrevNum2;\n---CODE_END---',
        example: 'Given a `Logs` table with consecutive IDs and numbers, if rows with IDs 3, 4, and 5 all have the number `7`, this query will identify `7` as a number that appeared three times consecutively.'
      },
      {
        id: 'sql-20',
        question: 'What are the most common types of SQL JOINs?',
        concepts: '**INNER JOIN**, **LEFT JOIN**, **RIGHT JOIN**, **FULL OUTER JOIN**. These are fundamental operations for combining data from multiple relational tables.',
        answer: 'There are four primary types of joins used to combine rows from two or more tables:\n- **`INNER JOIN`**: This is the most frequently used join. It returns only the rows where the join condition is met in **both** tables.\n- **`LEFT JOIN` (or LEFT OUTER JOIN)**: Returns **all** rows from the left table, and the matched rows from the right table. If there is no match in the right table for a row in the left table, the result is `NULL` on the right side. This is useful for finding items in one table that may not have a corresponding entry in another.\n- **`RIGHT JOIN` (or RIGHT OUTER JOIN)**: The reverse of a `LEFT JOIN`. It returns **all** rows from the right table and matched rows from the left. It\'s less common because you can almost always rewrite it as a `LEFT JOIN`.\n- **`FULL OUTER JOIN`**: Returns all rows when there is a match in either the left or the right table. It effectively combines the results of both `LEFT` and `RIGHT` joins. It is used when you need a complete picture of all records from both tables, regardless of matches.',
        example: 'Given a `Customers` table and an `Orders` table:\n- An `INNER JOIN` returns customers who have placed an order.\n- A `LEFT JOIN` returns all customers, with order details being `NULL` for those who have never ordered.'
      },
      {
        id: 'sql-21',
        question: 'What are CROSS JOIN and SELF JOIN, and what are their use cases?',
        concepts: '**CROSS JOIN**, **Cartesian Product**, **SELF JOIN**, **Hierarchical Data**.',
        answer: 'These are two specialized types of joins:\n- **`SELF JOIN`**: A regular join where a table is joined with itself. This requires using table aliases to distinguish between the two instances of the table. **Use Case**: Querying hierarchical data (e.g., finding an employee\'s manager when both are in the same `Employees` table) or comparing rows within the same table.\n- **`CROSS JOIN`**: Returns the **Cartesian product** of the two tables. Every row from the first table is combined with every row from the second table. It does not have an `ON` clause. **Use Case**: Generating all possible combinations of items. For example, creating a list of every possible product variation by joining a `T-Shirts` table with a `Colors` table.',
        example: 'A `SELF JOIN` is used in the classic problem of finding employees who earn more than their managers. A `CROSS JOIN` would be used by a clothing retailer to generate a master list of all available t-shirt sizes (`S`, `M`, `L`) for every color (`Red`, `Blue`, `Green`) they sell.'
      },
      {
        id: 'sql-22',
        question: 'Write a query to select all records from a table while excluding weekends.',
        concepts: '**Date Functions**, **`DAYOFWEEK`**, **`WEEKDAY`**, **`WHERE` Clause**. The exact function varies between SQL dialects.',
        answer: 'To exclude weekends, you need to use a date function that can identify the day of the week for a given date, and then filter on that result in the `WHERE` clause. The specific function depends on the SQL dialect:\n- **PostgreSQL**: `EXTRACT(ISODOW FROM your_date_column) NOT IN (6, 7)` (Monday=1, Sunday=7)\n- **SQL Server**: `DATEPART(weekday, your_date_column) NOT IN (1, 7)` (Sunday=1, Saturday=7)\n- **MySQL**: `DAYOFWEEK(your_date_column) NOT IN (1, 7)` (Sunday=1, Saturday=7)\n- **SQLite**: `strftime(\'%w\', your_date_column) NOT IN (\'0\', \'6\')` (Sunday=0, Saturday=6)',
        example: '---CODE_START---sql\n-- This example uses the SQLite strftime function, which is common.\nSELECT\n    *\nFROM sales_log\nWHERE \n    strftime(\'%w\', sale_date) NOT IN (\'0\', \'6\');\n---CODE_END---'
      },
      {
        id: 'sql-23',
        question: 'What is the difference between a CTE and a Subquery?',
        concepts: '**CTE (Common Table Expression)**, **Subquery (or Derived Table)**, **Readability**, **Recursion**.',
        answer: 'Both are used to create temporary result sets, but they have key differences in structure and capability:\n- **Subquery**: A query nested inside another query (`SELECT`, `FROM`, `WHERE`, etc.). They can make the main query difficult to read if there are multiple levels of nesting.\n- **CTE**: A named, temporary result set defined using a `WITH` clause at the beginning of a query.\n\n**Key Differences**:\n- **Readability**: CTEs are much more readable. They break a complex query into logical, sequential steps, making it easier to understand and debug.\n- **Reusability**: A CTE can be referenced multiple times within a single query. A subquery must be rewritten each time it is needed.\n- **Recursion**: CTEs can be recursive (refer to themselves), which is essential for querying hierarchical data like org charts. Subqueries cannot be recursive.',
        example: 'A query to find departments with total sales above the company average is much cleaner with a CTE to first calculate department totals, and then a simple main query to perform the final filter. Doing this with nested subqueries would be harder to follow.'
      },
      {
        id: 'sql-24',
        question: 'What are some common ways to optimize a SQL query?',
        concepts: '**Indexing**, **Query Execution Plan**, **`SELECT *`**, **SARGable Queries**, **JOINs**.',
        answer: 'Query optimization is about helping the database engine find the most efficient way to retrieve your data:\n1.  **Ensure Proper Indexing**: This is the most critical step. Add indexes to columns frequently used in `WHERE` clauses, `JOIN` conditions, and `ORDER BY` clauses.\n2.  **Analyze the Execution Plan**: Use `EXPLAIN` (or `EXPLAIN ANALYZE`) to see how the database is executing your query. Look for full table scans on large tables, as this is a major performance bottleneck.\n3.  **Avoid `SELECT *`**: Only select the columns you actually need. This reduces the amount of data transferred from the database to the client.\n4.  **Write SARGable Queries**: Make your `WHERE` clauses "Searchable". This means avoiding functions on indexed columns. For example, `WHERE YEAR(order_date) = 2023` prevents the use of an index on `order_date`, while `WHERE order_date >= \'2023-01-01\' AND order_date < \'2024-01-01\'` allows the index to be used.',
        example: '---CODE_START---sql\n-- BAD (Non-SARGable): Cannot use an index on order_date\nSELECT * FROM orders WHERE YEAR(order_date) = 2023;\n\n-- GOOD (SARGable): Can use an index on order_date\nSELECT order_id, amount FROM orders WHERE order_date >= \'2023-01-01\' AND order_date < \'2024-01-01\';\n---CODE_END---'
      },
      {
        id: 'sql-25',
        question: 'How do you pivot data in SQL, converting rows into columns?',
        concepts: '**Pivoting**, **Conditional Aggregation**, **`CASE WHEN`**, **`PIVOT` Operator**.',
        answer: 'Pivoting transforms data from a "long" format to a "wide" format by turning unique row values from one column into multiple new columns.\n\nThe most universal method, which works across all SQL dialects, is **conditional aggregation**:\n1.  **Use an aggregate function** like `SUM()`, `MAX()`, or `COUNT()`.\n2.  Inside the aggregate function, use a `CASE WHEN` statement to check for the value you want to turn into a column. If it matches, return the value to be aggregated; otherwise, return `NULL` or `0`.\n3.  `GROUP BY` the column(s) that will remain as your rows.\n\nSome databases like SQL Server have a specific `PIVOT` operator, but the conditional aggregation approach is more portable.',
        example: '---CODE_START---sql\n-- Pivot a sales table to show total sales for each year as a separate column\nSELECT\n    product_id,\n    SUM(CASE WHEN sale_year = 2022 THEN amount ELSE 0 END) AS sales_2022,\n    SUM(CASE WHEN sale_year = 2023 THEN amount ELSE 0 END) AS sales_2023\nFROM sales\nGROUP BY product_id;\n---CODE_END---'
      },
      {
        id: 'sql-26',
        question: 'How would you design a query to compile a daily report of 10 different KPIs from multiple tables?',
        concepts: '**Data Modeling**, **ETL**, **CTEs**, **JOINs**, **Aggregation**.',
        answer: 'This is a common reporting task that requires an organized approach to avoid a messy, unreadable query. The best strategy is to use Common Table Expressions (CTEs).\n1.  **Create One CTE per KPI**: Isolate the logic for each KPI. Write a separate, self-contained CTE that calculates one metric and aggregates it by date. For example, `WITH DailySignups AS (...)`, `WITH DailyRevenue AS (...)`, etc.\n2.  **Join the CTEs**: In the final `SELECT` statement, join all the individual KPI CTEs together. It is crucial to use a `LEFT JOIN` and start from a calendar table or the most fundamental KPI (like active users). This ensures that if one KPI has no data for a specific day, you still get a row for that day with a `NULL` or `0` for that metric.\n3.  **Materialize the Results**: For performance, a complex query like this should not be run ad-hoc by business users. It should be part of a daily scheduled job (ETL/ELT) that runs the query and saves the results into a final, clean reporting table.',
        example: '---CODE_START---sql\nWITH daily_signups AS (\n    SELECT signup_date, COUNT(user_id) as new_users\n    FROM users GROUP BY 1\n),\ndaily_revenue AS (\n    SELECT order_date, SUM(amount) as total_revenue\n    FROM orders GROUP BY 1\n)\nSELECT\n    ds.signup_date as report_date,\n    ds.new_users,\n    dr.total_revenue\nFROM daily_signups ds\nLEFT JOIN daily_revenue dr ON ds.signup_date = dr.order_date;\n---CODE_END---'
      },
      {
        id: 'sql-27',
        question: 'Write a SQL query to find employees earning more than the average salary in their department.',
        concepts: '**Correlated Subquery**, **Window Functions**, **CTEs**. This tests the ability to perform calculations within groups.',
        answer: 'There are two common and efficient ways to solve this: using a Common Table Expression (CTE) with a window function, or using a correlated subquery.\n\nThe CTE and window function approach is often more readable and performant.\n1.  **Create a CTE**: Calculate the average salary for each department using the `AVG() OVER (PARTITION BY ...)` window function. This calculates the average but keeps all original rows intact.\n2.  **Select from the CTE**: Filter the results where the individual\'s salary is greater than the calculated department average.',
        example: '---CODE_START---sql\n-- Using a CTE and Window Function (more modern and often faster)\nWITH DeptAvgSalary AS (\n    SELECT\n        Name,\n        Salary,\n        DepartmentId,\n        AVG(Salary) OVER (PARTITION BY DepartmentId) as AvgDeptSalary\n    FROM Employee\n)\nSELECT\n    e.Name AS EmployeeName,\n    d.Name AS DepartmentName,\n    e.Salary\nFROM Employee e\nJOIN Department d ON e.DepartmentId = d.Id\nWHERE e.Salary > (\n    SELECT AVG(Salary) \n    FROM Employee \n    WHERE DepartmentId = e.DepartmentId\n);\n---CODE_END---'
      },
      {
        id: 'sql-28',
        question: 'Find Top Sale Region-wise (Quarterly – 2023).',
        concepts: '**Aggregation**, **Window Functions**, **Date Extraction**.\n**Goal**: Identify the best performing region in each quarter.',
        answer: 'To solve this, you need to:\n1.  Extract the Quarter from the `sale_date`.\n2.  Group by Quarter and Region to get total sales.\n3.  Use `RANK()` or `ROW_NUMBER()` to rank regions within each quarter.\n4.  Filter for the top rank.',
        example: '---CODE_START---sql\nWITH QuarterlySales AS (\n    SELECT \n        region,\n        EXTRACT(QUARTER FROM sale_date) as sale_quarter,\n        SUM(amount) as total_amount\n    FROM Sales\n    WHERE EXTRACT(YEAR FROM sale_date) = 2023\n    GROUP BY 1, 2\n),\nRankedSales AS (\n    SELECT\n        region,\n        sale_quarter,\n        total_amount,\n        RANK() OVER(PARTITION BY sale_quarter ORDER BY total_amount DESC) as rnk\n    FROM QuarterlySales\n)\nSELECT * \nFROM RankedSales \nWHERE rnk = 1;\n---CODE_END---'
      },
      {
        id: 'sql-29',
        question: 'Explain DENSE_RANK() and PARTITION BY with simple examples.',
        concepts: '**Window Functions**: Functions that perform calculations across a set of table rows that are related to the current row.\n**Ranking**: Assigning a rank to each row within a partition.',
        answer: 'These are window function components:\n- **`PARTITION BY`**: Divides the result set into partitions (groups) where the window function is applied independently. It\'s like a "GROUP BY" but doesn\'t collapse rows.\n- **`DENSE_RANK()`**: Assigns a rank to each row. If two rows have the same value, they get the same rank. The next rank is *consecutive* (no gaps). Compare this to `RANK()`, which leaves gaps (1, 1, 3).',
        example: 'Imagine a race with a tie for 1st place.\n- **RANK()**: 1st, 1st, 3rd.\n- **DENSE_RANK()**: 1st, 1st, 2nd.\n\n---CODE_START---sql\nSELECT \n    Name, \n    Department,\n    Salary,\n    DENSE_RANK() OVER(PARTITION BY Department ORDER BY Salary DESC) as Rank\nFROM Employees;\n---CODE_END---\nThis assigns a rank to employees based on salary, restarting the ranking (1, 2, 3...) for each new Department.'
      },
      {
        id: 'sql-30',
        question: 'Write a SQL query to find the third highest salary from an employee table with the following columns: EID, ESalary.',
        concepts: '**OFFSET**, **LIMIT**, **Window Functions**, **Subqueries**. Retrieving the N-th highest value.',
        answer: 'There are a few standard ways to do this. The most modern and portable method is using `LIMIT` and `OFFSET` (PostgreSQL/MySQL) or `OFFSET FETCH` (SQL Server).\n\n**Method 1: LIMIT/OFFSET (MySQL/PostgreSQL)**\nSort by salary descending, skip the first 2, take the next 1.\n`SELECT ESalary FROM Employee ORDER BY ESalary DESC LIMIT 1 OFFSET 2;`\n\n**Method 2: Window Function (Universal)**\nUse `DENSE_RANK()` to handle potential ties (e.g., if two people share the 2nd highest salary).\n`WITH RankedSalaries AS (`\n`  SELECT ESalary, DENSE_RANK() OVER (ORDER BY ESalary DESC) as rnk`\n`  FROM Employee`\n`)`\n`SELECT ESalary FROM RankedSalaries WHERE rnk = 3;`',
        example: 'If salaries are [100, 90, 80, 70], `OFFSET 2` skips 100 and 90, returning 80.'
      },
      {
        id: 'sql-31',
        question: 'Create a SQL procedure using ESalary as a parameter that selects all EIDs from the Employee table where ESalary is less than 50,000.',
        concepts: '**Stored Procedures**, **Parameters**, **WHERE Clause**. Encapsulating logic in the database.',
        answer: 'A stored procedure allows you to save a query on the database server and run it with different parameters.\n\n**SQL Server / Generic Syntax**:\n---CODE_START---sql\nCREATE PROCEDURE GetLowSalaryEmployees\n    @SalaryThreshold DECIMAL(10,2)\nAS\nBEGIN\n    SELECT EID\n    FROM Employee\n    WHERE ESalary < @SalaryThreshold;\nEND;\n---CODE_END---\n\nYou would execute it like this: `EXEC GetLowSalaryEmployees @SalaryThreshold = 50000;`',
        example: 'This procedure makes the "low salary" definition reusable. If management decides the threshold is now 60,000, you just pass a different parameter value instead of rewriting queries.'
      },
      {
        id: 'sql-32',
        question: 'For the Employee table (EID, ESalary), retrieve all EIDs with odd salaries and join this with another table, empdetails (EID, EDOB), to obtain EDOB.',
        concepts: '**JOIN**, **Modulo Operator (%)**, **Filtering**. Combining filtering logic with joins.',
        answer: 'This query requires two steps: filtering for odd numbers and joining to details.\n\n1.  **Filter Odd Salaries**: Use the modulo operator `%`. `ESalary % 2 <> 0` (or `ESalary % 2 = 1`) identifies odd numbers.\n2.  **Join**: Perform an `INNER JOIN` on the common column `EID`.\n\n---CODE_START---sql\nSELECT \n    e.EID, \n    d.EDOB\nFROM Employee e\nJOIN empdetails d ON e.EID = d.EID\nWHERE e.ESalary % 2 <> 0;\n---CODE_END---',
        example: 'If Employee 101 has a salary of 50001 (odd) and exists in `empdetails`, this query returns their ID and Date of Birth.'
      },
      {
        id: 'sql-33',
        question: 'How would you use the LEAD or LAG function in SQL to compare week-over-week data?',
        concepts: '**Window Functions**, **LAG**, **LEAD**, **Time Series Analysis**. Comparing current rows with previous/next rows.',
        answer: '`LAG` allows you to access data from a previous row, and `LEAD` from a subsequent row, without a self-join. This is perfect for comparing consecutive time periods.\n\nTo compare Week-over-Week (WoW):\n1.  **LAG(Sales, 1)**: Retrieve the sales from the previous row (week).\n2.  **Calculate Growth**: `(CurrentSales - PreviousSales) / PreviousSales`.\n\n---CODE_START---sql\nSELECT \n    WeekNumber,\n    Sales,\n    LAG(Sales, 1) OVER (ORDER BY WeekNumber) as PreviousWeekSales,\n    (Sales - LAG(Sales, 1) OVER (ORDER BY WeekNumber)) as SalesDiff\nFROM WeeklySales;\n---CODE_END---',
        example: 'If Week 1 Sales = 100 and Week 2 Sales = 110, `LAG` returns 100 for the Week 2 row. The difference is 10.'
      },
      {
        id: 'sql-34',
        question: 'You have two tables: Customers and Transactions. How would you find active customers who made purchases in the last month?',
        concepts: '**INNER JOIN**, **Date Filtering**, **DISTINCT**. Joining tables to filter based on activity.',
        answer: 'You need to join the tables and filter the transactions based on the date.\n1. Perform an `INNER JOIN` between `Customers` and `Transactions` on the customer ID. An inner join automatically filters out customers who have never made a transaction.\n2. Add a `WHERE` clause to filter for transactions that occurred within the last month.\n3. Use `DISTINCT` on the customer ID or Name, as a customer might have made multiple purchases, but you want a unique list of customers.',
        example: '---CODE_START---sql\nSELECT DISTINCT c.CustomerName\nFROM Customers c\nJOIN Transactions t ON c.CustomerID = t.CustomerID\nWHERE t.TransactionDate >= DATEADD(month, -1, GETDATE());\n---CODE_END---'
      },
      {
        id: 'sql-35',
        question: 'You need to generate a daily sales report that excludes weekends and public holidays. How would you handle that?',
        concepts: '**Calendar Table (Date Dimension)**, **LEFT JOIN**, **Filtering**. Handling complex date logic.',
        answer: 'Using functions like `DATEPART` or `WEEKDAY` handles weekends but fails for public holidays, which vary by year and region. The best practice is to use a **Calendar Table** (or Date Dimension).\n\n1.  **Create a Calendar Table**: This table has a row for every date and columns like `IsWeekend`, `IsHoliday`, `HolidayName`.\n2.  **Join**: Join your sales data to this table on the date column.\n3.  **Filter**: Simply filter where `IsWeekend = 0` and `IsHoliday = 0`.',
        example: '---CODE_START---sql\nSELECT s.SaleDate, SUM(s.Amount)\nFROM Sales s\nJOIN DimDate d ON s.SaleDate = d.DateValue\nWHERE d.IsWeekend = 0 AND d.IsHoliday = 0\nGROUP BY s.SaleDate;\n---CODE_END---'
      },
      {
        id: 'sql-36',
        question: 'A query that used to run in seconds is now taking minutes after the dataset grew. What steps would you take to identify and fix the performance issue?',
        concepts: '**Query Profiling**, **Execution Plan**, **Indexing**, **Statistics**. A systematic approach to performance tuning.',
        answer: 'When performance degrades due to data growth, I follow these steps:\n1.  **Analyze the Execution Plan**: Check if the database is doing a "Full Table Scan" instead of an "Index Seek". Look for expensive sorting or hashing operations.\n2.  **Check Indexes**: Ensure that columns used in `JOIN`, `WHERE`, and `ORDER BY` clauses are properly indexed. Data growth might have made existing indexes fragmented or insufficient.\n3.  **Update Statistics**: The database optimizer relies on statistics to choose the best plan. If these are outdated, it might choose a poor plan. Running `UPDATE STATISTICS` often fixes sudden performance drops.\n4.  **Review Query Logic**: Look for non-SARGable predicates (e.g., `WHERE YEAR(Date) = 2023`) that prevent index usage.',
        example: 'I once debugged a report where a query slowed down significantly. By examining the execution plan, I found it was performing a full table scan because the statistics were outdated. Running `UPDATE STATISTICS` refreshed the optimizer\'s view of the data distribution, allowing it to use the correct index again.'
      },
      {
        id: 'sql-37',
        question: 'You are analyzing time-series data and notice missing days in your trend chart. How would you identify and fill those gaps in SQL?',
        concepts: '**Recursive CTE**, **Calendar Table**, **LEFT JOIN**, **COALESCE**. Handling sparse data.',
        answer: 'Transactional data is often sparse (no sales on some days). To fill gaps, you need a continuous source of dates.\n1.  **Generate Dates**: Use a **Recursive CTE** or a **Calendar Table** to generate a continuous list of dates for the desired range.\n2.  **LEFT JOIN**: Select from your generated dates and `LEFT JOIN` your actual data. This ensures every day appears in the result.\n3.  **Handle NULLs**: Use `COALESCE(SalesAmount, 0)` to replace the `NULL`s (for missing days) with 0.',
        example: '---CODE_START---sql\n-- Generate dates using a recursive CTE\nWITH DateSeries AS (\n    SELECT CAST(\'2023-01-01\' AS DATE) AS DateValue\n    UNION ALL\n    SELECT DATEADD(day, 1, DateValue)\n    FROM DateSeries\n    WHERE DateValue < \'2023-01-31\'\n)\nSELECT \n    d.DateValue,\n    COALESCE(SUM(s.Amount), 0) as TotalSales\nFROM DateSeries d\nLEFT JOIN Sales s ON d.DateValue = s.SaleDate\nGROUP BY d.DateValue;\n---CODE_END---'
      },
      {
        id: 'sql-38',
        question: 'You need to calculate running totals and month-over-month growth for revenue. How would you build that logic in SQL?',
        concepts: '**Window Functions**, **SUM() OVER**, **LAG()**, **CTEs**. Cumulative metrics and comparative analysis.',
        answer: 'This requires two specific window functions.\n1.  **Running Total**: Use `SUM(Revenue) OVER (ORDER BY Date)` to calculate the cumulative sum up to the current row.\n2.  **MoM Growth**: Use `LAG(Revenue) OVER (ORDER BY Date)` to access the previous month\'s revenue. Then calculate `(Current - Previous) / Previous`.\nIt is best to wrap the monthly aggregation in a CTE first.',
        example: '---CODE_START---sql\nWITH MonthlySales AS (\n    SELECT \n        FORMAT(SaleDate, \'yyyy-MM\') as SaleMonth,\n        SUM(Amount) as Revenue\n    FROM Sales\n    GROUP BY FORMAT(SaleDate, \'yyyy-MM\')\n)\nSELECT\n    SaleMonth,\n    Revenue,\n    SUM(Revenue) OVER (ORDER BY SaleMonth) as RunningTotal,\n    (Revenue - LAG(Revenue) OVER (ORDER BY SaleMonth)) / LAG(Revenue) OVER (ORDER BY SaleMonth) as MoM_Growth\nFROM MonthlySales;\n---CODE_END---'
      },
      {
        id: 'sql-39',
        question: 'Management wants to compare performance between Q1 and Q2 directly from the database. How would you structure that query?',
        concepts: '**Conditional Aggregation**, **CASE WHEN**, **Pivoting**. Comparing distinct subsets of data side-by-side.',
        answer: 'The most efficient way to compare specific periods side-by-side is using **Conditional Aggregation**.\nInstead of joining two separate queries (one for Q1 and one for Q2), you scan the table once and use `CASE WHEN` statements inside your `SUM` function to bucket the data into columns.',
        example: '---CODE_START---sql\nSELECT\n    ProductCategory,\n    SUM(CASE WHEN Quarter = \'Q1\' THEN Revenue ELSE 0 END) as Q1_Revenue,\n    SUM(CASE WHEN Quarter = \'Q2\' THEN Revenue ELSE 0 END) as Q2_Revenue,\n    (SUM(CASE WHEN Quarter = \'Q2\' THEN Revenue ELSE 0 END) - SUM(CASE WHEN Quarter = \'Q1\' THEN Revenue ELSE 0 END)) as Diff\nFROM Sales\nWHERE Year = 2023\nGROUP BY ProductCategory;\n---CODE_END---'
      },
      {
        id: 'sql-40',
        question: 'You are asked to produce a report that shows both daily and weekly summaries from the same dataset. How would you aggregate data at multiple levels?',
        concepts: '**GROUPING SETS**, **ROLLUP**, **CUBE**. Advanced aggregation techniques.',
        answer: 'Standard SQL `GROUP BY` aggregates to a single level. To get multiple levels (e.g., daily AND weekly) in one result set, use `GROUPING SETS` or `ROLLUP`.\n- **ROLLUP**: Generates a hierarchy of subtotals (e.g., Daily -> Weekly -> Grand Total).\n- **GROUPING SETS**: Allows you to explicitly specify exactly which groups you want (e.g., just Daily and Weekly, without the Grand Total).',
        example: '---CODE_START---sql\nSELECT \n    Week, \n    Day,\n    SUM(Sales) as TotalSales\nFROM SalesData\nGROUP BY GROUPING SETS (\n    (Week, Day), -- Daily totals\n    (Week),      -- Weekly totals\n    ()           -- Grand total\n);\n---CODE_END---'
      },
      {
        id: 'sql-41',
        question: 'You are building a report where filters (like region or category) can change dynamically. How would you make your SQL adaptable?',
        concepts: '**Dynamic SQL**, **Coalesce**, **Optional Parameters**. Handling flexible search criteria.',
        answer: 'In stored procedures or parameterized queries, you handle optional filters by checking if the parameter is `NULL`.\nThe logic `WHERE (@Parameter IS NULL OR Column = @Parameter)` allows the filter to be ignored if the user doesn\'t provide a value, returning all rows for that column.',
        example: '---CODE_START---sql\nCREATE PROCEDURE GetSales\n    @Region VARCHAR(50) = NULL,\n    @Category VARCHAR(50) = NULL\nAS\nBEGIN\n    SELECT * FROM Sales\n    WHERE (@Region IS NULL OR Region = @Region)\n      AND (@Category IS NULL OR Category = @Category);\nEND\n---CODE_END---'
      },
      {
        id: 'sql-42',
        question: 'Indexing strategies are needed to improve the speed of analytical queries. How would you decide which columns to index?',
        concepts: '**Cardinality**, **Selectivity**, **Covering Index**, **Clustered vs Non-Clustered**. Database optimization theory.',
        answer: 'Deciding on indexes involves analyzing query patterns and data distribution:\n1.  **Filter Columns**: Index columns frequently used in `WHERE` clauses. High **selectivity** (unique values) columns are best.\n2.  **Join Columns**: Foreign keys used in `JOIN` conditions should almost always be indexed.\n3.  **Covering Indexes**: For critical queries, create an index that "covers" the query by including all selected columns (using `INCLUDE` in SQL Server). This avoids looking up the base table entirely.\n4.  **Avoid Over-indexing**: Indexes speed up reads (`SELECT`) but slow down writes (`INSERT`/`UPDATE`). Do not index low-cardinality columns like "Gender" unless they are part of a composite index.',
        example: 'In a recent project, I analyzed the slow queries and found that `OrderDate` and `CustomerID` were frequently used in WHERE clauses. I added a composite index on these columns. I avoided indexing the `Status` column alone because it had low cardinality (only 3 unique values), which would not have provided significant performance benefits.'
      },
      {
        id: 'sql-43',
        question: 'You need to create a performance report that categorizes sales based on thresholds (e.g., Low, Medium, High). How would you write this using CASE statements?',
        concepts: '**CASE statement**, **Bucketing**, **Segmentation**. Transforming continuous data into categorical data.',
        answer: 'The `CASE` statement allows you to implement if-then-else logic directly in your `SELECT` clause to create new categories on the fly.',
        example: '---CODE_START---sql\nSELECT\n    OrderID,\n    Amount,\n    CASE\n        WHEN Amount < 100 THEN \'Low Value\'\n        WHEN Amount >= 100 AND Amount < 500 THEN \'Medium Value\'\n        ELSE \'High Value\'\n    END as SalesCategory\nFROM Orders;\n---CODE_END---'
      }
    ],
};

export default sqlCategory;
