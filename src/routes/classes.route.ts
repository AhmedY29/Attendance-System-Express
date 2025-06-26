import { createClass, deleteClass, getAllClassAttendance, getAllClasses, getClass, getClassAttendance, getClassStudents, getClassTeacher, getTeacherClasses, updateClass } from '../controllers/classes.controller';
import { Router } from 'express';


const router = Router();


// Just Add Controller

console.log('router')
// /classes/ Get All Classes
router.get('/', getAllClasses )

// /classes/attendance Get attendance For Specific Class
router.get('/attendance', getAllClassAttendance  )

// /classes/:id Get Class
router.get('/:classId', getClass )

// /classes/:id Get Class
router.delete('/:classId', deleteClass )

// /classes/:id Get Class
router.put('/:classId', updateClass )

// /classes/:id/teacher Get Teacher For Specific Class
router.get('/:classId/teacher', getClassTeacher )

// /classes/:id/students Get All Students For Specific Class
router.get('/:classId/students', getClassStudents  )


// /classes/:id/attendance Get attendance For Specific Class
router.get('/:classId/attendance', getClassAttendance  )

// /classes/:id/attendance Get attendance For Specific Class
router.get('/teacher/:teacherId', getTeacherClasses  )

// /classes/create For Add New Class By Admin
router.post('/create', createClass )







export default router