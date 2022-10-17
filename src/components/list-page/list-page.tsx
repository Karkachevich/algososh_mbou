import React, {FC} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list-page.module.css";

export const ListPage: FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button text="Добавить в head" extraClass={styles.button_list} />
        <Button text="Добавить в tail" extraClass={styles.button_list} />
        <Button text="Удалить из head" extraClass={styles.button_list} />
        <Button text="Удалить из tail" extraClass={styles.button_list} />
      </div>
      <div className={styles.container}>
        <Input extraClass={styles.input} />
        <Button text="Добавить по индексу" extraClass={styles.button_index} />
        <Button text="Удалить по индексу" extraClass={styles.button_index} />
      </div>
      <div className={styles.circles}>
      <Circle />
      </div>
      
    </SolutionLayout>
  );
};
