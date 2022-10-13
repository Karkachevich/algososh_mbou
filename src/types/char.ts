import { ElementStates } from "./element-states";

export type TChar = {
    char: string | null;
    state: ElementStates;
    head?: string | null;
  }