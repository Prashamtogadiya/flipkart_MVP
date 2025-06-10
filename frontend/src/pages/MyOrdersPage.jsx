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
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 min-h-[80vh]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#212121]">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-[#e0e0e0] rounded bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-[#f0f0f0] bg-[#f7f7f7] px-4 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-xs text-[#878787]">ORDER ID</span>
                <span className="text-xs text-[#212121]">{order._id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-xs text-[#878787]">Placed On</span>
                <span className="text-xs text-[#212121]">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-xs text-[#878787]">Status</span>
                <span className="capitalize text-xs font-semibold text-blue-700">{order.deliveryStatus}</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="mb-2">
                <span className="font-semibold text-xs text-[#878787]">Shipping Address:</span>
                <span className="ml-2 text-xs text-[#212121]">{order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pinCode}, {order.address.country} | Phone: {order.address.phone}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-[#f1f3f6] text-[#878787]">
                      <th className="p-2 font-medium text-left">Product</th>
                      <th className="p-2 font-medium text-left">Name</th>
                      <th className="p-2 font-medium text-left">Category</th>
                      <th className="p-2 font-medium text-left">Qty</th>
                      <th className="p-2 font-medium text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={item.product?._id || idx} className="border-b border-[#f0f0f0]">
                        <td className="p-2">
                          <img
                            src={item.product?.imageUrl?.[0]}
                            alt={item.product?.name}
                            className="w-14 h-14 object-contain border rounded bg-white"
                          />
                        </td>
                        <td className="p-2 font-medium text-[#212121]">{item.product?.name}</td>
                        <td className="p-2 text-[#878787]">{item.product?.category}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2 text-blue-700 font-bold">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3">
                <span className="font-bold text-base text-[#212121]">Total: ₹{order.totalAmount.toFixed(2)}</span>
              </div>
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
    </div>
  );
};

export default MyOrdersPage;
