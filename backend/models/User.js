// User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },   // Full Name field
    email: { type: String, required: true, unique: true },  // Email field
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model('User', UserSchema);

export default User;