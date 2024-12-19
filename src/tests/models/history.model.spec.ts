import { HistoryModel } from "../../models/history.model";
import { docClient } from "../../configs/dynamodb";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

jest.mock("../../configs/dynamodb", () => ({
    docClient: {
        send: jest.fn(),
    },
    HISTORY_TABLE: "history-table", // Simula el nombre de la tabla
}));

describe("HistoryModel", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should save a history entry", async () => {
        const mockData = { historyId: "1", name: "Tatooine" };

        (docClient.send as jest.Mock).mockResolvedValueOnce(undefined); // Mock para simular éxito en la operación

        await HistoryModel.save(mockData);

        expect(docClient.send).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    TableName: "history-table", // Asegúrate de usar el nombre simulado aquí
                    Item: mockData,
                },
            })
        );
    });

    it("should retrieve all history entries", async () => {
        const mockHistory = [{ historyId: "1", name: "Tatooine" }];

        (docClient.send as jest.Mock).mockResolvedValueOnce({ Items: mockHistory });

        const result = await HistoryModel.getAll();

        expect(docClient.send).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    TableName: "history-table", // Asegúrate de usar el nombre simulado aquí
                },
            })
        );

        expect(result).toEqual(mockHistory);
    });
});
