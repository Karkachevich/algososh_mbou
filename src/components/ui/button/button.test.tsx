import { Button } from "./button";
import { render } from "@testing-library/react";

describe('Корректность отрисовки кнопки', () => {
    it('кнопки с текстом', () => {
        const button = render(<Button text="Добавить"/>);
        expect(button).toMatchSnapshot();
    });

})