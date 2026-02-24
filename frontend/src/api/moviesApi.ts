import movies from "../data/movies.json";
import type { MovieType } from "./types/MoviesTypes";

export async function getTrendingMovies(): Promise<MovieType[]> {
  await new Promise((r) => setTimeout(r, 800));
  return movies as MovieType[];
}
