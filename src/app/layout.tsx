import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exam Planner | Smart Allocation",
  description: "Greedy allocation tool for exam seating",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* FIXED NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-8 shadow-sm">
          <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-indigo-700 tracking-tight">
              COLLEGE<span className="text-gray-400 font-light">PLANNER</span>
            </h1>
            <div className="flex gap-4 text-sm font-medium text-gray-500">
              <span className="hidden sm:inline">Round-2 Assignment</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </nav>

        {/* SCROLLABLE CONTENT AREA */}
        <main className="pt-24 pb-20 px-4 min-h-screen">
          {children}
        </main>

        {/* FIXED FOOTER */}
        <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t z-50 flex items-center px-8">
          <div className="max-w-5xl mx-auto w-full flex justify-between items-center text-xs text-gray-400 font-medium uppercase tracking-widest">
            <p>© 2026 Internal Exam Cell</p>
            <p>Greedy Optimization v1.0</p>
          </div>
        </footer>
      </body>
    </html>
  );
}