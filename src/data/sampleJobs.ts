import { JobDescription } from "@/types/job";
import { parseJobDescription } from "@/lib/parser/jobParser";

export interface SampleJobEntry {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  workplaceType: "Remote" | "Hybrid" | "On-site";
  badge: string;
  rawText: string;
}

export const SAMPLE_JOBS: SampleJobEntry[] = [
  {
    id: "stripe-fullstack",
    name: "Senior Full Stack Engineer (Fintech)",
    role: "Senior Full Stack Engineer",
    company: "Stripe",
    location: "San Francisco, CA (Remote)",
    workplaceType: "Remote",
    badge: "Fintech · Payments",
    rawText: `Job Title: Senior Full Stack Engineer
Company: Stripe
Location: San Francisco, CA (Remote Friendly)

About the Role:
Stripe builds economic infrastructure for the internet. As a Senior Full Stack Engineer on the Global Payments team, you will design, build, and operate resilient systems handling hundreds of billions of dollars in annual transaction volume. You will partner with product managers, designers, and infrastructure teams to build world-class payment interfaces and high-throughput backend services.

Key Responsibilities:
• Architect, build, and maintain high-performance full-stack web applications used by millions of businesses worldwide.
• Build delightful, accessible UI workflows using React, TypeScript, and modern CSS frameworks.
• Develop mission-critical RESTful APIs and distributed backend microservices using Node.js, Go, and PostgreSQL.
• Collaborate with cross-functional teams to define architectural standards, conduct rigorous code reviews, and mentor engineers.
• Optimize application performance, caching strategies, and database query latency to ensure 99.999% system availability.
• Drive engineering excellence through automated testing, CI/CD pipelines, and proactive observability.

Minimum Qualifications:
• 5+ years of professional software engineering experience building scalable web applications.
• Strong proficiency in TypeScript, JavaScript, React, and modern state management.
• Solid backend engineering experience with Node.js, Go, or Python, including relational database design with PostgreSQL or MySQL.
• Demonstrated understanding of distributed systems, REST API architecture, and microservices patterns.
• Experience with cloud platforms (AWS or GCP) and containerization using Docker.
• Proven track record of end-to-end technical leadership and cross-functional collaboration.
• Bachelor's degree in Computer Science or equivalent practical experience.

Preferred Qualifications:
• Experience in fintech, payment processing, fraud detection, or PCI-DSS compliant environments.
• Familiarity with Next.js, GraphQL, Redis, and message brokers like RabbitMQ or Kafka.
• Prior experience with infrastructure-as-code using Terraform and observability with Datadog.
• Active contributions to open-source software or engineering design systems.

Benefits & Perks:
• Competitive base salary and equity grant.
• Comprehensive medical, dental, and vision insurance with 100% covered premiums.
• Flexible work-from-home stipend and annual learning budget.`
  },

  {
    id: "anthropic-ml",
    name: "Staff Machine Learning Engineer (Generative AI)",
    role: "Staff Machine Learning Engineer",
    company: "Anthropic",
    location: "San Francisco, CA (Hybrid)",
    workplaceType: "Hybrid",
    badge: "AI/ML · Frontier Models",
    rawText: `Job Title: Staff Machine Learning Engineer - Frontier Systems
Company: Anthropic
Location: San Francisco, CA (Hybrid)

About the Role:
Anthropic is an AI safety and research company that builds reliable, beneficial AI systems. We are looking for a Staff Machine Learning Engineer to join our Frontier Model Deployment and Inference team. In this role, you will lead the design and implementation of low-latency model inference pipelines, retrieval-augmented generation (RAG) architectures, and production fine-tuning infrastructure.

Key Responsibilities:
• Lead technical design and implementation of large-scale LLM inference engines and distributed serving clusters.
• Architect low-latency RAG systems leveraging vector databases (Pinecone, Qdrant, Milvus) and semantic search embeddings.
• Train, evaluate, and fine-tune foundation models using PyTorch, LoRA, and distributed GPU frameworks.
• Collaborate closely with research scientists to convert experimental models into production-ready API services.
• Implement robust evaluation benchmarks, safety guardrails, and automated hallucination detection pipelines.
• Mentor senior engineers and influence organizational AI infrastructure roadmaps.

Minimum Qualifications:
• 8+ years of software and machine learning engineering experience, with at least 3 years focused on deep learning in production.
• Deep expertise in PyTorch, Python, and CUDA GPU acceleration.
• Strong background in Large Language Models (LLMs), Transformers, attention mechanisms, and prompt engineering.
• Hands-on experience building production RAG pipelines, vector search indexing, and embedding optimization.
• Solid background in distributed computing, model quantization, and high-throughput inference frameworks (vLLM, Triton).
• Ph.D. or Master's degree in Computer Science, Machine Learning, Robotics, or equivalent practical experience.

Preferred Qualifications:
• Publications or demonstrable open-source contributions in NLP, LLM alignment, or reinforcement learning (RLHF).
• Experience with LangChain, LlamaIndex, Ray, and Kubernetes (K8s) deployment for machine learning workloads.
• Familiarity with MLOps pipelines using MLflow, Weights & Biases, and automated model registry governance.
• Deep understanding of AI safety benchmarks, red-teaming methodologies, and ethical AI development.`
  },

  {
    id: "datadog-devops",
    name: "Lead Cloud Platform & DevOps Engineer",
    role: "Lead Cloud Platform Engineer",
    company: "Datadog",
    location: "New York, NY (Remote)",
    workplaceType: "Remote",
    badge: "DevOps · Kubernetes & Cloud",
    rawText: `Job Title: Lead Cloud Platform & DevOps Engineer
Company: Datadog
Location: New York, NY (Remote)

About the Role:
Datadog is the monitoring and security platform for cloud applications. We are hiring a Lead Cloud Platform Engineer to spearhead our multi-region Kubernetes platform that processes tens of trillions of events daily. You will establish infrastructure-as-code patterns, automate deployment safety, and empower thousands of internal developers with zero-downtime developer platform tooling.

Key Responsibilities:
• Design, operate, and scale multi-tenant Kubernetes clusters across AWS and Google Cloud environments.
• Implement scalable Infrastructure as Code (IaC) modules using Terraform and GitOps workflows via ArgoCD.
• Build automated CI/CD deployment pipelines using GitHub Actions with integrated security vulnerability scanning.
• Formulate disaster recovery, high-availability architecture, and automated chaos testing regimes.
• Partner with security teams to enforce Zero Trust network architecture, IAM policies, and SOC 2 compliance controls.
• Establish observability standards using Prometheus, Grafana, OpenTelemetry, and distributed tracing.

Minimum Qualifications:
• 7+ years of experience in DevOps, Site Reliability Engineering (SRE), or Cloud Platform Engineering.
• Deep expertise with production Kubernetes (k8s), Docker containerization, and Helm chart lifecycle management.
• Mastery of AWS services (EKS, EC2, S3, IAM, Route53, VPC networking) and Terraform.
• Proficient in Go, Python, or Bash for platform automation, CLI tooling, and Kubernetes operators.
• Strong understanding of networking protocols, load balancing, DNS, and TLS certificates.
• Bachelor's degree in Computer Science, Software Engineering, or related discipline.

Preferred Qualifications:
• Experience running multi-cloud or hybrid infrastructure across AWS and GCP.
• Familiarity with service mesh architectures (Istio or Linkerd) and eBPF kernel tracing.
• Certified Kubernetes Administrator (CKA) or AWS Certified Solutions Architect Professional.
• Experience scaling systems handling petabytes of data or millions of queries per second.`
  },

  {
    id: "snowflake-data",
    name: "Senior Data & Analytics Engineer",
    role: "Senior Data Engineer",
    company: "Snowflake",
    location: "Seattle, WA (Hybrid)",
    workplaceType: "Hybrid",
    badge: "Data · Modern Data Stack",
    rawText: `Job Title: Senior Data Engineer
Company: Snowflake
Location: Seattle, WA (Hybrid)

About the Role:
Snowflake provides the AI Data Cloud. We are looking for a Senior Data Engineer to design modern analytical data products, transform multi-terabyte telemetry streams, and empower executive leadership with deterministic business metrics. You will build and scale reliable data pipelines using Snowflake, dbt, Apache Airflow, and Python.

Key Responsibilities:
• Design, build, and optimize scalable data pipelines extracting data from internal microservices and external APIs.
• Implement dimensional data models, star schemas, and curated data marts using dbt and Snowflake SQL.
• Orchestrate complex DAG workflows with Apache Airflow and automated data quality validation (Great Expectations).
• Collaborate with machine learning engineers and product analysts to formulate reliable feature stores and datasets.
• Benchmark query performance, implement clustering and partitioning strategies, and optimize cloud compute costs.
• Maintain data documentation, lineage tracking, and strict governance compliant with GDPR regulations.

Minimum Qualifications:
• 4+ years of dedicated data engineering or analytics engineering experience.
• Advanced proficiency in SQL and dimensional data modeling (Kimball methodology).
• Hands-on experience developing ETL/ELT pipelines using Python, Pandas, and dbt.
• Deep working knowledge of Snowflake, BigQuery, or Amazon Redshift cloud data warehouses.
• Experience managing workflow orchestrators such as Apache Airflow or Prefect.
• Bachelor's degree in Computer Science, Data Analytics, Mathematics, or related field.

Preferred Qualifications:
• Experience with streaming data architectures using Apache Kafka, Apache Spark, or Flink.
• Familiarity with reverse ETL tools and Business Intelligence tools (Tableau, Looker, or PowerBI).
• Experience working with data lakes, Delta Lake, or Apache Iceberg table formats.
• Understanding of CI/CD integration for data warehouse code and automated SQL testing.`
  },

  {
    id: "vercel-frontend",
    name: "Frontend Engineer (React & Next.js)",
    role: "Frontend Engineer",
    company: "Vercel",
    location: "Remote (Global)",
    workplaceType: "Remote",
    badge: "Frontend · Modern Web",
    rawText: `Job Title: Frontend Engineer - Developer Experience
Company: Vercel
Location: Remote (Global)

About the Role:
Vercel's mission is to enable developers to build the open web. We are seeking a passionate Frontend Engineer to craft fast, accessible, and intuitive developer tools. You will work on core dashboard interfaces, analytics visualizations, and collaborate directly with the creators of Next.js to push the boundaries of modern web user experiences.

Key Responsibilities:
• Build responsive, high-performance web applications using Next.js (App Router), React, TypeScript, and Tailwind CSS.
• Implement reusable, accessible UI component primitives with Radix UI and standard WCAG 2.1 AA specifications.
• Create interactive data visualizations and performance charts using D3.js and modern SVG rendering.
• Write comprehensive automated tests using Vitest, React Testing Library, and Playwright for end-to-end verification.
• Profile web vitals (LCP, INP, CLS) and optimize frontend asset delivery for instantaneous user interactions.
• Actively participate in design critiques, code reviews, and open-source documentation.

Minimum Qualifications:
• 2+ years of professional frontend web development experience.
• Strong command of modern TypeScript, JavaScript (ES6+), HTML5, and CSS3.
• Demonstrated proficiency with React and Next.js, including Server Components and client-side state management.
• Experience styling interfaces with Tailwind CSS and creating mobile-responsive layouts.
• Familiarity with Git version control, GitHub workflows, and REST API integration.
• Strong attention to visual design details and user-centric problem-solving.

Preferred Qualifications:
• Contributions to open-source UI libraries, shadcn/ui components, or documentation.
• Experience with client-side caching tools like SWR or TanStack Query.
• Familiarity with web performance profiling using Chrome DevTools and Lighthouse.
• Passion for developer tooling, edge computing, and clean code craftsmanship.`
  }
];

export function getSampleJob(id: string): JobDescription | undefined {
  const sample = SAMPLE_JOBS.find((j) => j.id === id);
  if (!sample) return undefined;

  const parsed = parseJobDescription(sample.rawText, sample.role, sample.company);

  return {
    id: sample.id,
    title: sample.role,
    company: sample.company,
    location: sample.location,
    workplaceType: sample.workplaceType,
    rawText: sample.rawText,
    parsedData: parsed,
    createdAt: new Date().toISOString(),
  };
}

