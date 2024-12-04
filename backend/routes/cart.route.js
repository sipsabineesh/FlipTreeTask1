import express from "express";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

// router.route("/add").post(addToCart);
// router.route('/view').get(getCart);
// router.route("/delete").delete(removeFromCart);
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.post("/remove", removeFromCart);
router.post("/update", updateCartQuantity);

export default router;