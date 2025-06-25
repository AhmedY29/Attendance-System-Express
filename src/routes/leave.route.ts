import { Router } from "express";
import {
  getAllLeaves,
  getUserLeaves,
  updateLeave,
  deleteLeave,
  createLeave,
  acceptLeave,
  rejectLeave,
  getSingleLeave,
} from "../controllers/leave.controller";

const router = Router();


console.log('rrr')
// Admin Routes
router.get("/", getAllLeaves); 

// User-specific Routes
router.get("/:userId/leaves", getUserLeaves); 
router.post("/:userId/leaves", createLeave);

// Leave-specific Routes
router.get("/:userId/leaves/:leaveId", getSingleLeave); 
router.put("/:userId/leaves/:leaveId", updateLeave); 
router.delete("/:userId/leaves/:leaveId", deleteLeave); 

// Leave Status Management
router.patch("/:userId/leaves/:leaveId/accept", acceptLeave);
router.patch("/:userId/leaves/:leaveId/reject", rejectLeave); 

export default router;