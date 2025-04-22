import { ApiRepo } from './api.repo';
import type { Product } from '../types/product';

describe('ApiRepo', () => {
    const repo = new ApiRepo();
    const mockProduct: Product = {
        id: 1,
        name: 'Tablet',
        description: 'Samsung Galaxy',
        category: 'components',
        price: 300,
        hasPromo: true,
    };

    beforeEach(() => {
        vi.restoreAllMocks();
        global.fetch = vi.fn();
    });

    test('getProducts should return product list', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => [mockProduct],
        } as Response);

        const result = await repo.getProducts();
        expect(result).toEqual([mockProduct]);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/products');
    });

    test('createProduct should POST and return created product', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockProduct,
        } as Response);

        const result = await repo.createProduct({
            name: mockProduct.name,
            description: mockProduct.description,
            category: mockProduct.category,
            price: mockProduct.price,
            hasPromo: mockProduct.hasPromo,
        });

        expect(result).toEqual(mockProduct);
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3000/products',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }),
        );
    });

    test('updateProduct should PATCH and return updated product', async () => {
        const updatedName = 'Tablet Pro';

        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                ...mockProduct,
                name: updatedName,
            }),
        } as unknown as Response);

        const result = await repo.updateProduct(mockProduct.id, {
            name: updatedName,
        });

        expect(result.name).toBe(updatedName);

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:3000/products/${mockProduct.id}`,
            expect.objectContaining({
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            }),
        );
    });

    test('deleteProduct should DELETE and return updated product list', async () => {
        const remainingProducts: Product[] = [];

        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => remainingProducts,
        } as Response);

        const result = await repo.deleteProduct(mockProduct.id);
        expect(result).toEqual(remainingProducts);
        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:3000/products/${mockProduct.id}`,
            expect.objectContaining({
                method: 'DELETE',
            }),
        );
    });
});
