// src/components/CategoryNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  const categories = [
    {
      name: "Audio",
      icon: "https://cdn-icons-png.flaticon.com/512/0/191.png",
    },
    {
      name: "Beauty",
      icon: "https://cdn-icons-png.flaticon.com/512/1065/1065181.png",
    },
    {
      name: "Electronics",
      icon: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    },
    {
      name: "Home Appliances",
      icon: "https://cdn-icons-png.flaticon.com/512/2553/2553636.png",
    },
    {
      name: "Computers",
      icon: "https://cdn-icons-png.flaticon.com/512/2742/2742927.png",
    },
    {
      name: "Wearables",
      icon: "https://cdn-icons-png.flaticon.com/512/2786/2786392.png",
    },
    {
      name: "Footwear",
      icon: "https://cdn-icons-png.flaticon.com/512/3081/3081829.png",
    },
    {
      name: "Two Wheelers",
      icon: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
    },
  ];

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto py-3 hide-scrollbar">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center min-w-[70px] group"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-1">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;


// import React from "react";
// import { Link } from "react-router-dom";

// const CategoryNavbar = () => {
//   const categories = [
//     {
//       name: "Mobiles",
//       icon: "https://cdn-icons-png.flaticon.com/512/0/191.png",
//     },
//     {
//       name: "Beauty",
//       icon: "https://cdn-icons-png.flaticon.com/512/1065/1065181.png",
//     },
//     {
//       name: "Electronics",
//       icon: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
//     },
//     {
//       name: "Home & Furniture",
//       icon: "https://cdn-icons-png.flaticon.com/512/2553/2553636.png",
//     },
//     {
//       name: "Appliances",
//       icon: "https://cdn-icons-png.flaticon.com/512/2742/2742927.png",
//     },
//     {
//       name: "Flight Bookings",
//       icon: "https://cdn-icons-png.flaticon.com/512/2786/2786392.png",
//     },
//     {
//       name: "Beauty, Toys & More",
//       icon: "https://cdn-icons-png.flaticon.com/512/3081/3081829.png",
//     },
//     {
//       name: "Two Wheelers",
//       icon: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
//     },
//   ];

//   return (
//     <div className="bg-white shadow-sm sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center space-x-8 overflow-x-auto py-3 hide-scrollbar">
//           {categories.map((category, index) => (
//             <Link
//               key={index}
//               to={{
//                 pathname: "/products",
//                 state: { selectedCategory: category.name }
//               }}
//               className="flex flex-col items-center min-w-[70px] group"
//             >
//               <div className="w-10 h-10 flex items-center justify-center mb-1">
//                 <img 
//                   src={category.icon} 
//                   alt={category.name} 
//                   className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
//                 />
//               </div>
//               <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
//                 {category.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryNavbar;
