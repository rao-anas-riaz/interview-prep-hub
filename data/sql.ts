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
      }
    ],
};

export default sqlCategory;
