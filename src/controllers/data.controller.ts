import {Request, Response} from "express";
import {ProductModel} from "../models/product.model";
import {SwapiService} from "../services/swapi.service";
import {getErrorMessage} from "../utils/error.helper";
import { translations } from "../translations/planet.translation";

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

            const translatedPlanet: Record<string, any> = {};

            Object.keys(translations).forEach((key) => {
                const typedKey = key as keyof typeof translations;
                if (planet[key]) {
                    const translatedKey = translations[typedKey];
                    translatedPlanet[translatedKey] = planet[key];
                }
            });

            res.status(200).json({
                success: true,
                messages: "Planet successfully retrieved",
                data: translatedPlanet,
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

    static async getPlanets(req: Request, res: Response): Promise<void> {
        try {
            const planets = await SwapiService.getPlanets();

            const translatedPlanets = planets.map((planet: any) => {
                const translatedPlanet: Record<string, any> = {};

                Object.keys(translations).forEach((key) => {
                    const typedKey = key as keyof typeof translations;
                    if (planet[key]) {
                        const translatedKey = translations[typedKey];
                        translatedPlanet[translatedKey] = planet[key];
                    }
                });

                return translatedPlanet;
            });

            res.status(200).json({
                success: true,
                messages: "Planets successfully retrieved",
                data: translatedPlanets,
            });
        } catch (error) {
            console.error("Error retrieving planets:", error);
            res.status(500).json({
                success: false,
                messages: "Error retrieving planets",
                error: getErrorMessage(error),
            });
        }
    }
}
