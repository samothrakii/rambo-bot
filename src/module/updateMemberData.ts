import { Member } from '../interface/Member';

export const updateMemberById = async (member: Member) => {
  await member.save();
  return member;
}
