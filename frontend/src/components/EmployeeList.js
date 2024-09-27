import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../defaultProfile/profile.svg';
import './EmployeeList.css'


// Assuming you store the token in localStorage
const token = localStorage.getItem('authToken');

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                alert('Error fetching employee data');
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                console.log('Deleting employee with id:', id); // Log the ID to verify it
                await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setEmployees(employees.filter(employee => employee._id !== id)); // Use the correct employee ID to filter
                alert('Employee deleted successfully');
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Error deleting employee');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/employee-edit/${id}`);
    };

    // const generateUniqueId = (index) => {
    //     return String(index + 1).padStart(3, '0');
    // };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='container-el'>

            <div className='screen-el'>
                <h2>Employee List</h2>
                <input className='input-el'
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className='table-el'>

                    <table>
                        <thead>
                            <tr>
                                <th>Unique Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, index) => (
                                <tr key={employee.uniqueId}>
                                    {/* <td>{generateUniqueId(index)}</td> */}
                                    <td>{employee.uniqueId}</td>


                                    <td>
                                        <img
                                            src={employee.image ? `http://localhost:5000/${employee.image}` : defaultProfile}
                                            alt="Profile"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.course.join(', ')}</td>
                                    <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                                    <td className='action-td'>
                                        <button className='btn-edit' onClick={() => handleEdit(employee._id)}>Edit</button>
                                        <button className='btn-delete' onClick={() => handleDelete(employee._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
