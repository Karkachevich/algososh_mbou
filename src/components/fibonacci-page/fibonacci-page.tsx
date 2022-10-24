import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { getFibonacciNumbers } from "./utils";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [numbersArr, setNumberArr] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const fibonacci = async (inputValue: string) => {
    const value = Number(inputValue);
    if (value <= 0 || value > 19) {
      return 0;
    }
    const arrFibNums: number[] = getFibonacciNumbers(value);
    const newArr: number[] = [];
    setInProgress(true);
    for (let num of arrFibNums) {
      newArr.push(num);
      setNumberArr([...newArr]);
      await delay(DELAY_IN_MS);
    }
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          type=""
          max={19}
          extraClass={styles.input}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          extraClass={styles.button}
          onClick={() => fibonacci(inputValue)}
          isLoader={inProgress}
        />
      </div>
      <ul className={styles.circles}>
        {numbersArr.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.toString()}
              index={index}
              extraClass={styles.circle}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
