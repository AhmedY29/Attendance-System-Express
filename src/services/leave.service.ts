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

export const getLeavesByUserId = async (userId: string) => {
  return await Leave.find({ userId });
};

export const getLeaveById = async (leaveId: string) => {
  return await Leave.findById(leaveId);
};

export const updateLeaveById = async (leaveId: string, data: any) => {
  return await Leave.findByIdAndUpdate(leaveId, data, {
    new: true,
    runValidators: true,
  });
};

export const getLeaveByUserIdService = async (userId: string) => {
  const leaves = await Leave.find({ userId });
  return leaves;
};

export const acceptLeaveService = async (leaveId: string) => {
  const updatedLeave = await Leave.findByIdAndUpdate(
    leaveId,
    { status: "accepted" },
    { new: true }
  );

  return updatedLeave;
};

export const rejectLeaveService = async (leaveId: string) => {
  const updatedLeave = await Leave.findByIdAndUpdate(
    leaveId,
    { status: "rejected" },
    { new: true }
  );

  return updatedLeave;
};

export const deleteLeaveService = async (leaveId: any) => {

    const deleteLeave = await Leave.findByIdAndDelete(leaveId)
    
    return deleteLeave
}