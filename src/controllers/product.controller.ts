import {Request, Response} from "express";
import {v4 as uuidv4} from "uuid";
import {ProductModel, Product} from "../models/product.model";
import {StoreRequest} from "../schemas/store.schema";
import {getErrorMessage} from "../utils/error.helper";

export class ProductController {
    static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const {name, color, quantity, price}: StoreRequest = req.body;

            const product: Product = {
                productId: uuidv4(),
                name,
                color,
                quantity,
                price,
            };

            const savedProduct = await ProductModel.create(product);
            res.status(201).json({
                success: true,
                message: "Product stored successfully",
                data: savedProduct
            });
        } catch (error) {
            console.error("Error creating the product", error);
            res.status(500).json({
                success: true,
                messages: 'error creating the product',
                error: getErrorMessage(error)
            });

        }
    }
}