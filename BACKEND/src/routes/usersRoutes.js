import { Router } from "express";
import { login, registerUser } from "../controllers/userController.js";


const router = Router();

router.route("/login").post(login);
router.route("/registerUser").post(registerUser);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;

