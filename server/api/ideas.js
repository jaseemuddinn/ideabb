import express from 'express';
import { connectDB } from '../db.js';
import IdeaBoard from '../models/IdeaBoard.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await connectDB();
        const idea = new IdeaBoard(req.body);
        await idea.save();
        console.log('idea created:', idea);
        res.status(201).json({ success: true, data: idea });
    } catch (error) {
        console.error('Error creating idea:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        await connectDB();
        const ideas = await IdeaBoard.find();
        console.log('ideas retrieved:', ideas);
        res.status(200).json({ success: true, data: ideas });
    } catch (error) {
        console.error('Error retrieving ideas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.patch('/:id/upvote', async (req, res) => {
    console.log('Upvote request received for ID:', req.params.id);
    try {
        await connectDB();
        const idea = await IdeaBoard.findById(req.params.id);
        if (!idea) {
            return res.status(404).json({ success: false, error: 'Idea not found' });
        }
        idea.upvotes = (idea.upvotes || 0) + 1;
        await idea.save();
        console.log('idea upvoted:', idea);
        res.status(200).json({ success: true, data: idea });
    } catch (error) {
        console.error('Error upvoting idea:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.patch('/:id/downvote', async (req, res) => {
    console.log('Downvote request received for ID:', req.params.id);
    try {
        await connectDB();
        const idea = await IdeaBoard.findById(req.params.id);
        if (!idea) {
            return res.status(404).json({ success: false, error: 'Idea not found' });
        }
        idea.downvotes = (idea.downvotes || 0) + 1;
        await idea.save();
        console.log('idea downvoted:', idea);
        res.status(200).json({ success: true, data: idea });
    } catch (error) {
        console.error('Error downvoting idea:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;