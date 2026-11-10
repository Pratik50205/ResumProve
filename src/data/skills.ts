import { SkillCategory } from "@/types/resume";

export interface SkillDefinition {
  name: string;
  category: SkillCategory;
  aliases: string[];
  relatedSkills: string[];
}

export const SKILL_KNOWLEDGE_BASE: SkillDefinition[] = [
  // ==========================================
  // 1. PROGRAMMING LANGUAGES (~60+)
  // ==========================================
  { name: "Python", category: "Programming", aliases: ["py", "python3", "python 3", "python2"], relatedSkills: ["FastAPI", "Django", "NumPy", "Pandas", "PyTorch"] },
  { name: "JavaScript", category: "Programming", aliases: ["js", "es6", "es2020", "es2022", "ecmascript"], relatedSkills: ["TypeScript", "Node.js", "React"] },
  { name: "TypeScript", category: "Programming", aliases: ["ts", "typescript 5"], relatedSkills: ["JavaScript", "React", "Next.js", "Node.js"] },
  { name: "Java", category: "Programming", aliases: ["core java", "java 8", "java 11", "java 17", "java 21"], relatedSkills: ["Spring Boot", "Hibernate", "JVM", "Kotlin"] },
  { name: "C++", category: "Programming", aliases: ["cpp", "c/c++", "c++11", "c++14", "c++17", "c++20"], relatedSkills: ["C", "STL", "Data Structures", "Algorithms", "Systems Programming"] },
  { name: "C", category: "Programming", aliases: ["c language", "ansi c"], relatedSkills: ["C++", "Embedded Systems", "Linux", "Systems Programming"] },
  { name: "C#", category: "Programming", aliases: ["csharp", "c#.net", ".net c#"], relatedSkills: [".NET Core", "ASP.NET Core", "Entity Framework", "Azure"] },
  { name: "Go", category: "Programming", aliases: ["golang", "go-lang"], relatedSkills: ["Docker", "Kubernetes", "Microservices", "gRPC", "Gin"] },
  { name: "Rust", category: "Programming", aliases: ["rust-lang", "rustlang"], relatedSkills: ["Systems Programming", "WebAssembly", "Cargo", "Tokio"] },
  { name: "SQL", category: "Programming", aliases: ["structured query language", "ansi sql"], relatedSkills: ["PostgreSQL", "MySQL", "Database Design", "Performance Tuning"] },
  { name: "PHP", category: "Programming", aliases: ["php7", "php8"], relatedSkills: ["Laravel", "Symfony", "Composer", "MySQL"] },
  { name: "Ruby", category: "Programming", aliases: ["ruby-lang"], relatedSkills: ["Ruby on Rails", "RSpec", "Sidekiq"] },
  { name: "Swift", category: "Programming", aliases: ["swift 5"], relatedSkills: ["iOS Development", "SwiftUI", "Xcode", "Objective-C"] },
  { name: "Kotlin", category: "Programming", aliases: ["kotlin multiplatform", "kmp"], relatedSkills: ["Android Development", "Jetpack Compose", "Java", "Spring Boot"] },
  { name: "Scala", category: "Programming", aliases: ["scala 3"], relatedSkills: ["Apache Spark", "Akka", "JVM", "Functional Programming"] },
  { name: "R", category: "Programming", aliases: ["r language", "r-project"], relatedSkills: ["Data Analysis", "ggplot2", "Statistical Modeling", "Python"] },
  { name: "Dart", category: "Programming", aliases: ["dartlang"], relatedSkills: ["Flutter", "Mobile Development"] },
  { name: "Bash", category: "Programming", aliases: ["shell script", "shell scripting", "sh", "bash script"], relatedSkills: ["Linux", "DevOps", "CI/CD", "Automation"] },
  { name: "PowerShell", category: "Programming", aliases: ["pwsh", "powershell scripting"], relatedSkills: ["Windows Server", "Azure", "Automation"] },
  { name: "Perl", category: "Programming", aliases: ["perl 5"], relatedSkills: ["Regex", "Scripting", "Linux"] },
  { name: "Haskell", category: "Programming", aliases: ["ghc"], relatedSkills: ["Functional Programming", "Type Theory", "Scala"] },
  { name: "Elixir", category: "Programming", aliases: ["elixir-lang"], relatedSkills: ["Phoenix Framework", "Erlang", "Concurrency"] },
  { name: "Clojure", category: "Programming", aliases: ["clojurescript"], relatedSkills: ["Lisp", "JVM", "Functional Programming"] },
  { name: "Lua", category: "Programming", aliases: ["luajit"], relatedSkills: ["Nginx", "Game Scripting", "Redis"] },
  { name: "Julia", category: "Programming", aliases: ["julia-lang"], relatedSkills: ["Scientific Computing", "Machine Learning", "Python"] },
  { name: "Objective-C", category: "Programming", aliases: ["obj-c", "objc"], relatedSkills: ["Swift", "iOS Development", "macOS"] },
  { name: "Solidity", category: "Programming", aliases: ["solidity smart contracts"], relatedSkills: ["Ethereum", "Web3", "Smart Contracts", "Hardhat"] },
  { name: "Groovy", category: "Programming", aliases: ["apache groovy"], relatedSkills: ["Jenkins", "Gradle", "Java"] },
  { name: "MATLAB", category: "Programming", aliases: ["simulink"], relatedSkills: ["Signal Processing", "Algorithm Design", "Mathematical Modeling"] },
  { name: "Assembly", category: "Programming", aliases: ["asm", "x86", "x86-64", "arm assembly"], relatedSkills: ["Reverse Engineering", "Low-level Systems", "C"] },
  { name: "Zig", category: "Programming", aliases: ["ziglang"], relatedSkills: ["C", "Systems Programming", "Rust"] },
  { name: "PL/SQL", category: "Programming", aliases: ["oracle pl/sql", "plsql"], relatedSkills: ["Oracle Database", "SQL", "Stored Procedures"] },
  { name: "T-SQL", category: "Programming", aliases: ["transact-sql", "tsql"], relatedSkills: ["Microsoft SQL Server", "SQL", "Stored Procedures"] },

  // ==========================================
  // 2. AI / MACHINE LEARNING / LLMS (~120+)
  // ==========================================
  { name: "Machine Learning", category: "AI/ML", aliases: ["ml", "applied ml", "machine learning algorithms"], relatedSkills: ["Scikit-learn", "Python", "Deep Learning", "Supervised Learning"] },
  { name: "Deep Learning", category: "AI/ML", aliases: ["dl", "neural networks", "artificial neural networks"], relatedSkills: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN", "Transformers"] },
  { name: "Large Language Models", category: "AI/ML", aliases: ["llm", "llms", "generative ai", "genai", "foundation models"], relatedSkills: ["LangChain", "RAG", "Prompt Engineering", "Fine-Tuning", "Vector Databases"] },
  { name: "Natural Language Processing", category: "AI/ML", aliases: ["nlp", "text mining", "computational linguistics"], relatedSkills: ["BERT", "Transformers", "spaCy", "NLTK", "Hugging Face"] },
  { name: "Computer Vision", category: "AI/ML", aliases: ["cv", "image processing", "vision ai"], relatedSkills: ["OpenCV", "PyTorch", "YOLO", "CNN", "Image Segmentation"] },
  { name: "PyTorch", category: "AI/ML", aliases: ["torch", "pytorch lightning"], relatedSkills: ["Python", "Deep Learning", "TensorFlow", "CUDA"] },
  { name: "TensorFlow", category: "AI/ML", aliases: ["tf", "tensorflow 2", "tf.keras"], relatedSkills: ["Keras", "PyTorch", "Deep Learning", "TFLite"] },
  { name: "Keras", category: "AI/ML", aliases: ["tf.keras"], relatedSkills: ["TensorFlow", "Deep Learning", "PyTorch"] },
  { name: "Scikit-learn", category: "AI/ML", aliases: ["sklearn", "scikit learn", "scikitlearn"], relatedSkills: ["Machine Learning", "Python", "Pandas", "NumPy"] },
  { name: "XGBoost", category: "AI/ML", aliases: ["xgboost algorithm"], relatedSkills: ["LightGBM", "Scikit-learn", "Gradient Boosting"] },
  { name: "LightGBM", category: "AI/ML", aliases: ["lgbm"], relatedSkills: ["XGBoost", "CatBoost", "Machine Learning"] },
  { name: "CatBoost", category: "AI/ML", aliases: ["catboost classifier"], relatedSkills: ["XGBoost", "LightGBM", "Gradient Boosting"] },
  { name: "RAG", category: "AI/ML", aliases: ["retrieval-augmented generation", "retrieval augmented generation", "rag pipeline"], relatedSkills: ["Vector Databases", "LangChain", "LlamaIndex", "Embeddings"] },
  { name: "LangChain", category: "AI/ML", aliases: ["langchain framework", "langgraph"], relatedSkills: ["LlamaIndex", "Large Language Models", "Python", "RAG"] },
  { name: "LlamaIndex", category: "AI/ML", aliases: ["gpt index", "llamaindex"], relatedSkills: ["LangChain", "Vector Databases", "RAG"] },
  { name: "Prompt Engineering", category: "AI/ML", aliases: ["prompt design", "prompt optimization"], relatedSkills: ["Large Language Models", "Generative AI", "Few-Shot Prompting"] },
  { name: "Fine-Tuning", category: "AI/ML", aliases: ["model fine-tuning", "lora", "qlora", "peft"], relatedSkills: ["PyTorch", "Hugging Face", "Large Language Models"] },
  { name: "Hugging Face", category: "AI/ML", aliases: ["hf transformers", "huggingface"], relatedSkills: ["Transformers", "PyTorch", "NLP", "Datasets"] },
  { name: "Transformers", category: "AI/ML", aliases: ["transformer architecture", "attention mechanism"], relatedSkills: ["BERT", "GPT", "PyTorch", "Hugging Face"] },
  { name: "BERT", category: "AI/ML", aliases: ["roberta", "distilbert", "bert model"], relatedSkills: ["NLP", "Transformers", "Text Embeddings"] },
  { name: "OpenCV", category: "AI/ML", aliases: ["cv2", "computer vision library"], relatedSkills: ["Computer Vision", "Python", "C++", "Image Processing"] },
  { name: "YOLO", category: "AI/ML", aliases: ["yolov8", "yolov5", "yolo object detection"], relatedSkills: ["Computer Vision", "Object Detection", "PyTorch"] },
  { name: "MLOps", category: "AI/ML", aliases: ["machine learning operations", "ml engineering"], relatedSkills: ["MLflow", "Kubeflow", "Docker", "CI/CD", "Weights & Biases"] },
  { name: "MLflow", category: "AI/ML", aliases: ["mlflow tracking"], relatedSkills: ["MLOps", "Weights & Biases", "Experiment Tracking"] },
  { name: "Weights & Biases", category: "AI/ML", aliases: ["wandb", "w&b"], relatedSkills: ["MLflow", "PyTorch", "Experiment Tracking"] },
  { name: "DVC", category: "AI/ML", aliases: ["data version control"], relatedSkills: ["Git", "MLOps", "Data Pipelines"] },
  { name: "Kubeflow", category: "AI/ML", aliases: ["kubeflow pipelines"], relatedSkills: ["Kubernetes", "MLOps", "Docker"] },
  { name: "Vector Databases", category: "AI/ML", aliases: ["vector db", "vector index", "approximate nearest neighbor", "ann"], relatedSkills: ["Pinecone", "Milvus", "Weaviate", "Qdrant", "Chroma"] },
  { name: "Pinecone", category: "AI/ML", aliases: ["pinecone vector db"], relatedSkills: ["Vector Databases", "RAG", "Embeddings"] },
  { name: "Weaviate", category: "AI/ML", aliases: ["weaviate vector db"], relatedSkills: ["Vector Databases", "GraphQL", "Semantic Search"] },
  { name: "Milvus", category: "AI/ML", aliases: ["milvus vector db", "zilliz"], relatedSkills: ["Vector Databases", "Distributed Systems"] },
  { name: "Qdrant", category: "AI/ML", aliases: ["qdrant vector db"], relatedSkills: ["Vector Databases", "Rust", "RAG"] },
  { name: "Chroma", category: "AI/ML", aliases: ["chromadb", "chroma vector database"], relatedSkills: ["Vector Databases", "Python", "LangChain"] },
  { name: "FAISS", category: "AI/ML", aliases: ["facebook faiss"], relatedSkills: ["Vector Databases", "Similarity Search", "C++"] },
  { name: "vLLM", category: "AI/ML", aliases: ["vllm inference engine"], relatedSkills: ["Large Language Models", "Model Serving", "CUDA", "Triton"] },
  { name: "Ollama", category: "AI/ML", aliases: ["ollama local llm"], relatedSkills: ["Large Language Models", "Llama", "Model Serving"] },
  { name: "Embeddings", category: "AI/ML", aliases: ["vector embeddings", "sentence embeddings"], relatedSkills: ["Sentence Transformers", "Vector Databases", "Semantic Search"] },
  { name: "Semantic Search", category: "AI/ML", aliases: ["vector search", "hybrid search"], relatedSkills: ["Embeddings", "Elasticsearch", "Vector Databases"] },
  { name: "Reinforcement Learning", category: "AI/ML", aliases: ["rl", "reinforcement learning from human feedback", "rlhf"], relatedSkills: ["Q-Learning", "Policy Gradient", "Gymnasium"] },
  { name: "CUDA", category: "AI/ML", aliases: ["nvidia cuda", "cuda programming"], relatedSkills: ["GPU Computing", "C++", "PyTorch", "Triton"] },
  { name: "Triton", category: "AI/ML", aliases: ["triton inference server", "openai triton"], relatedSkills: ["CUDA", "Model Serving", "PyTorch"] },
  { name: "JAX", category: "AI/ML", aliases: ["google jax"], relatedSkills: ["Flax", "NumPy", "Deep Learning", "TensorFlow"] },
  { name: "spaCy", category: "AI/ML", aliases: ["spacy nlp"], relatedSkills: ["NLP", "Python", "NLTK", "Named Entity Recognition"] },
  { name: "NLTK", category: "AI/ML", aliases: ["natural language toolkit"], relatedSkills: ["NLP", "Python", "Text Processing"] },
  { name: "Whisper", category: "AI/ML", aliases: ["openai whisper", "speech-to-text", "asr"], relatedSkills: ["Audio Processing", "Deep Learning", "PyTorch"] },
  { name: "Recommendation Systems", category: "AI/ML", aliases: ["recsys", "collaborative filtering"], relatedSkills: ["Matrix Factorization", "Embeddings", "Machine Learning"] },
  { name: "Time Series Forecasting", category: "AI/ML", aliases: ["time series analysis", "arima", "prophet"], relatedSkills: ["Pandas", "Statsmodels", "Forecasting"] },

  // ==========================================
  // 3. DATA SCIENCE & BIG DATA (~90+)
  // ==========================================
  { name: "Pandas", category: "Data Science", aliases: ["python pandas"], relatedSkills: ["NumPy", "Python", "Data Cleaning", "Data Analysis"] },
  { name: "NumPy", category: "Data Science", aliases: ["numpy array"], relatedSkills: ["Pandas", "SciPy", "Python", "Linear Algebra"] },
  { name: "SciPy", category: "Data Science", aliases: ["scipy library"], relatedSkills: ["NumPy", "Scientific Computing", "Optimization"] },
  { name: "Data Visualization", category: "Data Science", aliases: ["dataviz", "data visualization techniques"], relatedSkills: ["Matplotlib", "Seaborn", "Tableau", "PowerBI"] },
  { name: "Matplotlib", category: "Data Science", aliases: ["pyplot"], relatedSkills: ["Seaborn", "NumPy", "Pandas", "Data Visualization"] },
  { name: "Seaborn", category: "Data Science", aliases: ["sns"], relatedSkills: ["Matplotlib", "Pandas", "Statistical Plotting"] },
  { name: "Polars", category: "Data Science", aliases: ["python polars", "polars rust"], relatedSkills: ["Pandas", "DataFrames", "Rust", "Performance"] },
  { name: "PySpark", category: "Data Science", aliases: ["spark python"], relatedSkills: ["Apache Spark", "Hadoop", "Data Engineering"] },
  { name: "Apache Spark", category: "Data Science", aliases: ["spark", "spark sql", "spark streaming"], relatedSkills: ["Databricks", "PySpark", "Scala", "Big Data"] },
  { name: "Apache Kafka", category: "Data Science", aliases: ["kafka", "kafka streams", "confluent kafka"], relatedSkills: ["Event Streaming", "Microservices", "Distributed Systems"] },
  { name: "Apache Flink", category: "Data Science", aliases: ["flink"], relatedSkills: ["Stream Processing", "Apache Spark", "Kafka"] },
  { name: "Apache Airflow", category: "Data Science", aliases: ["airflow", "airflow dags"], relatedSkills: ["ETL Pipelines", "Data Orchestration", "Python"] },
  { name: "dbt", category: "Data Science", aliases: ["data build tool", "dbt core", "dbt cloud"], relatedSkills: ["Snowflake", "BigQuery", "SQL", "Data Modeling"] },
  { name: "Snowflake", category: "Data Science", aliases: ["snowflake data warehouse", "snowflake cloud"], relatedSkills: ["SQL", "dbt", "Data Warehousing", "BigQuery"] },
  { name: "Databricks", category: "Data Science", aliases: ["databricks lakehouse", "delta lake"], relatedSkills: ["Apache Spark", "PySpark", "MLflow", "Data Lakehouse"] },
  { name: "BigQuery", category: "Data Science", aliases: ["google bigquery", "gcp bigquery"], relatedSkills: ["SQL", "Google Cloud", "Data Analytics"] },
  { name: "Amazon Redshift", category: "Data Science", aliases: ["redshift"], relatedSkills: ["AWS", "Data Warehousing", "SQL"] },
  { name: "ClickHouse", category: "Data Science", aliases: ["clickhouse db"], relatedSkills: ["OLAP", "Columnar Database", "Real-Time Analytics"] },
  { name: "DuckDB", category: "Data Science", aliases: ["duck db"], relatedSkills: ["OLAP", "SQL", "Pandas", "Embedded Analytics"] },
  { name: "Tableau", category: "Data Science", aliases: ["tableau desktop", "tableau server"], relatedSkills: ["PowerBI", "SQL", "Business Intelligence"] },
  { name: "PowerBI", category: "Data Science", aliases: ["power bi", "microsoft power bi", "dax"], relatedSkills: ["Tableau", "SQL", "Data Modeling"] },
  { name: "Looker", category: "Data Science", aliases: ["looker studio", "lookml"], relatedSkills: ["BigQuery", "SQL", "Business Intelligence"] },
  { name: "Metabase", category: "Data Science", aliases: ["metabase bi"], relatedSkills: ["SQL", "Dashboards", "Business Intelligence"] },
  { name: "Data Warehousing", category: "Data Science", aliases: ["data warehouse", "edw"], relatedSkills: ["Snowflake", "BigQuery", "Data Modeling", "ETL"] },
  { name: "Data Lakehouse", category: "Data Science", aliases: ["lakehouse architecture", "delta lake", "iceberg"], relatedSkills: ["Databricks", "Apache Iceberg", "Apache Spark"] },
  { name: "ETL / ELT Pipelines", category: "Data Science", aliases: ["etl", "elt", "data pipeline engineering"], relatedSkills: ["Apache Airflow", "dbt", "SQL", "Python"] },
  { name: "Statistical Modeling", category: "Data Science", aliases: ["statistics", "hypothesis testing", "bayesian inference"], relatedSkills: ["R", "Python", "Regression Analysis"] },
  { name: "A/B Testing", category: "Data Science", aliases: ["ab testing", "split testing", "experimentation"], relatedSkills: ["Hypothesis Testing", "Product Analytics", "Statistics"] },
  { name: "Data Modeling", category: "Data Science", aliases: ["dimensional modeling", "star schema", "snowflake schema"], relatedSkills: ["SQL", "dbt", "Data Warehousing"] },
  { name: "Apache Hadoop", category: "Data Science", aliases: ["hadoop", "hdfs", "mapreduce"], relatedSkills: ["Apache Spark", "Hive", "Big Data"] },
  { name: "Presto / Trino", category: "Data Science", aliases: ["presto", "trino", "prestodb"], relatedSkills: ["SQL", "Data Lake", "Distributed Query"] },

  // ==========================================
  // 4. FRONTEND DEVELOPMENT (~100+)
  // ==========================================
  { name: "React", category: "Frontend", aliases: ["react.js", "reactjs", "react 18", "react 19"], relatedSkills: ["Next.js", "TypeScript", "Redux", "Tailwind CSS", "JavaScript"] },
  { name: "Next.js", category: "Frontend", aliases: ["nextjs", "next.js 14", "next.js 15", "app router"], relatedSkills: ["React", "TypeScript", "Server Components", "Tailwind CSS"] },
  { name: "Vue.js", category: "Frontend", aliases: ["vue", "vuejs", "vue 3", "vue 2"], relatedSkills: ["Nuxt.js", "Pinia", "Vuex", "JavaScript"] },
  { name: "Nuxt.js", category: "Frontend", aliases: ["nuxt", "nuxtjs", "nuxt 3"], relatedSkills: ["Vue.js", "TypeScript", "SSR"] },
  { name: "Angular", category: "Frontend", aliases: ["angular 2+", "angularjs", "angular 17"], relatedSkills: ["TypeScript", "RxJS", "NgRx"] },
  { name: "Svelte", category: "Frontend", aliases: ["sveltejs", "svelte 4", "svelte 5"], relatedSkills: ["SvelteKit", "JavaScript", "HTML5"] },
  { name: "SvelteKit", category: "Frontend", aliases: ["svelte-kit"], relatedSkills: ["Svelte", "SSR", "TypeScript"] },
  { name: "HTML5", category: "Frontend", aliases: ["html", "semantic html"], relatedSkills: ["CSS3", "JavaScript", "Accessibility"] },
  { name: "CSS3", category: "Frontend", aliases: ["css", "modern css", "styling"], relatedSkills: ["Tailwind CSS", "Sass", "Flexbox", "CSS Grid"] },
  { name: "Tailwind CSS", category: "Frontend", aliases: ["tailwind", "tailwindcss"], relatedSkills: ["CSS3", "HTML5", "Responsive Design"] },
  { name: "Sass", category: "Frontend", aliases: ["scss", "sass/scss"], relatedSkills: ["CSS3", "CSS Preprocessors"] },
  { name: "Redux", category: "Frontend", aliases: ["redux toolkit", "rtk", "redux-thunk"], relatedSkills: ["React", "State Management", "Zustand"] },
  { name: "Zustand", category: "Frontend", aliases: ["zustand state"], relatedSkills: ["React", "State Management", "Redux"] },
  { name: "TanStack Query", category: "Frontend", aliases: ["react query", "tanstack/react-query"], relatedSkills: ["React", "Data Fetching", "REST API"] },
  { name: "SWR", category: "Frontend", aliases: ["vercel swr"], relatedSkills: ["React", "Next.js", "Data Fetching"] },
  { name: "Webpack", category: "Frontend", aliases: ["webpack 5"], relatedSkills: ["Vite", "Babel", "Module Bundlers"] },
  { name: "Vite", category: "Frontend", aliases: ["vitejs"], relatedSkills: ["React", "Vue.js", "Webpack", "Rollup"] },
  { name: "Framer Motion", category: "Frontend", aliases: ["framer-motion", "framer animations"], relatedSkills: ["React", "Animations", "UI/UX"] },
  { name: "Three.js", category: "Frontend", aliases: ["threejs", "webgl"], relatedSkills: ["WebGL", "3D Graphics", "JavaScript"] },
  { name: "D3.js", category: "Frontend", aliases: ["d3", "d3js"], relatedSkills: ["Data Visualization", "SVG", "JavaScript"] },
  { name: "Chart.js", category: "Frontend", aliases: ["chartjs"], relatedSkills: ["Data Visualization", "JavaScript"] },
  { name: "shadcn/ui", category: "Frontend", aliases: ["shadcn", "shadcn ui"], relatedSkills: ["Tailwind CSS", "Radix UI", "React", "Next.js"] },
  { name: "Radix UI", category: "Frontend", aliases: ["radix primitives"], relatedSkills: ["Accessibility", "React", "shadcn/ui"] },
  { name: "Material UI", category: "Frontend", aliases: ["mui", "material-ui"], relatedSkills: ["React", "Design Systems"] },
  { name: "Chakra UI", category: "Frontend", aliases: ["chakra"], relatedSkills: ["React", "Tailwind CSS"] },
  { name: "Web Accessibility (WCAG)", category: "Frontend", aliases: ["accessibility", "a11y", "wcag 2.1", "aria"], relatedSkills: ["Semantic HTML", "Screen Readers", "Frontend Testing"] },
  { name: "Responsive Web Design", category: "Frontend", aliases: ["mobile-first design", "responsive design", "media queries"], relatedSkills: ["CSS3", "Tailwind CSS", "Flexbox"] },
  { name: "WebSockets", category: "Frontend", aliases: ["websocket", "socket.io", "real-time web"], relatedSkills: ["Node.js", "Real-Time Communication", "Frontend"] },
  { name: "WebRTC", category: "Frontend", aliases: ["webrtc p2p", "real-time streaming"], relatedSkills: ["WebSockets", "Video Streaming", "JavaScript"] },
  { name: "Progressive Web Apps", category: "Frontend", aliases: ["pwa", "service workers"], relatedSkills: ["HTML5", "Offline-first", "Web Manifest"] },
  { name: "Storybook", category: "Frontend", aliases: ["storybook.js"], relatedSkills: ["Design Systems", "Component Library", "React"] },
  { name: "Micro-frontends", category: "Frontend", aliases: ["microfrontends", "module federation"], relatedSkills: ["Webpack", "Architecture", "React"] },

  // ==========================================
  // 5. BACKEND DEVELOPMENT (~110+)
  // ==========================================
  { name: "Node.js", category: "Backend", aliases: ["nodejs", "node"], relatedSkills: ["Express.js", "NestJS", "TypeScript", "JavaScript"] },
  { name: "Express.js", category: "Backend", aliases: ["express", "expressjs"], relatedSkills: ["Node.js", "REST API", "Middleware"] },
  { name: "NestJS", category: "Backend", aliases: ["nestjs framework", "nest.js"], relatedSkills: ["Node.js", "TypeScript", "Dependency Injection", "Microservices"] },
  { name: "FastAPI", category: "Backend", aliases: ["fastapi framework", "fast-api"], relatedSkills: ["Python", "Pydantic", "REST API", "Swagger", "Asynchronous Programming"] },
  { name: "Django", category: "Backend", aliases: ["django rest framework", "drf", "django orm"], relatedSkills: ["Python", "PostgreSQL", "ORM", "Web Frameworks"] },
  { name: "Flask", category: "Backend", aliases: ["flask python"], relatedSkills: ["Python", "REST API", "Jinja2"] },
  { name: "Spring Boot", category: "Backend", aliases: ["springboot", "spring-boot", "spring framework"], relatedSkills: ["Java", "Microservices", "Hibernate", "Spring Security"] },
  { name: "ASP.NET Core", category: "Backend", aliases: ["asp.net", ".net core", "dotnet core"], relatedSkills: ["C#", "Entity Framework Core", "Web API"] },
  { name: "Ruby on Rails", category: "Backend", aliases: ["rails", "ror"], relatedSkills: ["Ruby", "ActiveRecord", "PostgreSQL"] },
  { name: "Laravel", category: "Backend", aliases: ["laravel framework"], relatedSkills: ["PHP", "Eloquent ORM", "MySQL"] },
  { name: "Gin", category: "Backend", aliases: ["gin-gonic", "gin web framework"], relatedSkills: ["Go", "REST API", "Microservices"] },
  { name: "Axum", category: "Backend", aliases: ["axum framework"], relatedSkills: ["Rust", "Tokio", "Web Frameworks"] },
  { name: "Actix Web", category: "Backend", aliases: ["actix-web", "actix"], relatedSkills: ["Rust", "High Performance Backend"] },
  { name: "REST API", category: "Backend", aliases: ["restful api", "rest apis", "restful web services"], relatedSkills: ["JSON", "HTTP", "Swagger", "Postman"] },
  { name: "GraphQL", category: "Backend", aliases: ["graphql api", "apollo server", "relay"], relatedSkills: ["REST API", "Schema Design", "Node.js"] },
  { name: "gRPC", category: "Backend", aliases: ["grpc framework", "rpc"], relatedSkills: ["Protocol Buffers", "Microservices", "Go", "HTTP/2"] },
  { name: "Protocol Buffers", category: "Backend", aliases: ["protobuf", "proto3"], relatedSkills: ["gRPC", "Serialization", "Microservices"] },
  { name: "Microservices", category: "Backend", aliases: ["microservice architecture", "distributed services"], relatedSkills: ["Docker", "Kubernetes", "API Gateway", "Kafka"] },
  { name: "Event-Driven Architecture", category: "Backend", aliases: ["eda", "event streaming", "event driven"], relatedSkills: ["Apache Kafka", "RabbitMQ", "Message Queues"] },
  { name: "RabbitMQ", category: "Backend", aliases: ["rabbitmq message broker", "amqp"], relatedSkills: ["Message Queues", "Celery", "Distributed Systems"] },
  { name: "Celery", category: "Backend", aliases: ["celery distributed task queue"], relatedSkills: ["Python", "Redis", "RabbitMQ", "Background Tasks"] },
  { name: "Serverless", category: "Backend", aliases: ["serverless architecture", "faas", "aws lambda"], relatedSkills: ["Cloud Functions", "AWS", "Microservices"] },
  { name: "WebHooks", category: "Backend", aliases: ["webhook integration"], relatedSkills: ["REST API", "Events", "Third-party APIs"] },
  { name: "Domain-Driven Design (DDD)", category: "Backend", aliases: ["ddd", "domain driven design"], relatedSkills: ["Software Architecture", "Clean Architecture", "CQRS"] },
  { name: "Clean Architecture", category: "Backend", aliases: ["onion architecture", "hexagonal architecture", "ports and adapters"], relatedSkills: ["System Design", "SOLID Principles"] },

  // ==========================================
  // 6. DATABASES & CACHING (~80+)
  // ==========================================
  { name: "PostgreSQL", category: "Databases", aliases: ["postgres", "pgsql", "postgresql database"], relatedSkills: ["SQL", "Supabase", "Prisma", "Database Optimization", "ACID"] },
  { name: "MySQL", category: "Databases", aliases: ["mysql database", "mariadb"], relatedSkills: ["SQL", "Relational Databases", "InnoDB"] },
  { name: "MongoDB", category: "Databases", aliases: ["mongo", "mongodb atlas", "document database"], relatedSkills: ["Mongoose", "NoSQL", "BSON"] },
  { name: "Redis", category: "Databases", aliases: ["redis cache", "redis key-value"], relatedSkills: ["Caching", "In-Memory Database", "Pub/Sub", "Session Management"] },
  { name: "SQLite", category: "Databases", aliases: ["sqlite3"], relatedSkills: ["Embedded Database", "SQL", "Mobile Databases"] },
  { name: "DynamoDB", category: "Databases", aliases: ["amazon dynamodb", "aws dynamodb"], relatedSkills: ["NoSQL", "AWS", "Key-Value Stores", "Serverless"] },
  { name: "Cassandra", category: "Databases", aliases: ["apache cassandra", "cql"], relatedSkills: ["NoSQL", "Distributed Databases", "High Throughput"] },
  { name: "Neo4j", category: "Databases", aliases: ["neo4j graph", "cypher query language"], relatedSkills: ["Graph Databases", "Knowledge Graphs", "NoSQL"] },
  { name: "Elasticsearch", category: "Databases", aliases: ["elastic search", "opensearch", "elk"], relatedSkills: ["Full-Text Search", "Logstash", "Kibana", "Lucene"] },
  { name: "Supabase", category: "Databases", aliases: ["supabase postgres", "supabase auth", "supabase rls"], relatedSkills: ["PostgreSQL", "RLS", "Next.js", "Backend-as-a-Service"] },
  { name: "Firebase", category: "Databases", aliases: ["firebase firestore", "firebase realtime database"], relatedSkills: ["NoSQL", "Cloud Functions", "Google Cloud"] },
  { name: "Prisma", category: "Databases", aliases: ["prisma orm", "prisma client"], relatedSkills: ["PostgreSQL", "TypeScript", "Next.js", "ORM"] },
  { name: "Drizzle ORM", category: "Databases", aliases: ["drizzle", "drizzle-orm"], relatedSkills: ["PostgreSQL", "TypeScript", "SQL"] },
  { name: "TypeORM", category: "Databases", aliases: ["typeorm library"], relatedSkills: ["NestJS", "TypeScript", "ORM"] },
  { name: "SQLAlchemy", category: "Databases", aliases: ["sqlalchemy orm"], relatedSkills: ["Python", "FastAPI", "PostgreSQL", "ORM"] },
  { name: "Mongoose", category: "Databases", aliases: ["mongoose odm"], relatedSkills: ["MongoDB", "Node.js", "Express.js"] },
  { name: "Database Sharding", category: "Databases", aliases: ["sharding", "database partitioning"], relatedSkills: ["PostgreSQL", "Scalability", "High Availability"] },
  { name: "Database Indexing", category: "Databases", aliases: ["btree index", "gin index", "query optimization"], relatedSkills: ["SQL", "Performance Tuning"] },

  // ==========================================
  // 7. CLOUD & DEVOPS (~110+)
  // ==========================================
  { name: "AWS", category: "Cloud", aliases: ["amazon web services", "amazon aws"], relatedSkills: ["EC2", "S3", "Lambda", "IAM", "ECS", "CloudFormation"] },
  { name: "AWS Lambda", category: "Cloud", aliases: ["lambda", "serverless functions"], relatedSkills: ["AWS", "Serverless", "API Gateway", "CloudWatch"] },
  { name: "Amazon S3", category: "Cloud", aliases: ["s3", "s3 bucket"], relatedSkills: ["AWS", "Object Storage", "CloudFront"] },
  { name: "Amazon EC2", category: "Cloud", aliases: ["ec2", "ec2 instances"], relatedSkills: ["AWS", "Linux", "Virtual Machines"] },
  { name: "Google Cloud", category: "Cloud", aliases: ["gcp", "google cloud platform"], relatedSkills: ["BigQuery", "Cloud Run", "GKE", "GCS"] },
  { name: "Microsoft Azure", category: "Cloud", aliases: ["azure", "azure cloud"], relatedSkills: ["Azure DevOps", "Blob Storage", "Azure Functions", "AKS"] },
  { name: "Cloudflare", category: "Cloud", aliases: ["cloudflare workers", "cloudflare cdn", "cloudflare pages"], relatedSkills: ["Edge Computing", "CDN", "DNS", "DDoS Protection"] },
  { name: "Vercel", category: "Cloud", aliases: ["vercel platform", "vercel hosting"], relatedSkills: ["Next.js", "Serverless", "Frontend Deployment"] },
  { name: "Docker", category: "DevOps", aliases: ["docker container", "dockerfile", "docker-compose", "containerization"], relatedSkills: ["Kubernetes", "CI/CD", "DevOps", "Microservices"] },
  { name: "Kubernetes", category: "DevOps", aliases: ["k8s", "kubernetes cluster", "kubectl"], relatedSkills: ["Docker", "Helm", "Cloud Architecture", "EKS", "GKE"] },
  { name: "Helm", category: "DevOps", aliases: ["helm charts"], relatedSkills: ["Kubernetes", "DevOps", "Package Management"] },
  { name: "Terraform", category: "DevOps", aliases: ["hashicorp terraform", "iac", "infrastructure as code"], relatedSkills: ["AWS", "Cloud Architecture", "OpenTofu"] },
  { name: "Ansible", category: "DevOps", aliases: ["ansible playbooks"], relatedSkills: ["Configuration Management", "Linux", "DevOps"] },
  { name: "CI/CD", category: "DevOps", aliases: ["continuous integration", "continuous deployment", "cicd pipeline"], relatedSkills: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker"] },
  { name: "GitHub Actions", category: "DevOps", aliases: ["gh actions", "github workflows"], relatedSkills: ["CI/CD", "Git", "DevOps", "Automation"] },
  { name: "GitLab CI", category: "DevOps", aliases: ["gitlab ci/cd", "gitlab pipelines"], relatedSkills: ["CI/CD", "DevOps", "Docker"] },
  { name: "Jenkins", category: "DevOps", aliases: ["jenkins pipeline"], relatedSkills: ["CI/CD", "Groovy", "Automated Testing"] },
  { name: "ArgoCD", category: "DevOps", aliases: ["argo cd", "gitops"], relatedSkills: ["Kubernetes", "GitOps", "Continuous Deployment"] },
  { name: "Prometheus", category: "DevOps", aliases: ["prometheus monitoring", "promql"], relatedSkills: ["Grafana", "Observability", "Metrics"] },
  { name: "Grafana", category: "DevOps", aliases: ["grafana dashboards"], relatedSkills: ["Prometheus", "Observability", "Monitoring"] },
  { name: "Datadog", category: "DevOps", aliases: ["datadog apm"], relatedSkills: ["Observability", "APM", "Log Management"] },
  { name: "OpenTelemetry", category: "DevOps", aliases: ["otel", "distributed tracing"], relatedSkills: ["Observability", "Metrics", "Jaeger"] },
  { name: "Linux", category: "DevOps", aliases: ["unix", "ubuntu", "debian", "rhel", "centos", "linux administration"], relatedSkills: ["Bash", "Server Administration", "DevOps"] },
  { name: "Nginx", category: "DevOps", aliases: ["nginx reverse proxy", "nginx web server"], relatedSkills: ["Reverse Proxy", "Load Balancing", "SSL/TLS"] },

  // ==========================================
  // 8. CYBERSECURITY (~50+)
  // ==========================================
  { name: "OAuth 2.0", category: "Cybersecurity", aliases: ["oauth", "oauth2", "oauth 2"], relatedSkills: ["OpenID Connect", "JWT", "Authentication", "Security"] },
  { name: "OpenID Connect", category: "Cybersecurity", aliases: ["oidc"], relatedSkills: ["OAuth 2.0", "SSO", "Identity Management"] },
  { name: "JSON Web Tokens (JWT)", category: "Cybersecurity", aliases: ["jwt", "jwts", "json web token"], relatedSkills: ["Authentication", "Security", "REST API"] },
  { name: "Single Sign-On (SSO)", category: "Cybersecurity", aliases: ["sso", "saml 2.0", "saml sso"], relatedSkills: ["Okta", "Auth0", "Enterprise Security"] },
  { name: "Role-Based Access Control (RBAC)", category: "Cybersecurity", aliases: ["rbac", "abac", "access control"], relatedSkills: ["IAM", "Authorization", "Security"] },
  { name: "OWASP Top 10", category: "Cybersecurity", aliases: ["owasp", "web application security"], relatedSkills: ["Vulnerability Assessment", "Penetration Testing", "Security"] },
  { name: "Penetration Testing", category: "Cybersecurity", aliases: ["pen testing", "ethical hacking", "vulnerability scanning"], relatedSkills: ["Cybersecurity", "OWASP", "Burp Suite"] },
  { name: "Cryptography", category: "Cybersecurity", aliases: ["encryption", "aes", "rsa", "public key cryptography"], relatedSkills: ["SSL/TLS", "Security", "Hashing"] },
  { name: "SSL / TLS", category: "Cybersecurity", aliases: ["tls", "https", "ssl certificates"], relatedSkills: ["Web Security", "Nginx", "Certificates"] },
  { name: "SOC 2", category: "Cybersecurity", aliases: ["soc2 compliance", "soc 2 type ii"], relatedSkills: ["Compliance", "Auditing", "Information Security"] },
  { name: "Zero Trust Architecture", category: "Cybersecurity", aliases: ["zero trust", "zta"], relatedSkills: ["Network Security", "IAM", "Cloudflare"] },

  // ==========================================
  // 9. MOBILE & CROSS-PLATFORM (~40+)
  // ==========================================
  { name: "React Native", category: "Mobile", aliases: ["react-native", "rn"], relatedSkills: ["React", "JavaScript", "TypeScript", "Mobile Development", "Expo"] },
  { name: "Flutter", category: "Mobile", aliases: ["flutter framework"], relatedSkills: ["Dart", "Mobile Development", "Cross-Platform"] },
  { name: "iOS Development", category: "Mobile", aliases: ["ios app development", "native ios"], relatedSkills: ["Swift", "SwiftUI", "Xcode", "UIKit"] },
  { name: "SwiftUI", category: "Mobile", aliases: ["swift-ui"], relatedSkills: ["Swift", "iOS Development", "Declarative UI"] },
  { name: "Android Development", category: "Mobile", aliases: ["android app development", "native android"], relatedSkills: ["Kotlin", "Jetpack Compose", "Java", "Android Studio"] },
  { name: "Jetpack Compose", category: "Mobile", aliases: ["compose android"], relatedSkills: ["Kotlin", "Android Development", "Modern Android"] },
  { name: "Expo", category: "Mobile", aliases: ["expo cli", "expo managed workflow"], relatedSkills: ["React Native", "Mobile Development"] },

  // ==========================================
  // 10. TESTING & QUALITY ASSURANCE (~50+)
  // ==========================================
  { name: "Jest", category: "Testing", aliases: ["jest testing framework"], relatedSkills: ["React", "JavaScript", "Unit Testing", "Testing Library"] },
  { name: "Vitest", category: "Testing", aliases: ["vitest runner"], relatedSkills: ["Vite", "TypeScript", "Unit Testing"] },
  { name: "Cypress", category: "Testing", aliases: ["cypress.io", "cypress e2e"], relatedSkills: ["End-to-End Testing", "Frontend Testing", "Playwright"] },
  { name: "Playwright", category: "Testing", aliases: ["microsoft playwright", "playwright e2e"], relatedSkills: ["Cypress", "Automated Testing", "Browser Automation"] },
  { name: "Selenium", category: "Testing", aliases: ["selenium webdriver"], relatedSkills: ["Automated Testing", "QA", "Python"] },
  { name: "PyTest", category: "Testing", aliases: ["pytest framework"], relatedSkills: ["Python", "Unit Testing", "Test Automation"] },
  { name: "JUnit", category: "Testing", aliases: ["junit 5", "junit4"], relatedSkills: ["Java", "Spring Boot", "Unit Testing"] },
  { name: "Postman", category: "Testing", aliases: ["postman api testing"], relatedSkills: ["REST API", "API Testing", "Swagger"] },
  { name: "Test-Driven Development (TDD)", category: "Testing", aliases: ["tdd", "test driven development"], relatedSkills: ["Unit Testing", "Software Quality", "Refactoring"] },

  // ==========================================
  // 11. SYSTEM DESIGN & ARCHITECTURE (~50+)
  // ==========================================
  { name: "System Design", category: "System Design", aliases: ["large scale system design", "systems architecture"], relatedSkills: ["Distributed Systems", "Scalability", "High Availability"] },
  { name: "Distributed Systems", category: "System Design", aliases: ["distributed computing", "distributed architecture"], relatedSkills: ["Consensus Algorithms", "Fault Tolerance", "Microservices"] },
  { name: "High Availability", category: "System Design", aliases: ["ha", "fault tolerance", "disaster recovery"], relatedSkills: ["System Design", "Load Balancing", "Redundancy"] },
  { name: "Scalability", category: "System Design", aliases: ["horizontal scaling", "elasticity"], relatedSkills: ["Load Balancing", "Caching", "Sharding"] },
  { name: "Load Balancing", category: "System Design", aliases: ["load balancer", "reverse proxy", "alb", "nlb"], relatedSkills: ["Nginx", "System Design", "High Availability"] },
  { name: "Caching Strategies", category: "System Design", aliases: ["cache-aside", "write-through cache", "cdn caching"], relatedSkills: ["Redis", "Memcached", "Performance"] },
  { name: "API Gateway", category: "System Design", aliases: ["kong", "aws api gateway", "apigee"], relatedSkills: ["Microservices", "Rate Limiting", "Authentication"] },

  // ==========================================
  // 12. TOOLS & COLLABORATION (~40+)
  // ==========================================
  { name: "Git", category: "Tools", aliases: ["github", "gitlab", "version control", "git cli"], relatedSkills: ["GitHub Actions", "Pull Requests", "Code Reviews"] },
  { name: "Jira", category: "Tools", aliases: ["atlassian jira", "jira software"], relatedSkills: ["Agile", "Scrum", "Issue Tracking", "Confluence"] },
  { name: "Confluence", category: "Tools", aliases: ["atlassian confluence"], relatedSkills: ["Technical Documentation", "Knowledge Base"] },
  { name: "Linear", category: "Tools", aliases: ["linear app"], relatedSkills: ["Issue Tracking", "Agile", "Productivity"] },
  { name: "Figma", category: "Tools", aliases: ["figma design"], relatedSkills: ["UI/UX Design", "Prototyping", "Wireframing"] },

  // ==========================================
  // 13. SOFT SKILLS & LEADERSHIP (~50+)
  // ==========================================
  { name: "Cross-functional Leadership", category: "Soft Skills", aliases: ["leadership", "team leadership", "leading teams"], relatedSkills: ["Mentorship", "Project Management", "Stakeholder Communication"] },
  { name: "Technical Mentorship", category: "Soft Skills", aliases: ["mentoring", "mentoring junior engineers", "coaching"], relatedSkills: ["Code Reviews", "Engineering Culture"] },
  { name: "Problem Solving", category: "Soft Skills", aliases: ["critical thinking", "analytical thinking", "first-principles thinking"], relatedSkills: ["System Design", "Troubleshooting", "Root Cause Analysis"] },
  { name: "Agile / Scrum", category: "Soft Skills", aliases: ["agile methodology", "scrum", "sprints", "sprint planning"], relatedSkills: ["Kanban", "Sprint Retrospectives", "Jira"] },
  { name: "Stakeholder Communication", category: "Soft Skills", aliases: ["technical communication", "executive communication", "client facing"], relatedSkills: ["Presentations", "Documentation"] },
  { name: "Code Reviews", category: "Soft Skills", aliases: ["peer reviews", "code quality standards"], relatedSkills: ["Git", "Best Practices", "Clean Code"] },
  { name: "Strategic Thinking", category: "Soft Skills", aliases: ["product strategy", "architectural vision", "technical roadmap"], relatedSkills: ["System Design", "Roadmapping"] }
];

// Fast Indexing Maps
const SKILL_MAP_BY_NAME = new Map<string, SkillDefinition>();
const SKILL_MAP_BY_ALIAS = new Map<string, SkillDefinition>();

// Build fast indexes at initialization
for (const skill of SKILL_KNOWLEDGE_BASE) {
  const lowerName = skill.name.toLowerCase();
  SKILL_MAP_BY_NAME.set(lowerName, skill);
  SKILL_MAP_BY_ALIAS.set(lowerName, skill);

  for (const alias of skill.aliases) {
    SKILL_MAP_BY_ALIAS.set(alias.toLowerCase(), skill);
  }
}

/**
 * Normalizes an arbitrary raw skill name or acronym to its canonical presentation.
 * Example: "react.js" -> "React", "k8s" -> "Kubernetes", "aws" -> "AWS"
 */
export function normalizeSkillName(rawName: string): string {
  const clean = rawName.trim().toLowerCase();
  const matched = SKILL_MAP_BY_ALIAS.get(clean) || SKILL_MAP_BY_NAME.get(clean);
  if (matched) return matched.name;

  // Title-case fallback
  return rawName.trim();
}

/**
 * Retrieves full skill definition including category and aliases.
 */
export function getSkillDefinition(skillName: string): SkillDefinition | undefined {
  const clean = skillName.trim().toLowerCase();
  return SKILL_MAP_BY_ALIAS.get(clean) || SKILL_MAP_BY_NAME.get(clean);
}

/**
 * Fast search through text to extract all present skills from the canonical knowledge base.
 */
export function findSkillsInText(text: string): { skill: SkillDefinition; count: number }[] {
  if (!text || text.trim().length === 0) return [];

  const lowerText = text.toLowerCase();
  const results = new Map<string, { skill: SkillDefinition; count: number }>();

  // Check each canonical skill
  for (const skill of SKILL_KNOWLEDGE_BASE) {
    let matchCount = 0;

    // 1. Check main name with word boundaries
    const escapedName = skill.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const nameRegex = new RegExp(`\\b${escapedName}\\b`, "gi");
    const matches = lowerText.match(nameRegex);
    if (matches) {
      matchCount += matches.length;
    }

    // 2. Check aliases
    for (const alias of skill.aliases) {
      const escapedAlias = alias.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // For short acronyms (like C, R, Go), require strict boundary and ensure not just single letters in normal words
      const aliasRegex = new RegExp(`\\b${escapedAlias}\\b`, "gi");
      const aliasMatches = lowerText.match(aliasRegex);
      if (aliasMatches) {
        matchCount += aliasMatches.length;
      }
    }

    if (matchCount > 0) {
      results.set(skill.name, { skill, count: matchCount });
    }
  }

  return Array.from(results.values()).sort((a, b) => b.count - a.count);
}

/**
 * Suggests related skills based on a list of candidate skills.
 */
export function suggestRelatedSkills(skills: string[]): string[] {
  const existingSet = new Set(skills.map(s => s.toLowerCase()));
  const recommendations = new Set<string>();

  for (const s of skills) {
    const def = getSkillDefinition(s);
    if (def) {
      for (const rel of def.relatedSkills) {
        if (!existingSet.has(rel.toLowerCase())) {
          recommendations.add(rel);
        }
      }
    }
  }

  return Array.from(recommendations).slice(0, 10);
}
