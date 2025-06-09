import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Flipkart-like Product Detail Page
const ProductDetail = () => {
  // Get product ID from URL params and navigation state
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // Local state for product, loading, dialog, quantity, and selected image
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product details from backend if not passed via navigation state
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    if (!product) fetchProduct();
  }, [id, product]);

  // Handler for Add to Cart/Buy Now button
  const handleAddToCart = () => {
    if (!user?.id) {
      alert("Please login first.");
      return;
    }
    setQuantity(1);
    setOpenDialog(true);
  };

  // Confirm adding product to cart with selected quantity
  const confirmAddToCart = () => {
    dispatch(
      addToCart({
        userId: user.id,
        productId: product._id,
        quantity,
      })
    );
    setOpenDialog(false);
  };

  // Increment/decrement quantity for cart dialog
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // Show loading spinner while fetching product
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show not found message if product doesn't exist
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p>Product with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4 md:py-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow flex flex-col md:flex-row p-2 md:p-6 gap-4 md:gap-8">
        {/* Left: Product Images & Actions */}
        <div className="flex flex-col md:flex-row md:w-2/5 w-full items-center">
          {/* Thumbnails (vertical on left for md+, horizontal on mobile) */}
          {product.imageUrl?.length > 1 && (
            <div className="flex md:flex-col flex-row gap-2 md:mr-4 mb-2 md:mb-0">
              {product.imageUrl.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-12 h-12 object-contain border rounded cursor-pointer p-1 bg-white ${
                    selectedImage === idx
                      ? "border-blue-500 ring-2 ring-blue-400"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
          {/* Main Image and Actions */}
          <div className="flex flex-col items-center w-full">
            {/* Main product image */}
            <div className="bg-white border-2 border-[#f0f0f0] rounded flex items-center justify-center w-full max-w-xxs h-56 sm:h-72 md:h-110 mb-3">
              <img
                src={product.imageUrl[selectedImage] || product.imageUrl[0]}
                alt={product.name}
                className="object-contain max-h-52 sm:max-h-64 md:max-h-72 max-w-full"
              />
            </div>
            {/* Add to Cart and Buy Now buttons below image */}
            <div className="flex gap-2 w-full max-w-xxs">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 sm:py-3 rounded text-base sm:text-lg shadow transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded text-base sm:text-lg shadow transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/* Right: Product Details */}
        <div className="flex-1 mt-6 md:mt-0">
          {/* Product name */}
          <h1 className="text-lg sm:text-xl md:text-3xl font-semibold mb-2 break-words">{product.name}</h1>
          {/* Ratings, reviews, and assurance badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">4.3 ★</span>
            <span className="text-gray-500 text-xs sm:text-sm">1,234 Ratings & 234 Reviews</span>
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
              alt="Assured"
              className="h-5 sm:h-6"
            />
          </div>
          {/* Price, discount, and original price */}
          <div className="flex flex-wrap items-end gap-2 sm:gap-4 mb-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#388e3c]">${product.price}</span>
            <span className="text-gray-500 line-through text-base sm:text-lg">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-green-700 font-semibold text-base sm:text-lg">20% off</span>
          </div>
          {/* Offers section */}
          <div className="mb-4">
            <span className="font-semibold">Available Offers</span>
            <ul className="list-disc ml-6 text-xs sm:text-sm text-gray-700 mt-1">
              <li>Bank Offer: 10% off on selected cards</li>
              <li>Special Price: Get extra 5% off (price inclusive)</li>
              <li>Free Delivery</li>
              <li>No Cost EMI available</li>
            </ul>
          </div>
          {/* Product description */}
          <div className="mb-4">
            <span className="font-semibold">Description:</span>
            <p className="text-gray-700 mt-1 text-xs sm:text-sm break-words">{product.description}</p>
          </div>
          {/* Category */}
          <div className="mb-4">
            <span className="font-semibold">Category:</span>
            <span className="ml-2 text-gray-600 text-xs sm:text-sm">{product.category}</span>
          </div>
          {/* Warranty */}
          <div className="mb-4">
            <span className="font-semibold">Warranty:</span>
            <span className="ml-2 text-gray-600 text-xs sm:text-sm">1 Year Brand Warranty</span>
          </div>
          {/* Delivery info */}
          <div className="mb-4">
            <span className="font-semibold">Delivery:</span>
            <span className="ml-2 text-gray-600 text-xs sm:text-sm">Free, within 3-5 days</span>
          </div>
        </div>
      </div>
      {/* Dialog for confirming add to cart and selecting quantity */}
      <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md w-[90vw] p-4 sm:p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-bold mb-2">
            Confirm Add to Cart
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            Select quantity and confirm adding this item to your cart.
          </AlertDialog.Description>
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrementQuantity}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value));
                setQuantity(val);
              }}
              className="w-16 text-center border rounded"
            />
            <button
              onClick={incrementQuantity}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {/* Dialog action buttons */}
          <div className="flex gap-3 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={confirmAddToCart}
              >
                Yes, Add
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default ProductDetail;