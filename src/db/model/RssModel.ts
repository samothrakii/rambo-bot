import { model, Schema } from "mongoose";
import { Rss } from "../../interface/Rss";

export const RssSchema = new Schema({
  name: {
    type: String,
    required: [true, 'RSS must have an name'],
  },
  link: {
    type: String,
    required: [true, 'RSS must have an link'],
  },
});

export default model<Rss>('rss', RssSchema);
