import { Request, Response } from 'express';
import { Chat } from '../models/chat.model';

// Get all chats
const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }); // Sort by createdAt field
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chats' });
  }
};

const getMessagesByRoom = async (req: Request<{ room: string }>, res: Response) => {
  try {
    const selectedroom = req.params.room
    const selectedchats = await Chat.find({ room: selectedroom })
    if (!selectedchats.length) {
      res.status(404).json({ error: "No chats found for the selected room" });
      return
    }
    res.status(200).json(selectedchats);
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: `Error fetching chats in individual
      room.`})
  }
}

export default {
  getAllChats,
  getMessagesByRoom
}