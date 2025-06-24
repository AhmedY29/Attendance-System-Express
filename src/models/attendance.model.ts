import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  classId: mongoose.Types.ObjectId;
  attendeeId: mongoose.Types.ObjectId;
  attenderId: mongoose.Types.ObjectId;
  attendeeAt?: Date;
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
}, { timestamps: true });

export default mongoose.model<IAttendance>('Attendance', attendanceSchema);
