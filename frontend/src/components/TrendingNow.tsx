import { useEffect, useState } from "react";
import type { MovieType } from "../api/types/MoviesTypes";
import { getTrendingMovies } from "../api/moviesApi";
import { MovieList } from "./movies/MovieList";

export function TrendingNow() {
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchMovies() {
      try {
        const data = await getTrendingMovies();
        if (isMounted) setMovies(data);
      } catch (err) {
        if (err instanceof Error && isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container px-6 mt-6">
      <h3>Trending Now</h3>
      {movies && movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No Movies found</p>
      )}
    </div>
  );
}
