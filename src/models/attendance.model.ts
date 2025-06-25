import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  classId: mongoose.Types.ObjectId;
  attendeeId: mongoose.Types.ObjectId;
  attenderId: mongoose.Types.ObjectId;
  attendeeAt?: Date;
  status?:boolean
}

const attendanceSchema = new Schema<IAttendance>({
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
   },
  attendeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attenderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendeeAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
  },
}, { timestamps: true });

export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);
