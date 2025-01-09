import express from "express";
import { deleteAccount, login, logout, register } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/deleteAccount").delete( isAuthenticated ,deleteAccount);

export default router;