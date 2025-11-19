import { QuestionCategory } from '../types';

const mlopsDeploymentCategory: QuestionCategory = {
    id: 'mlops_deployment',
    title: 'MLOps & System Design',
    icon: 'fa-cogs',
    description: 'Concepts for operationalizing, deploying, and maintaining ML models.',
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
      },
      {
        id: 'mlops-5',
        question: 'How do you implement data lineage and audit logging in a data pipeline for traceability?',
        concepts: '**Data Lineage**: Tracking the flow of data from its source to its destination, including all transformations.\n**Audit Logging**: Recording key metadata about pipeline runs, such as execution times, records processed, and data quality metrics.\n**Data Governance**: The overall management of the availability, usability, integrity, and security of data.',
        answer: 'Implementing lineage and logging is crucial for debugging, compliance, and building trust in your data.\n\n**Implementation Strategy**:\n1.  **Create a Central Logging Table**: Design a dedicated table (e.g., in a SQL database) to store audit information for every pipeline run. Key columns should include `PipelineName`, `RunID`, `TableName`, `Status` (Success/Fail), `StartTime`, `EndTime`, `RecordsRead`, `RecordsWritten`, and `DataQualityScore`.\n2.  **Instrument Your Code**: In your ADF or Databricks code, add standardized logging steps. For example, at the beginning of a notebook, log the start time. After a read operation, log the count of records read. After a write operation, log the records written and the output path.\n3.  **Capture Lineage Information**: For lineage, explicitly log the source and target tables/files for each transformation step. For example, a log entry might state: "Stage `transform_customers` read from `bronze.customers` and wrote to `silver.customers`."\n4.  **Use Framework Features**: Leverage built-in features where possible. ADF has detailed monitoring views. Databricks can integrate with tools like Apache Atlas or custom solutions to capture lineage from query history. Delta Lake\'s `DESCRIBE HISTORY` command provides a built-in audit trail of all changes to a table.',
        example: 'In a Databricks notebook, you could create a Python logging utility. Before writing to a Delta table, the utility function would run data quality checks (e.g., `COUNT(*) WHERE column IS NULL`), log these metrics to the central audit table, and only then proceed with the write operation if the checks pass. This creates a traceable, auditable record of data quality for every batch processed.'
      },
      {
        id: 'pyds-17',
        question: 'What is pickle and why is it used?',
        concepts: '**Serialization**: The process of converting a data structure or object state into a format that can be stored or transmitted and reconstructed later.\n**Object Persistence**: Saving the state of an object to a storage medium.',
        answer: '`pickle` is Python\'s standard module for object serialization. It "pickles" a Python object by converting it into a byte stream, which can be written to a file, stored in a database, or transmitted over a network.\n\nIn data science, it is most commonly used to **save trained machine learning models** to disk. You can then load this saved file later to make predictions without having to retrain the model.',
        example: '---CODE_START---python\nimport pickle\nfrom sklearn.linear_model import LogisticRegression\n\n# Assume \'model\' is a trained sklearn model\nmodel = LogisticRegression().fit([[1],[2]], [0,1])\n\n# Save the model to a file\nwith open(\'model.pkl\', \'wb\') as f:\n    pickle.dump(model, f)\n\n# Load the model from the file\nwith open(\'model.pkl\', \'rb\') as f:\n    loaded_model = pickle.load(f)\n\nprint(loaded_model.predict([[1]]))\n---CODE_END---'
      },
      {
        id: 'pyds-18',
        question: 'How do you serialize a model in Python?',
        concepts: '**Serialization**: Converting an object into a storable format.\n**Interoperability**: The ability of computer systems or software to exchange and make use of information.',
        answer: 'The most common method is using the `pickle` library, as it can serialize almost any Python object. For scikit-learn models, `joblib` is often preferred as it can be more efficient for objects that carry large NumPy arrays.\n\nFor better interoperability with other languages and systems, formats like ONNX (Open Neural Network Exchange) are used, which define a common set of operators and a common file format.',
        example: '---CODE_START---python\nfrom sklearn.ensemble import RandomForestClassifier\nimport joblib\n\n# Assume \'model\' is a trained model\nmodel = RandomForestClassifier().fit([[1],[2]], [0,1])\n\n# Save with joblib\njoblib.dump(model, \'model.joblib\')\n\n# Load with joblib\nloaded_model = joblib.load(\'model.joblib\')\n---CODE_END---'
      },
    ],
};

export default mlopsDeploymentCategory;