import { Router } from 'express';


const router = Router();


// Just Add Controller

// /classes/:id Get All Classes
router.get('/',  )

// /classes/:id Get Class
router.get('/:id',  )

// /classes/:id/teacher Get Teacher For Specific Class
router.get('/:id/teacher',  )

// /classes/:id/students Get All Students For Specific Class
router.get('/:id/students',  )


// /classes/:id/attendance Get attendance For Specific Class
router.get('/:id/attendance',  )

// /classes/create For Add New Class By Admin
router.post('/create', )






export default router