import Carousel from "../components/Carousel"
import CategoryNavbar from "../components/CategoryNavbar"

// HeroSection displays the category navigation and the main carousel/banner
const HeroSection = ()=>{
    return(
        <>
            {/* Category navigation bar at the top */}
            <CategoryNavbar/>
            {/* Main carousel/banner section */}
            <Carousel/>
        </>
    )
}

export default HeroSection