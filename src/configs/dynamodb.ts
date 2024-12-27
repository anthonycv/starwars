import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
export const docClient = DynamoDBDocumentClient.from(client);

export const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || "products-table-dev";
export const CACHE_TABLE = process.env.CACHE_TABLE || "cache-table-dev";
