import { Resume } from "@/types/resume";

export const SAMPLE_RESUMES: Record<string, Resume> = {
  "ml-engineer": {
    id: "sample-ml-engineer",
    title: "Alex Chen — Machine Learning Engineer",
    personal: {
      fullName: "Alex Chen",
      title: "Senior Machine Learning Engineer",
      email: "alex.chen@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/alexchen-ai",
      github: "https://github.com/alexchen-ml",
      portfolio: "https://alexchen.dev",
      bio: "Machine Learning Engineer with 4+ years of experience designing and deploying production NLP, LLM, and recommendation pipelines."
    },
    summary: "Senior Machine Learning Engineer with 4+ years of experience architecting end-to-end ML pipelines, fine-tuning LLMs, and deploying low-latency inference services. Proven track record of scaling RAG architectures and deep learning models handling 10M+ daily predictions with 99.9% uptime.",
    experience: [
      {
        id: "exp-1",
        title: "Senior Machine Learning Engineer",
        company: "Apex Intelligence",
        location: "San Francisco, CA",
        startDate: "2022-03",
        endDate: "Present",
        isCurrent: true,
        technologies: ["Python", "PyTorch", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "AWS"],
        bullets: [
          "Architected and deployed a multi-tenant RAG pipeline leveraging PyTorch embeddings and pgvector, reducing search latency by 42% across 5M documents.",
          "Fine-tuned open-source LLMs (Llama 3, Mistral) using LoRA/QLoRA for domain-specific entity extraction, improving F1 score from 0.74 to 0.91.",
          "Orchestrated Kubernetes-based asynchronous inference clusters processing over 12M daily requests with sub-80ms p95 latency.",
          "Mentored 4 junior engineers on ML system design, CI/CD automated validation, and GPU memory optimization."
        ]
      },
      {
        id: "exp-2",
        title: "Machine Learning Engineer",
        company: "DataVanguard Labs",
        location: "Seattle, WA",
        startDate: "2020-07",
        endDate: "2022-02",
        isCurrent: false,
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "Docker", "AWS"],
        bullets: [
          "Engineered predictive churn models with Scikit-learn and XGBoost, identifying $1.8M in at-risk annual recurring revenue.",
          "Built automated data ingestion and feature store pipelines in Python and SQL, cutting model retraining cycle time from 3 days to 4 hours.",
          "Collaborated with product teams to translate business metrics into measurable loss functions and evaluation frameworks."
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "VectorFlow — Semantic Search & Neural QA Engine",
        description: "Open-source neural search framework connecting vector databases with streaming LLM generation.",
        technologies: ["Python", "PyTorch", "FastAPI", "Docker", "PostgreSQL", "React"],
        githubUrl: "https://github.com/alexchen-ml/vectorflow",
        liveUrl: "https://vectorflow-demo.io",
        startDate: "2023-01",
        endDate: "2023-08",
        bullets: [
          "Designed hybrid BM25 + dense retrieval indexing system with reciprocal rank fusion, achieving 94.2% top-3 recall.",
          "Implemented streaming SSE token delivery over FastAPI and WebSockets, reducing perceived response time by 60%."
        ]
      },
      {
        id: "proj-2",
        name: "AutoEval — LLM Benchmark Suite",
        description: "Automated benchmarking toolkit for measuring hallucination rates and factual consistency in LLM outputs.",
        technologies: ["Python", "Hugging Face", "Pandas", "Streamlit"],
        githubUrl: "https://github.com/alexchen-ml/autoeval",
        bullets: [
          "Developed metric algorithms for factual grounding, semantic consistency, and context leakage detection.",
          "Adopted by 800+ developers with 1.2k GitHub stars."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of Washington",
        degree: "B.S. in Computer Science",
        fieldOfStudy: "Artificial Intelligence & Data Science",
        startDate: "2016-09",
        endDate: "2020-06",
        gpa: "3.88",
        honors: ["Dean's List (all semesters)", "Magna Cum Laude"]
      }
    ],
    skills: {
      programming: ["Python", "SQL", "TypeScript", "C++", "Bash"],
      aiMl: ["PyTorch", "TensorFlow", "Scikit-learn", "Large Language Models", "RAG", "Natural Language Processing", "Deep Learning"],
      dataScience: ["Pandas", "NumPy", "Data Visualization", "Statistical Modeling"],
      backend: ["FastAPI", "Node.js", "REST API", "gRPC"],
      databases: ["PostgreSQL", "Vector Databases", "Redis"],
      cloud: ["AWS", "Google Cloud"],
      devops: ["Docker", "Kubernetes", "CI/CD"],
      tools: ["Git", "Linux", "Weights & Biases"],
      softSkills: ["Cross-functional Leadership", "Problem Solving", "Technical Communication", "Agile / Scrum"]
    },
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Machine Learning – Specialty",
        issuer: "Amazon Web Services",
        issueDate: "2023-04",
        credentialId: "AWS-MLS-9082341"
      }
    ],
    settings: {
      template: "tech-specialist",
      primaryColor: "#6366f1",
      fontFamily: "Inter",
      fontSize: "base",
      lineSpacing: "normal",
      sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
      showIcons: true
    }
  },
  "software-engineer": {
    id: "sample-software-engineer",
    title: "Maya Patel — Full-Stack Software Engineer",
    personal: {
      fullName: "Maya Patel",
      title: "Senior Full-Stack Engineer",
      email: "maya.patel@example.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      linkedin: "https://linkedin.com/in/mayapatel-dev",
      github: "https://github.com/mayapatel",
      portfolio: "https://mayapatel.tech"
    },
    summary: "Product-minded Full-Stack Engineer with 5+ years of experience building high-traffic web applications with Next.js, TypeScript, and Node.js. Passionate about scalable architecture, high performance UI engineering, and robust microservices.",
    experience: [
      {
        id: "exp-1",
        title: "Senior Software Engineer",
        company: "PulseTech Cloud",
        location: "Austin, TX",
        startDate: "2021-08",
        endDate: "Present",
        isCurrent: true,
        technologies: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
        bullets: [
          "Led development of real-time collaborative workspace used by 85k monthly active users, improving page load speed by 35%.",
          "Engineered distributed event-driven microservices using Node.js, Kafka, and PostgreSQL, processing 20M+ events daily.",
          "Migrated legacy monolithic frontend to Next.js App Router with Server Components, improving Core Web Vitals to 98+."
        ]
      },
      {
        id: "exp-2",
        title: "Software Engineer",
        company: "Nexus Digital",
        location: "Dallas, TX",
        startDate: "2019-06",
        endDate: "2021-07",
        isCurrent: false,
        technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js"],
        bullets: [
          "Built customer-facing payment and billing dashboards with React, Redux, and Stripe API integration.",
          "Refactored legacy REST APIs into modular micro-controllers, cutting endpoint error rate by 45%."
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "DevHub — Real-time Developer Analytics",
        description: "SaaS analytics platform integrating GitHub API and deployment pipelines.",
        technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
        githubUrl: "https://github.com/mayapatel/devhub",
        liveUrl: "https://devhub-saas.app",
        bullets: [
          "Built responsive UI with Tailwind CSS and Framer Motion, supporting customizable dashboard widgets.",
          "Implemented Supabase Row-Level Security policies and OAuth authentication flow for team workspaces."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of Texas at Austin",
        degree: "B.S. in Computer Engineering",
        fieldOfStudy: "Software Systems",
        startDate: "2015-08",
        endDate: "2019-05",
        gpa: "3.75"
      }
    ],
    skills: {
      programming: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
      frontend: ["React", "Next.js", "Tailwind CSS", "Redux", "Vue.js"],
      backend: ["Node.js", "Express.js", "FastAPI", "REST API", "GraphQL"],
      databases: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
      cloud: ["AWS", "Google Cloud"],
      devops: ["Docker", "CI/CD"],
      tools: ["Git", "Linux"],
      softSkills: ["Problem Solving", "Technical Communication", "Agile / Scrum", "Cross-functional Leadership"]
    },
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        issueDate: "2022-11"
      }
    ],
    settings: {
      template: "modern-professional",
      primaryColor: "#0ea5e9",
      fontFamily: "Inter",
      fontSize: "base",
      lineSpacing: "normal",
      sectionOrder: ["summary", "experience", "projects", "skills", "education", "certifications"],
      showIcons: true
    }
  },
  "data-analyst": {
    id: "sample-data-analyst",
    title: "Priya Sharma — Data Analyst & BI Specialist",
    personal: {
      fullName: "Priya Sharma",
      title: "Senior Data & Business Intelligence Analyst",
      email: "priya.sharma@example.com",
      phone: "+1 (555) 789-0123",
      location: "Chicago, IL",
      linkedin: "https://linkedin.com/in/priyasharma-data",
      portfolio: "https://priyadata.io"
    },
    summary: "Analytical Data Specialist with 4+ years translating complex datasets into executive decision engines. Expert in advanced SQL, Tableau dashboards, Python data modeling, and automated KPI pipelines saving $2M+ in operational redundancies.",
    experience: [
      {
        id: "exp-1",
        title: "Senior Business Intelligence Analyst",
        company: "Strata Analytics",
        location: "Chicago, IL",
        startDate: "2022-01",
        endDate: "Present",
        isCurrent: true,
        technologies: ["SQL", "Tableau", "Python", "Pandas", "PostgreSQL", "PowerBI"],
        bullets: [
          "Developed enterprise Tableau executive dashboard suite tracking $120M in annualized gross merchandise value across 14 markets.",
          "Optimized heavy multi-join PostgreSQL analytics queries, reducing report generation runtimes from 25 minutes to 40 seconds.",
          "Partnered with VP of Growth to model customer retention cohorts, pinpointing a 18% lift opportunity in subscription renewals."
        ]
      },
      {
        id: "exp-2",
        title: "Data Analyst",
        company: "QuantMetrics Corp",
        location: "Boston, MA",
        startDate: "2020-06",
        endDate: "2021-12",
        isCurrent: false,
        technologies: ["SQL", "PowerBI", "Python", "Excel", "MySQL"],
        bullets: [
          "Automated weekly revenue forecasting models using Python and Pandas, replacing manual spreadsheet reconciliation.",
          "Designed A/B test statistical significance frameworks for checkout conversion optimization experiments."
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "OmniMetrics — Multi-Platform Marketing Attribution",
        description: "Open analytics pipeline attributing multi-touch conversions across Google Ads, Meta, and organic channels.",
        technologies: ["Python", "SQL", "Tableau", "PostgreSQL"],
        githubUrl: "https://github.com/priyasharma/omni-metrics",
        bullets: [
          "Built Markov chain attribution modeling scripts in Python to evaluate cross-channel marketing efficacy.",
          "Constructed interactive Tableau dashboard with drill-down views by cohort and acquisition channel."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of Illinois Urbana-Champaign",
        degree: "B.S. in Statistics & Data Science",
        fieldOfStudy: "Applied Statistics",
        startDate: "2016-08",
        endDate: "2020-05",
        gpa: "3.82",
        honors: ["Dean's Honors List", "Statistics Department Merit Scholar"]
      }
    ],
    skills: {
      programming: ["SQL", "Python", "R", "Bash"],
      dataScience: ["Pandas", "NumPy", "Data Visualization", "Tableau", "PowerBI", "Statistical Modeling", "A/B Testing"],
      databases: ["PostgreSQL", "MySQL", "Snowflake", "BigQuery"],
      tools: ["Git", "Excel (Advanced / VBA)", "Jupyter"],
      softSkills: ["Technical Communication", "Problem Solving", "Agile / Scrum", "Cross-functional Leadership"]
    },
    certifications: [
      {
        id: "cert-1",
        name: "Tableau Certified Data Analyst",
        issuer: "Tableau Software",
        issueDate: "2022-08"
      }
    ],
    settings: {
      template: "ats-minimal",
      primaryColor: "#059669",
      fontFamily: "Inter",
      fontSize: "base",
      lineSpacing: "normal",
      sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
      showIcons: true
    }
  },
  "fresher": {
    id: "sample-fresher",
    title: "Rohan Verma — AI & Computer Science Graduate",
    personal: {
      fullName: "Rohan Verma",
      title: "Graduate AI & Software Engineer",
      email: "rohan.verma@example.com",
      phone: "+1 (555) 345-6789",
      location: "San Jose, CA",
      linkedin: "https://linkedin.com/in/rohanverma-dev",
      github: "https://github.com/rohanverma-ai",
      portfolio: "https://rohanverma.dev"
    },
    summary: "Recent Computer Science & AI graduate with strong foundations in Python, deep learning, PyTorch, and full-stack web applications. Built multiple open-source AI projects including an edge vision classifier and semantic document QA tool.",
    experience: [
      {
        id: "exp-1",
        title: "Machine Learning Intern",
        company: "NeuroPixel AI",
        location: "Palo Alto, CA",
        startDate: "2023-05",
        endDate: "2023-08",
        isCurrent: false,
        technologies: ["Python", "PyTorch", "OpenCV", "Docker"],
        bullets: [
          "Developed lightweight YOLOv8 object detection models optimized for mobile edge deployment with TensorRT.",
          "Collected and annotated 4,000+ domain image samples, boosting detection accuracy by 14% on low-contrast objects.",
          "Integrated real-time inference APIs with FastAPI and Docker for automated integration test suites."
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "DocuSense — Intelligent PDF Question Answering",
        description: "RAG application extracting key facts and answering questions from 100+ page research papers.",
        technologies: ["Python", "LangChain", "FastAPI", "React", "Vector Databases"],
        githubUrl: "https://github.com/rohanverma-ai/docusense",
        liveUrl: "https://docusense.vercel.app",
        bullets: [
          "Implemented semantic chunking and dense vector retrieval with cosine similarity scoring.",
          "Constructed responsive Next.js frontend with citations back to original page and line numbers."
        ]
      },
      {
        id: "proj-2",
        name: "CodePulse — GitHub Repository Insight CLI",
        description: "CLI tool measuring code churn, test coverage velocity, and author contribution distributions.",
        technologies: ["TypeScript", "Node.js", "Git"],
        githubUrl: "https://github.com/rohanverma-ai/codepulse",
        bullets: [
          "Parsed Git log commit trees to calculate author ownership entropy across multi-branch repositories.",
          "Published to npm with 2,500+ total downloads."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        institution: "San Jose State University",
        degree: "B.S. in Computer Science",
        fieldOfStudy: "Artificial Intelligence Concentration",
        startDate: "2020-08",
        endDate: "2024-05",
        gpa: "3.91",
        honors: ["Summa Cum Laude", "President's Scholar (2021-2024)", "ACM Student Chapter Officer"]
      }
    ],
    skills: {
      programming: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Java"],
      aiMl: ["PyTorch", "Scikit-learn", "Large Language Models", "Natural Language Processing", "Computer Vision"],
      frontend: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
      backend: ["FastAPI", "Node.js", "REST API"],
      databases: ["PostgreSQL", "MongoDB", "Vector Databases"],
      tools: ["Git", "Docker", "Linux"],
      softSkills: ["Problem Solving", "Technical Communication", "Agile / Scrum"]
    },
    certifications: [
      {
        id: "cert-1",
        name: "Deep Learning Specialization",
        issuer: "DeepLearning.AI (Coursera)",
        issueDate: "2023-09"
      }
    ],
    settings: {
      template: "student-fresher",
      primaryColor: "#8b5cf6",
      fontFamily: "Inter",
      fontSize: "base",
      lineSpacing: "normal",
      sectionOrder: ["education", "skills", "projects", "experience", "certifications"],
      showIcons: true
    }
  }
};

export const BLANK_RESUME: Resume = {
  id: "blank-resume",
  title: "Untitled Resume",
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    bio: ""
  },
  summary: "",
  experience: [],
  projects: [],
  education: [],
  skills: {
    programming: [],
    aiMl: [],
    dataScience: [],
    frontend: [],
    backend: [],
    databases: [],
    cloud: [],
    devops: [],
    tools: [],
    softSkills: []
  },
  certifications: [],
  settings: {
    template: "modern-professional",
    primaryColor: "#6366f1",
    fontFamily: "Inter",
    fontSize: "base",
    lineSpacing: "normal",
    sectionOrder: ["summary", "experience", "projects", "skills", "education", "certifications"],
    showIcons: true
  }
};
