
import { OK, CREATED, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED, NOT_FOUND } from "../utils/http-status";
import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user.service";
import { AppError } from "../utils/error";
import { verifyToken } from "../utils/generateToken";
import { acceptLeaveService, createLeaveService, deleteLeaveService, getAllLeaveService, getLeaveByUserIdService, rejectLeaveService } from '../services/leave.service';

const createNewUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Name is required",
      });
    }

    if (!email) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Password is required",
      });
    }

    if (!role) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Role is required",
      });
    }

    const newUser = await UserService.createUser({ name, email, password, role });

    res.status(CREATED).json({
      status: "success",
      message: "User created successfully",
      data: newUser,  
    });
  } catch (error) {
    next(error);  
  }
};

// -------
const fetchAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if(!token){
      res.status(UNAUTHORIZED)
      .json({
        success:false,
        message:`UNAUTHORIZED`
      })
    }
    const tokenString = token?.split(" ")[1]

    const verify = verifyToken(tokenString as string)

    if(!verify){
            res.status(UNAUTHORIZED)
      .json({
        success:false,
        message:`UNAUTHORIZED`
      })
    }

  

    const users = await UserService.readUsers(verify.userId,verify.role);
    res.status(OK).json({ status: "success", data: users });
  } catch (error) {
    next(error);
  }
};

const fetchUserById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await UserService.readUser(userId);

    res.status(OK).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id || req.user.id;
    const { email, password, role } = req.body;

    const updatedUser = await UserService.updateUser(userId, { email, password, role });

    res.status(OK).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await UserService.deleteUser(req.user.id);

    res.cookie("accessToken", "none", { expires: new Date(Date.now() + 5 * 1000), httpOnly: true });
    res.cookie("refreshToken", "none", { expires: new Date(Date.now() + 5 * 1000), httpOnly: true });

    res.status(OK).json({ status: "success", message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
const signIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
   const token = await UserService.signInUser(req.body.email, req.body.password);
    const header = new Headers({Authorization: `Bearer ${token}`})
    res.setHeaders(header)
    
    res.status(OK).json({ status: "success", message: "Account deleted successfully" ,token });
  } catch (error) {
    next(error);
  }
};

const assignStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { studentId, classId } = req.body

  if(!studentId){
    res.status(BAD_REQUEST)
    .json({
      success: false,
      message: 'Student Id is Require'
    })
    return
  }

  if(!classId){
    res.status(BAD_REQUEST)
    .json({
      success: false,
      message: 'Class Id is Require'
    })
    return
  }
  try {
   const assignStudent = await UserService.assignStudentToClass(studentId, classId);
    
    res.status(CREATED).json({ success: true, message: "Assign Student successfully" ,assignStudent });
  } catch (error) {
    next(error);
  }
};

const assignTeacher = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { teacherId, classId } = req.body

  if(!teacherId){
    res.status(BAD_REQUEST)
    .json({
      success: false,
      message: 'Teacher Id is Require'
    })
    return
  }

  if(!classId){
    res.status(BAD_REQUEST)
    .json({
      success: false,
      message: 'Class Id is Require'
    })
    return
  }
  try {
   const assignTeacher = await UserService.assignTeacherToClass(teacherId, classId);
    
    res.status(CREATED).json({ success: true, message: "Assign Teacher successfully" ,assignTeacher });
  } catch (error) {
    next(error);
  }
};



 const getAllLeave = async (req:Request, res:Response) =>{
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

 const getUserLeaves = async (req:Request, res:Response)  => {
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

    const leaves = await getLeaveByUserIdService(verify.userId);

    res.json(leaves);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  modifyUser,
  removeUser,
  signIn,
  assignStudent,
  assignTeacher,
  getAllLeave,
  getUserLeaves,
};

