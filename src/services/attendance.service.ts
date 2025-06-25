import { Attendance } from "../models/attendance.model";

export const createAttendance = async (data: any) => {
  const attendance = new Attendance(data);
  return await attendance.save();
};

export const getAttendance = async (id: string) => {
  return await Attendance.findById(id);
};

export const getAttendancesByClass = async (classId: string) => {
  return await Attendance.find({ classId });
};

export const getAttendancesByUser = async (userId: string) => {
  return await Attendance.find({ userId });
};

export const updateAttendance = async (id: string, data: any) => {
  return await Attendance.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAttendance = async (id: string) => {
  return await Attendance.findByIdAndDelete(id);
};