// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; // Adjusted path based on your directory
import Register from './Register'; // Same here
import InitiatorDashboard from '../components/InitiatorDashboard';
import ReviewerDashboard from '../components/ReviewerDashboard';
import ApproverDashboard from '../components/ApproverDashboard';
import ApplicationForm from '../components/ApplicationForm';

function App() {
    const [role, setRole] = useState(null);

    return (
        <Routes>
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/initiator" element={role === 'initiator' ? <InitiatorDashboard /> : <Navigate to="/login" />} />
            <Route path="/reviewer" element={role === 'reviewer' ? <ReviewerDashboard /> : <Navigate to="/login" />} />
            <Route path="/approver" element={role === 'approver' ? <ApproverDashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
