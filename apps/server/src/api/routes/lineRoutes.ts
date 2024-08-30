import { Router } from "express";
import * as lineController from "../controllers/lineController";

const router: Router = Router();

router.get("/lines", lineController.getLines);
router.get("/line/:id", lineController.getLineById);
router.post("/line", lineController.createLine);
router.put("/line/:id", lineController.updateLine);
router.delete("/line/:id", lineController.deleteLine);

export default router;