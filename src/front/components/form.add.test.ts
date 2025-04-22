import { createFormAdd } from './form.add';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Category } from '../types/category';

vi.spyOn(console, 'log');

describe('createFormAdd', () => {
    test('should submit a product with correct data', async () => {
        const products = [
            {
                id: 1,
                name: 'Test',
                description: 'Description',
                category: 'mobile' as Category,
                price: 100,
                hasPromo: false,
            },
        ];

        createFormAdd(products, 'body', 'afterbegin');

        await userEvent.type(screen.getByLabelText(/name/i), 'Tablet');
        await userEvent.type(
            screen.getByLabelText(/description/i),
            'Samsung Galaxy Tab',
        );
        await userEvent.type(screen.getByLabelText(/price/i), '350');
        await userEvent.selectOptions(
            screen.getByLabelText(/category/i),
            'mobile',
        );
        await userEvent.click(screen.getByLabelText(/promoción/i));

        screen.getByRole('button', { name: /crear/i }).click();

        expect(console.log).toHaveBeenCalledWith('Form submitted:', {
            id: 2,
            name: 'Tablet',
            description: 'Samsung Galaxy Tab',
            price: 350,
            category: 'mobile',
            hasPromo: true,
        });
    });
});
