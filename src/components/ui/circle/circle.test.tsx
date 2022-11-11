import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import { render } from "@testing-library/react";

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

  it("с react-элементом в tail", () => {
    const circle = render(<Circle tail={<Circle />} />);
    expect(circle).toMatchSnapshot();
  });

  it("с index", () => {
    const circle = render(<Circle index={0} />);
    expect(circle).toMatchSnapshot();
  });

  it("с пропcом isSmall ===  true", () => {
    const circle = render(<Circle isSmall={true} />);
    expect(circle).toMatchSnapshot();
  });

  it("в состоянии default", () => {
    const circle = render(<Circle state={ElementStates.Default} />);
    expect(circle).toMatchSnapshot();
  });

  it("в состоянии changing", () => {
    const circle = render(<Circle state={ElementStates.Changing} />);
    expect(circle).toMatchSnapshot();
  });

  it("в состоянии modified", () => {
    const circle = render(<Circle state={ElementStates.Modified} />);
    expect(circle).toMatchSnapshot();
  });
});
