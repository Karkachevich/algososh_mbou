import { ElementStates } from "../types/element-states";

export const changeColor = (start: number, end: number) => {
    if (start === end) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Changing;
    } 
  };