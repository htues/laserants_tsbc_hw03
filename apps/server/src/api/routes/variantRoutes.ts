import { Router } from "express";
import * as variantController from "../controllers/variantController.js";

const router: Router = Router();

router.get("/variants", variantController.getVariants);
router.get("/variant/:id", variantController.getVariantById);
router.post("/variant", variantController.createVariant);
router.put("/variant/:id", variantController.updateVariant);
router.delete("/variant/:id", variantController.deleteVariant);

export default router;
