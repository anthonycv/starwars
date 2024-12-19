import Joi from "joi";

export const storeSchema = Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
    price: Joi.number().positive().precision(2).required(),
});

export interface StoreRequest {
    name: string;
    color: string;
    quantity: number;
    price: number;
}