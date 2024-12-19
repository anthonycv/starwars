import axios from "axios";
import { CacheService } from "./cache.service";

export class WeatherService {
    private static readonly BASE_URL = "https://api.open-meteo.com/v1/forecast";

    static async getWeather(latitude: string, longitude: string): Promise<any> {
        const cacheKey = `weather:${latitude}:${longitude}`;

        const cachedData = await CacheService.getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await axios.get(this.BASE_URL, {
                params: {
                    latitude,
                    longitude,
                    current_weather: true,
                },
            });
            const data = response.data.current_weather;

            await CacheService.setCachedData(cacheKey, data, 1800);

            return data;
        } catch (error) {
            console.error(`Error fetching weather data for lat: ${latitude}, lon: ${longitude}:`, error);
            throw new Error("Failed to fetch weather data");
        }
    }
}
