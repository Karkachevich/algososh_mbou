import React, { FC, useState, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";
//import { Stack } from "../../utils/stack";

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TChar[]>([]);
  //const stack = new Stack<string>();

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;

    setInputValue(element);
  };

  const push = () => {
    if (inputValue === "") return 0;
    charsArr.push({ char: inputValue, state: ElementStates.Default });
    setCharsArr([...charsArr]);
    setInputValue("");
  };

  const pop = () => {
    charsArr.pop();
    setCharsArr([...charsArr]);
  };

  const clear = () => {
    setCharsArr([]);
  };

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
        <Button text="Добавить" extraClass={styles.button_add} onClick={push} />
        <Button
          text="Удалить"
          extraClass={styles.button_remove}
          onClick={pop}
        />
        <Button text="Очистить" onClick={clear} />
      </div>
      <div className={styles.circles}>
        {!!charsArr &&
          charsArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.char}
                index={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
