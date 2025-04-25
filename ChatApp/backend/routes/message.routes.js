import express from "express";
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { getMessages, sendMessage, getUsersForSidebar } from "../controller/message.controller.js";

const router = express.Router();

router.get('/users',    protectedRoute, getUsersForSidebar);
router.get('/conversation/:id', protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;