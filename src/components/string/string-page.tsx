import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { swap } from "../../utils/swap";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";

export const StringPage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [charArr, setCharArr] = useState<TChar[]>([]);
  const [inProgress, setInProgress] = useState(false);
  
  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const reverse = async (inputValue: string) => {

    const charsArr: TChar[] = inputValue.split("").map((item) => {
      return { char: item, state: ElementStates.Default };
    });

    setInProgress(true);

    let start: number = 0;
    let end: number = charsArr.length - 1;

    while (end >= start) {
      if (end === start) {
        await delay(DELAY_IN_MS);
        charsArr[start].state = ElementStates.Modified;
        charsArr[end].state = ElementStates.Modified;
        setCharArr([...charsArr]);
        await delay(DELAY_IN_MS);
      } else {
        charsArr[start].state = ElementStates.Changing;
        charsArr[end].state = ElementStates.Changing;
        setCharArr([...charsArr]);
        await delay(DELAY_IN_MS);
        swap(charsArr, start, end);
        charsArr[start].state = ElementStates.Modified;
        charsArr[end].state = ElementStates.Modified;
        setCharArr([...charsArr]);
        await delay(DELAY_IN_MS);
      }

      start++;
      end--;
    }

    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          maxLength={11}
          extraClass={styles.input}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          extraClass={styles.button}
          onClick={() => reverse(inputValue)}
          isLoader={inProgress}
        />
      </div>
      <ul className={styles.circles}>
        {!!charArr &&
          charArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.char}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
