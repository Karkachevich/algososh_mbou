import { Circle } from "./circle";
import { render } from "@testing-library/react";

//Корректность отрисовки элемента
//без буквы;
//с буквами (Snapshot);
//с head (Snapshot);
//с react-элементом в head;
//с tail;
//с react-элементом в tail;
//с index;
//с пропом isSmall ===  true;
//в состоянии default;
//в состоянии changing;
//в состоянии modified.

describe("Корректность отрисовки элемента", () => {
  it("без буквы", () => {
    const circle = render(<Circle />);
    expect(circle).toMatchSnapshot();
  });

  it("с буквами", () => {
    const circle = render(<Circle letter={"Q"} />);
    expect(circle).toMatchSnapshot();
  });

  it("с head", () => {
    const circle = render(<Circle head={"head"} />);
    expect(circle).toMatchSnapshot();
  });

  it("с react-элементом в head", () => {
    const circle = render(<Circle head={<Circle />} />);
    expect(circle).toMatchSnapshot();
  });

  it("с tail", () => {
    const circle = render(<Circle tail={"tail"} />);
    expect(circle).toMatchSnapshot();
  });
  
});
