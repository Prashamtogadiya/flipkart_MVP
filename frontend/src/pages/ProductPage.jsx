// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ProductCard from "../components/ProductCard";

// ProductPage displays a list of products, optionally filtered by category
const ProductPage = () => {
  // State for all products and displayed (filtered) products
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  // Loading state for API call
  const [loading, setLoading] = useState(true);
  // Price range state for rc-slider
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

  // Get current location and navigation helpers
  const location = useLocation();
  const navigate = useNavigate();
  // Get selected category from URL query params
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  // Fetch all products from backend on mount
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

  // Filter and sort products by selected category and price range
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    // Sort by price if sortOrder is set
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    setDisplayedProducts(filtered);
  }, [selectedCategory, allProducts, priceRange, sortOrder]);

  // Remove category filter and show all products
  const clearCategoryFilter = () => {
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Price Range Filter UI using rc-slider */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-md">
          <label className="font-semibold mr-2">Price Range:</label>
          <div className="flex items-center gap-4">
            <span>${priceRange[0]}</span>
            <Slider
              range
              min={0}
              max={1000}
              step={1}
              value={priceRange}
              onChange={setPriceRange}
              allowCross={false}
              style={{ width: 200, margin: "0 16px" }}
            />
            <span>${priceRange[1]}</span>
          </div>
        </div>
        {/* Sort by price dropdown */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <label className="font-semibold">Sort by:</label>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        {/* Show category heading and clear filter button if category is selected */}
        {selectedCategory ? (
          <div className="flex items-center mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mr-4">
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
          <h2 className="text-2xl font-bold mb-6 md:mb-0">All Products</h2>
        )}
      </div>

      {/* Show loading spinner, empty message, or product grid */}
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
          {/* Render each product as a card */}
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;

