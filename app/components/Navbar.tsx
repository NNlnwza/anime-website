'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaBookmark, FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#23252b] text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">AnimeWeb</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/new" className="px-3 py-2 hover:text-yellow-400">New</Link>
              <Link href="/popular" className="px-3 py-2 hover:text-yellow-400">Popular</Link>
              <Link href="/simulcast" className="px-3 py-2 hover:text-yellow-400">Simulcast</Link>
              <div className="relative group">
                <button className="px-3 py-2 hover:text-yellow-400">Categories</button>
              </div>
              <Link href="/games" className="px-3 py-2 hover:text-yellow-400">Games</Link>
              <Link href="/news" className="px-3 py-2 hover:text-yellow-400">News</Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-yellow-400">
              <FaSearch className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-yellow-400">
              <FaBookmark className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-yellow-400">
              <FaUser className="h-5 w-5" />
            </button>
            <Link href="/premium" className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300">
              TRY FREE PREMIUM
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 