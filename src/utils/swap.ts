import { TCircle } from "../types/circle";
import { TColumn } from "../types/column";

export const swap = (
  arr: TCircle[] | TColumn[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
