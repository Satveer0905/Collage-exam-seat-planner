import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import  {AllocationModel} from "@/models/Allocation";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newEntry = await AllocationModel.create(body);
  return NextResponse.json(newEntry);
}

export async function GET() {
  await connectDB();
  const history = await AllocationModel.find({}).sort({ timestamp: -1 }).limit(5);
  return NextResponse.json(history);
}