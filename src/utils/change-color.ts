import { TCircle } from "../types/circle";
import { TColumn } from "../types/column";
import { ElementStates } from "../types/element-states";

export const changeColor = (
  arr: TCircle[] | TColumn[],
  start: number,
  end: number,
  state: ElementStates
) => {
  arr[start].state = state;
  arr[end].state = state;
};
