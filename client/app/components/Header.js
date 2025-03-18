"use client"
import React, { useState } from 'react';
import PrevLetters from '../PrevLetters/page';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Call the PrevLetters function directly when "Previous Letters" is clicked
  const goToPrevLetters = () => {
    // You can call PrevLetters here if you want it to render directly or trigger its logic
    // If it's a component, you can conditionally render it, but if it's a function, just call it.
    PrevLetters();  // Calls the PrevLetters function
  };

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
        <div className={`flex items-center space-x-6 mr-10 ml-4 ${menuOpen ? 'flex-row' : 'hidden'} md:flex`}>
            <div className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white">
                New Letter
            </div>
            <div 
              className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white"
              onClick={goToPrevLetters} // Call PrevLetters function here
            >
                Previous Letters
            </div>
            <div className="px-3 py-2 text-xl bg-white rounded-lg text-black/70 font-bold font-['Inter'] cursor-pointer hover:bg-gray-300">
                Log out
            </div>
        </div>
    </div>
  );
}
