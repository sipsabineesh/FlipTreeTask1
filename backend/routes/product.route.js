import express from "express";
import { addProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.route('/view').get(getProducts);
router.route("/add").post(addProduct);

export default router;
