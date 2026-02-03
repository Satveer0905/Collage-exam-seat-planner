import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-3 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          College Exam Seat Planner © 2026
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase">
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Operational
          </div>
          <div className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            Next.js + Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}