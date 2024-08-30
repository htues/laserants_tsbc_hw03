import { Router } from "express";
import * as userController from "../controllers/userController";

const router: Router = Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.put("/user/:id/activate", userController.activateUser);
router.put("/user/:id/status", userController.updateUserStatus);
router.delete("/user/:id", userController.deleteUser);

export default router;