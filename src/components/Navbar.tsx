import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-700/90 to-indigo-600/90 backdrop-blur-lg text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
       
        <div className="flex items-center gap-3">
          <div className="bg-white text-indigo-700 px-2 py-1 rounded-xl font-extrabold text-lg shadow-md">
            CP
          </div>
          <h1 className="text-lg md:text-xl font-bold tracking-wide uppercase">
            ExamPlan
          </h1>
        </div>

       
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          {["Dashboard", "History"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-200 after:transition-all hover:after:w-full hover:text-indigo-200"
            >
              {item}
            </a>
          ))}
          <span className="text-indigo-300">|</span>
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold">
            Round-2 Assignment
          </span>
        </div>

      
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      
      {open && (
        <div className="md:hidden bg-indigo-700/95 backdrop-blur-lg px-6 py-4 space-y-4 text-sm font-semibold uppercase">
          <a href="#" className="block hover:text-indigo-200">Dashboard</a>
          <a href="#" className="block hover:text-indigo-200">History</a>
          <div className="text-green-300 text-xs font-bold">
            Round-2 Assignment
          </div>
        </div>
      )}
    </nav>
  );
}
