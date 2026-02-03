import mongoose, { Schema, model, models } from "mongoose";

const AllocationSchema = new Schema({
  studentCount: { type: Number, required: true },
  roomsUsed: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["SUCCESS", "FAILED"], required: true }
});

export const AllocationModel = models.Allocation || model("Allocation", AllocationSchema, "allocations");