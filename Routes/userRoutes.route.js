import express from "express";
import { body } from "express-validator";
import { register, login, getAllUsers, userProfile } from "../controller/user-controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register",
    body("name", "name required").notEmpty(),
    body('email', "email required").notEmpty(),
    body('email', "email should be valid").isEmail(),
    body('password', "password required").notEmpty(),
    register);

router.post("/login",
    body('email', "email required").notEmpty(),
    body('email', "email should be valid").isEmail(),
    body('password', "password required").notEmpty(), login);

router.get("/allUsers", auth, getAllUsers);
router.get("/profile/:id", userProfile);

export default router;