import React, { FC, useState, SyntheticEvent, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { queueArr } from "../../constants/queue-arr";
import { Queue } from "../../utils/queue";

export const QueuePage: FC = () => {

  
  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TChar[]>(queueArr);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const queue = useMemo(() => new Queue<string>(7), []);

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const enqueue = () => {
    
    setInputValue("")
    const newArr = [...charsArr]

    queue.enqueue(inputValue);
    const head = queue.getHead();
    const tail = queue.getTail();

    newArr[head.index].char = head.value; 
    newArr[head.index].head = "head";

    if (tail.index > 0) newArr[tail.index - 1].tail = "";

    newArr[tail.index].char = tail.value; 
    newArr[tail.index].tail = "tail";
    newArr[tail.index].state = ElementStates.Changing;
    console.log(newArr)
    setCharsArr([...newArr])
    newArr[tail.index].state = ElementStates.Default;
   
  };

  return (
    <SolutionLayout title="Очередь">
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
          disabled={inProgress}
          onClick={enqueue}
        />
        <Button text="Удалить" extraClass={styles.button_remove} />
        <Button text="Очистить" />
      </div>
      <div className={styles.circles}>
        {charsArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                extraClass={styles.circle}
                letter={item.char}
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
