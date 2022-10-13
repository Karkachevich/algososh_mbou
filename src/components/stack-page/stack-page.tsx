import React, { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StackPage: FC = () => {
  return (
    <SolutionLayout title="Стек">
      <Input />
      <Button />
      <Button />
      <Button />
    </SolutionLayout>
  );
};
