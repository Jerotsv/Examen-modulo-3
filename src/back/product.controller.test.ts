import { ProductsController } from './products.controller';
import { Mock } from 'vitest';
import { NextFunction, Request, Response } from 'express';

const mockRepo = {
    read: vi.fn().mockResolvedValueOnce([]),
    readById: vi.fn().mockResolvedValueOnce([]),
    create: vi.fn().mockResolvedValueOnce([]),
    update: vi.fn().mockResolvedValueOnce([]),
    delete: vi.fn().mockResolvedValueOnce([]),
};
const req = {
    params: {},
    body: {},
} as unknown as Request;
const res = {
    json: vi.fn(),
    status: vi.fn(),
} as unknown as Response;
const next = vi.fn() as NextFunction;

const error = new Error('Error');

describe('Given ProductsController', () => {
    const productsRepo = new ProductsController(mockRepo);
    test('Then should be defined', () => {
        //Assert
        expect(productsRepo).toBeDefined();
        expect(productsRepo).toBeInstanceOf(ProductsController);
    });
    describe('When use getAll', () => {
        test('Then should call json when repo response is valid', async () => {
            //Act
            await productsRepo.getAll(req, res, next);
            //Assert
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('Then should call next when repo throw an error', async () => {
            //Arrange
            (mockRepo.read as Mock).mockRejectedValueOnce(error);
            //Act
            await productsRepo.getAll(req, res, next);
            //Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('When use getById', () => {
        test('Then should call json when repo response is valid', async () => {
            //Act
            await productsRepo.getById(req, res, next);
            //Assert
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('Then should call next when repo throw an error', async () => {
            //Arrange
            (mockRepo.readById as Mock).mockRejectedValueOnce(error);
            //Act
            await productsRepo.getById(req, res, next);
            //Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe('When use create', () => {
        test('Then should call json when repo response is valid', async () => {
            //Act
            await productsRepo.create(req, res, next);
            //Assert
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('Then should call next when repo throw an error', async () => {
            //Arrange
            (mockRepo.create as Mock).mockRejectedValueOnce(error);
            //Act
            await productsRepo.create(req, res, next);
            //Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe('When use update', () => {
        test('Then should call json when repo response is valid', async () => {
            //Act
            await productsRepo.update(req, res, next);
            //Assert
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('Then should call next when repo throw an error', async () => {
            //Arrange
            (mockRepo.update as Mock).mockRejectedValueOnce(error);
            //Act
            await productsRepo.update(req, res, next);
            //Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe('When use delete', () => {
        test('Then should call json when repo response is valid', async () => {
            //Act
            await productsRepo.delete(req, res, next);
            //Assert
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('Then should call next when repo throw an error', async () => {
            //Arrange
            (mockRepo.delete as Mock).mockRejectedValueOnce(error);
            //Act
            await productsRepo.delete(req, res, next);
            //Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
