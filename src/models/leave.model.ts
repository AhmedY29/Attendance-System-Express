import mongoose, { Document, Schema } from 'mongoose';

export interface ILeave extends Document {
  classId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  leavedAt: Date;
  leaveType: 'sick' | 'personal' | 'other';
  leaveReason: string,
  status: string,
  acceptedBy?: mongoose.Types.ObjectId;
  acceptedAt?: Date;
  rejectedBy?: mongoose.Types.ObjectId;
  rejectedAt?: Date;
}

const leaveSchema = new Schema<ILeave>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  leavedAt: { type: Date, required: true },
  leaveType: { type: String, enum: ['sick', 'personal', 'other'], required: true },
  leaveReason: { type: String, required: true },
  acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  acceptedAt: Date,
  rejectedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  rejectedAt: Date,
  status: { type: String, default:'Pending'},
}, { timestamps: true });

export const Leave = mongoose.model<ILeave>('Leave', leaveSchema);
