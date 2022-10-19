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
import { changeColor } from "../../utils/change-color";
import { TCircle } from "../../types/circle";

export const StringPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TCircle[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  
  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const reverse = async () => {

    const newCharsArr: TCircle[] = inputValue.split("").map((item) => {
      return { char: item, state: ElementStates.Default };
    });
    setInputValue("")
    setInProgress(true);

    let start: number = 0;
    let end: number = newCharsArr.length - 1;

    while (end >= start) {
      if (end === start) {
        await delay(DELAY_IN_MS);
        changeColor(newCharsArr, start, end, ElementStates.Modified)
        setCharsArr([...newCharsArr]);
        await delay(DELAY_IN_MS);
      } else {
        changeColor(newCharsArr, start, end, ElementStates.Changing)
        setCharsArr([...newCharsArr]);
        await delay(DELAY_IN_MS);
        swap(newCharsArr, start, end);
        changeColor(newCharsArr, start, end, ElementStates.Modified)
        setCharsArr([...newCharsArr]);
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
          onClick={reverse}
          isLoader={inProgress}
        />
      </div>
      <ul className={styles.circles}>
        {!!charsArr &&
          charsArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.value}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
