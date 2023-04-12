const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    projectName: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    client: { type: String, require: true },
    domain: { type: String, require: true },
    assignTo: { type: String, require: true },
    
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;