import express from "express";
import { body } from "express-validator";
import { register, login, getAllUsers, userProfile, updateProfile, deleteProfile } from "../controller/user-controller.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single('image'),
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
router.get("/profile/:id", auth, userProfile);
router.put("/update/:id", upload.single('image'), auth, updateProfile);
router.put("/delete/:id", auth, deleteProfile);

export default router;