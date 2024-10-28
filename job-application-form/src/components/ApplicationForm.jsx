// src/components/ApplicationForm.jsx
import React, { useState } from 'react';
import api from '../api/api';

const ApplicationForm = () => {
    const [details, setDetails] = useState('');
    const [resume, setResume] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/application/submit', { details, resume });
            alert('Application submitted successfully');
            setDetails('');
            setResume('');
        } catch (error) {
            console.error('Error submitting application', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Application details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Resume link"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                required
            />
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
