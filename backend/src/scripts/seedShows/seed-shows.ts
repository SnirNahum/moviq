import { Db } from "mongodb";
import { mongoDBConnect } from "../../db/mongodb/mongodb.connect";

import { fetchShowsData } from "../../integrations/tvmaze/fetchShows";
import { TvMazeShow } from "../../types/shows.types";
import {
  insertDataToMongo,
  shouldSeedShows,
} from "../../db/seeds/seed.shows.service";

export async function seedShows() {
  const db: Db = await mongoDBConnect();
  const shouldSeed: boolean = await shouldSeedShows(db);

  if (!shouldSeed) return;

  const shows: TvMazeShow[] = await fetchShowsData();
  await insertDataToMongo(db, shows);
}
