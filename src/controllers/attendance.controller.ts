import { updateAttendStatusService } from "../services/attendance.service"
import { verifyToken } from "../utils/generateToken"
import { Request, Response } from "express"




// Attend Student Per Day 

/// /class/:id/attend/:userId
// Put


export const attendStudent = async (req:Request, res:Response) =>{
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

    const {classId} = req.params
    const {status} = req.body


    try {
        // TODO:

        const updateAttendStatue = await updateAttendStatusService(classId, Boolean(status))
        res.status(200)//OK
        .json({
            success:true,
            message: `Attend Status Updated`,
            data: updateAttendStatue
        })
    } catch (error: any) {
        res.status(400) //BAD_REQ
        .json({
            success:false,
            error:{
                message:`Error in Update Attend: ${error.message}`
            }
        })
    }
}
