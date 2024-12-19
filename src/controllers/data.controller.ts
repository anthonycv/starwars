import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { SwapiService } from "../services/swapi.service";
import { getErrorMessage } from "../utils/error.helper";
import { WeatherService } from "../services/weather.service";
import { HistoryModel } from "../models/history.model";
import {v4 as uuidv4} from "uuid";

export class DataController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const result = await ProductModel.getAllProducts();
            res.status(200).json({
                success: true,
                messages: "products successfully retrieved",
                data: result,
            });
        } catch (error) {
            console.error("Error retrieving all products:", error);
            res.status(500).json({
                success: false,
                messages: "Error retrieving products",
                error: getErrorMessage(error),
            });
        }
    }

    static async getPlanetById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const planet = await SwapiService.getPlanetById(id);

            const latitude = `${id}${4.52}`;
            const longitude = `${id}${3.41}`;

            const weather = await WeatherService.getWeather(latitude, longitude);

            const filteredPlanet = {
                historyId: uuidv4(),
                name: planet.name,
                rotation_period: planet.rotation_period,
                orbital_period: planet.orbital_period,
                diameter: planet.diameter,
                climate: planet.climate,
                gravity: planet.gravity,
                terrain: planet.terrain,
                weather,
                createdAt: new Date().toISOString(), // Timestamp for sorting
            };

            await HistoryModel.save(filteredPlanet);

            res.status(200).json({
                success: true,
                messages: "Planet successfully retrieved",
                data: filteredPlanet,
            });
        } catch (error) {
            console.error(`Error retrieving planet with ID ${id}:`, error);
            res.status(500).json({
                success: false,
                messages: `Error retrieving planet with ID ${id}`,
                error: getErrorMessage(error),
            });
        }
    }

    static async getHistory(req: Request, res: Response): Promise<void> {
        try {
            const data = await HistoryModel.getAll();
            res.status(200).json({
                success: true,
                messages: "History successfully retrieved",
                data,
            });
        } catch (error) {
            console.error("Error retrieving history:", error);
            res.status(500).json({
                success: false,
                messages: "Error retrieving history",
                error: getErrorMessage(error),
            });
        }
    }
}
