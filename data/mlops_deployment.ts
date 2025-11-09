import { QuestionCategory } from '../types';

const mlopsDeploymentCategory: QuestionCategory = {
    id: 'mlops_deployment',
    title: 'MLOps & Deployment',
    icon: 'fa-cogs',
    description: 'Concepts for operationalizing, deploying, and maintaining machine learning models.',
    questions: [
      {
        id: 'mlops-1',
        question: 'How would you track experiments and compare model versions?',
        concepts: '**Experiment Tracking**: The process of saving all experiment-related information (parameters, metrics, artifacts) for every experiment you run.\n**Model Registry**: A centralized repository for storing, versioning, and managing machine learning models.',
        answer: 'Use a dedicated tool like **MLflow** or **Weights & Biases** to create a reproducible record of each experiment. For each run, you should log:\n- **Parameters**: Hyperparameters used for the run (e.g., learning rate).\n- **Metrics**: Key performance scores (e.g., AUC, F1-score).\n- **Artifacts**: The saved model file and any output charts.\n\nThe best models are then versioned and stored in a **Model Registry** for easy access and deployment.',
        example: 'While tuning a recommendation model, you run 50 experiments. **MLflow lets you view a dashboard** comparing the precision of all 50 runs. You can then select the top-performing model, register it as **`recommender-v3.1`**, and deploy it to production.',
      },
      {
        id: 'mlops-2',
        question: 'Walk me through deploying a model with FastAPI and Docker.',
        concepts: '**FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.\n**Docker**: A platform for developing, shipping, and running applications in containers. A container is a lightweight, standalone, executable package of software that includes everything needed to run it.',
        answer: 'It is a three-step process to make your model available as an API:\n1. **API Script (FastAPI)**: Write a Python script that loads your trained model and creates a `/predict` endpoint to serve predictions.\n2. **Containerize (Docker)**: Create a `Dockerfile` that specifies the Python version, installs libraries, copies your script and model file, and defines the command to start the API server.\n3. **Build & Run**: Use `docker build` to create a self-contained image and `docker run` to launch it. Your model is now a live, portable API.',
        example: 'You have a churn model `model.pkl`. You write a **FastAPI script** for it. You then package the script, the model, and all dependencies into a **Docker container**. This container can then be deployed to any cloud server to provide real-time churn predictions.',
      },
      {
        id: 'mlops-3',
        question: 'What\'s the difference between batch and real-time inference pipelines?',
        concepts: '**Batch Inference**: The process of generating predictions on a large group of observations at once.\n**Real-time (or Online) Inference**: The process of generating predictions for a single observation as it comes in.',
        answer: 'The choice depends on the business need for latency.\n- **Batch Inference**: Used for **non-urgent** tasks. The model runs on a schedule (e.g., daily), processes a large batch of data, and saves the results to a database. It is **high-throughput** and cost-effective.\n- **Real-time Inference**: Used for **immediate** needs. The model is deployed as a live API that provides a single prediction in milliseconds. It is **low-latency** and essential for interactive apps.',
        example: 'A company uses a **batch pipeline** to calculate a "propensity to buy" score for all its customers **once a week**. In contrast, its credit card fraud detection system uses a **real-time pipeline** to score every transaction **instantly**.',
      },
      {
        id: 'mlops-4',
        question: 'What is model drift and how would you monitor for it?',
        concepts: '**Model Drift (or Concept Drift)**: The phenomenon where the statistical properties of the target variable, which the model is trying to predict, change over time in unforeseen ways. This causes the model to become less accurate as time passes.',
        answer: 'Model drift is the **degradation of a model\'s performance** over time because the real-world data it sees in production no longer matches the data it was trained on.\n\n**How to Monitor**:\n- **Data Drift**: Monitor the statistical properties (mean, median, distribution) of your input features. If the average age of your users suddenly changes, your model might be in trouble.\n- **Performance Drift**: Monitor your key model metrics (e.g., AUC, F1-score) on live data. A steady decline indicates drift.\n\n**How to Fix**: **Retrain the model** on a more recent set of data.',
        example: 'A model trained to predict house prices **before the 2020 pandemic** would perform poorly today because market dynamics (the relationship between features and price) have **drifted**. Monitoring would show a sharp increase in prediction error, signaling the need for retraining.',
      }
    ],
};

export default mlopsDeploymentCategory;
