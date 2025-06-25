import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/error';  // استيراد فئة AppError لإدارة الأخطاء
import { User } from '../models/user.model';  // استيراد نموذج المستخدم
import { jwtConfig } from '../config/jwt';  // استيراد إعدادات JWT من ملف config
import { FORBIDDEN, UNAUTHORIZED } from '../utils/http-status';  // استيراد أكواد الحالة (HTTP Status Codes)

// تعريف واجهة لـ Request تتضمن خاصية `user` التي سيتم ملؤها بعد التحقق من التوكن
export interface AuthRequest extends Request {
  user?: any;  // هذا الحقل سيتم ملؤه في الميدلوير بعد التحقق من التوكن
}

// ميدلوير للتحقق من التوثيق (JWT)
export const authorized = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) استخراج التوكن من رأس الطلب أو من الكوكيز
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    // إذا كان التوكن موجودًا في رأس Authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];  // استخراج التوكن من رأس الطلب
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;  // التحقق من الكوكيز
    }

    // إذا لم يكن هناك توكن
    if (!token) {
      return next(new AppError('You are not logged in', UNAUTHORIZED));  // إرجاع خطأ 401
    }

    // 2) التحقق من صلاحية التوكن باستخدام `jwt.verify`
    const decoded = jwt.verify(token, jwtConfig.secret) as {  
      user: {
        id: string;
        role: string;
      };
      type: string;  // تأكد من أن نوع التوكن هو "access"
    };

    // التحقق من نوع التوكن
    if (decoded.type !== 'access') {
      return next(new AppError('Invalid token type', UNAUTHORIZED));  // إذا كان التوكن غير صالح
    }

    // 3) التحقق من أن المستخدم لا يزال موجودًا في قاعدة البيانات
    const user = await User.findById(decoded.user.id);  // استرجاع المستخدم باستخدام ID من التوكن
    if (!user) {
      return next(new AppError('User no longer exists', UNAUTHORIZED));  // إذا كان المستخدم غير موجود في قاعدة البيانات
    }

    req.user = user;  // إضافة بيانات المستخدم إلى الـ request
    next();  // الانتقال إلى الميدلوير التالي
  } catch (error) {
    // التعامل مع الأخطاء في التوكن
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token has expired', UNAUTHORIZED));  // إذا انتهت صلاحية التوكن
    } else {
      next(new AppError('Invalid token', UNAUTHORIZED));  // إذا كان التوكن غير صالح
    }
  }
};

// ميدلوير للتحقق من الأدوار (role-based authorization)
export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // التحقق مما إذا كان دور المستخدم يتوافق مع الأدوار المسموح بها
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', FORBIDDEN)  // إذا كان الدور غير مسموح به
      );
    }
    next();  // إذا كان الدور مسموحًا به، ننتقل إلى الميدلوير التالي أو المسار
  };
};
