# College Exam Seat Planner 🎓

A full-stack classroom allocation system designed to optimize exam seating using a **Greedy Allocation Strategy**. This application minimizes the total number of classrooms used while prioritizing student comfort by selecting lower floors first.

## 🚀 Live Demo
**Live URL:** [INSERT_YOUR_VERCEL_URL_HERE]

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas (Cloud) via Mongoose
- **Deployment:** Vercel

## 🧠 Core Logic: Greedy Allocation
The application implements a **Greedy Optimization Algorithm** to solve the seat allocation problem (found in `src/lib/allocator.ts`):
1. **Floor Priority:** All available rooms are sorted by `floorNo` in ascending order. This ensures students aren't forced to climb higher floors unnecessarily.
2. **Room Minimization:** Within the same floor, rooms are sorted by `capacity` in descending order. This ensures the **minimum number of rooms** are used to satisfy the student count.
3. **Capacity Check:** Before allocation, the system validates the total student count against the total available capacity. If insufficient, a "Not enough seats available" error is triggered.

## ✨ Features
- **Real-time Dashboard:** Displays total capacity, room count, and average classroom size.
- **Classroom Management:** Interface to add rooms with floor number, capacity, and washroom facility details.
- **Persistent History:** Every allocation attempt is logged in MongoDB and displayed in the History section.
- **Responsive Design:** Optimized for all devices with fixed navigation and footer.

## 📁 Project Structure (Based on `src/`)
As per the current project organization:

### **API Routes (`app/api/`)**
- `api/allocations/route.ts` - Handles the creation and retrieval of allocation records.
- `api/history/route.ts` - Manages the persistent logging of allocation history.
- `api/rooms/route.ts` - Handles classroom inventory data.

### **UI Components (`components/`)**
- `Dashboard.tsx` - Visual statistics panel.
- `History.tsx` - List of recent allocation sessions.
- `Navbar.tsx` & `Footer.tsx` - Core layout elements.

### **Data & Logic (`lib/` & `models/`)**
- `lib/allocator.ts` - The greedy algorithm logic.
- `lib/db.ts` - MongoDB connection utility.
- `models/` - Mongoose schemas for `Allocation`, `History`, and `Room`.

## ⚙️ Local Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file and add your `MONGODB_URI`.
4. Run the development server: `npm run dev`.

## 📝 Submission Checklist
- [x] GitHub Repository Link
- [x] Live Deployment URL
- [x] README.md with Logic Explanation
- [x] 2-minute Demo Video
- [x] Minimum 3+ Git Commits