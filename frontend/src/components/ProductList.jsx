import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";


// const products = [
//   {
//     id: 1,
//     name: "Modern Chair",
//     price: 120,
//     image: "https://img.freepik.com/free-photo/close-up-modern-chair-desk_23-2148238655.jpg",
//   },
//   {
//     id: 2,
//     name: "Wooden Table",
//     price: 250,
//     image: "https://thetimberguy.com/cdn/shop/products/Buy-Compact-Wooden-Dining-table-with-1-Bench-3-chairs-furniture-set-for-modern-Home_800x.jpg?v=1637950097",
//   },
//   {
//     id: 3,
//     name: "Cozy Sofa",
//     price: 500,
//     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9FPlkQLAnD1DRrIZjPAagLJOty9KR--m98gggfgKXtzU23FsEr3qG6yh0llxszqyI1D7zhpvTqTj_jNc7ekNdRWwGROwmNOnGIZcjk_aT",
//   },
//   {
//     id: 4,
//     name: "Stylish Lamp",
//     price: 60,   
//     image: "https://ae-pic-a1.aliexpress-media.com/kf/Saa07b7e7b5794f5e93da7a52862616bcA/Modern-LED-Golden-Bird-Wall-Lamp-Parlor-Bedside-Hanging-Light-Novelty-Rotatable-Wall-Lamp-Bedroom-Wall.jpg_640x640Q90.jpg_.webp",
//   },
// ];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  
     // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product/view");
        console.log(response)
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
     // Add to cart handler
  const handleAddToCart = async (product) => {
    console.log(product);
    
    try {
        const quantity = 1; 
        const userId = '674168e5afa59b68703cf4a6';
        const productId = product._id;
        const response = await axios.post("http://localhost:8000/api/cart/add", {
            userId, 
            productId,
            quantity,
          });
      toast.success(`${product.name} added to the cart!`);
    } catch (error) {
      toast.error("Failed to add product to the cart.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <p className="text-sm text-gray-500">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full"  onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
