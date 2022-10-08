import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [inProgress, setInProgress] = useState<boolean>(false);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          type=""
          max={19}
          extraClass={styles.input}
          isLimitText={true}
          onChange={onChange}
        />
        <Button text="Развернуть" extraClass={styles.button} />
      </div>
      <ul className={styles.circles}>{inputValue && <Circle />}</ul>
    </SolutionLayout>
  );
};
