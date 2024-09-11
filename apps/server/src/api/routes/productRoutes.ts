import { Router } from "express";
import * as productController from "../controllers/productController";

const router: Router = Router();

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductById);
router.post("/product", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

export default router;