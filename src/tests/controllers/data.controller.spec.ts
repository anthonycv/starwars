import { Request, Response } from "express";
import { DataController } from "../../controllers/data.controller";
import { ProductModel } from "../../models/product.model";
import { SwapiService } from "../../services/swapi.service";

jest.mock("../../models/product.model");
jest.mock("../../services/swapi.service");

describe("DataController", () => {
    describe("getAll", () => {
        it("should retrieve all products successfully", async () => {
            const mockRequest = {} as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockProducts = [{ productId: "1", name: "Product 1" }];
            (ProductModel.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

            await DataController.getAll(mockRequest, mockResponse);

            expect(ProductModel.getAllProducts).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                messages: "products successfully retrieved",
                data: mockProducts,
            });
        });
    });

    describe("getPlanetById", () => {
        it("should retrieve planet data with translated keys", async () => {
            const mockRequest = { params: { id: "1" } } as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockPlanet = { name: "Tatooine", climate: "arid", gravity: "1 standard" };

            (SwapiService.getPlanetById as jest.Mock).mockResolvedValue(mockPlanet);

            await DataController.getPlanetById(mockRequest, mockResponse);

            expect(SwapiService.getPlanetById).toHaveBeenCalledWith("1");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                messages: "Planet successfully retrieved",
                data: expect.objectContaining({
                    nombre: "Tatooine",
                    clima: "arid",
                    gravedad: "1 standard",
                }),
            });
        });
    });

    describe("getPlanets", () => {
        it("should retrieve planets data with translated keys", async () => {
            const mockRequest = {} as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockPlanets = [
                { name: "Tatooine", climate: "arid", gravity: "1 standard" },
                { name: "Hoth", climate: "frozen", gravity: "1.1 standard" },
            ];

            (SwapiService.getPlanets as jest.Mock).mockResolvedValue(mockPlanets);

            await DataController.getPlanets(mockRequest, mockResponse);

            expect(SwapiService.getPlanets).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                messages: "Planets successfully retrieved",
                data: expect.arrayContaining([
                    expect.objectContaining({
                        nombre: "Tatooine",
                        clima: "arid",
                        gravedad: "1 standard",
                    }),
                    expect.objectContaining({
                        nombre: "Hoth",
                        clima: "frozen",
                        gravedad: "1.1 standard",
                    }),
                ]),
            });
        });
    });
});
