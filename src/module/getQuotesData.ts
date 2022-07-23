import MemberModel from '../db/model/MemberModel'

export const getQuotesByAlias = async (alias: string) => {
  const member = await MemberModel.findOne({ alias });
  if (!member) {
    console.error(`Could not find any member has alias: ${alias}`);
    return null;
  }

  return member.quotes;
}
