import express from 'express';
import { sendMessage, viewChat } from '../Controller/chat-controller.js'

const router = express.Router();

router.get('/getMsgs/:id', viewChat);
router.post('/sendMessage/:id', sendMessage);

export default router;