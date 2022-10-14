import { ElementStates } from "../types/element-states";
import { TChar } from "../types/char";

const maxLength: number = 7;

export const queueArr: TChar[] = Array.from({ length: maxLength }, () => ({
  char: "",
  state: ElementStates.Default,
}));
