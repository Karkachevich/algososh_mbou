import React, { FC, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { TColumn } from "../../types/column";
import { Column } from "../ui/column/column";
import { randomArr } from "../../utils/random-array";
import { bubbleSort, selectionSort } from "./utils";

export const SortingPage: FC = () => {
  const [numberArr, setNumberArr] = useState<TColumn[]>([]);
  const [sortMode, setSortMode] = useState<string>("selection");
  const [inProgressAscent, setInProgressAscent] = useState<boolean>(false);
  const [inProgressDescent, setInProgressDescent] = useState<boolean>(false);

  const disabledRadioInput =
    inProgressAscent || inProgressDescent || numberArr.length === 0;

    useEffect(() => {
      setNumberArr(randomArr());
    }, []);

  const onClickNewArr = () => {
    setNumberArr(randomArr());
  };


  const onClickSortDescending = () => {
    if (sortMode === "selection") {
      selectionSort(
        numberArr,
        "descending",
        setNumberArr,
        setInProgressDescent
      );
    }
    if (sortMode === "bubble") {
      bubbleSort(numberArr, "descending", setNumberArr, setInProgressDescent);
    }
  };

  const onClickSortAscending = () => {
    if (sortMode === "selection") {
      selectionSort(numberArr, "ascending", setNumberArr, setInProgressAscent);
    }

    if (sortMode === "bubble") {
      bubbleSort(numberArr, "ascending", setNumberArr, setInProgressDescent);
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
          disabled={disabledRadioInput}
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          value="bubble"
          checked={sortMode === "bubble"}
          onChange={() => setSortMode("bubble")}
          disabled={disabledRadioInput}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button_ascending}
          onClick={onClickSortAscending}
          isLoader={inProgressAscent}
          disabled={inProgressDescent || numberArr.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button_descending}
          onClick={onClickSortDescending}
          isLoader={inProgressDescent}
          disabled={inProgressAscent || numberArr.length === 0}
        />
        <Button
          text="Новый массив"
          onClick={onClickNewArr}
          disabled={inProgressAscent || inProgressDescent}
        />
      </div>
      <div className={styles.columns}>
        {!!numberArr &&
          numberArr.map((item, index) => {
            return (
              <Column
                key={index}
                index={item.number!}
                state={item.state}
                extraClass={styles.column}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
