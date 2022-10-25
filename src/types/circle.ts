import { ElementStates } from "./element-states";

export type TCircle = {
    value?: string | null;
    state?: ElementStates;
    head?: string | null;
    tail?: string | null;
    extra_circle?: {
      insertion?: boolean;
      removal?: boolean;
      value?: string | null;
      state?: ElementStates;
    } | undefined;
    
  }