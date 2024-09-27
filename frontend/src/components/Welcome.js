import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="screen" id="start-screen">
                <div className="screen-content">
                    <h1>Welcome to Employee Management System</h1>
                    <p>Your gateway to tech innovation.</p>
                    <button className='btn' onClick={() => navigate('/login')}>Get Started</button> {/* Redirect to login */}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
