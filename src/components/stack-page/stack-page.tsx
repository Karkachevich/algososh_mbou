import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";



export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const add = (inputValue: string) => {
    
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          type="text"
          maxLength={4}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button text="Добавить" extraClass={styles.button_add} onClick={()=>{add(inputValue)}}/>
        <Button text="Удалить" extraClass={styles.button_remove} />
        <Button text="Очистить" />
      </div>
      <div className={styles.circles}>
        <Circle extraClass={styles.circle} />
      </div>
    </SolutionLayout>
  );
};
