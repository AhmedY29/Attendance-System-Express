import { Router } from 'express';
import {
  createAttendance,
  getAttendance,
  getAttendancesByClass,
  getAttendancesByUser,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendance.controller';

const router = Router();

router.post('/', createAttendance);
router.get('/:id', getAttendance);
router.get('/class/:classId', getAttendancesByClass);
router.get('/user/:userId', getAttendancesByUser);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;