import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { TColumn } from "../../types/column";
import { Column } from "../ui/column/column";
import { randomArr } from "../../utils/random-array";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swap } from "../../utils/swap";
import { ElementStates } from "../../types/element-states";
import { selectionSort } from "../../utils/selection-sorting";
import { changeColor } from "../../utils/change-color";

export const SortingPage: FC = () => {
  const [numberArr, setNumberArr] = useState<TColumn[]>([]);

  const onClickNewArr = () => {
    setNumberArr(randomArr());
  };

  const onClickSort = () => {
    selectionSort(numberArr, setNumberArr, "descending");
  };

  const bubbleSort = async (arr: TColumn[]) => {
    const { length } = arr;
    const newArr: TColumn[] = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        changeColor(newArr, j, j + 1, ElementStates.Changing);
        setNumberArr([...newArr])
        await delay(SHORT_DELAY_IN_MS);

        if (newArr[j].number < newArr[j + 1].number) {
          changeColor(newArr, j, j + 1, ElementStates.Changing);
          swap(newArr, j, j + 1);
          setNumberArr([...newArr])
          await delay(SHORT_DELAY_IN_MS);
        }

        changeColor(newArr, j, j + 1, ElementStates.Default);

        if(j === length - i - 2){
          newArr[j + 1].state = ElementStates.Modified;
        }

        setNumberArr([...newArr])
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    newArr[0].state = ElementStates.Modified;
    setNumberArr([...newArr]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput label="Выбор" extraClass={styles.radio} />
        <RadioInput label="Пузырёк" extraClass={styles.radio} />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={()=>{bubbleSort(numberArr)}}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => {
            onClickSort();
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
