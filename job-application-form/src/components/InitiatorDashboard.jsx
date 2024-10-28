// src/components/InitiatorDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InitiatorDashboard() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/applications', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(response.data);
        };
        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Your Applications</h2>
            {applications.map((app) => (
                <div key={app._id}>
                    <p>{app.jobPosition}</p>
                    <p>Status: {app.status}</p>
                    <p>Remarks: {app.remarks.map((remark, i) => <span key={i}>{remark.comment}</span>)}</p>
                </div>
            ))}
        </div>
    );
}

export default InitiatorDashboard;
