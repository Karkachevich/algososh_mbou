import React, { FC, useState, SyntheticEvent, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/circle";
import { delay } from "../../utils/delay";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TCircle[]>([]);
  const [inProgressAdd, setInProgressAdd] = useState<boolean>(false);
  const [inProgressDelete, setInProgressDelete] = useState<boolean>(false);
  const stack = useMemo(() => new Stack<TCircle>(), []);

  const disabled = charsArr.length === 0;

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const push = async () => {
    setInProgressAdd(true);
    setInputValue("");

    if (inputValue === "") return 0;
    stack.push({
      value: inputValue,
      head: "top",
    });
    const newArr = stack.getElemets();
    const position = newArr.length - 1;

    newArr.map((item) => (item.head = ""));

    setCharsArr([...newArr]);
    newArr[position].head = "top";
    newArr[position].state = ElementStates.Changing;

    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position].state = ElementStates.Default;
    setCharsArr([...newArr]);
    setInProgressAdd(false);
  };

  const pop = async () => {
    setInProgressDelete(true);
    charsArr[charsArr.length - 1].state = ElementStates.Changing;
    setCharsArr([...charsArr]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    const newArr = stack.getElemets();

    if (newArr.length > 0) {
      newArr[newArr.length - 1].head = "top";
      newArr[newArr.length - 1].state = ElementStates.Default; 
      setCharsArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS);
      newArr[newArr.length - 1].state = ElementStates.Default;
      setCharsArr([...newArr]);
    } else {
      clear();
      setInProgressDelete(false);
    }
    setInProgressDelete(false);
  };

  const clear = () => {
    stack.clear();
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
        <Button
          text="Добавить"
          extraClass={styles.button_add}
          onClick={push}
          disabled={inProgressAdd || !inputValue}
          isLoader={inProgressAdd}
        />
        <Button
          text="Удалить"
          extraClass={styles.button_remove}
          onClick={pop}
          disabled={disabled || inProgressAdd}
          isLoader={inProgressDelete}
        />
        <Button text="Очистить" disabled={disabled || inProgressAdd || inProgressDelete} onClick={clear} />
      </div>
      <div className={styles.circles}>
        {!!charsArr &&
          charsArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.value}
                index={index}
                head={item.head}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
