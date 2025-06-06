import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useSelector } from "react-redux";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // Get the current user from Redux store
  const user = useSelector((state) => state.auth.user);

  // State to store cart items
  const [cartItems, setCartItems] = useState([]);
  // State to show loading spinner
  const [loading, setLoading] = useState(true);
  // State to control delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // State to remember which item to delete
  const [itemToDelete, setItemToDelete] = useState(null);
  // State for order dialog and address form
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState("");
  const [orderError, setOrderError] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  // For navigation to product detail page
  const navigate = useNavigate();

  // Function to fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.post(
        "/cart/get-cart",
        {
          userId: user.id,
        }
      );
      setCartItems(res.data.items); // Set cart items in state
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Fetch cart when user changes or on mount
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
    // eslint-disable-next-line
  }, [user?.id]);

  // Handle increment/decrement of quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow less than 1
    try {
      await axios.put(`/cart/${user.id}`, { productId, quantity: newQuantity });
      fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // Open delete confirmation dialog
  const handleDeleteItem = (productId) => {
    setItemToDelete(productId);
    setDeleteDialogOpen(true);
  };

  // Confirm and delete item from cart
  const confirmDeleteItem = async () => {
    try {
      await axios.delete(`/cart/${user.id}`, {
        data: { productId: itemToDelete },
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      fetchCart(); // Refresh cart after delete
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // Place order handler
  const handlePlaceOrder = () => {
    setOrderDialogOpen(true);
    setOrderSuccess("");
    setOrderError("");
  };

  // Confirm place order
  const confirmPlaceOrder = async () => {
    setOrderLoading(true);
    setOrderSuccess("");
    setOrderError("");
    try {
      await axios.post("/orders/from-cart", {
        userId: user.id,
        address,
      });
      setOrderSuccess("Order placed successfully!");
      setCartItems([]); // Clear cart UI
      setOrderDialogOpen(false);
    } catch (err) {
      setOrderError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to place order"
      );
    } finally {
      setOrderLoading(false);
    }
  };

  // If user is not logged in, show message
  if (!user?.id) {
    return (
      <p className="text-center py-10 text-red-500">
        Please login to view your cart.
      </p>
    );
  }

  // Show loading spinner while fetching cart
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">Your cart is empty.</p>
    );
  }

  // Calculate total price of cart
  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Render each cart item as a clickable card */}
      {cartItems.map(({ product, quantity }) => (
        <div
          key={product._id}
          className="flex gap-4 mb-6 p-4 border rounded shadow-sm bg-white cursor-pointer hover:bg-gray-50 transition"
          onClick={() => navigate(`/products/${product._id}`, { state: { product } })}
        >
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="w-15 h-15 object-contain"
          />
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
            </div>
            {/* Quantity and delete controls */}
            <div className="flex items-center gap-4 mt-3"
              // Prevent card click when clicking buttons
              onClick={e => e.stopPropagation()}
            >
              {/* Decrement quantity button */}
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              {/* Show current quantity */}
              <span className="font-bold">{quantity}</span>
              {/* Increment quantity button */}
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
              {/* Delete item button */}
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteItem(product._id)}
                aria-label="Delete item"
              >
                Delete
              </button>
              {/* Show price for this item */}
              <p className="text-blue-600 font-bold text-lg ml-auto">
                ${product.price} x {quantity} = $
                {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Show total price and checkout button */}
      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</p>
        <button
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        {orderSuccess && (
          <p className="text-green-600 mt-2 font-semibold">{orderSuccess}</p>
        )}
        {orderError && (
          <p className="text-red-600 mt-2 font-semibold">{orderError}</p>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-bold mb-2">
            Remove Item
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            Are you sure you want to remove this item from your cart?
          </AlertDialog.Description>
          <div className="flex gap-3 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDeleteItem}
              >
                Yes, Remove
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Place Order Dialog */}
      <AlertDialog.Root open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-bold mb-2">
            Enter Shipping Address
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            Please fill in your shipping details to place the order.
          </AlertDialog.Description>
          <form
            onSubmit={e => {
              e.preventDefault();
              confirmPlaceOrder();
            }}
            className="space-y-2"
          >
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Full Name"
              required
              value={address.fullName}
              onChange={e => setAddress({ ...address, fullName: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Phone"
              required
              value={address.phone}
              onChange={e => setAddress({ ...address, phone: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Street"
              required
              value={address.street}
              onChange={e => setAddress({ ...address, street: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="City"
              required
              value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="State"
              required
              value={address.state}
              onChange={e => setAddress({ ...address, state: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Pin Code"
              required
              value={address.pinCode}
              onChange={e => setAddress({ ...address, pinCode: e.target.value })}
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Country"
              required
              value={address.country}
              onChange={e => setAddress({ ...address, country: e.target.value })}
            />
            <div className="flex gap-3 justify-end mt-4">
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setOrderDialogOpen(false)}
                  disabled={orderLoading}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={orderLoading}
              >
                {orderLoading ? "Placing..." : "Place Order"}
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default CartPage;
