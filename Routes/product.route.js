import express from "express";
import { addProduct, viewProducts, viewProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controller/category-controller.js";
import { auth } from "../middleware/auth.js";
import {upload} from "../middleware/multer.js";

const router = express.Router();

router.post("/createProduct", upload.single('image'), auth, addProduct);
router.get("/viewAllProduct", auth, viewProducts);
router.get("/viewProduct/:id", auth, viewProduct);
router.put("/updateProduct/:id", upload.single('image'), auth, updateProduct);
router.put("/deleteProduct/:id", auth, deleteProduct);

router.post("/createCategory", auth, addCategory);
router.get("/viewCategory", auth, getCategories);
router.put("/updateCategory/:id", auth, updateCategory);
router.put("/deleteCategory/:id", auth, deleteCategory);

export default router;