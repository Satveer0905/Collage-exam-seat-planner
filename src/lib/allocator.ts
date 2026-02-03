export interface Room {
  id: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
}

export const allocateExam = (totalStudents: number, rooms: Room[]) => {
  const sortedRooms = [...rooms].sort((a, b) => {
    if (a.floorNo !== b.floorNo) return a.floorNo - b.floorNo;
    return b.capacity - a.capacity;
  });

  let remaining = totalStudents;
  const allocated: Room[] = [];

  for (const room of sortedRooms) {
    if (remaining <= 0) break;
    allocated.push(room);
    remaining -= room.capacity;
  }

  return {
    success: remaining <= 0,
    allocatedRooms: remaining <= 0 ? allocated : [],
    message: remaining <= 0 ? "Not enough seats available" : "",
  };
};