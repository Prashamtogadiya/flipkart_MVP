import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken"); // or sessionStorage, depending on where you store it

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/cart/get-cart",
          {
            userId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.items);

        setCartItems(res.data.items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCart();
    }
  }, [user?.id, token]);

  if (!user?.id) {
    return (
      <p className="text-center py-10 text-red-500">
        Please login to view your cart.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">Your cart is empty.</p>
    );
  }

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.map(({ product, quantity }) => (
        <div
          key={product._id}
          className="flex gap-4 mb-6 p-4 border rounded shadow-sm bg-white"
        >
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="w-15 h-15 object-contain "
          />
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-blue-600 font-bold text-lg">
                ${product.price} x {quantity} = $
                {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</p>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
