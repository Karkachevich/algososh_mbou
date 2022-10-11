import { TChar } from "../types/char";
import { TColumn } from "../types/column";

export const swap = (
  arr: TChar[] | TColumn[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
