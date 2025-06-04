// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = allProducts.filter(
        (product) => product.category === selectedCategory
      );
      setDisplayedProducts(filtered);
    } else {
      setDisplayedProducts(allProducts);
    }
  }, [selectedCategory, allProducts]);

  const clearCategoryFilter = () => {
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedCategory ? (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {selectedCategory} ({displayedProducts.length} products)
          </h2>
          <button
            onClick={clearCategoryFilter}
            className="text-blue-600 hover:text-blue-800"
          >
            Show All Categories
          </button>
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            No products found in {selectedCategory}
          </h3>
          <button
            onClick={clearCategoryFilter}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

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

export default ProductPage;


// // src/pages/ProductsPage.jsx

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProductPage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     if (location.state?.selectedCategory) {
//       setSelectedCategory(location.state.selectedCategory);
//     } else {
//       setSelectedCategory(null);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:3000/api/products");
//         setAllProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       const filtered = allProducts.filter(
//         (product) => product.category === selectedCategory
//       );
//       setDisplayedProducts(filtered);
//     } else {
//       setDisplayedProducts(allProducts);
//     }
//   }, [selectedCategory, allProducts]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {selectedCategory ? (
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">
//             {selectedCategory} ({displayedProducts.length} products)
//           </h2>
//           <button
//             onClick={() => setSelectedCategory(null)}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             Show All Categories
//           </button>
//         </div>
//       ) : (
//         <h2 className="text-2xl font-bold mb-6">All Products</h2>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : displayedProducts.length === 0 ? (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-medium text-gray-600">
//             No products found in {selectedCategory}
//           </h3>
//           <button
//             onClick={() => setSelectedCategory(null)}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Browse All Products
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {displayedProducts.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/products/${product._id}`, { state: { product } });
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//     >
//       <img
//         src={product.imageUrl[0]}
//         alt={product.name}
//         className="w-full h-48 object-contain bg-white p-4"
//       />
//       <div className="p-4">
//         <h3 className="font-medium text-lg mb-1">{product.name}</h3>
//         <p className="text-gray-600 font-bold">${product.price}</p>
//         <p className="text-sm text-gray-500 mt-1">{product.category}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
