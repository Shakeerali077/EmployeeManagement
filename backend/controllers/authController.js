import { generateToken } from '../utils/authUtils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Register
export const register = async (req, res) => {
    const { fullName, email, username, password } = req.body;  // Extract fullName and email

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fullName, email, username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login function
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = generateToken(user);  // Assuming generateToken creates and returns a JWT
        // Send back user info and token
        // console.log(token);
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                // uniqueId: user.uniqueId,
                username: user.username,
                fullName: user.fullName,
            },
            token,  // Send the generated JWT token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in. Please try again later.' });
    }
};