const express = require('express');
const Project = require('./ProjectModel.js')
const projectRouter = express.Router();
projectRouter.use(express.json());


projectRouter.post('/create/project', async (req, res) => {

    let project = new Project();

    if (req.body.projectName) {
        project.projectName = req.body.projectName;
        project.firstName = req.body.firstName;
        project.lastName = req.body.lastName;
        project.client = req.body.client;
        project.domain = req.body.domain;
        project.assignTo = req.body.assignTo;


        const doc = await project.save();
        console.log(doc);
        res.json(doc);
    }
    else {
        res.status(400).send("Invalid Input")
    }

});
projectRouter.get('/allprojects', async (req, res) => {
    const query = await Project.find();

    console.log('doc is:', query);
    res.json(query)
})



module.exports = projectRouter;