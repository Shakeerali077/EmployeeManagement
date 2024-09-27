// import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
const Header = ({ fullName }) => {
    const navigate = useNavigate();


    const handleLogout = () => {
        // Remove the token and user info from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Reset fullName state
        // const user = ''
        // setFullName('');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <header className='header'>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/employee-list">Employee List</Link></li>
                    <li><Link to="/create-employee">Create Employee</Link></li>
                    <li>
                        {fullName ? <span>Welcome, {fullName}</span> : <span>Welcome!</span>}
                    </li>
                    <li><button className='btn-logout' onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
