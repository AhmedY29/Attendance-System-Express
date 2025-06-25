import { ClassStudent } from '../models/classStudent.model';
import { ClassTeacher } from '../models/classTeacher.model';
import { User } from '../models/user.model';

export const getTeacherForStudent = async (studentId: string) => {
  const classStudents = await ClassStudent.find({ studentId }).populate('classId');
  const teacherClasses = await ClassTeacher.find({ classId: { $in: classStudents.map(cs => cs.classId) } }).populate('teacherId');
  return teacherClasses.map(classTeacher => classTeacher.teacherId);
};

export const getStudentsForTeacher = async (teacherId: string) => {
  const teacherClasses = await ClassTeacher.find({ teacherId }).populate('classId');
  const classStudents = await ClassStudent.find({ classId: { $in: teacherClasses.map(tc => tc.classId) } }).populate('studentId');
  return classStudents.map(classStudent => classStudent.studentId);
};

export const getAllTeachersForPrincipal = async () => {
  const teachers = await User.find({ role: 'teacher' });
  return teachers;
};

export const getAllStudentsForPrincipal = async () => {
  const students = await User.find({ role: 'student' });
  return students;
};
