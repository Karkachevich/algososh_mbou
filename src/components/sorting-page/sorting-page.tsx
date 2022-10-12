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
  const [sortMode, setSortMode] = useState<string>("");

  const onClickNewArr = () => {
    setNumberArr(randomArr());
  };

  const onClickSortDescending = () => {
    if (sortMode === "selection") {
      selectionSort(numberArr, setNumberArr, "descending");
    }

    if (sortMode === "bubble") {
      bubbleSort(numberArr, setNumberArr, "descending");
    }
  };

  const onClickSortAscending = () => {
    if (sortMode === "selection") {
      selectionSort(numberArr, setNumberArr, "ascending");
    }

    if (sortMode === "bubble") {
      bubbleSort(numberArr, setNumberArr, "ascending");
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
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          value="bubble"
          checked={sortMode === "bubble"}
          onChange={() => setSortMode("bubble")}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={() => {
            onClickSortAscending();
          }}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => {
            onClickSortDescending();
          }}
        />
        <Button
          text="Новый массив"
          extraClass="ml-40"
          onClick={() => {
            onClickNewArr();
          }}
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
