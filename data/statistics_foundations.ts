import { QuestionCategory } from '../types';

const statisticsFoundationsCategory: QuestionCategory = {
    id: 'stats_foundations',
    title: 'Statistics & Probability',
    icon: 'fa-calculator',
    description: 'Core statistical and probability concepts essential for data science.',
    questions: [
        {
            id: 'foundations-4',
            question: 'What is the real difference between correlation and causation, and how do you prove it?',
            concepts: '**Correlation**: A statistical measure that expresses the extent to which two variables are linearly related.\n**C causation**: Indicates that one event is the result of the occurrence of the other event; i.e., there is a causal relationship between the two events.',
            answer: 'Correlation means two things happen together. Causation means one thing **makes** the other happen.\n- **Correlation does not imply causation**.\n- The only way to prove causation is with a **controlled experiment** (like an A/B test) where you change one variable and measure its direct effect on another, keeping all else constant.',
            example: '**Example**: Ice cream sales and crime rates are correlated (both rise in summer). The **heat is the cause** for both; ice cream does not cause crime. To prove it, you would need an experiment, like giving away free ice cream in one city and seeing if crime rates change compared to a control city.',
        },
        {
            id: 'foundations-5',
            question: 'If you add 10 to every value in a dataset, how does that affect the mean and variance?',
            concepts: '**Mean**: The average of a set of numbers.\n**Variance**: A measure of how spread out the data points are from the mean.',
            answer: 'Adding a constant value (like 10) to every data point **shifts the entire distribution**, but does not change its shape or spread.\n- The **Mean will increase** by that constant value (10).\n- The **Variance will remain unchanged**. Variance is calculated based on the distance of each point from the mean, and since both the points and the mean shifted by the same amount, their relative distances are the same.',
            example: '**Dataset**: [2, 4, 6]. Mean is 4. Variance is 2.67.\n**New Dataset**: [12, 14, 16]. The **new Mean is 14** (4 + 10). The **new Variance is still 2.67** because the spread between the numbers hasn\'t changed.',
        },
        {
            id: 'foundations-6',
            question: 'Can the variance of a dataset be negative?',
            concepts: '**Variance**: The average of the squared differences from the Mean. The formula involves squaring deviations, which is a key property.',
            answer: '**No, variance can never be negative**. Variance is calculated by taking the average of the **squared** differences between each data point and the mean. Since the square of any real number (positive or negative) is always non-negative, the sum of these squared differences will also be non-negative. Therefore, the variance is always greater than or equal to zero.\n- A **variance of zero** means all values in the dataset are identical.',
            example: 'If you have the dataset [5, 5, 5], the mean is 5. The difference for each point is (5-5) = 0. The squared difference is 0. The average is 0. If you have [3, 5, 7], the differences are -2, 0, 2. The squared differences are 4, 0, 4. The average is (4+0+4)/3 = 2.67. **You can\'t get a negative result**.',
        },
        {
            id: 'foundations-9',
            question: 'What is a p-value? Explain it in simple terms, as if to a non-technical person.',
            concepts: '**P-value**: The probability of observing results as extreme as, or more extreme than, the results actually observed, assuming the null hypothesis is true.\n**Null Hypothesis (H₀)**: The default assumption that there is no effect or no difference.\n**Statistical Significance**: A result is statistically significant if the p-value is below a predetermined threshold (alpha), typically 0.05.',
            answer: 'Imagine you have an idea you want to test, like "this new drug cures headaches." The skeptical starting assumption (the "null hypothesis") is that the drug does nothing.\n\nThe **p-value is the "surprise" index**. It\'s the probability of seeing your results (or even more extreme results) **if the drug actually did nothing**.\n\n- A **low p-value (e.g., less than 0.05)** means your results are very surprising if the drug is useless. This is strong evidence that your idea is correct and the drug works.\n- A **high p-value** means your results are not surprising. They could have easily happened by random chance, so you don\'t have enough evidence to say the drug works.',
            example: 'We run an A/B test on a new website button and get a **p-value of 0.02**. This means there is only a **2% chance** we would see this much of an improvement in clicks just by random luck if the new button was actually no better than the old one. Because this is a low probability, we can be confident the new button is genuinely better.',
        },
        {
            id: 'foundations-10',
            question: 'Explain the Central Limit Theorem. Why is it important?',
            concepts: '**Central Limit Theorem (CLT)**: A fundamental theorem of statistics which states that, given a sufficiently large sample size, the sampling distribution of the mean for a variable will approximate a normal distribution (bell curve) regardless of that variable\'s distribution in the population.\n**Sampling Distribution**: The probability distribution of a given statistic based on a random sample.',
            answer: 'The Central Limit Theorem (CLT) is a powerful idea that says if you take many random samples from **any population**, and calculate the **mean of each sample**, the distribution of those means will look like a **normal distribution (a bell curve)**.\n\nThis is true **even if the original population is not normally distributed** (e.g., it\'s skewed or uniform).\n\n**Why it\'s important**:\nThe bell curve has well-known mathematical properties. The CLT allows us to use these properties to make inferences and perform hypothesis tests (like t-tests) about a population mean, even when we don\'t know the shape of the population\'s distribution, which is often the case in the real world.',
            example: 'Imagine you want to know the average height of all dogs in the world. The distribution might be weird (not a bell curve). Instead of measuring every dog, you take 1000 random samples of 50 dogs each and calculate the average height for each sample. The CLT guarantees that if you plot a histogram of those 1000 average heights, the histogram will form a near-perfect bell curve. This allows you to confidently estimate the true average height of all dogs.',
        },
    ],
};

export default statisticsFoundationsCategory;
