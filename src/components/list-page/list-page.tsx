import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";

export const ListPage: FC = () => {
  const size: number = 4;
  const randomArr: TChar[] = [...Array(size)].map(() => ({
    char: String(Math.floor(Math.random() * 100)),
    state: ElementStates.Default,
  }));
  const [charsArr, setCharsArr] = useState<TChar[]>(randomArr);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button text="Добавить в head" extraClass={styles.button_list} />
        <Button text="Добавить в tail" extraClass={styles.button_list} />
        <Button text="Удалить из head" extraClass={styles.button_list} />
        <Button text="Удалить из tail" extraClass={styles.button_list} />
      </div>
      <div className={styles.container}>
        <Input extraClass={styles.input} />
        <Button text="Добавить по индексу" extraClass={styles.button_index} />
        <Button text="Удалить по индексу" extraClass={styles.button_index} />
      </div>
      <div className={styles.circles}>
        {charsArr.map((item, index) => {
          return (
            <li key={index} className={styles.items}>
              <Circle
                state={item.state}
                extraClass={styles.circle}
                letter={item.char}
                index={index}
                head={item.head}
                tail={item.tail}
              />
              {charsArr.length > index + 1 && <ArrowIcon/>}
            </li>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
