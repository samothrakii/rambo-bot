import FootbalBetModel from "../db/model/FootbalBetModel";
import { FootballBet } from "../interface/FootballBet";

export const createFootbalBetRecord = async (bet: FootballBet) => {
  let e = bet.validateSync();
  if (e?.errors) {
    console.error(e);
    return null;
  }

  try {
    return await FootbalBetModel.create(bet);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getAllFootballBets = async (completed: boolean = false) => {
  const bets = await FootbalBetModel.find({ completed });
  if (!bets) {
    console.error('Could not find any Football bet!');
    return [];
  }

  return bets;
}
