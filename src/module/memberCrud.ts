import MemberModel from '../db/model/MemberModel';
import { Member } from '../interface/Member';

export const createOrUpdateMemberRecord = async (member: Member) => {
  let e = member.validateSync();
  if (e?.errors) {
    console.error(e);
    return null;
  }

  try {
    return await MemberModel.findOneAndUpdate(
      { alias: member.alias },
      {
        discordId: member.discordId,
        steamId: member.steamId,
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

export const addMemberQuotesRecord = async (alias: string, quotes: string[]) => {
  const member = await MemberModel.findOne({ alias });
  if (!member) {
    console.error('Member is not exist!');
    return false;
  }

  try {
    member.quotes.push(...quotes);
    await member.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const getAllMembers = async () => {
  const members = await MemberModel.find();
  if (!members) {
    console.error('Could not find any Members!');
    return [];
  }

  return members;
}

export const findByAlias = async (alias: string) => {
  const member = await MemberModel.findOne({ alias });
  if (!member) {
    console.error(`Could not find any Member has alias ${alias}!`);
    return null;
  }

  return member;
}
