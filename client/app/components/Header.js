// "use client"
// import React, { useState } from 'react';
// import PrevLetters from '../PrevLetters/page';

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Function to toggle the menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Call the PrevLetters function directly when "Previous Letters" is clicked
//   const goToPrevLetters = () => {
//     // You can call PrevLetters here if you want it to render directly or trigger its logic
//     // If it's a component, you can conditionally render it, but if it's a function, just call it.
//     PrevLetters();  // Calls the PrevLetters function
//   };

//   return (
//     <div className="flex items-center justify-between p-2 bg-black">
//         {/* Left part: "Cover Craft" */}
//         <div className="flex items-center justify-center py-1.5 px-4 ml-10 border border-white cursor-pointer">
//             <div className="flex space-x-2">
//                 <span className="text-white text-2xl font-bold font-['Inter'] tracking-wide">Cover</span>
//                 <span className="text-white text-2xl font-bold font-['Inter'] tracking-wide">Craft</span>
//             </div>
//         </div>

//         {/* Hamburger Menu Icon (for mobile screens) */}
//         <div className="block md:hidden" onClick={toggleMenu}>
//             <div className="w-6 h-1 bg-white mb-2"></div>
//             <div className="w-6 h-1 bg-white mb-2"></div>
//             <div className="w-6 h-1 bg-white"></div>
//         </div>

//         {/* Menu Items (Visible when menu is open on mobile) */}
//         <div className={`flex items-center space-x-6 mr-10 ml-4 ${menuOpen ? 'flex-row' : 'hidden'} md:flex`}>
//             <div className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white">
//                 New Letter
//             </div>
//             <div 
//               className="px-5 py-4 text-white/50 text-[18px] font-normal font-['Inter'] cursor-pointer hover:text-white"
//               onClick={goToPrevLetters} // Call PrevLetters function here
//             >
//                 Previous Letters
//             </div>
//             <div className="px-3 py-2 text-xl bg-white rounded-lg text-black/70 font-bold font-['Inter'] cursor-pointer hover:bg-gray-300">
//                 Log out
//             </div>
//         </div>
//     </div>
//   );
// }


// "use client";
// import React, { useState } from 'react';
// import PrevLetters from '../PrevLetters/page';

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Function to toggle the menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Call the PrevLetters function directly when "Previous Letters" is clicked
//   const goToPrevLetters = () => {
//     PrevLetters(); // Calls the PrevLetters function
//   };

//   return (
//     <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-indigo-950 shadow-lg">
//       {/* Left part: "Cover Craft" */}
//       <div className="flex items-center justify-center py-2 px-6 ml-4 border border-indigo-500/30 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-900/50">
//         <div className="flex space-x-2">
//           <span className="text-white text-2xl font-extrabold tracking-wider">Cover</span>
//           <span className="text-indigo-400 text-2xl font-bold tracking-wider">Craft</span>
//         </div>
//       </div>

//       {/* Hamburger Menu Icon (for mobile screens) */}
//       <div className="block md:hidden mr-4" onClick={toggleMenu}>
//         <div className="w-8 h-1 bg-white mb-2 rounded transition-all duration-300"></div>
//         <div className="w-8 h-1 bg-white mb-2 rounded transition-all duration-300"></div>
//         <div className="w-8 h-1 bg-white rounded transition-all duration-300"></div>
//       </div>

//       {/* Menu Items */}
//       <div
//         className={`flex items-center space-x-8 mr-6 ${
//           menuOpen ? 'flex-col absolute top-16 left-0 w-full bg-indigo-950 p-4' : 'hidden'
//         } md:flex md:flex-row md:static md:bg-transparent md:p-0`}
//       >
//         <div className="px-4 py-2 text-gray-300 text-lg font-medium  cursor-pointer transition-colors duration-300 hover:text-indigo-300">
//           New Letter
//         </div>
//         <div
//           className="px-4 py-2 text-gray-300 text-lg font-medium  cursor-pointer transition-colors duration-300 hover:text-indigo-300"
//           onClick={goToPrevLetters}
//         >
//           Previous Letters
//         </div>
//         <div className="px-4 py-2 bg-indigo-600 text-white text-lg font-semibold rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-700 hover:shadow-md">
//           Login
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from 'react';
import PrevLetters from '../PrevLetters/page';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToPrevLetters = () => {
    PrevLetters();
  };

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg border-b border-indigo-700/30">
      {/* Logo with exact matching style */}
      <div className="flex items-center group">
        <div className="flex items-center justify-center py-2 px-5 rounded-xl bg-gradient-to-r from-indigo-700/20 to-purple-700/20 border border-indigo-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-indigo-800/30 hover:shadow-md">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-100">Cover</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Craft</span>
          </h1>
        </div>
      </div>

      {/* Hamburger Menu (mobile) */}
      <div 
        className="md:hidden z-50 space-y-2 p-2 rounded-lg bg-indigo-800/50 border border-indigo-600/30 cursor-pointer transition-all duration-300 hover:bg-indigo-700/50"
        onClick={toggleMenu}
      >
        <div className={`w-8 h-0.5 bg-indigo-100 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-8 h-0.5 bg-indigo-100 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
        <div className={`w-8 h-0.5 bg-indigo-100 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
      </div>

      {/* Navigation Menu */}
      <div className={`absolute md:static top-0 left-0 w-full md:w-auto h-screen md:h-auto bg-gradient-to-b from-indigo-900 to-purple-900 md:bg-transparent z-40 pt-24 md:pt-0 transition-all duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-6 px-6 md:px-0">
          <div className="w-full md:w-auto text-center py-3 px-6 text-indigo-100 text-lg font-medium rounded-xl cursor-pointer transition-all duration-300 hover:bg-indigo-800/50 hover:text-white hover:shadow-sm border-b border-indigo-800/50 md:border-none">
            New Letter
          </div>
          <div 
            className="w-full md:w-auto text-center py-3 px-6 text-indigo-100 text-lg font-medium rounded-xl cursor-pointer transition-all duration-300 hover:bg-indigo-800/50 hover:text-white hover:shadow-sm border-b border-indigo-800/50 md:border-none"
            onClick={goToPrevLetters}
          >
            Previous Letters
          </div>
          <div className="w-full md:w-auto text-center py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg mt-4 md:mt-0">
            Login
          </div>
        </div>
      </div>
    </div>
  );
}