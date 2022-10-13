import React, { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";

export const StackPage: FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input extraClass={styles.input} />
        <Button text="Добавить" extraClass={styles.button_add}/>
        <Button text="Удалить" extraClass={styles.button_remove}/>
        <Button text="Очистить"/>
      </div>
      <div className={styles.circles}>
      <Circle extraClass={styles.circle}/>
      </div>
      
    </SolutionLayout>
  );
};
