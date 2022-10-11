import React, {FC} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";

export const SortingPage: FC = () => {

  
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
        />
        <Button text="Новый массив" extraClass="ml-40" />
      </div>
      <div className={styles.columns}>
      <Column index={100} extraClass={styles.column}/>
      <Column index={10}/>
      </div>
      
    </SolutionLayout>
  );
};
