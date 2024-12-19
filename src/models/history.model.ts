import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, HISTORY_TABLE } from "../configs/dynamodb";

export class HistoryModel {
    static readonly TABLE_NAME = HISTORY_TABLE;

    static async save(data: any): Promise<void> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: data,
         };

        try {
            await docClient.send(new PutCommand(params));
        } catch (error) {
            console.error("Error saving data to history table:", error);
            throw new Error("Database error");
        }
    }

    static async getAll(): Promise<any[]> {
        const params = {
            TableName: this.TABLE_NAME,
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items || [];
        } catch (error) {
            console.error("Error retrieving all history data:", error);
            throw new Error("Database error");
        }
    }
}
