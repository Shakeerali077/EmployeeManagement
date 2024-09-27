// utils / authUtils.js
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        // uniqueId: user.uniqueId,
        username: user.username,
    };

    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '24h' };  // Token expires in 1 hour

    return jwt.sign(payload, secret, options);
};