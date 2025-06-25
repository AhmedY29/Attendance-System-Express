import { createLeaveService, deleteLeaveService, getAllLeaveService } from '../services/leave.service';
import { verifyToken } from '../utils/generateToken';
import express, { Request, Response } from 'express';

export const getAllLeave = async (req:Request, res:Response) =>{
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
        const leavesData = await getAllLeaveService()

        res.status(200)//OK
        .json({
            success:true,
            data:leavesData
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Leave: ${error.message}`
            }
        })
    }
}

export const createLeave = async (req:Request, res:Response) =>{
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

    const { leaveType, leaveFile, classId } = req.body

    if(!leaveType){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Leave Type is Required!'
            }
        })
        return
    }

    if(!classId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: "You Don't have Class!"
            }
        })
        return
    }

    try {
        const data = {
            studentId: verify.userId,
            classId,
            leaveType,
            leaveFile,
            leavedAt: new Date
        }
        const createLeave = await createLeaveService(data)

        res.status(200)//OK
        .json({
            success:true,
            message: `Created Leave Successfully`
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Leave: ${error.message}`
            }
        })
    }
}

export const deleteLeave = async (req:Request, res:Response) =>{
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

    const { leaveId } = req.body

    if(!leaveId){
        res.status(400) //BAD_REQ
        .json({
            success: false,
            error:{
                message: 'Leave ID is Required!'
            }
        })
        return
    }

    try {
        // TODO:
        const deleteLeave = await deleteLeaveService(leaveId)

        res.status(200)//OK
        .json({
            success:true,
            message: `Created Leave Successfully`
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Get Leave: ${error.message}`
            }
        })
    }
}