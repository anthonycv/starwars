import { ProductModel, Product } from "../../models/product.model";
import { docClient } from "../../configs/dynamodb";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

jest.mock("../../configs/dynamodb", () => ({
    docClient: {
        send: jest.fn(),
    },
    PRODUCTS_TABLE: "products-table",
}));

describe("ProductModel", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a product", async () => {
        const mockProduct: Product = {
            productId: "1",
            name: "Test Product",
            color: "Red",
            quantity: 10,
            price: 19.99,
        };

        (docClient.send as jest.Mock).mockResolvedValueOnce(undefined);

        await ProductModel.create(mockProduct);

        expect(docClient.send).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    TableName: "products-table",
                    Item: mockProduct,
                },
            })
        );
    });

    it("should retrieve all products", async () => {
        const mockProducts = [
            { productId: "1", name: "Product 1", color: "Blue", quantity: 5, price: 10.99 },
            { productId: "2", name: "Product 2", color: "Green", quantity: 15, price: 20.99 },
        ];

        (docClient.send as jest.Mock).mockResolvedValueOnce({ Items: mockProducts });

        const result = await ProductModel.getAllProducts();

        expect(docClient.send).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    TableName: "products-table",
                },
            })
        );

        expect(result).toEqual(mockProducts);
    });
});
