"use client";

interface DashboardProps {
  rooms: any[];
}

export default function Dashboard({ rooms }: DashboardProps) {
  const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const avgCapacity = rooms.length > 0 ? Math.round(totalCapacity / rooms.length) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-hover hover:border-indigo-300">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Capacity</p>
        <p className="text-3xl font-black text-indigo-600">{totalCapacity} <span className="text-sm font-medium text-gray-400">Seats</span></p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-hover hover:border-indigo-300">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Available Rooms</p>
        <p className="text-3xl font-black text-indigo-600">{rooms.length}</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-hover hover:border-indigo-300">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg. Room Size</p>
        <p className="text-3xl font-black text-indigo-600">{avgCapacity} <span className="text-sm font-medium text-gray-400">Seats</span></p>
      </div>
    </div>
  );
}