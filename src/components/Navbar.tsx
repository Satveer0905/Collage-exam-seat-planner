import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-700/90 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white text-indigo-700 p-1.5 rounded-lg font-black text-xl">CP</div>
          <h1 className="text-xl font-bold tracking-tight uppercase">ExamPlan</h1>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-wider">
          <a href="#" className="hover:text-indigo-200 transition font-black">Dashboard</a>
          <a href="#" className="hover:text-indigo-200 transition">History</a>
          <span className="text-indigo-400">|</span>
          <span className="text-green-400">Round-2 Assignment</span>
        </div>
      </div>
    </nav>
  );
}