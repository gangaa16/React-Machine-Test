import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === credentials.username && user.password === credentials.password);
        
        if (user) {
            navigate('/users'); 
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <div className='card'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-x">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-x">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link to="/">Don't have an account? Register here</Link>
            </div>
        </div>
    );
};

export default Login;
