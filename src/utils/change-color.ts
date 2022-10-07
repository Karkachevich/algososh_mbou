import { TChar } from "../types/char";
import { ElementStates } from "../types/element-states";

export const changeColor = (
  arr: TChar[],
  start: number,
  end: number,
  state: ElementStates
) => {
  arr[start].state = state;
  arr[end].state = state;
};
