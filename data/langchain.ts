import { QuestionCategory } from '../types';

const langchainCategory: QuestionCategory = {
    id: 'langchain',
    title: 'LangChain',
    icon: 'fa-link',
    description: 'In-depth questions on building LLM applications, from core concepts to advanced RAG and agentic workflows.',
    questions: [
      {
        id: 'lc-1',
        question: 'What is LangChain and what fundamental problem does it solve?',
        concepts: '**Orchestration Framework**: LangChain is not an LLM itself, but a framework for coordinating and building applications powered by LLMs.\n**Composability**: The core idea of linking components together to create complex logic.',
        answer: 'LangChain is an open-source framework designed to simplify the development of applications using Large Language Models (LLMs). It doesn\'t provide its own LLM, but acts as a middle layer or "scaffolding" that connects LLMs to other data sources and tools.\n\nThe fundamental problem it solves is **composition**. Building a simple chatbot is easy, but creating a complex application that can reason, access external data, and take actions is very difficult. LangChain provides standardized, modular components (like prompt templates, memory, retrievers, and tools) that can be easily chained together to build sophisticated, data-aware, and agentic applications.',
        example: 'Instead of writing complex custom code to fetch a document from a database, format it into a prompt, send it to an LLM, and parse the output, LangChain lets you define this as a simple sequence: `retriever | prompt | model | output_parser`. This makes the logic cleaner, more reusable, and easier to manage.'
      },
      {
        id: 'lc-2',
        question: 'What is LangChain Expression Language (LCEL) and why is it so important?',
        concepts: '**LCEL (LangChain Expression Language)**: The declarative, pipe-based syntax for composing chains.\n**Runnable Protocol**: The underlying interface that powers LCEL, giving all components a unified set of invocation methods.\n**Declarative Programming**: Defining the "what" (the sequence of steps) rather than the "how" (the implementation details).',
        answer: 'LCEL is the core of modern LangChain. It provides a declarative way to compose components using the pipe (`|`) operator. This syntax is not just for looks; it automatically wraps your components in a `Runnable` object.\n\nThis is important because the Runnable protocol provides several key benefits out-of-the-box for any chain built with LCEL:\n- **Streaming Support**: You can stream tokens from the LLM back to the user for a better UX.\n- **Async and Batch Processing**: Run chains asynchronously or process multiple inputs in parallel with `.ainvoke()` and `.batch()`.\n- **Input/Output Schemas**: Automatically inspect the inputs and outputs of your chains.\n- **Integration with LangSmith**: Get detailed tracing and debugging for every step of your chain automatically.',
        example: '---CODE_START---python\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import StrOutputParser\n\n# Define components\nprompt = ChatPromptTemplate.from_template("Tell me a joke about {topic}")\nmodel = ChatOpenAI()\noutput_parser = StrOutputParser()\n\n# Compose the chain using LCEL\nchain = prompt | model | output_parser\n\n# Invoke the chain\nresult = chain.invoke({"topic": "bears"})\nprint(result)\n---CODE_END---'
      },
      {
        id: 'lc-3',
        question: 'Describe the core components of LangChain: Models, Prompts, and Output Parsers.',
        concepts: '**Model I/O**: The fundamental flow of data into and out of a language model.',
        answer: 'These three components form the basic building block of any LangChain application:\n- **Models**: The language model itself. LangChain provides a standard interface for many different LLMs (like OpenAI, Gemini, Ollama), so you can swap them out easily.\n- **Prompts**: These are templates for generating the final prompt sent to the LLM. They take user input and other information and format it into a structured prompt. `ChatPromptTemplate` is the most common, allowing you to define a sequence of system, human, and AI messages.\n- **Output Parsers**: These components take the raw text output from an LLM and parse it into a more structured format (like JSON, a list, or a custom object). This is crucial for making the LLM\'s response usable in downstream code.',
        example: 'A chain might use a `ChatPromptTemplate` to instruct the LLM to "generate a JSON object with a \'setup\' and a \'punchline\'." After the model generates the JSON as a string, a `JsonOutputParser` would convert that string into a Python dictionary that the application can easily work with.'
      },
      {
        id: 'lc-4',
        question: 'How does LangChain manage memory in conversations? Compare two different memory types.',
        concepts: '**Memory**: The mechanism for storing and retrieving conversation history to maintain context.\n**Statefulness**: Giving a "stateless" LLM the appearance of remembering past interactions.',
        answer: 'LLMs are inherently stateless; they don\'t remember past turns of a conversation. LangChain\'s **Memory** components solve this by storing conversation history and injecting it back into the prompt for the next turn.\n\nTwo common types are:\n- **`ConversationBufferMemory`**: This is the simplest form. It stores the entire chat history as a raw list of messages and stuffs it into the prompt. This is very accurate but can quickly exceed the LLM\'s context window and become expensive.\n- **`ConversationSummaryMemory`**: To save tokens, this memory uses an LLM to create a running summary of the conversation. Instead of the full transcript, only the concise summary is passed back into the prompt. This is more token-efficient for long conversations but may lose some detail.',
        example: '`ConversationBufferMemory` is great for a short customer service Q&A. `ConversationSummaryMemory` is better for a long-running, open-ended chatbot that might discuss many topics over dozens of turns.'
      },
      {
        id: 'lc-5',
        question: 'Walk me through the data connection pipeline for a RAG application in LangChain.',
        concepts: '**RAG (Retrieval-Augmented Generation)**: The process of augmenting an LLM\'s knowledge with external data.\n**Vectorization**: The process of turning text into numerical representations (embeddings).',
        answer: 'The RAG data pipeline involves four main steps to prepare your external data for the LLM:\n1. **Load**: Use a **Document Loader** to ingest data from a source (e.g., a PDF, a website, a database). This creates a list of `Document` objects.\n2. **Split**: The loaded documents are often too large for the LLM\'s context window. A **Text Splitter** (like `RecursiveCharacterTextSplitter`) breaks the large documents into smaller, semantically meaningful chunks.\n3. **Embed**: An **Embedding Model** is used to convert each text chunk into a numerical vector. This vector captures the semantic meaning of the text.\n4. **Store**: These embeddings (and their corresponding text chunks) are loaded into a **Vector Store** (like FAISS or Chroma). The vector store is a special type of database that allows for very fast similarity searches on these embeddings.',
        example: 'To build a chatbot over a company\'s annual report, you would use a `PyPDFLoader`, split the text by section, use `OpenAIEmbeddings` to create vectors for each section, and store them in a `FAISS` vector store. The chatbot can now search this store to find relevant sections to answer questions.'
      },
      {
        id: 'lc-6',
        question: 'What is an Agent in LangChain and how does it use Tools?',
        concepts: '**Agent**: An LLM-powered system that can make decisions, take actions, observe the results, and repeat until a task is complete.\n**Tool**: A function that an agent can call to interact with the outside world (e.g., search the web, run code, query a database).',
        answer: 'An **Agent** is a more advanced use of an LLM that goes beyond just generating text. An agent uses an LLM as a "reasoning engine" to decide which actions to take to accomplish a goal. These actions are performed by **Tools**.\n\nThe process, often based on a framework like **ReAct (Reasoning and Acting)**, works like this:\n1. The Agent receives a prompt (a goal).\n2. The LLM reasons about the goal and decides which **Tool** to use and what input to provide to it.\n3. The selected Tool is executed (e.g., a Google Search API call).\n4. The result from the Tool (the "observation") is fed back to the Agent.\n5. The Agent repeats this loop, using the new information to reason further, until it has enough information to give a final answer.',
        example: 'If you ask an agent "What is the capital of France and what is its current weather?", the agent might first use a `Search` tool to find the capital is Paris. Then, using that output, it will call a `Weather` tool with "Paris" as the input to get the weather, and finally combine the information into a final answer.'
      },
      {
        id: 'lc-7',
        question: 'What are some advanced RAG techniques available in LangChain?',
        concepts: '**Retrieval Quality**: Improving the relevance and accuracy of the documents fetched from the vector store.\n**Contextualization**: Refining the user\'s query or the retrieved documents before sending them to the LLM.',
        answer: 'Standard RAG is powerful, but advanced techniques can significantly improve performance:\n- **Multi-Query Retriever**: The user\'s query might be suboptimal for similarity search. This technique uses an LLM to generate several variations of the user\'s question from different perspectives. It then retrieves documents for all of these questions and combines the results, increasing the chance of finding relevant information.\n- **Parent Document Retriever**: To maintain context, you can index small chunks of text but retrieve larger "parent" documents. For example, you might embed individual paragraphs, but when a paragraph is matched, you retrieve the entire page it came from. This gives the LLM more context to work with.\n- **Self-Querying Retriever**: This allows the retriever to use the LLM to translate a natural language query into a structured query for the vector store, including metadata filters. For example, "What did the author say about AI in 2023?" could be translated into a vector search for "AI" plus a metadata filter for `year=2023`.',
        example: 'In a legal document search, a user might ask a vague question. A **Multi-Query Retriever** could generate more specific legal questions, while a **Parent Document Retriever** ensures that when a relevant clause is found, the entire surrounding section is provided to the LLM for better legal interpretation.'
      },
      {
        id: 'lc-8',
        question: 'What is LangGraph and how does it differ from standard Agents for creating complex workflows?',
        concepts: '**LangGraph**: A library for building stateful, multi-actor applications with LLMs.\n**Cyclical Graphs**: Unlike the linear DAGs of chains, LangGraph allows for cycles, enabling more complex agent interactions.\n**State Management**: Each node in the graph operates on a shared state object.',
        answer: 'While standard LangChain Agents follow a predetermined loop (Reason -> Act -> Observe), **LangGraph** allows you to define more complex, multi-step, and multi-agent workflows as a **cyclical graph**.\n\nKey differences:\n- **Control Flow**: Standard agents have a fixed control loop. LangGraph lets you define custom control flow with nodes and edges, allowing for loops, branches, and more dynamic behavior.\n- **Statefulness**: LangGraph is built around a central `State` object that is passed between nodes. Each node can modify this state, allowing for a persistent "memory" throughout the workflow.\n- **Multi-Agent Systems**: LangGraph is ideal for orchestrating conversations between multiple agents (e.g., a "researcher" agent that passes its findings to a "writer" agent), where control can be passed back and forth.',
        example: 'You could build a research assistant with LangGraph. One node is a "Planner" agent. An edge from the planner can conditionally route to a "Web Search" node or a "Code Execution" node based on the plan. The results from these nodes feed back into the planner, which can then decide to loop and do more research or route to a final "Report Writer" node.'
      },
      {
        id: 'lc-9',
        question: 'How do you deploy a LangChain chain as a REST API?',
        concepts: '**LangServe**: A companion library to LangChain for deploying chains as production-ready APIs.\n**API Endpoints**: Making your chain accessible over the web via standard HTTP requests.',
        answer: 'The recommended way to deploy a LangChain chain is with **LangServe**. It\'s a library that makes it incredibly easy to expose any chain built with LCEL as a REST API.\n\nThe process is simple:\n1. **Build your chain** using LCEL as you normally would.\n2. **Create a simple server file** (e.g., `server.py`).\n3. In this file, import your chain and use `add_routes` from `langserve` to attach your chain to a FastAPI app. This automatically creates several endpoints for you (`/invoke`, `/batch`, `/stream`).\n4. **Run the server** using an ASGI server like Uvicorn.',
        example: '---CODE_START---python\n# In your server.py\nfrom fastapi import FastAPI\nfrom langserve import add_routes\nfrom my_chain import chain # Assuming your chain is defined in my_chain.py\n\napp = FastAPI(title="My LangChain Server")\n\n# This creates the API endpoints for your chain\nadd_routes(app, chain, path="/my-chain")\n\nif __name__ == "__main__":\n    import uvicorn\n    uvicorn.run(app, host="0.0.0.0", port=8000)\n---CODE_END---'
      },
      {
        id: 'lc-10',
        question: 'What is LangSmith and how does it help in debugging and evaluating LLM applications?',
        concepts: '**Observability**: The ability to measure a system’s current state from its external outputs.\n**Tracing**: Recording the inputs, outputs, and latency of every step in a chain or agent execution.',
        answer: 'LangSmith is a platform for **debugging, testing, evaluating, and monitoring** LLM applications, built by the LangChain team. It provides deep visibility into what your chains and agents are doing.\n\nKey features:\n- **Tracing**: It automatically captures a detailed trace of every execution. You can see the exact inputs and outputs of each component (the prompt, the retrieved documents, the LLM response, the parsed output), along with latency and token counts for each step. This is invaluable for debugging why a chain is not behaving as expected.\n- **Evaluation**: You can create datasets of inputs and expected outputs, and then run your chain over this dataset. LangSmith allows you to use LLM-based evaluators (e.g., checking for "faithfulness" or "relevance") to automatically score your chain\'s performance and track regressions over time.\n- **Monitoring**: It provides dashboards to monitor the performance, cost, and latency of your deployed applications in production.',
        example: 'If your RAG pipeline is giving a wrong answer, you can look at the LangSmith trace. You might discover that the **retriever is fetching the wrong documents**, or that the **prompt is not correctly instructing the LLM** on how to use them. Without this visibility, you would just be guessing.'
      },
      {
        id: 'lc-11',
        question: 'What are some key strategies for optimizing the performance and cost of a LangChain application?',
        concepts: '**Performance**: Reducing latency and improving user experience.\n**Cost**: Minimizing API calls and token usage.\n**Efficiency**: Getting the best results with the fewest resources.',
        answer: 'Optimizing LLM applications involves balancing performance, cost, and quality.\n\n**Performance/UX Strategies**:\n- **Streaming**: Use `.stream()` on LCEL chains to stream tokens back to the user as they are generated. This dramatically improves perceived performance for the user.\n- **Async & Parallel Execution**: For tasks that can be run in parallel (e.g., calling multiple retrievers or tools), use `.ainvoke()` and `RunnableParallel` to execute them concurrently.\n\n**Cost/Efficiency Strategies**:\n- **Caching**: Implement a cache (like Redis) to store the results of expensive LLM calls. If the same input is received again, the cached result can be returned instantly without calling the API.\n- **Model Routing**: Use a "router" chain to decide which LLM to use for a given query. A cheap, fast model (like Gemini Flash) can handle simple queries, while a more powerful, expensive model (like Gemini Pro) is reserved for complex reasoning tasks.\n- **Prompt Optimization**: Write concise and efficient prompts. Every token costs money and adds latency.',
        example: 'A customer support bot could use a **router** to send simple FAQ questions to a fine-tuned open-source model, but escalate complex troubleshooting questions to a state-of-the-art proprietary model, thus optimizing the cost-performance tradeoff.'
      }
    ],
};

export default langchainCategory;
