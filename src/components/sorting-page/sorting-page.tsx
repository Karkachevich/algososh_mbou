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

export const SortingPage: FC = () => {
  const [numberArr, setNumberArr] = useState<TColumn[]>([]);

  const onClickNewArr = () => {
    setNumberArr(randomArr());
  };

  const selectionSort = async (arr: TColumn[]) => {
    const { length } = arr;
    const newArr: TColumn[] = arr;

    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;

      for (let j = i + 1; j < length; j++) {
        newArr[maxInd].state = ElementStates.Changing;
        newArr[j].state = ElementStates.Changing;
        setNumberArr([...newArr]);
        await delay(SHORT_DELAY_IN_MS);

        if (newArr[maxInd].number < newArr[j].number) {
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
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => {
            selectionSort(numberArr);
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
