import express from "express";
import { createContent, deleteContent, getAllContent } from "../controllers/content.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
const router = express.Router();

router.route("/createContent").post(isAuthenticated ,createContent);
router.route("/getAllContent").get(isAuthenticated, getAllContent);
router.route("/deleteContent").delete(isAuthenticated, deleteContent);

export default router;
