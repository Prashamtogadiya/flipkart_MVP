import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    if (!user?.id) {
      alert("Please login first.");
      return;
    }
    setQuantity(1); // reset quantity each time dialog opens
    setOpenDialog(true);
  };

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

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p>Product with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.imageUrl[0]}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-contain bg-white p-4 border"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-800 font-semibold">${product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-sm text-gray-500 mt-4">Category: {product.category}</p>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
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