import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product._id}`, { state: { product } });
  };
  return (
    <div
      onClick={handleClick}
      className="group border border-[#e0e0e0] rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full min-w-[200px] max-w-xs mx-auto"
    >
      <div className="relative bg-white flex items-center justify-center h-48 w-full p-4">
        <img
          src={product.imageUrl[0]}
          alt={product.name}
          className="object-contain h-40 w-full transition-transform duration-200 group-hover:scale-105"
        />
        {/* Flipkart Assured badge (optional) */}
        {product.isAssured && (
          <img
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
            alt="Assured"
            className="absolute top-2 right-2 h-6"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-base mb-1 text-[#212121] line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            4.3 ★
          </span>
          <span className="text-xs text-gray-500">1,234 Ratings</span>
        </div>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-lg font-bold text-[#388e3c]">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ₹{(product.price * 1.2).toFixed(0)}
          </span>
          <span className="text-xs text-green-700 font-semibold">20% off</span>
        </div>
        <div className="text-xs text-gray-500 mt-auto">
          {product.category}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
