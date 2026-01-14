"use client";

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-700 text-stone-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-2xl font-serif font-bold text-amber-500">Bookworm</span>
            </div>
            <p className="mt-4 text-stone-400 max-w-md">
              Your personalized digital library. Discover new worlds, keep track of what you've read, 
              and join a community of book lovers.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="https://www.facebook.com/" className="text-stone-400 hover:text-amber-500 transition-colors">
                <FaFacebookF className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://x.com/" className="text-stone-400 hover:text-amber-500 transition-colors">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.instagram.com/" className="text-stone-400 hover:text-amber-500 transition-colors">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.linkedin.com/" className="text-stone-400 hover:text-amber-500 transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/my-library" className="text-stone-400 hover:text-amber-500 transition-colors">
                  My Library
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 text-sm">
            &copy; {currentYear} Bookworm. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-stone-500 text-sm">
              Made with ❤️ for book lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}