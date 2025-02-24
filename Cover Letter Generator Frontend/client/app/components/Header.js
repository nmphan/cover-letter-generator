"use client"
import React, { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="flex items-center justify-between p-2 bg-black">
        {/* Left part: "Cover Craft" */}
        <div className="flex items-center justify-center py-1.5 px-4 ml-10 border border-white cursor-pointer">
            <div className="flex space-x-2">
                <span className="text-white text-2xl font-bold font-['Inter'] tracking-wide">Cover</span>
                <span className="text-white text-2xl font-bold font-['Inter'] tracking-wide">Craft</span>
            </div>
        </div>

        {/* Hamburger Menu Icon (for mobile screens) */}
        <div className="block md:hidden" onClick={toggleMenu}>
            <div className="w-6 h-1 bg-white mb-2"></div>
            <div className="w-6 h-1 bg-white mb-2"></div>
            <div className="w-6 h-1 bg-white"></div>
        </div>

        {/* Menu Items (Visible when menu is open on mobile) */}
        <div className={`flex items-center space-x-6 mr-10 ml-4 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
            <div className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white">
                New Letter
            </div>
            <div className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white">
                Previous Letters
            </div>
            <div className="px-3 py-2 text-xl bg-white rounded-lg text-black/70 font-bold font-['Inter'] cursor-pointer hover:bg-gray-300">
                Log out
            </div>
        </div>
    </div>
  )
}
