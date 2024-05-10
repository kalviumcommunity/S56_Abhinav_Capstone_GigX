const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,

        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    skillsRequired: [{
        type: String,
        required: true
    }],
    referenceDocument: {
        type: String
    },
    budget: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user-colls',
        default: null
    }
}, { versionKey: false });

const projectModel = mongoose.model('project-colls', projectSchema);

module.exports = {
    projectModel
};
