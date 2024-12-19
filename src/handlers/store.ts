import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { ProductController } from "../controllers/product.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { storeSchema } from "../schemas/store.schema";

const app = express();
app.use(express.json());

app.post("/store", validateRequest(storeSchema), async (req: Request, res: Response) =>
    ProductController.createProduct(req, res)
);

export const handler = serverless(app);
