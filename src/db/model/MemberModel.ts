import { model, Schema } from "mongoose";
import { Member } from "../../interface/Member";

export const MemberSchema = new Schema({
  alias: {
    type: String,
    required: [true, 'Member must have an alias'],
  },
  discordId: {
    type: String,
    required: [true, 'Member must have Discord ID'],
  },
  steamId: {
    type: String,
    required: [true, 'Member must have Steam ID'],
  },
  quotes: [{
    type: String,
    default: [],
  }],
  debt: {
    type: Number,
    default: 0,
  },
});

export default model<Member>('member', MemberSchema);
