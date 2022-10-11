import { ElementStates } from "../types/element-states";
import { TColumn } from "../types/column";

export const randomArr = (): TColumn[] => {
  const arr: TColumn[] = [];
  const minLen = 3;
  const maxLen = 17;
  const maxElement = 100;
  const length = Math.floor(Math.random() * (maxLen - minLen) + minLen);
  for (let i = 0; i < length; i++) {
    arr.push({
      number: Math.floor(Math.random() * maxElement),
      state: ElementStates.Default,
    });
  }

  return arr;
};
