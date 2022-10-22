import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/circle";
import { LinkedListNode } from "./linked-list";
import { delay } from "../../utils/delay";
import {
  TInProgressInsertion,
  TInProgressRemoval,
} from "../../types/inProgress";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: FC = () => {
  const size: number = 4;
  const randomArr: TCircle[] = [...Array(size)].map(() => ({
    value: String(Math.floor(Math.random() * 100)),
    state: ElementStates.Default,
  }));

  const [charsArr, setCharsArr] = useState<TCircle[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>();
  const [inProgressInsertion, setInProgressInsertion] =
    useState<TInProgressInsertion>({
      inProgressAddHead: false,
      inProgressAddTail: false,
      inProgressAddByIndex: false,
    });
  const [inProgressRemove, setInProgressRemove] = useState<TInProgressRemoval>({
    inProgressRemoveHead: false,
    inProgressRemoveTail: false,
    inProgressRemoveFromIndex: false,
  });
  const linkedList = useMemo(() => new LinkedListNode<TCircle>(randomArr), []);

  useEffect(() => {
    setCharsArr(linkedList.print());
  }, []);

  const installAndDelay = async (arr: TCircle[]) => {
    setCharsArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const disabled =
    inProgressInsertion.inProgress || inProgressRemove.inProgress;

  const onChangeValue = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const onChangeIndex = (evt: SyntheticEvent<HTMLInputElement, Event>) => {
    const index = Number(evt.currentTarget.value.replace(/[^0-9]/g, ""));
    setInputIndex(index);
  };

  const addInHead = async () => {
    setInProgressInsertion({ inProgressAddHead: true, inProgress: true });
    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    const newArr = linkedList.print();
   
    const position = 0;

    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: true,
        value: inputValue,
        state: ElementStates.Changing,
      },
    };

    await installAndDelay(newArr);

    newArr[position] = {
      ...newArr[position],
      extra_circle: undefined,
    };

    newArr.unshift({
      value: inputValue,
      state: ElementStates.Modified,
    });

    if(linkedList.getSize() === 0){
        newArr.pop();
    }

    linkedList.insertAt(element, position);

    await installAndDelay(newArr);

    newArr[position].state = ElementStates.Default;

    setInputValue("");
    setInProgressInsertion({ inProgressAddHead: false, inProgress: false });
  };

  const addInTail = async () => {
    setInProgressInsertion({ inProgressAddTail: true, inProgress: true });

    const newArr = linkedList.print();
    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    linkedList?.append(element);

    const position = newArr.length - 1;
    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: true,
        value: inputValue,
        state: ElementStates.Changing,
      },
    };
    await installAndDelay(newArr);

    newArr[position] = {
      ...newArr[position],
      extra_circle: undefined,
    };
    newArr.push({
      value: inputValue,
      state: ElementStates.Modified,
    });
    await installAndDelay(newArr);
    newArr[position + 1].state = ElementStates.Default;
    setInputValue("");
    setInProgressInsertion({ inProgressAddTail: false, inProgress: false });
  };

  const removeHead = async () => {
    setInProgressRemove({ inProgressRemoveHead: true, inProgress: true });
    const newArr = linkedList.print();

    const position = 0;
    const element = linkedList.removeFromPosition(position);

    newArr[position] = {
      ...newArr[position],
      value: "",
      extra_circle: {
        removal: true,
        value: element.value,
        state: ElementStates.Changing,
      },
    };
    await installAndDelay(newArr);
    newArr.shift();
    setCharsArr([...newArr]);

    setInProgressRemove({ inProgressRemoveHead: false, inProgress: false });
  };

  const removeTail = async () => {
    setInProgressRemove({ inProgressRemoveTail: true, inProgress: true });
    const newArr = linkedList.print();
    const position = linkedList.getSize() - 1;
    const element = linkedList.removeFromPosition(position);
    newArr[position] = {
      ...newArr[position],
      value: "",
      extra_circle: {
        removal: true,
        value: element.value,
        state: ElementStates.Changing,
      },
    };
    await installAndDelay(newArr);
    newArr.pop();
    setCharsArr([...newArr]);
    setInProgressRemove({ inProgressRemoveTail: false, inProgress: false });
  };

  const addByIndex = async () => {
    setInProgressInsertion({ inProgressAddByIndex: true, inProgress: true });
    setInputIndex(undefined);
    const newArr = linkedList.print();

    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    if (inputIndex! > newArr.length - 1) {
      setInProgressInsertion({
        inProgressAddByIndex: false,
        inProgress: false,
      });
      return 0;
    }

    const position = inputIndex!;
    linkedList?.insertAt(element, position);
    const newElement = linkedList.getNodeByPosition(position);

    for (let i = 0; i <= position; i++) {
      newArr[i] = {
        ...newArr[i],
        extra_circle: {
          insertion: true,
          value: newElement!.value,
          state: ElementStates.Changing,
        },
      };
      await delay(SHORT_DELAY_IN_MS);
      if (i >= 0) {
        newArr[i - 1] = {
          ...newArr[i - 1],
          extra_circle: {
            insertion: false,
            value: undefined,
            state: ElementStates.Changing,
          },
        };
        await installAndDelay(newArr);
      }
    }

    newArr[position] = {
      ...newArr[position],
      extra_circle: {
        insertion: false,
        value: undefined,
      },
    };

    newArr.splice(position, 0, {
      value: newElement!.value,
      state: ElementStates.Modified,
    });
    await installAndDelay(newArr);
    newArr[position].state = ElementStates.Default;
    setInputValue("");
    setInProgressInsertion({ inProgressAddByIndex: false, inProgress: false });
  };

  const removeFromIndex = async () => {
    setInProgressRemove({ inProgressRemoveFromIndex: true, inProgress: true });
    setInputIndex(undefined);
    const newArr = linkedList.print();
    if (inputIndex! > newArr.length - 1) {
      setInProgressRemove({
        inProgressRemoveFromIndex: false,
        inProgress: false,
      });
      return 0;
    }
    const position = inputIndex!;
    const element = linkedList.removeFromPosition(position);

    for (let i = 0; i <= position; i++) {
      newArr[i] = {
        ...newArr[i],
        state: ElementStates.Changing,
      };
      await installAndDelay(newArr);
      if (i === position) {
        newArr[i] = {
          ...newArr[i],
          value: "",
          extra_circle: {
            removal: true,
            value: element.value,
            state: ElementStates.Changing,
          },
        };
        await installAndDelay(newArr);
      }
    }

    newArr.splice(position, 1);
    await installAndDelay(newArr);
    newArr.map((item) => (item.state = ElementStates.Default));
    setInProgressRemove({
      inProgressRemoveFromIndex: false,
      inProgress: false,
    });
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
          onChange={onChangeValue}
          disabled={disabled}
        />
        <Button
          text="Добавить в head"
          extraClass={styles.button_list}
          onClick={addInHead}
          disabled={!inputValue || disabled}
          isLoader={inProgressInsertion?.inProgressAddHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button_list}
          onClick={addInTail}
          disabled={!inputValue || disabled}
          isLoader={inProgressInsertion?.inProgressAddTail}
        />
        <Button
          text="Удалить из head"
          extraClass={styles.button_list}
          onClick={removeHead}
          disabled={disabled}
          isLoader={inProgressRemove.inProgressRemoveHead}
        />
        <Button
          text="Удалить из tail"
          extraClass={styles.button_list}
          onClick={removeTail}
          disabled={disabled}
          isLoader={inProgressRemove.inProgressRemoveTail}
        />
      </div>
      <div className={styles.container}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          maxLength={1}
          value={inputIndex || ""}
          onChange={onChangeIndex}
          disabled={disabled}
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.button_index}
          onClick={addByIndex}
          disabled={!inputValue || !inputIndex || disabled}
          isLoader={inProgressInsertion?.inProgressAddByIndex}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={removeFromIndex}
          disabled={!inputIndex || disabled}
          isLoader={inProgressRemove.inProgressRemoveFromIndex}
        />
      </div>
      <ul className={styles.circles}>
        {charsArr.map((item, index) => {
          return (
            <li key={index} className={styles.items}>
              <Circle
                state={item.state}
                extraClass={styles.circle}
                letter={item.value}
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
