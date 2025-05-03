import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menubar.css'; // Assuming you have a CSS file for styling
const Menubar = () => {
    return (
        <div className='menubar'>
            <header>
                <h4>BUYWITHUS API</h4>
                <div className="profile">
                    <img src="data:image/jpeg;base64,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" alt="Profile" className="profile-pic" />
                    <div className="profile-info">
                        <h4>Agaesh Kumar</h4>
                        <p>Web Developer</p>
                        <a>Githbub</a>
                    </div>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
     
    );
};

export default Menubar;