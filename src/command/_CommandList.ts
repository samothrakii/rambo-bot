import { Command } from "../interface/Command";
import { addquotes } from "./addquotes";
import { addrss } from "./addrss";
import { cd } from "./cd";
import { ucmem } from "./ucmem";
import { fbet } from "./fbet";
import { meminfo } from "./meminfo";
import { roll } from "./roll";
import { rss } from "./rss";
import { membet } from "./membet";

export const commandList: Command[] = [roll, cd, ucmem, addquotes, addrss, rss, fbet, meminfo, membet];
