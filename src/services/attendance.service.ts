import { Attendance } from "../models/attendance.model";



export const updateAttendStatusService = async (classId:string, status: any) => {
    const updateAttendStatus = await Attendance.findByIdAndUpdate(classId, status)
    return updateAttendStatus   
}
