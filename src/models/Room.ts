import mongoose, { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  capacity: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  nearWashroom: { type: Boolean, default: false },
}, { timestamps: true });

export const RoomModel = models.Room || model("Room", RoomSchema, "rooms");