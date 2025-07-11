import express, { Express, Request, Response, NextFunction } from 'express';
import logger from './utils/logger';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/user.route'
import classesRoutes from './routes/classes.route'
// import usersRoutes from './routes/users.routes';
import leaveRoutes from './routes/leave.route'
import attendanceRoutes from './routes/attendance.route'
// import leaveRoutes from './routes/leave.route'

const app: Express = express();
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(cors());
app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', authRoutes);
app.use('/classes', classesRoutes);
app.use('/leave', leaveRoutes);
app.use('/attendance', attendanceRoutes);

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err.message);
  res
    .status(500) //INTERNAL_SERVER_ERROR
    .json({
      success: false,
      message: `Something went wrong! ${err.message}`,
      error: process.env.NODE_ENV == 'development' ? err.message : undefined
    });
});

app.get('/', (req: Request, res: Response) =>{
    res.status(200) //OK
    .json({
        success:true,
        message:'Welcome to Attendance System',
    })
})

app.listen(process.env.PORT, () => {
    logger.info(`Server Listen at Port ${process.env.PORT}`)
    connectDB()
})

