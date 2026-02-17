
export interface OSEvent {
  id: string;
  year: number;
  name: string;
  company: string;
  description: string;
  category: 'mainframe' | 'desktop' | 'mobile' | 'workstation' | 'experimental';
  icon: string;
}

export interface OSDetail {
  title: string;
  history: string;
  innovations: string[];
  impact: string;
  funFact: string;
  visualDescription: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DeepDiveResult {
  detail: OSDetail;
  imageUrl?: string;
  sources: GroundingSource[];
}
