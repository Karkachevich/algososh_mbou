import React, { FC, useState, SyntheticEvent, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/circle";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue";

export const QueuePage: FC = () => {
  const size: number = 7;
  const queueArr: TCircle[] = [...Array(size)].map(() => ({
    value: "",
    state: ElementStates.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TCircle[]>(queueArr);
  const [inProgressEnqueue, setInProgressEnqueue] = useState<boolean>(false);
  const [inProgressDenqueue, setInProgressDenqueue] = useState<boolean>(false);
  const [headIndex, setHeadIndex] = useState<number | null>(null);
  const queue = useMemo(() => new Queue<string>(size), []);
  const maxLength: number = 4;

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const clear = () => {
    queue.clear();
    setCharsArr([...queueArr]);
    setHeadIndex(null);
  };

  const enqueue = async () => {
    setInputValue("");
    setInProgressEnqueue(true);
    const newArr = [...charsArr];

    queue.enqueue(inputValue);
    const head = queue.getHead();
    const tail = queue.getTail();
    newArr[head.index] = { value: head.value, head: "head" };
    setHeadIndex(head.index);
    if (tail.index > 0) newArr[tail.index - 1].tail = "";
    newArr[tail.index] = {
      ...newArr[tail.index],
      value: tail.value,
      tail: "tail",
      state: ElementStates.Changing,
    };

    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[tail.index].state = ElementStates.Default;
    setCharsArr([...newArr]);
    setInProgressEnqueue(false);
  };

  const dequeue = async () => {
    const newArr = [...charsArr];
    setInProgressDenqueue(true);
    const head = queue.getHead();
    const tail = queue.getTail();

    if (head.index === tail.index) {
      clear();
    } else {
      queue.dequeue();
      const head = queue.getHead();

      newArr[head.index - 1].state = ElementStates.Changing;
      setCharsArr([...newArr]);
      if (head.index > 0) {
        newArr[head.index - 1] = { value: "", head: "" };
      }
      await delay(SHORT_DELAY_IN_MS);
      newArr[head.index] = {
        ...newArr[head.index],
        value: head.value,
        head: "head",
        state: ElementStates.Changing,
      };
      setCharsArr([...newArr]);
    }

    setInProgressDenqueue(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          type="text"
          maxLength={maxLength}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Добавить"
          extraClass={styles.button_add}
          onClick={enqueue}
          disabled={
            inProgressDenqueue ||
            !inputValue ||
            charsArr[charsArr.length - 1].value !== ""
          }
          isLoader={inProgressEnqueue}
        />
        <Button
          text="Удалить"
          extraClass={styles.button_remove}
          onClick={dequeue}
          disabled={inProgressEnqueue || headIndex === null}
          isLoader={inProgressDenqueue}
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={
            inProgressEnqueue || inProgressDenqueue || headIndex === null
          }
        />
      </div>
      <div className={styles.circles}>
        {charsArr.map((item, index) => {
          return (
            <Circle
              key={index}
              state={item.state}
              extraClass={styles.circle}
              letter={item.value}
              index={index}
              head={item.head}
              tail={item.tail}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
