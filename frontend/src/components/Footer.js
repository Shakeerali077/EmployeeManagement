import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={footerContainer}>
                <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                <nav>
                    <a href="/privacy" style={linkStyle}>Privacy Policy</a> |
                    <a href="/terms" style={linkStyle}>Terms of Service</a> |
                    <a href="/contact" style={linkStyle}>Contact Us</a>
                </nav>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#2D2D2D',
    color: '#F1F1F1',
    padding: '20px',
    textAlign: 'center',
    // position: 'fixed',
    bottom: '0',
    width: '100%',
};

const footerContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const linkStyle = {
    color: '#00A3FF',
    margin: '0 10px',
    textDecoration: 'none',
};

export default Footer;
