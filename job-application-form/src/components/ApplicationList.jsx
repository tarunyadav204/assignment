// src/components/ApplicationList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/application');
                setApplications(res.data);
            } catch (error) {
                console.error('Error fetching applications', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Your Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app._id}>
                        <p>Details: {app.details}</p>
                        <p>Status: {app.status}</p>
                        <p>Remarks: {app.remarks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationList;
