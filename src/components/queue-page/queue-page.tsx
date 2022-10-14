import React, { FC, useState, SyntheticEvent } from "react";
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


export const QueuePage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [charsArr, setCharsArr] = useState<TChar[]>(queueArr);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
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
        />
        <Button text="Удалить" extraClass={styles.button_remove} />
        <Button text="Очистить" />
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
                head={item.head}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
