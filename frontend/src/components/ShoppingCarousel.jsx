"use client"

import { useState, useRef } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
// import Image from "next/image"

export default function ShoppingCarousel() {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
      setShowLeftArrow(true)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
      if (scrollContainerRef.current.scrollLeft <= 300) {
        setShowLeftArrow(false)
      }
    }
  }

  const products = [
    {
      id: 1,
      name:'Audio',
      title: "Bestselling sarees",
      image: "https://media.istockphoto.com/id/835148968/photo/red-headphones-isolated.jpg?s=612x612&w=0&k=20&c=JAEd1MYVaJjC0Iu1cZ4LPHRigRGZ-NJNjIXXs87me1E=",
      price: "Under ₹499",
    },
    {
      id: 2,
      name:'Beauty',
      title: "Tokyo Talkies, Sassa...",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcScI4rOEba_LvGUc6XyxgKLTSLjEfqSbdmFTvauxsJqKjejZhVX8Bbk8C7aLGCarVKJY0ZFScB4oagRerSZRadfw8bcuq8PRuIVaSA0MEjFjpAmzoVLdVKK",
      price: "Under ₹499",
    },
    {
      id: 3,
      name:'Electronics',
      title: "Women's Sports Sho...",
      image: "https://www.shutterstock.com/image-photo/closed-smart-home-wireless-security-260nw-2290232555.jpg",
      price: "Under ₹499",
    },
    {
      id: 4,
      name:'Home Appliances',
      title: "USPA, Levi's...",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      price: "Under ₹499",
    },
    {
      id: 5,
      name:'Computers',
      title: "Hottest steals",
      image: "https://m.media-amazon.com/images/I/51Da+TBexCL._SL1500_.jpg",
      price: "Under ₹499",
    },
    {
      id: 6,
      name:'Wearables',
      title: "Women's Flats, Heel...",
      image: "https://images.meesho.com/images/products/371498911/ash5x_1200.jpg",
      price: "Under ₹499",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <h2 className="text-2xl font-bold mb-4">499 only</h2>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[150px] cursor-pointer"
              onClick={() => window.location.href = `/products?category=${encodeURIComponent(product.name)}`}
            >
              <div className="flex flex-col items-center">
                <div className="mb-2 h-[150px] w-[150px] relative">
                  <img src={product.image || "/placeholder.svg"} alt={product.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-sm font-medium text-center">{product.title}</h3>
                <p className="text-sm text-center">{product.price}</p>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-[300px] h-[250px] relative">
            <div className="bg-blue-600 rounded-lg h-full w-full overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-xl mr-1">Flipkart</span>
                  <span className="bg-yellow-400 text-blue-600 rounded px-1 text-sm font-bold">Travel</span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <div className="bg-yellow-400 rounded-full w-24 h-24"></div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-xl font-bold">Flight bookings</h3>
                  <p className="text-lg font-bold">From ₹1,499*</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
