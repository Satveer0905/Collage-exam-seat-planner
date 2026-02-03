import React, { useState } from "react";

type NavbarProps = {
  roomCount: number;
};

export default function Navbar({ roomCount }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-indigo-700/90 to-indigo-600/90 backdrop-blur-lg text-white shadow-xl">
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
          <span className="text-indigo-200">
            Rooms: {roomCount}
          </span>

          {["Dashboard", "History"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-200 after:transition-all hover:after:w-full hover:text-indigo-200"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
