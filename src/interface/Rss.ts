import { Document } from 'mongoose';

export interface Rss extends Document {
  name: string;
  link: string;
}
