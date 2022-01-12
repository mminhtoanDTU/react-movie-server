import express from "express";
import { getAllUser, getUserWithPosts, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:userId", getUserWithPosts);

router.put("/:userId", verifyToken, updateUser);

export default router;
