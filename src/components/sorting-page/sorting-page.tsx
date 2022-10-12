import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { TColumn } from "../../types/column";
import { Column } from "../ui/column/column";
import { randomArr } from "../../utils/random-array";
import { selectionSort } from "../../utils/selection-sorting";
import { bubbleSort } from "../../utils/bubble-sorting";

export const SortingPage: FC = () => {
  const [numberArr, setNumberArr] = useState<TColumn[]>([]);
  const [sortMode, setSortMode] = useState<string>("selection");
  const [inProgressAscent, setInProgressAscent] = useState<boolean>(false);
  const [inProgressDescent, setInProgressDescent] = useState<boolean>(false);

  const onClickNewArr = () => {
    setNumberArr(randomArr());
  };

  const onClickSortDescending = () => {
    if (sortMode === "selection") {
      selectionSort(
        numberArr,
        setNumberArr,
        setInProgressDescent,
        "descending"
      );
    }
    if (sortMode === "bubble") {
      bubbleSort(numberArr, setNumberArr, setInProgressDescent, "descending");
    }
  };

  const onClickSortAscending = () => {
    if (sortMode === "selection") {
      selectionSort(numberArr, setNumberArr, setInProgressAscent, "ascending");
    }

    if (sortMode === "bubble") {
      bubbleSort(numberArr, setNumberArr, setInProgressAscent, "ascending");
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput
          label="Выбор"
          extraClass={styles.radio}
          value="selection"
          checked={sortMode === "selection"}
          onChange={() => setSortMode("selection")}
          disabled={inProgressAscent || inProgressDescent}
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          value="bubble"
          checked={sortMode === "bubble"}
          onChange={() => setSortMode("bubble")}
          disabled={inProgressAscent || inProgressDescent}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button_ascending}
          onClick={() => {
            onClickSortAscending();
          }}
          isLoader={inProgressAscent}
          disabled={inProgressDescent}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button_descending}
          onClick={() => {
            onClickSortDescending();
          }}
          isLoader={inProgressDescent}
          disabled={inProgressAscent}
        />
        <Button
          text="Новый массив"
          onClick={() => {
            onClickNewArr();
          }}
          disabled={inProgressAscent || inProgressDescent}
        />
      </div>
      <div className={styles.columns}>
        {!!numberArr &&
          numberArr.map((item, index) => {
            return (
              <Column
                key={index}
                index={item.number}
                state={item.state}
                extraClass={styles.column}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
