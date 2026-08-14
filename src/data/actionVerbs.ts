export interface ActionVerbCategory {
  category: string;
  description: string;
  verbs: string[];
}

export const ACTION_VERB_CATEGORIES: ActionVerbCategory[] = [
  {
    category: "Leadership & Strategy",
    description: "Verbs demonstrating initiative, governance, direction, and strategic execution",
    verbs: [
      "Architected", "Spearheaded", "Orchestrated", "Directed", "Pioneered",
      "Founded", "Restructured", "Championed", "Steered", "Unified", "Supervised"
    ]
  },
  {
    category: "Development & Engineering",
    description: "Verbs highlighting building, programming, and technical architecture",
    verbs: [
      "Engineered", "Developed", "Implemented", "Refactored", "Deployed",
      "Automated", "Optimized", "Integrated", "Configured", "Constructed", "Standardized"
    ]
  },
  {
    category: "AI, ML & Data Intelligence",
    description: "Verbs indicating data modeling, training, tuning, and analytical insight",
    verbs: [
      "Trained", "Fine-tuned", "Modeled", "Evaluated", "Extracted",
      "Processed", "Formulated", "Synthesized", "Benchmarked", "Engineered", "Segmented"
    ]
  },
  {
    category: "Optimization & Performance",
    description: "Verbs showcasing acceleration, scalability, latency reduction, and efficiency",
    verbs: [
      "Accelerated", "Streamlined", "Maximized", "Minimized", "Scaled",
      "Eliminated", "Reduced", "Boosted", "Enhanced", "Leveraged", "Augmented"
    ]
  },
  {
    category: "Research & Problem Solving",
    description: "Verbs highlighting investigation, debugging, and systematic resolution",
    verbs: [
      "Diagnosed", "Investigated", "Audited", "Pinpointed", "Discovered",
      "Validated", "Overhauled", "Assessed", "Quantified", "Formulated"
    ]
  }
];

export const ALL_ACTION_VERBS = ACTION_VERB_CATEGORIES.flatMap(c => c.verbs);
