// validate.js

// Utility function to validate required fields
export const validateRequiredFields = (fields, data) => {
    const missingFields = fields.filter(field => !data[field] || data[field].trim() === '');

    if (missingFields.length > 0) {
        return `Missing required fields: ${missingFields.join(', ')}`;
    }
    return null;
};

// Validate username (must be alphanumeric and between 3 and 15 characters)
export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {
        return 'Username must be 3-15 characters long and contain only letters and numbers.';
    }
    return null;
};

// Validate password (minimum 6 characters, at least one letter and one number)
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        return 'Password must be at least 6 characters long and contain at least one letter and one number.';
    }
    return null;
};

// Validate salary (must be a positive number)
export const validateSalary = (salary) => {
    if (isNaN(salary) || salary <= 0) {
        return 'Salary must be a positive number.';
    }
    return null;
};

// Function to validate employee data
export const validateEmployeeData = (employeeData) => {
    const { name, position, salary } = employeeData;

    if (!name || name.trim() === '') {
        return 'Employee name is required.';
    }

    if (!position || position.trim() === '') {
        return 'Employee position is required.';
    }

    const salaryError = validateSalary(salary);
    if (salaryError) {
        return salaryError;
    }

    return null;
};
