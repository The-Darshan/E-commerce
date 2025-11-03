import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">ShopKart</h3>
            <p className="text-sm mb-4">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-white transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={18} />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail size={18} />
                <span>support@shopkart.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={18} className="mt-1" />
                <span>123 Shopping Street, Mumbai, Maharashtra - 400001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} ShopKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer