import Router from 'express';
import GetInTouch from '../models/GetInTouch.js'; // Import the schema

const router = Router();

// Get in Touch route
router.post('/get-in-touch', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate the input fields
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        // Save the message to the database
        const inquiry = new GetInTouch({ name, email, message });
        await inquiry.save();

        res.status(201).json({ message: 'Thank you for getting in touch! We will respond shortly.' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting the inquiry: ' + error.message });
    }
});

export default router;
