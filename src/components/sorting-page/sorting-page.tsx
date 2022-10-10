import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <RadioInput label="Выбор"/>
      <RadioInput label="Пузырёк"/>
      <Button text="По возрастанию" sorting={Direction.Ascending}/>
      <Button text="По убыванию" sorting={Direction.Descending}/>
      <Button text="Новый массив"/>
    </SolutionLayout>
  );
};
