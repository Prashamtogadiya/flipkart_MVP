import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product._id}`, { state: { product } });
  };
  return (
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <img
        src={product.imageUrl[0]}
        alt={product.name}
        className="w-full h-48 object-contain bg-white p-4"
      />
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 font-bold">${product.price}</p>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
