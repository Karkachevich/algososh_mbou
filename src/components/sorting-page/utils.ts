import React, { Dispatch, SetStateAction } from "react";
import { TColumn } from "../../types/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swap } from "../../utils/swap";
import { changeColor } from "../../utils/change-color";

export const bubbleSort = async (
  arr: TColumn[],
  setNumberArr: Dispatch<SetStateAction<TColumn[]>>,
  setInProgress: Dispatch<SetStateAction<boolean>>,
  mode: "ascending" | "descending"
) => {
  const { length } = arr;
  const newArr: TColumn[] = arr;
  setInProgress(true);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      changeColor(newArr, j, j + 1, ElementStates.Changing);
      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);

      let modeSort;

      if (mode === "descending") {
        modeSort = newArr[j].number < newArr[j + 1].number;
      }
      if (mode === "ascending") {
        modeSort = newArr[j].number > newArr[j + 1].number;
      }

      if (modeSort) {
        changeColor(newArr, j, j + 1, ElementStates.Changing);
        swap(newArr, j, j + 1);
        setNumberArr([...newArr]);
        await delay(SHORT_DELAY_IN_MS);
      }

      changeColor(newArr, j, j + 1, ElementStates.Default);

      if (j === length - i - 2) {
        newArr[j + 1].state = ElementStates.Modified;
      }

      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
  }
  newArr[0].state = ElementStates.Modified;
  setNumberArr([...newArr]);
  setInProgress(false);
};


export const selectionSort = async (
  arr: TColumn[],
  setNumberArr: Dispatch<SetStateAction<TColumn[]>>,
  setInProgress: Dispatch<SetStateAction<boolean>>,
  mode: "ascending" | "descending"
) => {
  const { length } = arr;
  const newArr: TColumn[] = arr;
  setInProgress(true);
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;

    for (let j = i + 1; j < length; j++) {
      newArr[maxInd].state = ElementStates.Changing;
      newArr[j].state = ElementStates.Changing;
      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);

      let modeSort;

      if (mode === "descending")
        modeSort = newArr[maxInd].number < newArr[j].number;
      if (mode === "ascending")
        modeSort = newArr[maxInd].number > newArr[j].number;

      if (modeSort) {
        newArr[maxInd].state =
          i === maxInd ? ElementStates.Changing : ElementStates.Default;
        maxInd = j;
        setNumberArr([...newArr]);
        await delay(SHORT_DELAY_IN_MS);
      }
      if (j !== maxInd) {
        newArr[j].state = ElementStates.Default;
        setNumberArr([...newArr]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }

    if (i === maxInd) {
      newArr[i].state = ElementStates.Modified;
      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
    } else {
      swap(newArr, maxInd, i);
      newArr[i].state = ElementStates.Modified;
      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
      newArr[maxInd].state = ElementStates.Default;
      setNumberArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
  }
  newArr[length - 1].state = ElementStates.Modified;
  setNumberArr([...newArr]);
  setInProgress(false);
};