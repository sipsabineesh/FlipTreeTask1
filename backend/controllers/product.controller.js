import { Product } from '../models/product.model.js';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add a new product 
export const addProduct = async (req, res) => {
    const { name, price, image } = req.body;

    try {
        const newProduct = new Product({ name, price, image });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};