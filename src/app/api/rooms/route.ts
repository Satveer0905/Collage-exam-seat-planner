import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { RoomModel } from "@/models/Room";

export async function GET() {
  try {
    await connectDB();
    const rooms = await RoomModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const newRoom = await RoomModel.create({
      capacity: body.capacity,
      floorNo: body.floorNo,
      nearWashroom: body.nearWashroom,
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create room" }, { status: 400 });
  }
}