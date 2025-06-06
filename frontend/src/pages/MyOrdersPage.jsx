import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "../api/axiosInstance";
import { useSelector } from "react-redux";

const PAGE_SIZE = 3; // Number of orders per page

const MyOrdersPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  // Fetch orders for the current page from backend
  const fetchOrders = useCallback(async (pageNum) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `/orders/user?page=${pageNum}&limit=${PAGE_SIZE}`,
        { userId: user.id }
      );
      const newOrders = res.data.orders || [];
      setOrders((prev) => (pageNum === 1 ? newOrders : [...prev, ...newOrders]));
      setHasMore(res.data.hasMore);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Initial fetch and on page/user change
  useEffect(() => {
    if (user?.id) {
      fetchOrders(page);
    }
    // eslint-disable-next-line
  }, [user?.id, page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loading]);

  if (!user?.id) {
    return (
      <p className="text-center py-10 text-red-500">
        Please login to view your orders.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">{error}</p>
    );
  }

  if (!orders.length && !loading) {
    return (
      <p className="text-center py-10 text-gray-500">You have no orders yet.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow bg-white">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <div>
                <span className="font-semibold">Order ID:</span> {order._id}
              </div>
              <div>
                <span className="font-semibold">Placed On:</span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">{order.deliveryStatus}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Shipping Address:</span>
              <div className="ml-2 text-sm text-gray-700">
                {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pinCode}, {order.address.country} <br />
                Phone: {order.address.phone}
              </div>
            </div>
            <div>
              <span className="font-semibold">Items:</span>
              <div className="divide-y">
                {order.items.map((item, idx) => (
                  <div key={item.product?._id || idx} className="flex items-center gap-4 py-2">
                    <img
                      src={item.product?.imageUrl?.[0]}
                      alt={item.product?.name}
                      className="w-14 h-14 object-contain border rounded"
                    />
                    <div className="flex-grow">
                      <div className="font-medium">{item.product?.name}</div>
                      <div className="text-sm text-gray-500">{item.product?.category}</div>
                    </div>
                    <div className="text-sm">
                      Qty: <span className="font-bold">{item.quantity}</span>
                    </div>
                    <div className="text-blue-700 font-bold">
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right mt-2 font-bold text-lg">
              Total: ${order.totalAmount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* Infinite scroll loader */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center mt-8">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
        </div>
      )}
      {/* {loading && !orders.length && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
        </div>
      )} */}
    </div>
  );
};

export default MyOrdersPage;
