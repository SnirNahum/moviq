import type { MovieType } from "../../api/types/MoviesTypes";

type movieProps = {
  movies: MovieType[];
};

export function MovieList({ movies }: movieProps) {
  return (
    <div>
      <ul>
        {movies.map((movie: MovieType) => (
          <li key={movie.id}>{movie.name}</li>
        ))}
      </ul>
    </div>
  );
}
