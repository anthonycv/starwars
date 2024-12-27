import axios from "axios";
import { CacheService } from "./cache.service";

export class SwapiService {
    private static readonly BASE_URL = "https://swapi.py4e.com/api";

    static async getPlanetById(planetId: string): Promise<any> {
        const cacheKey = `swapi:planet:${planetId}`;

        const cachedData = await CacheService.getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await axios.get(`${this.BASE_URL}/planets/${planetId}/`);
            const data = response.data;

            await CacheService.setCachedData(cacheKey, data, 1800);

            return data;
        } catch (error) {
            console.error(`Error fetching planet with ID ${planetId} from SWAPI:`, error);
            throw new Error("Failed to fetch planet from SWAPI");
        }
    }

    static async getPlanets(): Promise<any> {
        const cacheKey = `swapi:planet:all`;

        const cachedData = await CacheService.getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await axios.get(`${this.BASE_URL}/planets/`);
            const data = response.data.results;

            await CacheService.setCachedData(cacheKey, data, 1800);

            return data;
        } catch (error) {
            console.error(`Error fetching planets from SWAPI:`, error);
            throw new Error("Failed to fetch planets from SWAPI");
        }
    }
}
