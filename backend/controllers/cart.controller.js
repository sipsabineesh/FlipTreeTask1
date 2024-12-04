import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

// Add an item to the cart
export const addToCart = async (req, res) => {
    console.log(req.body)
    const { userId, productId, quantity } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingItem = user.cart.cartItems.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            // Convert quantity to a number to avoid string concatenation
            console.log('existingItem.quantity: ' + existingItem.quantity)
            console.log('Quantity: ' + quantity)

            existingItem.quantity += Number(quantity);
        } else {
            // Add new item
            user.cart.cartItems.push({ productId, quantity: Number(quantity) });
        }
        const cartItemsWithPrices = await Promise.all(
            user.cart.cartItems.map(async (item) => {
                const itemProduct = await Product.findById(item.productId);
                return {
                    ...item.toObject(),
                    price: itemProduct.price, // Attach price to the item
                };
            })
        );

        // Recalculate the cart total
        user.cart.cartTotal = cartItemsWithPrices.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        await user.save();

        res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Get the user's cart
export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate("cart.cartItems.productId");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.cart.cartItems = user.cart.cartItems.filter(
            (item) => item.productId.toString() !== productId
        );

        // Recalculate the cart total
        user.cart.cartTotal = user.cart.cartItems.reduce((total, item) => {
            const productPrice = item.productId.price || 0;
            return total + productPrice * item.quantity;
        }, 0);

        await user.save();

        res.status(200).json({ message: "Item removed from cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update item quantity in the cart
export const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const item = user.cart.cartItems.find(
            (item) => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;

        // Recalculate the cart total
        user.cart.cartTotal = user.cart.cartItems.reduce((total, item) => {
            const productPrice = item.productId.price || 0;
            return total + productPrice * item.quantity;
        }, 0);

        await user.save();

        res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
