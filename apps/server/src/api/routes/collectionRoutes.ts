import { Router } from "express";
import * as collectionController from "../controllers/collectionController.js";

const router: Router = Router();

router.get("/collections", collectionController.getCollections);
router.get("/collection/:id", collectionController.getCollectionById);
router.post("/collection", collectionController.createCollection);
router.put("/collection/:id", collectionController.updateCollection);
router.delete("/collection/:id", collectionController.deleteCollection);

export default router;
