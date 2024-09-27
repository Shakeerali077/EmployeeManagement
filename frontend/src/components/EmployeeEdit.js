import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeEdit.css';

const EmployeeEdit = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [employee, setEmployee] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setEmployee(response.data);
            } catch (error) {
                alert('Error fetching employee data');
            }
        };

        fetchEmployee();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to include the image and employee details
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        formData.append('course', employee.course);
        // Only append the image if one is selected
        if (employee.image && typeof employee.image !== 'string') {
            formData.append('image', employee.image);
        }

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee updated successfully');
            history('/employee-list'); // Navigate back to employee list on success
        } catch (error) {
            if (error.response) {
                // Server-side error (response status is not 2xx)
                console.error('Error updating employee:', error.response.data.message);
                alert(`Error updating employee: ${error.response.data.message}`);
            } else if (error.request) {
                // No response from the server
                console.error('Error updating employee: No response from server');
                alert('Error updating employee: No response from server');
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                alert(`Error updating employee: ${error.message}`);
            }
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className='container-eEdit'>

            <div className='screen-eEdit'>
                <h2>Edit Employee</h2>
                <form className='form-edit' onSubmit={handleSubmit}>


                    <div className='label-group'>

                        <div className="form-group">

                            <label htmlFor='name'>
                                Name:
                            </label>
                            <input className='input-edit'
                                id='name'
                                type="text"
                                value={employee.name}
                                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='emmail'>
                                Email:
                            </label>
                            <input className='input-edit'
                                type="email"
                                value={employee.email}
                                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className='label-group'>
                        <div className="form-group">
                            <label htmlFor='contactNo'>
                                Mobile No:
                            </label>
                            <input className='input-edit'
                                id='ontactNo'
                                type="text"
                                value={employee.mobile}
                                onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Image Upload:
                                <input className='input-edit'
                                    type="file"
                                    accept=".jpg,.png"
                                    onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='label-group'>
                        <div className="form-group">

                            <label>
                                Gender:
                                <input className='m1'
                                    type="radio"
                                    value="Male"
                                    checked={employee.gender === 'Male'}
                                    onChange={() => setEmployee({ ...employee, gender: 'Male' })}
                                /> Male
                                <input className='m1'
                                    type="radio"
                                    value="Female"
                                    checked={employee.gender === 'Female'}
                                    onChange={() => setEmployee({ ...employee, gender: 'Female' })}
                                /> Female
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Course:
                                <input className='m1'
                                    type="checkbox"
                                    value="MCA"
                                    checked={employee.course.includes('MCA')}
                                    onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setEmployee((prev) => ({
                                            ...prev,
                                            course: checked
                                                ? [...prev.course, value]
                                                : prev.course.filter((c) => c !== value),
                                        }));
                                    }}
                                /> MCA
                                <input className='m1'
                                    type="checkbox"
                                    value="BCA"
                                    checked={employee.course.includes('BCA')}
                                    onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setEmployee((prev) => ({
                                            ...prev,
                                            course: checked
                                                ? [...prev.course, value]
                                                : prev.course.filter((c) => c !== value),
                                        }));
                                    }}
                                /> BCA
                                <input className='m1'
                                    type="checkbox"
                                    value="BSC"
                                    checked={employee.course.includes('BSC')}
                                    onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setEmployee((prev) => ({
                                            ...prev,
                                            course: checked
                                                ? [...prev.course, value]
                                                : prev.course.filter((c) => c !== value),
                                        }));
                                    }}
                                /> BSC
                            </label>

                        </div>
                    </div>

                    <label>
                        Designation:
                        <select className=' Designation'
                            value={employee.designation}
                            onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                            required
                        >
                            <option value="">Select</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </label>
                    <button className='update-btn' type="submit">Update</button>

                </form>
            </div>
        </div>
    );
};

export default EmployeeEdit;
