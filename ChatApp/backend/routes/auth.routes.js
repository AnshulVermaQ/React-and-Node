import express from 'express';
import { signup,login,logout, updateProfile,checkAuth } from '../controller/auth.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/update",protectedRoute,updateProfile);
  

router.get("/check",protectedRoute,checkAuth);

export default router; 