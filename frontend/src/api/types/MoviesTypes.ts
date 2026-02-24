export type MovieType = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  runtime: number;
  premiered: string;
  officialSite: string | null;
  rating: number;
  image: string;
  summary: string;
};

