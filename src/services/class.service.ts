import { ClassStudent } from '../models/classStudent.model';
import { ClassTeacher } from '../models/classTeacher.model';
import { User } from '../models/user.model';
import { Class } from "../models/class.model";
import { Attendance } from "../models/attendance.model";

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



export const getAllClassesService = async () => {

    const attendance = await Class.find();

    return attendance
}

export const getClassService = async (classId:string) => {

    const attendance = await Class.find({_id:classId});

    return attendance
}

export const getClassTeacherService = async (classId:string) => {

    const attendance = await ClassTeacher.find({classId});

    return attendance
}

export const getClassStudentsService = async (classId:string) => {
    // I think studentId is not Prior studentId:string
    const attendance = await ClassStudent.find({classId});

    return attendance
}

export const getClassAttendanceService = async (classId:string) => {
    const attendance = await Attendance.find({classId});

    return attendance
}

export const getAllClassAttendanceService = async () => {
    const attendance = await Attendance.find();

    return attendance
}


export const createClassService = async (data:any) => {
    const newClass = new Class({
        name:data.name,
        description:data.description,
        location:data.location,
        capacity:data.capacity,
        dateStartAt:data.dateStartAt,
        dateEndAt:data.dateEndAt,
    
    })
     await newClass.save()
    return newClass
}

export const updateClassService = async (data:any, classId:string) => {
    const classD = await Class.findByIdAndUpdate(classId, {...data}, {new:true})

    return 
}

export const deleteClassService = async (classId:any) => {

    const deleted = await Class.findByIdAndDelete({_id:classId})
    return 
}
