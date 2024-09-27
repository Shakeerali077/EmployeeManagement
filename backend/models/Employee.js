import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: [String],
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
