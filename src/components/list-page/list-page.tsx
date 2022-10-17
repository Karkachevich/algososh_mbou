import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";


export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <Input/>
      <Button/>
      <Button/>
      <Button/>
      <Button/>
      <Input/>
      <Button/>
      <Button/>
    </SolutionLayout>
  );
};
