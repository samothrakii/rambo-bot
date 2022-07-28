import { Command } from "../interface/Command";
import { addquotes } from "./addquotes";
import { addrss } from "./addrss";
import { cd } from "./cd";
import { creupdmember } from "./creupdmember";
import { roll } from "./roll";
import { rss } from "./rss";

export const commandList: Command[] = [roll, cd, creupdmember, addquotes, addrss, rss];
