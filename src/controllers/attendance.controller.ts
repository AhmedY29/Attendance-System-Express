import { Request, Response } from 'express';
import * as attendanceService from '../services/attendance.service';

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = req.body;
    const newAttendance = await attendanceService.createAttendance(attendance);
    res.status(201).json(newAttendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await attendanceService.getAttendance(req.params.id);
    if (!attendance) {
     res.status(404).json({ message: 'Attendance not found' });
    }
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendancesByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const attendances = await attendanceService.getAttendancesByClass(classId);
    res.json(attendances);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendancesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const attendances = await attendanceService.getAttendancesByUser(userId);
    res.json(attendances);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedAttendance = req.body;
    const attendance = await attendanceService.updateAttendance(id, updatedAttendance);
    
    if (!attendance) {
     res.status(404).json({ message: 'Attendance not found' });
    }
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attendance = await attendanceService.deleteAttendance(id);
    
    if (!attendance) {
      res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};