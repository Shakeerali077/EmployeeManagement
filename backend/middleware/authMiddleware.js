// authMidillewere.js
// import dotenv from 'dotenv';
// dotenv.config();
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
export default authMiddleware;
