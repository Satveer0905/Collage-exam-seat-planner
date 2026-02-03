"use client";

import { useState, useEffect, useMemo } from "react";
import { Room, allocateExam } from "@/lib/allocator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import History from "@/components/History";
import Input from "@/components/Input";

interface AllocationResult {
  success: boolean;
  rooms: Room[];
  message: string;
}

export default function SeatPlanner() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [allocationResult, setAllocationResult] = useState<AllocationResult | null>(null);

  const [loadingRooms, setLoadingRooms] = useState(false);
  const [allocating, setAllocating] = useState(false);

  const [formData, setFormData] = useState({
    capacity: "",
    floorNo: "",
    nearWashroom: false,
  });

  useEffect(() => {
    fetchRooms();
    fetchHistory();
  }, []);



  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(
        data.map((r: any) => ({
          id: r._id,
          capacity: r.capacity,
          floorNo: r.floorNo,
          nearWashroom: r.nearWashroom,
        }))
      );
    } finally {
      setLoadingRooms(false);
    }
  };

  const fetchHistory = async () => {
    const res = await fetch("/api/allocations");
    const data = await res.json();
    setHistory(data);
  };


  const addRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        capacity: Number(formData.capacity),
        floorNo: Number(formData.floorNo),
      }),
    });

    setFormData({ capacity: "", floorNo: "", nearWashroom: false });
    fetchRooms();
  };

  const handleAllocate = async () => {
    if (totalStudents <= 0 || rooms.length === 0) return;

    setAllocating(true);

    const result = allocateExam(totalStudents, rooms);
    setAllocationResult({
      success: result.success,
      rooms: result.allocatedRooms,
      message: result.message,
    });

    await fetch("/api/allocations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentCount: totalStudents,
        roomsUsed: result.allocatedRooms.length,
        status: result.success ? "SUCCESS" : "FAILED",
      }),
    });

    fetchHistory();
    setAllocating(false);
  };

  

  const selectedRoomIds = useMemo(
    () => new Set(allocationResult?.rooms.map((r) => r.id)),
    [allocationResult]
  );


  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-black">
      <Navbar roomCount={rooms.length} />

      <main className="grow pt-24 pb-24 px-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">

          <Dashboard rooms={rooms} />

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">
                1. Add Classroom
              </h2>

              <form onSubmit={addRoom} className="space-y-4">
                <Input
                  label="Capacity"
                  value={formData.capacity}
                  onChange={(v) => setFormData({ ...formData, capacity: v })}
                />
                <Input
                  label="Floor No"
                  value={formData.floorNo}
                  onChange={(v) => setFormData({ ...formData, floorNo: v })}
                />

                <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.nearWashroom}
                    onChange={(e) =>
                      setFormData({ ...formData, nearWashroom: e.target.checked })
                    }
                  />
                  <span className="text-sm font-semibold text-gray-600">
                    Near Washroom
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-black py-3 rounded-lg
                             hover:bg-indigo-700 uppercase text-[11px] tracking-widest
                             shadow-lg shadow-indigo-100 transition"
                >
                  Register Room
                </button>
              </form>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">
                2. Allocation Tool
              </h2>

              <div className="space-y-4">
                <Input
                  label="Total Students"
                  value={totalStudents.toString()}
                  onChange={(v) => setTotalStudents(Number(v))}
                />

                <button
                  onClick={handleAllocate}
                  disabled={allocating}
                  className="w-full bg-green-600 text-white font-black py-3 rounded-lg
                             hover:bg-green-700 disabled:opacity-50 uppercase
                             text-[11px] tracking-widest shadow-lg shadow-green-100 transition"
                >
                  {allocating ? "Optimizing..." : "Optimize Plan"}
                </button>

                {allocationResult && (
                  <div
                    className={`p-4 rounded-xl border-2 text-center ${
                      allocationResult.success
                        ? "bg-green-50 border-green-100"
                        : "bg-red-50 border-red-100"
                    }`}
                  >
                    <p className="font-black text-xs uppercase">
                      {allocationResult.success
                        ? `${allocationResult.rooms.length} Rooms Allocated Successfully`
                        : allocationResult.message}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

      
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b font-black text-[10px] uppercase text-gray-500">
              Live Room Inventory
            </div>

            {loadingRooms ? (
              <p className="p-6 text-sm text-gray-400">Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="p-6 text-sm text-gray-400">No rooms registered yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 font-black text-[10px] uppercase">
                  <tr>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th className="px-6 py-4">Capacity</th>
                    <th className="px-6 py-4 text-center">Washroom</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rooms.map((room) => {
                    const selected = selectedRoomIds.has(room.id);
                    return (
                      <tr
                        key={room.id}
                        className={`${selected ? "bg-indigo-50/50" : "hover:bg-gray-50"} transition`}
                      >
                        <td className="px-6 py-4 font-bold">
                          Floor {room.floorNo}
                        </td>
                        <td className="px-6 py-4">{room.capacity} Seats</td>
                        <td className="px-6 py-4 text-center">
                          {room.nearWashroom ? "✅" : "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                              selected
                                ? "bg-indigo-600 text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {selected ? "Selected" : "Available"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          <History history={history} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
