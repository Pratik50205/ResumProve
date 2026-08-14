import { SkillCategory } from "@/types/resume";

export interface SkillDefinition {
  name: string;
  category: SkillCategory;
  aliases: string[];
  relatedSkills: string[];
}

export const SKILL_KNOWLEDGE_BASE: SkillDefinition[] = [
  // Programming
  { name: "Python", category: "Programming", aliases: ["py", "python3", "python 3"], relatedSkills: ["Django", "FastAPI", "NumPy", "Pandas"] },
  { name: "JavaScript", category: "Programming", aliases: ["js", "es6", "ecmascript"], relatedSkills: ["TypeScript", "Node.js", "React"] },
  { name: "TypeScript", category: "Programming", aliases: ["ts"], relatedSkills: ["JavaScript", "React", "Next.js", "Node.js"] },
  { name: "Java", category: "Programming", aliases: ["core java", "java 8", "java 17"], relatedSkills: ["Spring Boot", "Hibernate", "JVM"] },
  { name: "C++", category: "Programming", aliases: ["cpp", "c/c++"], relatedSkills: ["C", "STL", "Data Structures", "Algorithms"] },
  { name: "C#", category: "Programming", aliases: ["csharp", ".net"], relatedSkills: [".NET Core", "ASP.NET", "Entity Framework"] },
  { name: "Go", category: "Programming", aliases: ["golang"], relatedSkills: ["Docker", "Kubernetes", "Microservices", "gRPC"] },
  { name: "Rust", category: "Programming", aliases: ["rust-lang"], relatedSkills: ["Systems Programming", "WebAssembly"] },
  { name: "SQL", category: "Programming", aliases: ["structured query language", "ansi sql"], relatedSkills: ["PostgreSQL", "MySQL", "Database Design"] },

  // AI/ML & Data Science
  { name: "Machine Learning", category: "AI/ML", aliases: ["ml", "applied machine learning"], relatedSkills: ["Scikit-learn", "Python", "Deep Learning"] },
  { name: "Deep Learning", category: "AI/ML", aliases: ["dl", "neural networks"], relatedSkills: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN"] },
  { name: "Natural Language Processing", category: "AI/ML", aliases: ["nlp", "text processing"], relatedSkills: ["BERT", "Transformers", "spaCy", "NLTK", "LLMs"] },
  { name: "Computer Vision", category: "AI/ML", aliases: ["cv", "image processing"], relatedSkills: ["OpenCV", "PyTorch", "YOLO", "CNN"] },
  { name: "PyTorch", category: "AI/ML", aliases: ["pytorch", "torch"], relatedSkills: ["Python", "Deep Learning", "TensorFlow"] },
  { name: "TensorFlow", category: "AI/ML", aliases: ["tf", "tensorflow 2.0"], relatedSkills: ["Keras", "PyTorch", "Deep Learning"] },
  { name: "Scikit-learn", category: "AI/ML", aliases: ["sklearn", "scikit learn", "scikitlearn"], relatedSkills: ["Machine Learning", "Python", "Pandas"] },
  { name: "Large Language Models", category: "AI/ML", aliases: ["llm", "llms", "generative ai", "genai"], relatedSkills: ["LangChain", "RAG", "Prompt Engineering", "OpenAI", "Gemini"] },
  { name: "RAG", category: "AI/ML", aliases: ["retrieval-augmented generation", "retrieval augmented generation"], relatedSkills: ["Vector Databases", "LangChain", "LlamaIndex", "Embeddings"] },
  { name: "Pandas", category: "Data Science", aliases: ["python pandas"], relatedSkills: ["NumPy", "Data Analysis", "Python"] },
  { name: "NumPy", category: "Data Science", aliases: ["numpy"], relatedSkills: ["Pandas", "SciPy", "Python"] },
  { name: "Data Visualization", category: "Data Science", aliases: ["dataviz", "data viz"], relatedSkills: ["Matplotlib", "Seaborn", "Tableau", "PowerBI"] },
  { name: "Tableau", category: "Data Science", aliases: ["tableau desktop"], relatedSkills: ["PowerBI", "SQL", "Data Analysis"] },
  { name: "PowerBI", category: "Data Science", aliases: ["power bi", "microsoft powerbi"], relatedSkills: ["Tableau", "DAX", "SQL"] },

  // Frontend
  { name: "React", category: "Frontend", aliases: ["react.js", "reactjs", "react 18", "react 19"], relatedSkills: ["Next.js", "TypeScript", "Redux", "Tailwind CSS"] },
  { name: "Next.js", category: "Frontend", aliases: ["nextjs", "next.js 14", "next.js 15"], relatedSkills: ["React", "TypeScript", "Server Components", "Tailwind CSS"] },
  { name: "Vue.js", category: "Frontend", aliases: ["vue", "vuejs", "vue 3"], relatedSkills: ["Nuxt.js", "Pinia", "JavaScript"] },
  { name: "Tailwind CSS", category: "Frontend", aliases: ["tailwind", "tailwindcss"], relatedSkills: ["CSS3", "HTML5", "Responsive Design"] },
  { name: "HTML5", category: "Frontend", aliases: ["html", "semantic html"], relatedSkills: ["CSS3", "JavaScript", "Accessibility"] },
  { name: "CSS3", category: "Frontend", aliases: ["css", "styling"], relatedSkills: ["Tailwind CSS", "Sass", "Responsive Design"] },
  { name: "Redux", category: "Frontend", aliases: ["redux toolkit", "rtk"], relatedSkills: ["React", "State Management", "Zustand"] },

  // Backend
  { name: "Node.js", category: "Backend", aliases: ["nodejs", "node"], relatedSkills: ["Express.js", "NestJS", "TypeScript", "JavaScript"] },
  { name: "Express.js", category: "Backend", aliases: ["express", "expressjs"], relatedSkills: ["Node.js", "REST API", "Middleware"] },
  { name: "FastAPI", category: "Backend", aliases: ["fastapi", "fast-api"], relatedSkills: ["Python", "Pydantic", "REST API", "Swagger"] },
  { name: "Django", category: "Backend", aliases: ["django rest framework", "drf"], relatedSkills: ["Python", "PostgreSQL", "ORM"] },
  { name: "Spring Boot", category: "Backend", aliases: ["springboot", "spring-boot", "spring framework"], relatedSkills: ["Java", "Microservices", "Hibernate"] },
  { name: "GraphQL", category: "Backend", aliases: ["graphql api", "apollo"], relatedSkills: ["REST API", "Node.js", "Apollo Server"] },
  { name: "REST API", category: "Backend", aliases: ["restful api", "rest apis", "rest"], relatedSkills: ["JSON", "FastAPI", "Express.js", "Swagger"] },

  // Databases
  { name: "PostgreSQL", category: "Databases", aliases: ["postgres", "pgsql", "postgresql database"], relatedSkills: ["SQL", "Supabase", "Prisma", "Database Optimization"] },
  { name: "MongoDB", category: "Databases", aliases: ["mongo", "mongodb atlas"], relatedSkills: ["Mongoose", "NoSQL", "Document DB"] },
  { name: "MySQL", category: "Databases", aliases: ["mysql database"], relatedSkills: ["SQL", "Relational Databases", "MariaDB"] },
  { name: "Redis", category: "Databases", aliases: ["redis cache"], relatedSkills: ["Caching", "In-Memory Store", "Pub/Sub"] },
  { name: "Vector Databases", category: "Databases", aliases: ["vector db", "pinecone", "milvus", "qdrant", "chroma"], relatedSkills: ["RAG", "Embeddings", "LLMs"] },
  { name: "Supabase", category: "Databases", aliases: ["supabase postgres", "supabase auth"], relatedSkills: ["PostgreSQL", "RLS", "Next.js", "Backend-as-a-Service"] },

  // Cloud & DevOps
  { name: "Docker", category: "DevOps", aliases: ["docker container", "dockerfile", "containerization"], relatedSkills: ["Kubernetes", "CI/CD", "DevOps"] },
  { name: "Kubernetes", category: "DevOps", aliases: ["k8s", "kubernetes cluster"], relatedSkills: ["Docker", "Helm", "Cloud Architecture"] },
  { name: "AWS", category: "Cloud", aliases: ["amazon web services", "amazon aws"], relatedSkills: ["EC2", "S3", "Lambda", "IAM", "ECS"] },
  { name: "Google Cloud", category: "Cloud", aliases: ["gcp", "google cloud platform"], relatedSkills: ["BigQuery", "Cloud Run", "GCS"] },
  { name: "Azure", category: "Cloud", aliases: ["microsoft azure"], relatedSkills: ["Azure DevOps", "Blob Storage", "Azure Functions"] },
  { name: "CI/CD", category: "DevOps", aliases: ["continuous integration", "github actions", "gitlab ci", "jenkins"], relatedSkills: ["Docker", "DevOps", "Automated Testing"] },
  { name: "Git", category: "Tools", aliases: ["github", "gitlab", "version control"], relatedSkills: ["GitHub Actions", "Pull Requests", "Collaboration"] },
  { name: "Linux", category: "Tools", aliases: ["bash", "unix", "ubuntu"], relatedSkills: ["Shell Scripting", "DevOps", "Server Administration"] },

  // Soft Skills
  { name: "Cross-functional Leadership", category: "Soft Skills", aliases: ["leadership", "team leadership", "leading teams"], relatedSkills: ["Mentorship", "Project Management"] },
  { name: "Problem Solving", category: "Soft Skills", aliases: ["critical thinking", "analytical thinking"], relatedSkills: ["System Design", "Troubleshooting"] },
  { name: "Agile / Scrum", category: "Soft Skills", aliases: ["agile methodology", "scrum", "sprints", "jira"], relatedSkills: ["Kanban", "Sprint Planning"] },
  { name: "Technical Communication", category: "Soft Skills", aliases: ["stakeholder communication", "documentation"], relatedSkills: ["Code Reviews", "Documentation"] }
];

export function normalizeSkillName(rawName: string): string {
  const clean = rawName.trim().toLowerCase();
  for (const skill of SKILL_KNOWLEDGE_BASE) {
    if (skill.name.toLowerCase() === clean) return skill.name;
    for (const alias of skill.aliases) {
      if (alias.toLowerCase() === clean) return skill.name;
    }
  }
  // Return title-cased fallback if not in KB
  return rawName.trim();
}
