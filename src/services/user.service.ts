import { User } from '../models/user.model';  
import { BAD_REQUEST, UNAUTHORIZED } from '../utils/http-status';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken';
import { ClassTeacher } from '../models/classTeacher.model';
import { ClassStudent } from '../models/classStudent.model';
import { AppError } from '../utils/error';
import { Class } from '../models/class.model';

interface CreateUserInput {
  name:string;
  email: string;
  password: string;
  role: 'admin' | 'principal' | 'teacher' | 'student';
}

interface CreateUserResponse {
  id: string;
  name:string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const createUser = async (
  userData: CreateUserInput
): Promise<CreateUserResponse> => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', BAD_REQUEST);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,  
    role,
  });

  const savedUser = await newUser.save();

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const readUsers = async (userId: string, role: string): Promise<any> => {
  const users = await User.find();
  if(role == 'admin'){
    const users = await User.find();
    return users
  }else if(role == 'principal'){
    
    const users = await User.find({ role: { $in: ["teacher", "student"] } });
    return users
  }else if(role == 'teacher'){
    
    const teachingRelations = await ClassTeacher.find({ teacherId: userId });
    const classIds = teachingRelations.map((rel:any) => rel.classId);

    const studentRelations = await ClassStudent.find({
          classId: { $in: classIds }
        }).populate("studentId");
        const students = studentRelations.map((sr: any) => sr.studentId);
    console.log(students)
    return students
  } else if(role == 'student'){
    const classStudents = await ClassStudent.find({ studentId: userId })
    const users = await classStudents.map((cs:any) => cs.classId);
    return users
  }
  return users.map((user:any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

const readUser = async (userId: string): Promise<CreateUserResponse> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const updateUser = async (
  userId: string,
  updateData: Partial<CreateUserInput>
): Promise<CreateUserResponse> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }

  if (updateData.email) user.email = updateData.email;
  if (updateData.password) user.password = await bcrypt.hash(updateData.password, 10);
  if (updateData.role) user.role = updateData.role;

  const updatedUser = await user.save();

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const deleteUser = async (userId: string): Promise<void> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }
  
  await User.deleteOne({ _id: userId });  
};

const signInUser = async (email: string, password: string): Promise<any> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }

  const comparePassword = await bcrypt.compare(password, user.password)

  if(!comparePassword){
    throw new AppError('Password not Match', UNAUTHORIZED);
  }

  const token = generateToken(user?._id as string, user.email , user?.role)
  return token
};

const assignStudentToClass = async (studentId: string, classId: string): Promise<any> => {
  
  const user = await User.findById(studentId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'student') {
    throw new AppError('this User Not Principal ', 400);
  }

  const studentAlreadyExist = await ClassStudent.findOne({studentId:studentId, classId:classId})
  if(studentAlreadyExist){
    throw new AppError('This Student Already in Class', BAD_REQUEST);
  }
  const addNewStudentToClass = new ClassStudent({
    classId,
    studentId
  })
 await addNewStudentToClass.save()
 return addNewStudentToClass
};

const assignTeacherToClass = async (teacherId: string, classId: string): Promise<any> => {

  const user = await User.findById(teacherId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'teacher') {
    throw new AppError('this User Not Teacher ', 400);
  }

  const teacherExist = await ClassTeacher.findOne({ teacherId: teacherId, classId: classId})

  if(teacherExist){

   throw new AppError('This Teacher Already in Class', BAD_REQUEST);

  }
  const addNewTeacherToClass = new ClassTeacher({
    classId,
    teacherId
  })
 await addNewTeacherToClass.save()
 return addNewTeacherToClass
};

const assignPrincipalToClass = async (principalId: string, classId: string): Promise<any> => {

  const user = await User.findById(principalId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'principal') {
    throw new AppError('this User Not Principal ', 400);
  }
  const teacherExist = await ClassTeacher.findOne({ teacherId: principalId, classId: classId})

  if(teacherExist){

   throw new AppError('This Principal Already in Class', BAD_REQUEST);

  }
  const addNewTeacherToClass = new ClassTeacher({
    classId,
    teacherId:principalId
  })
 await addNewTeacherToClass.save()
 return addNewTeacherToClass
};

const deleteStudentFromClass = async (studentId: string, classId: string): Promise<any> => {

  const user = await User.findById(studentId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'student') {
    throw new AppError('this User Not Student ', 400);
  }

  const studentAlreadyExist = await ClassStudent.findByIdAndDelete({studentId:studentId, classId:classId})
  if(!studentAlreadyExist){
    throw new AppError('Student is Not in Class', BAD_REQUEST);
  }

  return studentAlreadyExist
};

const deleteTeacherFromClass = async (teacherId: string, classId: string): Promise<any> => {

    const user = await User.findById(teacherId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'teacher') {
    throw new AppError('this User Not Teacher ', 400);
  }

  const teacherExist = await ClassTeacher.findByIdAndDelete({ teacherId: teacherId, classId: classId})

  if(!teacherExist){

   throw new AppError('Teacher is Not in this Class', BAD_REQUEST);

  }
  
  return teacherExist
};

const deletePrincipalFromClass = async (principalId: string, classId: string): Promise<any> => {

  const user = await User.findById(principalId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user?.role != 'principal') {
    throw new AppError('this User Not Principal ', 400);
  }
  const principalExist = await ClassTeacher.findByIdAndDelete({ teacherId: principalId, classId: classId})

  if(!principalExist){

   throw new AppError('Principal is not in Class', BAD_REQUEST);

  }
  return principalExist
};


export { createUser, readUsers, readUser, updateUser, deleteUser, signInUser,
assignStudentToClass, assignTeacherToClass, assignPrincipalToClass, deleteStudentFromClass,
deleteTeacherFromClass,
deletePrincipalFromClass, };

