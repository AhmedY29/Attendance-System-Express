import { Request, Response } from "express";
import {
  getLeavesByUserId,
  getLeaveById,
  updateLeaveById,
  deleteLeaveService,
  getAllLeaveService,
  createLeaveService,
  acceptLeaveService,
  rejectLeaveService
} from "../services/leave.service";
import { verifyToken } from "../utils/generateToken";
import { BAD_REQUEST, NOT_FOUND, OK } from "../utils/http-status";

export const getAllLeaves = async (req: Request, res: Response) => {
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
    const leaves = await getAllLeaveService();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Error getting leaves", error: err });
  }
};

export const getUserLeaves = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const leaves = await getLeavesByUserId(userId);
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Error getting leaves", error: err });
  }
};

export const getSingleLeave = async (req: Request, res: Response): Promise<void> => {
  const { leaveId } = req.params;

  if(!leaveId){
    res.status(400).json({
      success: false,
      message: 'Leave Id is Required'
    });
    return;
  }

  try {
    const leave = await getLeaveById(leaveId);
    if (!leave) {
      res.status(404).json({ 
        success: false,
        message: "Leave not found" 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error getting leave", 
      error: err 
    });
  }
};

export const updateLeave = async (req: Request, res: Response): Promise<void> => {
  const { leaveId } = req.params;
  const updateData = req.body;

  try {
    const updatedLeave = await updateLeaveById(leaveId, updateData);
    if (!updatedLeave)
      res.status(404).json({ message: "Leave not found" }
    );

    res.json({ message: "Leave updated", leave: updatedLeave });
  } catch (err) {
    res.status(500).json({ message: "Error updating leave", error: err });
  }
};


export const deleteLeave = async (req: Request, res: Response): Promise<void> => {
  const { leaveId } = req.params;

  try {
    const deleted = await deleteLeaveService(leaveId);

    if (!deleted) {
       res.status(404).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting leave", error: err });
  }
};


export const createLeave = async (req:Request, res:Response) =>{
    console.log('ss')
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

    const { leaveType, leaveReason, classId } = req.body

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
            leaveReason,
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

export const acceptLeave = async (req: Request, res: Response) => {
  const { leaveId } = req.params;

  try {
    const leave = await acceptLeaveService(leaveId);

    if (!leave) {
       res.status(NOT_FOUND).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave accepted", leave });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const rejectLeave = async (req: Request, res: Response) => {
  const { leaveId } = req.params;

  try {
    const leave = await rejectLeaveService(leaveId);

    if (!leave) {
       res.status(NOT_FOUND).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave rejected", leave });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
