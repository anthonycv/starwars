import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {docClient, PRODUCTS_TABLE} from "../configs/dynamodb";
import {ScanCommand} from "@aws-sdk/lib-dynamodb";

export interface Product {
    productId: string;
    name: string;
    color: string;
    quantity: number;
    price: number;
}

export class ProductModel {
    static async create(product: Product): Promise<Product> {
        const params = {
            TableName: PRODUCTS_TABLE,
            Item: product,
        };

        try {
            await docClient.send(new PutCommand(params));
            return product;
        } catch (error) {
            console.error("Error saving product to DynamoDB:", error);
            throw new Error("Database error");
        }
    }

    static async getAllProducts(): Promise<any[]> {
        const params: any = {
            TableName: PRODUCTS_TABLE,
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items || [];
        } catch (error) {
            console.error("Error retrieving all products from DynamoDB:", error);
            throw new Error("Database error");
        }
    }
}
