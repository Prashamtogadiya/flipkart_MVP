import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CartSummarySidebar from "../components/CartSummarySidebar";
import DeleteDialog from "../components/DeleteDialog";
import PlaceOrderDialog from "../components/DeleteDialog";

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

  // Calculate total items
  const getTotalItems = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-[#f1f3f6] py-6 px-2 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="bg-white rounded shadow-md border border-[#e0e0e0]">
            <h1 className="text-xl md:text-2xl font-semibold px-6 py-4 border-b border-[#e0e0e0]">
              My Cart ({getTotalItems()} items)
            </h1>
            {cartItems.map(({ product, quantity }) => (
              <CartItemCard
                key={product._id}
                product={product}
                quantity={quantity}
                onQuantityChange={newQty => handleUpdateQuantity(product._id, newQty)}
                onRemove={() => handleDeleteItem(product._id)}
                onNavigate={() => navigate(`/products/${product._id}`, { state: { product } })}
              />
            ))}
            {/* Place Order Button (mobile only) */}
            <div className="md:hidden px-6 py-4">
              <button
                className="w-full bg-[#fb641b] text-white font-semibold py-3 rounded shadow hover:bg-[#f57224] transition"
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
        {/* Summary Sidebar */}
        <div className="md:w-96 w-full">
          <CartSummarySidebar
            totalItems={getTotalItems()}
            totalPrice={getTotal()}
            onPlaceOrder={handlePlaceOrder}
            orderSuccess={orderSuccess}
            orderError={orderError}
          />
        </div>
      </div>
      {/* Delete confirmation dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteItem}
      />
      {/* Place Order Dialog */}
      <PlaceOrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
        address={address}
        setAddress={setAddress}
        onSubmit={confirmPlaceOrder}
        loading={orderLoading}
      />
    </div>
  );
};

export default CartPage;
