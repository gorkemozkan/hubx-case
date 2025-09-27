export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rank: number;
  image: CategoryImage;
}

export interface CategoryImage {
  id: number;
  name: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  caption: string | null;
  formats: unknown | null;
  previewUrl: string | null;
  alternativeText: string | null;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}
