import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, CACHE_TABLE } from "../configs/dynamodb";

export class CacheService {
    private static readonly TABLE_NAME = CACHE_TABLE;

    static async getCachedData(cacheKey: string): Promise<any | null> {
        try {
            const params = {
                TableName: this.TABLE_NAME,
                Key: { cacheKey },
            };
            const result = await docClient.send(new GetCommand(params));
            return result.Item?.data || null;
        } catch (error) {
            console.error(`Error fetching cache for key ${cacheKey}:`, error);
            return null;
        }
    }

    static async setCachedData(cacheKey: string, data: any, ttlSeconds: number): Promise<void> {
        try {
            const ttl = Math.floor(Date.now() / 1000) + ttlSeconds;
            const params = {
                TableName: this.TABLE_NAME,
                Item: {
                    cacheKey,
                    data,
                    ttl,
                },
            };
            await docClient.send(new PutCommand(params));
        } catch (error) {
            console.error(`Error saving cache for key ${cacheKey}:`, error);
        }
    }
}
