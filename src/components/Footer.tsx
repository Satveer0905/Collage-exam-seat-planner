import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-6px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
        
        <p className="text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          College Exam Seat Planner © 2026
        </p>

       
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
          
         
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-50 text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            System Online
          </div>

         
          <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 tracking-wide">
            Next.js · Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
