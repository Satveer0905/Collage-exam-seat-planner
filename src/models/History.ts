import mongoose, { Schema, model, models } from "mongoose";

const HistorySchema = new Schema({
  totalStudents: { type: Number, required: true },
  roomsAllocated: { type: Number, required: true },
  roomDetails: { type: Array, required: true }, // Stores objects of rooms used
  status: { type: String, enum: ["SUCCESS", "FAILED"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const HistoryModel = models.History || model("History", HistorySchema, "history");