import { Button } from "./button";
import { render } from "@testing-library/react";

describe('Корректность отрисовки кнопки', () => {
    it('кнопки с текстом', () => {
        const button = render(<Button text="Добавить"/>);
        expect(button).toMatchSnapshot();
    });

    it('кнопки без текста', () => {
        const button = render(<Button />);
        expect(button).toMatchSnapshot();
    });

    it('заблокированной кнопки', () => {
        const button = render(<Button disabled={true}/>);
        expect(button).toMatchSnapshot();
    });

})