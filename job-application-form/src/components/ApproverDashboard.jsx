// src/components/ApproverDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ApproverDashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/application/approve');
                setApplications(res.data);
            } catch (error) {
                console.error('Error fetching applications for approval', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Applications to Approve</h2>
            {applications.map((app) => (
                <div key={app._id}>
                    <p>{app.details}</p>
                    <button>Approve</button>
                    <button>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default ApproverDashboard;
