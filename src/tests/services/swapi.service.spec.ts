import { SwapiService } from "../../services/swapi.service";
import { CacheService } from "../../services/cache.service";
import axios from "axios";

jest.mock("../../services/cache.service");
jest.mock("axios");

describe("SwapiService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch planet data from cache if available", async () => {
        const mockPlanet = { name: "Tatooine", climate: "arid" };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(mockPlanet);

        const result = await SwapiService.getPlanetById("1");

        expect(CacheService.getCachedData).toHaveBeenCalledWith("swapi:planet:1");
        expect(result).toEqual(mockPlanet);
        expect(axios.get).not.toHaveBeenCalled();
    });

    it("should fetch planet data from API and save to cache if not in cache", async () => {
        const mockPlanet = { name: "Tatooine", climate: "arid" };
        (CacheService.getCachedData as jest.Mock).mockResolvedValue(null);
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
});
