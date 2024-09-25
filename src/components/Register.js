import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (userData.username && userData.email && userData.password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/login'); 
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div>
            <div className="card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-x'> 
                        <label htmlFor="username">Enter Username:</label>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    </div>
                    
                    <div className='input-x'>
                        <label htmlFor="email">Enter Your Email:</label>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>
                    
                    <div className='input-x'>
                        <label htmlFor="password">Enter Password:</label>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    
                    <button type="submit">Register</button>
                </form>
                <Link to="/login">Already have an account? Login here</Link> 
            </div>
        </div>
    );
};

export default Register;
