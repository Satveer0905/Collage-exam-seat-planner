# College Exam Seat Planner 🎓

A full-stack application designed to optimize classroom allocation for college exams. This project focuses on minimizing resource usage while prioritizing student convenience (lower floors first).

## 🚀 Live Demo
**Live URL:** [INSERT_YOUR_VERCEL_URL_HERE]

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas (Cloud)
- **Deployment:** Vercel

## 🧠 Core Logic: Greedy Allocation
The application implements a **Greedy Optimization Algorithm** to solve the seat allocation problem:
1. **Floor Priority:** All available rooms are sorted by `floorNo` in ascending order. This ensures students aren't forced to climb higher floors unnecessarily.
2. **Room Minimization:** Within the same floor, rooms are sorted by `capacity` in descending order. This ensures the **minimum number of rooms** are used to satisfy the student count.
3. **Capacity Check:** Before allocation, the system validates the total student count against the total available capacity. If insufficient, a "Not enough seats available" error is triggered.



## ✨ Features
- **Dashboard:** Real-time statistics including total capacity, room count, and average classroom size.
- **Classroom Management:** Dynamic form to add rooms with floor number, capacity, and facility details (e.g., washroom proximity).
- **History Tracking:** Persistent logs of previous allocation attempts, including status (Success/Failure) and timestamp.
- **Responsive UI:** Fully optimized for mobile and desktop views with a fixed navigation and footer.

## 📁 Project Structure
- `src/lib/allocator.ts` - Contains the pure TypeScript logic for the allocation algorithm.
- `src/app/api/` - Serverless API routes for MongoDB CRUD operations.
- `src/models/` - Mongoose schemas (Room, Allocation, History).
- `src/components/` - Modular UI components for high maintainability.

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