export interface Category {
  id: string;
  emoji: string;
  title: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  machine: string;
  material: string;
  stars: number;
  text: string;
  tag: string;
  verified: boolean;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CompareRow {
  feature: string;
  free: string;
  thisBundle: string;
  designer: string;
  freeCheck?: boolean;
  thisBundleCheck?: boolean;
  designerCheck?: boolean;
}
