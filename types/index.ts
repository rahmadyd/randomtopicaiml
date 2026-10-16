export interface DatasetLink {
  name: string;
  url: string;
  size: string;
  source: 'kaggle' | 'huggingface' | 'uci' | 'github' | 'official' | 'other';
}

export interface AlgorithmRecommendation {
  name: string;
  reason: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface ProjectSizeEstimate {
  datasetSize: string;
  modelSize: string;
  totalStorage: string;
  trainingTime: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  industry: string;
  estimatedTime: string;
  techniques: string[];
  datasets: string[];
  datasetLinks?: DatasetLink[];
  algorithms?: AlgorithmRecommendation[];
  projectSize?: ProjectSizeEstimate;
  recommendedPlatform?: 'local' | 'colab' | 'both';
  platformReason?: string;
  learningOutcomes: string[];
  roadmap: Roadmap;
}

export interface Roadmap {
  phases: Phase[];
  resources: string[];
  tips: string[];
}

export interface Phase {
  name: string;
  duration: string;
  tasks: string[];
}
