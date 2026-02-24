import type { MovieType } from "../../api/types/MoviesTypes";
import { MovieCard } from "./MovieCard";

type movieProps = {
  movies: MovieType[];
};

export function MovieList({ movies }: movieProps) {
  return (
    <div className="relative">
      <ul className="flex overflow-x-scroll overflow-y-visible space-x-4 px-4 md:px-6 py-4 scrollbar-hide relative">
        {movies.map((movie: MovieType) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
