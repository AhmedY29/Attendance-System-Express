import { Leave } from "../models/leave.model"



export const getAllLeaveService = async () => {

    const leaves = await Leave.find();

    return leaves
}



export const createLeaveService = async (data:any) => {

    const newLeave = new Leave({
        classId: data.classId,
        studentId: data.studentId,
        leaveType: data.leaveType,
        leaveReason: data.leaveReason,
        leavedAt: new Date
    })
    
    await newLeave.save()
    return 
}

export const deleteLeaveService = async (leaveId: any) => {

    const deleteLeave = await Leave.findByIdAndDelete(leaveId)
    
    return 
}