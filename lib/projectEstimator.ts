import type { ProjectIdea } from '@/types';

interface ProjectEstimate {
  estimatedSize: string;
  recommendedPlatform: 'local' | 'colab' | 'both';
  hardwareRequirements: {
    gpu: boolean;
    ram: string;
    storage: string;
  };
  reasoning: string;
  colabLink?: string;
}

export function estimateProject(idea: ProjectIdea): ProjectEstimate {
  const { level, category, techniques } = idea;
  
  // Determine if GPU needed
  const gpuHeavyTechniques = [
    'deep learning', 'neural network', 'cnn', 'rnn', 'lstm', 'transformer',
    'bert', 'gpt', 'yolo', 'object detection', 'segmentation', 'gan',
    'diffusion', 'stable diffusion', 'reinforcement learning'
  ];
  
  const needsGPU = techniques.some(tech => 
    gpuHeavyTechniques.some(heavy => 
      tech.toLowerCase().includes(heavy)
    )
  ) || category.toLowerCase().includes('vision') || 
       category.toLowerCase().includes('generative');
  
  // Estimate based on level and category
  let sizeGB = 0;
  let ram = '4GB';
  let storage = '2GB';
  let platform: 'local' | 'colab' | 'both' = 'both';
  let reasoning = '';
  
  // Base size by level
  if (level === 'beginner') {
    sizeGB = 0.5;
    ram = '4-8GB';
    storage = '2-5GB';
  } else if (level === 'intermediate') {
    sizeGB = 2;
    ram = '8-16GB';
    storage = '5-20GB';
  } else { // advanced
    sizeGB = 5;
    ram = '16-32GB';
    storage = '20-100GB';
  }
  
  // Adjust by category
  if (category.includes('computer-vision') || category.includes('generative')) {
    sizeGB *= 2; // Vision models + datasets are larger
    storage = level === 'advanced' ? '50-200GB' : level === 'intermediate' ? '10-50GB' : '5-10GB';
  }
  
  if (category.includes('nlp')) {
    sizeGB *= 1.5; // Language models can be large
  }
  
  // Determine platform
  if (needsGPU) {
    platform = 'colab';
    reasoning = '🚀 Google Colab GRATIS! GPU T4 15GB VRAM sudah cukup. Hemat listrik & ga perlu beli GPU mahal!';
  } else if (sizeGB < 1 && ram === '4-8GB') {
    platform = 'both';
    reasoning = '💻 Ringan! Bisa di laptop biasa atau Colab. Pilih yang paling nyaman.';
  } else if (sizeGB >= 3) {
    platform = 'colab';
    reasoning = '☁️ Lebih baik di Colab. Gratis 100GB storage & RAM 12GB. Ga perlu ngabisin storage laptop!';
  } else {
    platform = 'both';
    reasoning = '⚖️ Bisa keduanya! Local untuk development cepat, Colab untuk training.';
  }
  
  return {
    estimatedSize: `${sizeGB.toFixed(1)} GB`,
    recommendedPlatform: platform,
    hardwareRequirements: {
      gpu: needsGPU,
      ram,
      storage,
    },
    reasoning,
    colabLink: 'https://colab.research.google.com/',
  };
}

export function getColabBenefits() {
  return [
    '✅ GPU T4 gratis (15GB VRAM)',
    '✅ RAM 12GB gratis',
    '✅ Storage 100GB (sementara)',
    '✅ Kaggle integration',
    '✅ Save ke Google Drive',
    '✅ Share notebook gampang',
    '✅ Ga perlu install apapun',
    '✅ Akses dari mana aja',
  ];
}

export function getLocalBenefits() {
  return [
    '✅ Lebih cepat (no latency)',
    '✅ Storage unlimited (HDD kamu)',
    '✅ Privacy terjaga',
    '✅ Bisa offline',
    '✅ Custom environment',
  ];
}
