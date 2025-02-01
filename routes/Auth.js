import Router from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { User} from '../models/User.js';

const router = Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is empty
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Create and save the user (password hashing is handled in the schema's pre-save hook)
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user: ' + error.message });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is empty
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password); // Compare the hashed password
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
        console.log(isMatch)
        // Generate a JWT token if credentials match
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        // Return success message along with the token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error during login: ' + error.message });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    // Implement token invalidation if needed
    res.json({ message: 'Logged out successfully' });
});



export default router;
