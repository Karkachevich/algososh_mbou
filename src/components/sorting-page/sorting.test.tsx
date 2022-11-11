import { TColumn } from "../../types/column";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";

describe("сортировка пузырьком по возрастанию", () => {
  it("пустой массив", async () => {
    const numberArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await bubbleSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из одного элемента", async () => {
    const numberArr = [{ number: 10 }];
    const checkArr: TColumn[] = [{ number: 10, state: ElementStates.Modified }];
    const arr = await bubbleSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из нескольких элементов", async () => {
    const numberArr = [{ number: 10 }, { number: 5 }, { number: 20 }];
    const checkArr: TColumn[] = [
      { number: 5, state: ElementStates.Modified },
      { number: 10, state: ElementStates.Modified },
      { number: 20, state: ElementStates.Modified },
    ];
    const arr = await bubbleSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
});

describe("сортировка пузырьком по убыванию", () => {
  it("пустой массив", async () => {
    const numberArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await bubbleSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из одного элемента", async () => {
    const numberArr = [{ number: 10 }];
    const checkArr: TColumn[] = [{ number: 10, state: ElementStates.Modified }];
    const arr = await bubbleSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из нескольких элементов", async () => {
    const numberArr = [{ number: 10 }, { number: 5 }, { number: 20 }];
    const checkArr: TColumn[] = [
      { number: 20, state: ElementStates.Modified },
      { number: 10, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
    ];
    const arr = await bubbleSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
});

describe("сортировка выбором по возрастанию", () => {
  it("пустой массив", async () => {
    const numberArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await selectionSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из одного элемента", async () => {
    const numberArr = [{ number: 10 }];
    const checkArr: TColumn[] = [{ number: 10, state: ElementStates.Modified }];
    const arr = await selectionSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из нескольких элементов", async () => {
    const numberArr = [{ number: 10 }, { number: 5 }, { number: 20 }];
    const checkArr: TColumn[] = [
      { number: 5, state: ElementStates.Modified },
      { number: 10, state: ElementStates.Modified },
      { number: 20, state: ElementStates.Modified },
    ];
    const arr = await selectionSort(numberArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
});

describe("сортировка выбором по убыванию", () => {
  it("пустой массив", async () => {
    const numberArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await selectionSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из одного элемента", async () => {
    const numberArr = [{ number: 10 }];
    const checkArr: TColumn[] = [{ number: 10, state: ElementStates.Modified }];
    const arr = await selectionSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
  it("массив из нескольких элементов", async () => {
    const numberArr = [{ number: 10 }, { number: 5 }, { number: 20 }];
    const checkArr: TColumn[] = [
      { number: 20, state: ElementStates.Modified },
      { number: 10, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
    ];
    const arr = await selectionSort(numberArr, "descending");
    expect(arr).toEqual(checkArr);
  });
});
