"use client";

import { Building2, Users, BarChart3 } from "lucide-react";

interface Room {
  capacity: number;
}

interface DashboardProps {
  rooms: Room[];
}

export default function Dashboard({ rooms }: DashboardProps) {
  const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const avgCapacity =
    rooms.length > 0 ? Math.round(totalCapacity / rooms.length) : 0;

  const stats = [
    {
      label: "Total Capacity",
      value: totalCapacity,
      suffix: "Seats",
      icon: Users,
    },
    {
      label: "Available Rooms",
      value: rooms.length,
      icon: Building2,
    },
    {
      label: "Avg. Room Size",
      value: avgCapacity,
      suffix: "Seats",
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {stats.map(({ label, value, suffix, icon: Icon }) => (
        <div
          key={label}
          className="group relative bg-white p-5 rounded-2xl border border-gray-200 shadow-sm
                     transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-indigo-300"
        >
          
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-indigo-500/70 opacity-0 group-hover:opacity-100 transition" />

        
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {label}
            </p>
            <Icon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition" />
          </div>

          
          <p className="text-3xl font-extrabold text-indigo-600">
            {value}{" "}
            {suffix && (
              <span className="text-sm font-medium text-gray-400">
                {suffix}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
