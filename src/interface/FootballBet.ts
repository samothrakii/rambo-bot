import { Document } from 'mongoose';

export interface FootballBet extends Document {
  completed: boolean;
  amount: number;
  home: FootballBetTeam;
  away: FootballBetTeam;
  result: FootballBetResult;
}

interface FootballBetTeam {
  name: string;
  odds: number;
  bettor: string[];
}

interface FootballBetResult {
  home: number;
  away: number;
}
