import React from "react";

const CartSummarySidebar = ({ totalItems, totalPrice, onPlaceOrder, orderSuccess, orderError }) => (
  <div className="bg-white rounded shadow-md border border-[#e0e0e0] sticky top-6">
    <h2 className="text-lg font-semibold px-6 py-4 border-b border-[#e0e0e0]">PRICE DETAILS</h2>
    <div className="px-6 py-4 text-sm text-gray-800">
      <div className="flex justify-between mb-2">
        <span>Price ({totalItems} items)</span>
        <span>₹{totalPrice.toLocaleString()}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Charges</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>
      <div className="border-t border-[#e0e0e0] my-3"></div>
      <div className="flex justify-between text-base font-bold">
        <span>Total Amount</span>
        <span>₹{totalPrice.toLocaleString()}</span>
      </div>
    </div>
    <div className="px-6 pb-4">
      <button
        className="w-full bg-[#fb641b] text-white font-semibold py-3 rounded shadow hover:bg-[#f57224] transition hidden md:block"
        onClick={onPlaceOrder}
      >
        PLACE ORDER
      </button>
      {orderSuccess && (
        <p className="text-green-600 mt-2 font-semibold text-center">{orderSuccess}</p>
      )}
      {orderError && (
        <p className="text-red-600 mt-2 font-semibold text-center">{orderError}</p>
      )}
    </div>
  </div>
);

export default CartSummarySidebar;
