import axios from "axios";
import { TvMazeShow } from "../../types/shows.types";
import { SHOWS_BASE_URL, SHOWS_URL } from "../../db/seeds/seeds.constants";

export async function fetchShowsData(): Promise<TvMazeShow[]> {
  try {
    const { data } = await axios.get<TvMazeShow[]>(
      `${SHOWS_BASE_URL}${SHOWS_URL}`,
    );
    return data.map(_mapTvMazeToShow)

  } catch (err) {
    throw new Error("Failed to fetch shows data");
  }
}

function _mapTvMazeToShow(show: TvMazeShow): TvMazeShow {
  return {
    id: show.id,
    name: show.name,
    url: show.url,
    genres: show.genres,
    status: show.status,
    premiered: show.premiered,
    externals: {
      tvrage: show.externals?.tvrage ?? null,
      thetvdb: show.externals?.thetvdb ?? null,
      imdb: show.externals?.imdb ?? null,
    },
    rating: show.rating,
    image: {
      medium: show.image?.medium ?? null,
      original: show.image?.original ?? null,
    },
    summary: show.summary ?? null,
    network: show.network ?? null,
    officialSite: show.officialSite,
    updated: show.updated,
  };
}
