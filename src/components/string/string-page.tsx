import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { swap } from "../../utils/swap";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./string-page.module.css";
import { changeColor } from "../../utils/changeColor";


export const StringPage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [lettersArr, setLettesrArr] = useState<string[]>([]);
  const [inProgress, setInProgress] = useState(false);
  let color: any;
  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value ;
    setInputValue(element);
  };

  const getLetters = (inputValue: string) => {
     return setLettesrArr(inputValue.split(""));
  };


  const reverse = async (inputValue: string) => {
    const charsArr = inputValue.split("");
    setInProgress(true);

    for (let arr = charsArr, start = 0, end = arr.length - 1; end >= start; start++, end--){
      if(end === start){
        color = changeColor(start, end );
        await delay( SHORT_DELAY_IN_MS);
        setInProgress(false);
      } else {
        color = changeColor(start, end );
        await delay( SHORT_DELAY_IN_MS);
        swap(arr, start, end);
        setLettesrArr([...arr]);
        await delay( SHORT_DELAY_IN_MS);
      }
     
      
      
    }
     
    setInProgress(false);
     
   
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          maxLength={11}
          extraClass={styles.input}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          extraClass={styles.button}
          onClick={() => reverse(inputValue)}
        />
      </div>
      <ul className={styles.circles}>
        {!!lettersArr &&
          lettersArr.map((item, index) => {
            return (
              <Circle 
              key={index}
              state={color}
              extraClass={styles.circle} 
              letter={item} />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
