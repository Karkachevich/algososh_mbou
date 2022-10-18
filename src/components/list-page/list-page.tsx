import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/char";
import { LinkedList } from "../../utils/linked-list";

export const ListPage: FC = () => {
  const size: number = 4;
  const randomArr: TChar[] = [...Array(size)].map(() => ({
    char: String(Math.floor(Math.random() * 100)),
    state: ElementStates.Default,
  }));

  const [charsArr, setCharsArr] = useState<TChar[]>(randomArr);
  const [inputValue, setInputValue] = useState<string>("");
 
  const linkedList = useMemo(() => new LinkedList<TChar>(), []);

  useEffect(() => {
    const newArr = [...charsArr];
    newArr.forEach((item, index) => {
      linkedList?.insertAt(item, index);
    });
  }, []);

  const onChange = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const addInHead = () => {
    const newArr = [...charsArr];
    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };
    linkedList.append(element);
    const oneElement = linkedList.getNodeByPosition(linkedList.getSize() - 1);
    newArr.unshift(oneElement) ;
        
    setCharsArr([...newArr]);
  };

  const addInTail = () => {
    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };

    linkedList.append(element);
    setCharsArr(linkedList.print());
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Добавить в head"
          extraClass={styles.button_list}
          onClick={addInHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button_list}
          onClick={addInTail}
        />
        <Button text="Удалить из head" extraClass={styles.button_list} />
        <Button text="Удалить из tail" extraClass={styles.button_list} />
      </div>
      <div className={styles.container}>
        <Input extraClass={styles.input} />
        <Button text="Добавить по индексу" extraClass={styles.button_index} />
        <Button text="Удалить по индексу" extraClass={styles.button_index} />
      </div>
      <ul className={styles.circles}>
        {charsArr.map((item, index) => {
          return (
            <li key={index} className={styles.items}>
              <Circle
                state={item.state}
                extraClass={styles.circle}
                letter={item.char}
                index={index}
                head={index === 0 ? "head" : ""}
                tail={index === charsArr.length - 1 ? "tail" : ""}
              />
              {charsArr.length > index + 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
