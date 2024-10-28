// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../api/api';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'initiator' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="initiator">Initiator</option>
                <option value="reviewer">Reviewer</option>
                <option value="approver">Approver</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
