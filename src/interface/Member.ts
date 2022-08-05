import { Document } from 'mongoose';

export interface Member extends Document {
  alias: string;
  discordId: string;
  steamId: string;
  quotes: string[];
  debt: number;
}
