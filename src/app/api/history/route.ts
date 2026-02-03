import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { AllocationModel } from "@/models/Allocation";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newEntry = await AllocationModel.create(body);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save allocation" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const history = await AllocationModel.find({}).sort({ timestamp: -1 }).limit(5);
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}