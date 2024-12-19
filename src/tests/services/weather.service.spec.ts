import { WeatherService } from "../../services/weather.service";
import { CacheService } from "../../services/cache.service";
import axios from "axios";

jest.mock("../../services/cache.service"); // Mock de CacheService
jest.mock("axios"); // Mock de Axios

describe("WeatherService", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    it("should fetch weather data from cache if available", async () => {
        const mockWeather = { temperature: 30, windspeed: 15 };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(mockWeather);

        const result = await WeatherService.getWeather("4.52", "3.41");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("weather:4.52:3.41");
        expect(result).toEqual(mockWeather);
        expect(axios.get).not.toHaveBeenCalled(); // Asegura que no se realiza la llamada a la API
    });

    it("should fetch weather data from API and save to cache if not in cache", async () => {
        const mockWeather = { temperature: 30, windspeed: 15 };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(null); // Simula que no está en la caché
        (axios.get as jest.Mock).mockResolvedValue({ data: { current_weather: mockWeather } });

        const result = await WeatherService.getWeather("4.52", "3.41");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("weather:4.52:3.41");
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("https://api.open-meteo.com/v1/forecast"), {
            params: { latitude: "4.52", longitude: "3.41", current_weather: true },
        });
        expect(CacheService.setCachedData).toHaveBeenCalledWith("weather:4.52:3.41", mockWeather, 1800);
        expect(result).toEqual(mockWeather);
    });

    it("should throw an error if API request fails", async () => {
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(null); // Simula que no está en la caché
        (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

        await expect(WeatherService.getWeather("4.52", "3.41")).rejects.toThrow("Failed to fetch weather data");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("weather:4.52:3.41");
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("https://api.open-meteo.com/v1/forecast"), {
            params: { latitude: "4.52", longitude: "3.41", current_weather: true },
        });
        expect(CacheService.setCachedData).not.toHaveBeenCalled(); // Asegura que no se guarda en caché si hay un error
    });
});
