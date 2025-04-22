import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { createHeader } from './header';

describe('Given createHeader', () => {
    beforeAll(() => {
        createHeader();
    });

    describe('When createHeader is called', () => {
        test('Then title "Productos" should be in the document ', () => {
            const element = screen.getByRole('heading', {
                name: /Productos/i,
            });
            expect(element).toBeInTheDocument();
        });
    });
});
