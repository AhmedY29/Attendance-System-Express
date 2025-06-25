// routes/ User.routes.ts
import { Router } from 'express';


const router = Router();


router.route('/')
// For Add New User From Admin
.post()
// For Read All users
.get() 


export default router



// /routes/user.routes.ts
// import express from 'express';
// import * as userController from '../controllers/user.controller';

// const router = express.Router();

// router.post('/login', userController.login);  

// export default router;
