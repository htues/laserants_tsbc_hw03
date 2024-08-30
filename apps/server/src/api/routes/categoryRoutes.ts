import { Router } from "express";
import * as categoryController from "../controllers/categoryController";

const router: Router = Router();

router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.createCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

export default router;