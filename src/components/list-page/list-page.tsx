import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/circle";
import { LinkedList } from "../../utils/linked-list";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: FC = () => {
  const size: number = 4;
  const randomArr: TCircle[] = [...Array(size)].map(() => ({
    char: String(Math.floor(Math.random() * 100)),
    state: ElementStates.Default,
  }));

  const [charsArr, setCharsArr] = useState<TCircle[]>(randomArr);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>();
  const [inProgressInsertion, setInProgressInsertion] =
    useState<boolean>(false);

  const linkedList = useMemo(() => new LinkedList<TCircle>(), []);

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

  const onChangeIndex = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const index = Number(evt.currentTarget.value.replace(/[^0-9]/g, ""));
    setInputIndex(index);
  };

  const addInHead = async () => {
    const newArr = [...charsArr];
    setInputValue("");
    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };

    const position = 0;
    linkedList?.insertAt(element, position);
    const head = linkedList.getNodeByPosition(position);
    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: true,
        value: head.char,
        state: ElementStates.Changing,
      },
    };
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: false,
        value: undefined,
      },
    };

    newArr.unshift({ char: head.char, state: ElementStates.Modified });
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position].state = ElementStates.Default;
    setCharsArr([...newArr]);
  };

  const addInTail = async () => {
    const newArr = [...charsArr];
    setInputValue("");
    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };

    const position = linkedList.getSize() - 1;
    linkedList?.insertAt(element, position);
    const head = linkedList.getNodeByPosition(position);
    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: true,
        value: head.char,
        state: ElementStates.Changing,
      },
    };
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: false,
        value: undefined,
      },
    };

    newArr.push({ char: head.char, state: ElementStates.Modified });
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position + 1].state = ElementStates.Default;
    setCharsArr([...newArr]);
  };

  const removeHead = async () => {
    const newArr = [...charsArr];

    const position = 0;
    const element = linkedList.removeFromPosition(position);
    newArr[position] = {
      ...newArr[position],
      char: "",
      state: ElementStates.Modified,
      extra_circle: {
        removal: true,
        value: element.char,
        state: ElementStates.Changing,
      },
    };
    
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr.shift();
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position].state = ElementStates.Default;
    setCharsArr([...newArr]);
  };

  const removeTail = async () => {
    const newArr = [...charsArr];

    const position = linkedList.getSize() - 1;
    const element = linkedList.removeFromPosition(position);
    newArr[position] = {
      ...newArr[position],
      char: "",
      state: ElementStates.Modified,
      extra_circle: {
        removal: true,
        value: element.char,
        state: ElementStates.Changing,
      },
    };
    
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr.pop();
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position - 1].state = ElementStates.Default;
    setCharsArr([...newArr]);
    
  };

  const addByIndex = () => {
    let newArr = [...charsArr];
    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };
    linkedList.insertAt(element, inputIndex!);
    newArr = linkedList.print();

    setCharsArr([...newArr]);
  };

  const removeFromIndex = () => {
    let newArr = [...charsArr];
    linkedList.removeFromPosition(inputIndex!);
    newArr = linkedList.print();
    setCharsArr([...newArr]);
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
        <Button
          text="Удалить из head"
          extraClass={styles.button_list}
          onClick={removeHead}
        />
        <Button
          text="Удалить из tail"
          extraClass={styles.button_list}
          onClick={removeTail}
        />
      </div>
      <div className={styles.container}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          maxLength={1}
          value={inputIndex || ""}
          onChange={onChangeIndex}
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.button_index}
          onClick={addByIndex}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={removeFromIndex}
        />
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
              {item.extra_circle?.insertion && (
                <Circle
                  extraClass={styles.circle_insertion}
                  isSmall={true}
                  letter={item.extra_circle?.value}
                  state={item.extra_circle.state}
                />
              )}
              {item.extra_circle?.removal && (
                <Circle
                  extraClass={styles.circle_removal}
                  isSmall={true}
                  letter={item.extra_circle?.value}
                  state={item.extra_circle.state}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
