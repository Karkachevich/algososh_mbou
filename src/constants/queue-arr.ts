import { ElementStates } from "../types/element-states";
import { TChar } from "../types/char";

const length: number = 7;

export const queueArr: TChar[] = Array.from({ length: length }, () => ({
  char: "",
  state: ElementStates.Default,
}));
