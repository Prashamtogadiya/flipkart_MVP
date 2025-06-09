import React from "react";

const CartItemCard = ({ product, quantity, onQuantityChange, onRemove, onNavigate }) => (
  <div
    className="flex flex-col md:flex-row items-center md:items-start gap-4 px-6 py-5 border-b border-[#f0f0f0] group hover:bg-[#f7fafc] transition cursor-pointer"
    onClick={onNavigate}
  >
    <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-white border border-[#e0e0e0] rounded">
      <img
        src={product.imageUrl[0]}
        alt={product.name}
        className="max-h-28 max-w-28 object-contain"
      />
    </div>
    <div className="flex flex-col flex-grow w-full md:w-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div>
          <h2 className="text-lg font-medium text-gray-900 group-hover:text-[#2874f0]">{product.name}</h2>
          <p className="text-xs text-gray-500 mt-1">Seller: RetailNet</p>
          <p className="text-xs text-green-600 mt-1">Special Price</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center gap-2 md:gap-6">
          <div className="flex items-center border border-[#e0e0e0] rounded overflow-hidden bg-white">
            <button
              className="w-8 h-8 text-lg font-bold text-gray-600 hover:bg-[#f1f3f6] disabled:opacity-50"
              onClick={e => { e.stopPropagation(); onQuantityChange(quantity - 1); }}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-10 text-center font-semibold text-gray-800 select-none">
              {quantity}
            </span>
            <button
              className="w-8 h-8 text-lg font-bold text-gray-600 hover:bg-[#f1f3f6]"
              onClick={e => { e.stopPropagation(); onQuantityChange(quantity + 1); }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className="ml-2 px-3 py-1 text-sm font-medium text-[#2874f0] border border-[#2874f0] rounded hover:bg-[#2874f0] hover:text-white transition"
            onClick={e => { e.stopPropagation(); onRemove(); }}
            aria-label="Remove item"
          >
            REMOVE
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-lg font-bold text-gray-900">
          ₹{product.price.toLocaleString()}
        </span>
        {quantity > 1 && (
          <span className="text-xs text-gray-500 ml-2">x {quantity} = ₹{(product.price * quantity).toLocaleString()}</span>
        )}
      </div>
    </div>
  </div>
);

export default CartItemCard;
