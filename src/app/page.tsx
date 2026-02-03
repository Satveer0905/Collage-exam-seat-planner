"use client";
import { useState, useEffect } from "react";
import { Room, allocateExam } from "@/lib/allocator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import History from "@/components/History";

export default function SeatPlanner() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [allocationResult, setAllocationResult] = useState<{success: boolean, rooms: Room[], message: string} | null>(null);
  const [formData, setFormData] = useState({ capacity: "", floorNo: "", nearWashroom: false });

  useEffect(() => {
    fetchRooms();
    fetchHistory();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data.map((r: any) => ({ id: r._id, capacity: r.capacity, floorNo: r.floorNo, nearWashroom: r.nearWashroom })));
  };

  const fetchHistory = async () => {
    const res = await fetch("/api/allocations");
    const data = await res.json();
    setHistory(data);
  };

  const addRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, capacity: Number(formData.capacity), floorNo: Number(formData.floorNo) }),
    });
    if (res.ok) fetchRooms();
    setFormData({ capacity: "", floorNo: "", nearWashroom: false });
  };

  const handleAllocate = async () => {
    if (totalStudents <= 0) return;
    const result = allocateExam(totalStudents, rooms);
    setAllocationResult({ success: result.success, rooms: result.allocatedRooms, message: result.message });

    await fetch("/api/allocations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentCount: totalStudents,
        roomsUsed: result.allocatedRooms.length,
        status: result.success ? "SUCCESS" : "FAILED"
      }),
    });
    fetchHistory();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-black">
      <Navbar roomCount={rooms.length} />

      <main className="grow pt-24 pb-24 px-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <Dashboard rooms={rooms} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 border-b pb-2 text-left">1. Add Classroom</h2>
              <form onSubmit={addRoom} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase">Capacity</label>
                  <input required type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase">Floor No</label>
                  <input required type="number" value={formData.floorNo} onChange={(e) => setFormData({...formData, floorNo: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <input type="checkbox" checked={formData.nearWashroom} onChange={(e) => setFormData({...formData, nearWashroom: e.target.checked})} id="wash" />
                  <label htmlFor="wash" className="text-sm font-semibold text-gray-600">Near Washroom</label>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-black py-3 rounded-lg hover:bg-indigo-700 uppercase text-[11px] tracking-widest shadow-lg shadow-indigo-100 transition-all">Register Room</button>
              </form>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 border-b pb-2 text-left">2. Allocation Tool</h2>
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase">Total Students</label>
                  <input type="number" onChange={(e) => setTotalStudents(parseInt(e.target.value))} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <button onClick={handleAllocate} className="w-full bg-green-600 text-white font-black py-3 rounded-lg hover:bg-green-700 uppercase text-[11px] tracking-widest shadow-lg shadow-green-100 transition-all">Optimize Plan</button>
                {allocationResult && (
                  <div className={`mt-4 p-4 rounded-xl border-2 ${allocationResult.success ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <p className="font-black text-xs uppercase tracking-tight text-center">
                      {allocationResult.success ? `Result: ${allocationResult.rooms.length} Rooms Allocated Successfully` : allocationResult.message}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center font-black text-[10px] uppercase text-gray-500 tracking-widest">Live Room Inventory</div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-400 font-black text-[10px] uppercase border-b">
                <tr><th className="px-6 py-4">Location</th><th className="px-6 py-4">Capacity</th><th className="px-6 py-4 text-center">Washroom</th><th className="px-6 py-4 text-right">Status</th></tr>
              </thead>
              <tbody className="divide-y">
                {rooms.map((room) => (
                  <tr key={room.id} className={`${allocationResult?.rooms.some(r => r.id === room.id) ? "bg-indigo-50/50" : "hover:bg-gray-50/50"} transition-all`}>
                    <td className="px-6 py-4 font-bold text-gray-700 text-left">Floor {room.floorNo}</td>
                    <td className="px-6 py-4 text-left text-gray-600 font-medium">{room.capacity} Seats</td>
                    <td className="px-6 py-4 text-center">{room.nearWashroom ? "✅" : "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${allocationResult?.rooms.some(r => r.id === room.id) ? "bg-indigo-600 text-white" : "text-gray-300"}`}>
                        {allocationResult?.rooms.some(r => r.id === room.id) ? "Selected" : "Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <History history={history} />
        </div>
      </main>
      <Footer />
    </div>
  );
}