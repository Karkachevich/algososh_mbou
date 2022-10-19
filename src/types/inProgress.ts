export type TInProgressInsertion = {
    inProgress?: boolean;
    inProgressAddHead?: boolean;
    inProgressAddTail?: boolean;
    inProgressAddByIndex?: boolean;
  };
  
  export  type TInProgressRemoval = {
    inProgress?: boolean;
    inProgressRemoveHead?: boolean;
    inProgressRemoveTail?: boolean;
    inProgressRemoveFromIndex?: boolean;
  };