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
import { type } from "@testing-library/user-event/dist/type";

type TInProgressInsertion = {
  inProgressAddHead?: boolean;
  inProgressAddTail?: boolean;
  inProgressAddByIndex?: boolean;
};

type TInProgressRemoval = {
  inProgressRemoveHead?: boolean;
  inProgressRemoveTail?: boolean;
  inProgressRemoveFromIndex?: boolean;
}

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
    useState<TInProgressInsertion>({
      inProgressAddHead: false,
      inProgressAddTail: false,
      inProgressAddByIndex: false,
    });

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
    setInProgressInsertion({ inProgressAddHead: true });
    setInputValue("");
    const newArr = [...charsArr];

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

    setInProgressInsertion({ inProgressAddHead: false });
  };

  const addInTail = async () => {
    setInProgressInsertion({ inProgressAddTail: true });
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
    setInProgressInsertion({ inProgressAddTail: false });
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

  const addByIndex = async () => {
    setInProgressInsertion({ inProgressAddByIndex: true });
    setInputValue("");
    setInputIndex(undefined);
    const newArr = [...charsArr];

    const element = {
      char: inputValue,
      state: ElementStates.Default,
    };

    const position = inputIndex!;
    linkedList?.insertAt(element, position);
    const newElement = linkedList.getNodeByPosition(position);

    for (let i = 0; i <= position; i++) {
      newArr[i] = {
        ...newArr[i],
        extra_circle: {
          insertion: true,
          value: newElement.char,
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
        await delay(SHORT_DELAY_IN_MS);
        setCharsArr([...newArr]);
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
      char: newElement.char,
      state: ElementStates.Modified,
    });
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr[position].state = ElementStates.Default;
    setCharsArr([...newArr]);
    setInProgressInsertion({ inProgressAddByIndex: false });
  };

  const removeFromIndex = async () => {
    setInputIndex(undefined);
    let newArr = [...charsArr];
    const position = inputIndex!;
    const element = linkedList.removeFromPosition(position);

    for (let i = 0; i <= position; i++) {
      newArr[i] = {
        ...newArr[i],
        state: ElementStates.Changing,
      };
      await delay(SHORT_DELAY_IN_MS);
      setCharsArr([...newArr]);
      if (i === position) {
        newArr[i] = {
          ...newArr[i],
          char: "",
          extra_circle: {
            removal: true,
            value: element.char,
            state: ElementStates.Changing,
          },
        };
        await delay(SHORT_DELAY_IN_MS);
        setCharsArr([...newArr]);
      }
    }

    newArr.splice(position, 1);
    await delay(SHORT_DELAY_IN_MS);
    setCharsArr([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    newArr.map((item) => (item.state = ElementStates.Default));
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
          disabled={!inputValue}
          isLoader={inProgressInsertion?.inProgressAddHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button_list}
          onClick={addInTail}
          disabled={!inputValue}
          isLoader={inProgressInsertion?.inProgressAddTail}
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
          disabled={!inputValue || !inputIndex}
          isLoader={inProgressInsertion?.inProgressAddByIndex}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={removeFromIndex}
          disabled={!inputIndex}
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
