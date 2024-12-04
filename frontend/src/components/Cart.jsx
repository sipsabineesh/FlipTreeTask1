import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";
import { Button } from "./ui/button";

const Cart = () => {
    const [cart, setCart] = useState({ cartItems: [], cartTotal: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = '674168e5afa59b68703cf4a6';
    useEffect(() => {
        const fetchCart = async () => { 
            try { 
                const response = await axios.get(`http://localhost:8000/api/cart/${userId}`);
                setCart(response.data.cart);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <div className="text-2xl font-bold">My Cart</div>
                </CardHeader>
                <CardContent>
                    {cart.cartItems.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-semibold">Product</TableCell>
                                    <TableCell className="font-semibold">Quantity</TableCell>
                                    <TableCell className="font-semibold">Price</TableCell>
                                    <TableCell className="font-semibold">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.cartItems.map((item) => (
                                    <TableRow key={item.productId._id}>
                                        <TableCell>{item.productId.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.productId.price}</TableCell>
                                        <TableCell>${item.quantity * item.productId.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-gray-600">Your cart is empty.</div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-lg font-medium">Total: ${cart.cartTotal}</div>
                    <Button className="bg-green-500 text-white">Checkout</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Cart