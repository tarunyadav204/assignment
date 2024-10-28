// src/components/ReviewerDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ReviewerDashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/application/review');
                setApplications(res.data);
            } catch (error) {
                console.error('Error fetching applications for review', error);
            }
        };

        fetchApplications();
    }, []);

    const handleReview = async (appId, decision, remarks) => {
        try {
            await api.post('/application/review', { appId, decision, remarks });
            setApplications(applications.filter((app) => app._id !== appId));
        } catch (error) {
            console.error('Error reviewing application', error);
        }
    };

    return (
        <div>
            <h2>Applications to Review</h2>
            {applications.map((app) => (
                <div key={app._id}>
                    <p>{app.details}</p>
                    <textarea placeholder="Remarks" id={`remarks-${app._id}`} />
                    <button onClick={() => handleReview(app._id, 'approved', document.getElementById(`remarks-${app._id}`).value)}>
                        Approve
                    </button>
                    <button onClick={() => handleReview(app._id, 'rejected', document.getElementById(`remarks-${app._id}`).value)}>
                        Reject
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ReviewerDashboard;
