import { ClassTeacher } from "../models/classTeacher.model"
import { createClassService, deleteClassService, getAllClassAttendanceService, getAllClassesService, getClassAttendanceService, getClassService, getClassStudentsService, getClassTeacherService } from "../services/class.service"
import { verifyToken } from "../utils/generateToken"
import { Request, Response } from "express"



export const getAllClasses = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    console.log('controller')

    try {
        // TODO:
        const classes = await getAllClassesService()

        res.status(200)//OK
        .json({
            success:true,
            data: classes
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Classes: ${error.message}`
            }
        })
    }
}

export const getClass = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { classId } = req.params
    console.log(classId)

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const classData = await getClassService(classId)

        res.status(200)//OK
        .json({
            success:true,
            data: classData
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Class: ${error.message}`
            }
        })
    }
}

// /classes/:id/teacher Get Teacher For Specific Class


export const getClassTeacher = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { classId } = req.params

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const createLeave = await getClassTeacherService(classId)

        res.status(200)//OK
        .json({
            success:true,
            data:createLeave
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Teacher Class: ${error.message}`
            }
        })
    }
}


// /classes/:id/students Get All Students For Specific Class

export const getClassStudents = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { classId } = req.params

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const classData = await getClassStudentsService(classId)

        res.status(200)//OK
        .json({
            success:true,
            data:classData
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Class Students: ${error.message}`
            }
        })
    }
}

// /classes/attendance Get All attendance 

export const getAllClassAttendance = async (req:Request, res:Response) =>{
    console.log('attendance')
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }


    try {
        // TODO:
        const attendance = await getAllClassAttendanceService()
        console.log(attendance)
        res.status(200)//OK
        .json({
            success:true,
            data: attendance
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get All Attend: ${error.message}`
            }
        })
    }
}

// /classes/:id/attendance Get attendance For Specific Class

export const getClassAttendance = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { classId } = req.params

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const attendance = await getClassAttendanceService(classId)

        res.status(200)//OK
        .json({
            success:true,
            data: attendance
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Class Attendance: ${error.message}`
            }
        })
    }
}


export const createClass = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { name, description, location, capacity, dateStartAt, dateEndAt } = req.body


    try {
        const data = {
        name,
        description,
        location,
        capacity,
        dateStartAt,
        dateEndAt,
        }
        const createLeave = await createClassService(data)

        res.status(200)//OK
        .json({
            success:true,
            message: `Created Class Successfully`,
            data:createLeave
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Create : ${error.message}`
            }
        })
    }
}

export const updateClass = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { name, description, location, capacity, dateStartAt, dateEndAt } = req.body


    try {
        const data = {
        name,
        description,
        location,
        capacity,
        dateStartAt,
        dateEndAt,
        }
        const createLeave = await createClassService(data)

        res.status(200)//OK
        .json({
            success:true,
            message: `Update Class Successfully`,
            data:createLeave
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Update : ${error.message}`
            }
        })
    }
}

export const deleteClass = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { classId } = req.params

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const createLeave = await deleteClassService(classId)

        res.status(200)//OK
        .json({
            success:true,
            message: `Deleted Class Successfully`
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Create Class: ${error.message}`
            }
        })
    }
}

export const getTeacherClasses = async (req:Request, res:Response) =>{
    const token = req.headers.authorization
    const verify = verifyToken(token?.split(' ')[1] as string)
        if(!verify){
        res.status(401) // UNAUTHORAIZE
        .json({
            success:false,
            error:{
                message: 'Unauthorize: You have To Sign In'
            }
        })
        return;
    }

    const { teacherId } = req.params

    if(!teacherId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'class ID is Required!'
            }
        })
        return
    }


    try {
        // TODO:
        const createLeave = await ClassTeacher.findOne({teacherId})

        res.status(200)//OK
        .json({
            success:true,
            data: createLeave
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Create Class: ${error.message}`
            }
        })
    }
}



