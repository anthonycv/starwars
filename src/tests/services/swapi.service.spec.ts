import { SwapiService } from "../../services/swapi.service";
import { CacheService } from "../../services/cache.service";
import axios from "axios";

jest.mock("../../services/cache.service"); // Mock completo del CacheService
jest.mock("axios");

describe("SwapiService", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
    });

    it("should fetch planet data from cache if available", async () => {
        const mockPlanet = { name: "Tatooine", climate: "arid" };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(mockPlanet);

        const result = await SwapiService.getPlanetById("1");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("swapi:planet:1");
        expect(result).toEqual(mockPlanet);
        expect(axios.get).not.toHaveBeenCalled(); // Asegúrate de que no se llama a la API externa
    });

    it("should fetch planet data from API and save to cache if not in cache", async () => {
        const mockPlanet = { name: "Tatooine", climate: "arid" };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(null); // Simula que no está en la caché
        (axios.get as jest.Mock).mockResolvedValue({ data: mockPlanet });

        await SwapiService.getPlanetById("1");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("swapi:planet:1");
        expect(axios.get).toHaveBeenCalledWith("https://swapi.py4e.com/api/planets/1/");
        expect(CacheService.setCachedData).toHaveBeenCalledWith(
            "swapi:planet:1",
            mockPlanet,
            1800
        );
    });

    it("should throw an error if API request fails", async () => {
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(null); // Simula que no está en la caché
        (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

        await expect(SwapiService.getPlanetById("1")).rejects.toThrow("Failed to fetch planet from SWAPI");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("swapi:planet:1");
        expect(axios.get).toHaveBeenCalledWith("https://swapi.py4e.com/api/planets/1/");
        expect(CacheService.setCachedData).not.toHaveBeenCalled(); // Asegúrate de que no se guarda en caché en caso de error
    });
});
