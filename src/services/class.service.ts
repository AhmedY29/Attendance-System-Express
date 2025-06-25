import { ClassTeacher } from "../models/classTeacher.model";
import { Class } from "../models/class.model";
import { ClassStudent } from "../models/classStudent.model";
import { Attendance } from "../models/attendance.model";



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
    console.log('ssss')
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