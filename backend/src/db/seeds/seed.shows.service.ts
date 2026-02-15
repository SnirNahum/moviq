import { TvMazeShow } from "../../types/shows.types";
import { Db } from "mongodb";
import { SHOWS } from "./seeds.constants";

export async function insertDataToMongo(db: Db, shows: TvMazeShow[]) {
  const col = db.collection<TvMazeShow>(SHOWS);
  await col.createIndex({ id: 1 }, { unique: true });

  const ops = shows.map((s) => ({
    updateOne: {
      filter: { id: s.id },
      update: { $set: s },
      upsert: true,
    },
  }));
  await col.bulkWrite(ops, { ordered: false });
}

export async function shouldSeedShows(db: Db) {
  const col = db.collection(SHOWS);

  const existingCount = await col.countDocuments();
  return true ? existingCount === 0 : false;
}
