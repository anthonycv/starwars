import express from "express";
import serverless from "serverless-http";
import { DataController } from "../controllers/data.controller";

const app = express();
app.use(express.json());

app.get("/data/product-history", DataController.getAll);
app.get("/data/planets/:id", DataController.getPlanetById);
app.get("/data/planets-history", DataController.getHistory);

export const handler = serverless(app);
