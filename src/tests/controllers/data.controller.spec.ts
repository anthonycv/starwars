import { Request, Response } from "express";
import { DataController } from "../../controllers/data.controller";
import { ProductModel } from "../../models/product.model";
import { HistoryModel } from "../../models/history.model";
import { SwapiService } from "../../services/swapi.service";
import { WeatherService } from "../../services/weather.service";
import { getErrorMessage } from "../../utils/error.helper";

jest.mock("../../models/product.model");
jest.mock("../../models/history.model");
jest.mock("../../services/swapi.service");
jest.mock("../../services/weather.service");

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

    describe("getHistory", () => {
        it("should retrieve all history data", async () => {
            const mockRequest = {} as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockHistory = [{ historyId: "1", name: "Tatooine" }];
            (HistoryModel.getAll as jest.Mock).mockResolvedValue(mockHistory);

            await DataController.getHistory(mockRequest, mockResponse);

            expect(HistoryModel.getAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                messages: "History successfully retrieved",
                data: mockHistory,
            });
        });
    });

    describe("getPlanetById", () => {
        it("should retrieve planet and weather data", async () => {
            const mockRequest = { params: { id: "1" } } as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockPlanet = { name: "Tatooine", climate: "arid" };
            const mockWeather = { temperature: 30 };

            (SwapiService.getPlanetById as jest.Mock).mockResolvedValue(mockPlanet);
            (WeatherService.getWeather as jest.Mock).mockResolvedValue(mockWeather);

            await DataController.getPlanetById(mockRequest, mockResponse);

            expect(SwapiService.getPlanetById).toHaveBeenCalledWith("1");
            expect(WeatherService.getWeather).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                messages: "Planet successfully retrieved",
                data: expect.objectContaining({ name: "Tatooine", weather: mockWeather }),
            });
        });
    });
});
