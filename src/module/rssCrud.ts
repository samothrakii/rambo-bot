import RssModel from "../db/model/RssModel";
import { Rss } from "../interface/Rss";

export const createOrUpdateRssRecord = async (rss: Rss) => {
  let e = rss.validateSync();
  if (e?.errors) {
    console.error(e);
    return null;
  }

  try {
    return await RssModel.findOneAndUpdate(
      { name: rss.name },
      {
        link: rss.link,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      },
    )
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getAllRss = async () => {
  const rss = await RssModel.find();
  if (!rss) {
    console.error('Could not find any RSS');
    return [];
  }

  return rss;
}

export const getRssByName = async (name: string) => {
  const rss = await RssModel.findOne({ name });
  if (!rss) {
    console.error(`Could not find any RSS has name: ${name}`);
    return null;
  }

  return rss;
}
