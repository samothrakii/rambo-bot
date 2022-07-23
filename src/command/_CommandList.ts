import { Command } from "../interface/Command";
import { addquotes } from "./addquotes";
import { cd } from "./cd";
import { creupdmember } from "./creupdmember";
import { roll } from "./roll";

export const commandList: Command[] = [roll, cd, creupdmember, addquotes];
