import { model, Schema } from "mongoose";
import { FootballBet } from "../../interface/FootballBet";

const FootballBetTeamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Bet must have a team name'],
  },
  odds: {
    type: Number,
    required: [true, 'Bet must have an odds'],
    validate: [(val: number) => val >= 1.0, 'Odds must be greater than 1.0'],
  },
  bettor: [{
    type: String,
    default: [],
  }],
});

const FootballBetResultSchema = new Schema({
  home: {
    type: Number,
    required: [true, 'Bet must have home team score'],
  },
  away: {
    type: Number,
    required: [true, 'Bet must have home team score'],
  },
});

export const FootballBetSchema = new Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: [true, 'Bet must have amount'],
  },
  home: {
    type: FootballBetTeamSchema,
    required: [true, 'Bet must have home team'],
  },
  away: {
    type: FootballBetTeamSchema,
    required: [true, 'Bet must have away team'],
  },
  result: {
    type: FootballBetResultSchema,
    default: {
      home: 0,
      away: 0,
    },
  },
});


export default model<FootballBet>('footballbet', FootballBetSchema);
