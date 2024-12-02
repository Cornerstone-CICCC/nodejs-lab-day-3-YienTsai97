"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = require("../models/chat.model");
// Get all chats
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_model_1.Chat.find().sort({ createdAt: -1 }); // Sort by createdAt field
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching chats' });
    }
});
const getMessagesByRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedroom = req.params.room;
        const selectedchats = yield chat_model_1.Chat.find({ room: selectedroom });
        if (!selectedchats.length) {
            res.status(404).json({ error: "No chats found for the selected room" });
            return;
        }
        res.status(200).json(selectedchats);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            error: `Error fetching chats in individual
      room.`
        });
    }
});
exports.default = {
    getAllChats,
    getMessagesByRoom
};
