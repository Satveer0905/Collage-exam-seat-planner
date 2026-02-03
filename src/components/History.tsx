"use client";

export default function History({ history }: { history: any[] }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest">Recent Allocations</h2>
        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400 font-bold uppercase">Last 5 Sessions</span>
      </div>
      <div className="space-y-3">
        {history.length === 0 && <p className="text-center text-gray-400 py-4 text-sm">No allocation history found.</p>}
        {history.map((h, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all group">
            <div className="text-left">
              <p className="text-sm font-black text-gray-800 tracking-tight">Requirement: {h.studentCount} Students</p>
              <p className="text-[10px] text-gray-400 font-medium">{new Date(h.timestamp).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                h.status === "SUCCESS" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {h.status} • {h.roomsUsed} ROOMS
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
