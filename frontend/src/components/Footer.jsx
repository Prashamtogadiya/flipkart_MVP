import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white pt-10 pb-4 text-xs font-normal border-t border-[#2b3642]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">ABOUT</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Flipkart Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Flipkart Wholesale
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">HELP</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Report Infringement
                </a>
              </li>
            </ul>
          </div>
          {/* Policy */}
          <div>
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Grievance Redressal
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  EPR Compliance
                </a>
              </li>
            </ul>
          </div>
          {/* Social */}
          <div className="relative">
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">SOCIAL</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <Facebook size={16} />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <Twitter size={16} />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <Youtube size={16} />
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
            </ul>
            {/* Vertical Divider for large screens */}
            <div className="hidden lg:block absolute top-0 right-[-2rem] h-full w-px bg-[#2b3642]" style={{height: '100%'}}></div>
          </div>
          {/* Mail Us */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">Mail Us:</h3>
            <address className="not-italic leading-relaxed text-xs text-[#b0b7c3]">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
            </address>
          </div>
          {/* Registered Office Address */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-[#878787] text-xs font-medium mb-3 uppercase">Registered Office Address:</h3>
            <address className="not-italic leading-relaxed text-xs text-[#b0b7c3]">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
              <br />
              CIN : U51109KA2012PTC066107
              <br />
              Telephone:{" "}
              <a href="tel:044-45614700" className="text-blue-400 hover:underline">
                044-45614700
              </a>
            </address>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-[#2b3642] pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-[#b0b7c3]">
          <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
            <a href="#" className="flex items-center gap-1 hover:underline">
              <span className="text-yellow-400">🏪</span>
              Become a Seller
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              <span className="text-yellow-400">📢</span>
              Advertise
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              <span className="text-yellow-400">🎁</span>
              Gift Cards
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              <span className="text-yellow-400">❓</span>
              Help Center
            </a>
          </div>
          <div className="text-xs text-center md:text-left">© 2007-2025 Flipkart.com</div>
          <div className="flex items-center gap-2">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"
              alt="Payments"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
