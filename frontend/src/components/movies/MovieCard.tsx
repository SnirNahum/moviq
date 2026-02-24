import type { MovieType } from "../../api/types/MoviesTypes";
import { Card } from "../ui/Card";

export function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Card className="group relative overflow-hidden cursor pointer transition-all duration-300 hover:scale-110 hover:shadow-xl outline-blue-200 p-0 border-0 w-7rem h-[9.8rem] rounded-sm">
      <img
        className="w-full h-full object-cover trantision-transform duration-300 group-hover:scale-105 z-10"
        src={movie?.image ? movie.image : "/placeholder.svg"}
        alt={movie?.name}
      />
    </Card>
  );
}
