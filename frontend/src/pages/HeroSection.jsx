import Carousel from "../components/Carousel";
import CategoryNavbar from "../components/CategoryNavbar";
import ShoppingCarousel from "../components/ShoppingCarousel";
import ShoppingCarousel2 from "../components/ShoppingCarousel2";

// HeroSection displays the category navigation and the main carousel/banner
const HeroSection = () => {
  return (
    <>
      {/* Category navigation bar at the top */}
      <CategoryNavbar />
      {/* Main carousel/banner section */}
      <Carousel />
      <main className=" bg-gray-100 mt-4">
        <ShoppingCarousel />
      </main>
      {/* <main className="min-h-screen bg-gray-100 mt-4"> */}
        <ShoppingCarousel2/>
      {/* </main> */}
    </>
  );
};

export default HeroSection;
