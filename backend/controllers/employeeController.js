import Employee from '../models/Employee.js';
import path from 'path';
import fs from 'fs/promises';
import mongoose from 'mongoose';
// Helper function to generate unique ID
const generateUniqueId = async () => {
    // Get the last employee sorted by uniqueId in descending order
    const lastEmployee = await Employee.findOne().sort({ uniqueId: -1 });
    console.log('Last Employee:', lastEmployee); // Log the last employee

    // Check if lastEmployee exists and has a uniqueId
    const lastId = lastEmployee && lastEmployee.uniqueId ? parseInt(lastEmployee.uniqueId, 10) : 0;
    console.log('Last Unique ID:', lastId); // Log the last unique ID

    // Increment to get new uniqueId
    const newId = lastId + 1;
    return String(newId).padStart(3, '0'); // Format ID as 001, 002, etc.
};

// Create Employee
export const createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const uniqueId = await generateUniqueId();
        const employee = new Employee({ uniqueId, name, email, mobile, designation, gender, course, image });
        await employee.save();
        res.status(201).json({ message: 'Employee created', employee });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating employee' });
    }
};


// Get All Employees
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// Get Employee by ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee' });
    }
};

// Update Employee
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    const newImage = req.file ? req.file.path : null;

    try {
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        // Update fields only if provided
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobile = mobile || employee.mobile;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;

        // If a new image is uploaded, delete the old one
        if (newImage) {
            if (employee.image) {
                const oldImagePath = path.resolve(employee.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Delete old image
                    console.log('Old image deleted:', oldImagePath);
                }
            }
            employee.image = newImage; // Set the new image path
        }

        // Save the updated employee
        await employee.save();
        res.json({ message: 'Employee updated', employee });
    } catch (error) {
        console.error('Error updating employee:', error.message); // Log detailed error
        res.status(500).json({ message: `Error updating employee: ${error.message}` });
    }
};



export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    console.log('Deleting employee with ID:', id); // Log the employee ID

    // Validate if `id` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        console.log('Employee details:', employee); // Log employee details

        // Check if the image exists before trying to delete it
        if (employee.image) {
            console.log('Attempting to delete image file:', employee.image);

            try {
                // Construct the full image path, assuming `employee.image` is a relative path
                const imagePath = path.resolve(employee.image);

                // Check if the image file exists and then delete it
                try {
                    await fs.access(imagePath); // Check if file exists
                    await fs.unlink(imagePath); // Delete the file
                    console.log('Image file deleted successfully');
                } catch (fsError) {
                    console.error('Image file does not exist or error deleting it:', fsError);
                }
            } catch (fsError) {
                console.error('Error during file operation:', fsError);
            }
        } else {
            console.log('No image file associated with this employee');
        }

        await employee.deleteOne(); // Delete the employee
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error); // Log detailed error
        res.status(500).json({ message: 'Internal server error' });
    }
};