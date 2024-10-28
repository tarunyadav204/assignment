// controllers/applicationController.js
const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
    try {
        const application = new Application({
            initiatorId: req.user.id,
            details: req.body.details,
            resume: req.body.resume
        });
        await application.save();
        res.status(200).json({ msg: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error submitting application', error });
    }
};

exports.reviewApplication = async (req, res) => {
    const { applicationId, decision, comment } = req.body;
    try {
        const application = await Application.findById(applicationId);
        if (!application) return res.status(404).json({ msg: 'Application not found' });

        if (req.user.role === 'approver' && application.currentReviewer === 4) {
            application.status = decision === 'approve' ? 'approved' : 'rejected';
        } else if (req.user.role === 'reviewer' && application.currentReviewer < 4) {
            if (decision === 'approve') {
                application.currentReviewer += 1;
            } else {
                application.status = 'rejected';
            }
        } else {
            return res.status(403).json({ msg: 'Not authorized to review' });
        }

        application.remarks.push({ reviewerId: req.user.id, comment });
        await application.save();
        res.json({ msg: 'Application reviewed successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error reviewing application', error });
    }
};
