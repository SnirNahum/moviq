export type TvMazeShow = {
  id: number;
  name: string;
  url: string;
  genres: string[];
  status: string | null;
  premiered: string | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  rating: number | null;
  image: null | { medium: string | null; original: string | null };
  summary: string | null;
  network: string | null;

  officialSite: string | null;
  updated: number;
};
