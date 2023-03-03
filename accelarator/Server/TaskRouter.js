const express = require('express');
const Task = require('./TaskModel.js');
const taskRouter = express.Router();
taskRouter.use(express.json());


taskRouter.post('/createtask', async (req, res) => {

    let task = new Task();
    if (req.body.taskId) {
        task.taskTitle = req.body.taskTitle;
        task.taskId = req.body.taskId;
        task.status = req.body.status;
        task.creationDate = req.body.creationDate;
        task.assignedTo = req.body.assignedTo;
        const doc = await task.save();
        console.log(doc);
        res.json(doc);

    } else {
        res.status(400).send("Invalid Input")
    }
})

taskRouter.get('/getalltask', async (req, res) => {
    // let task = new Task();

    // const docs = await task.find({});
    // const docs = await task.find({});
    // Task.find()
    const query = await Task.find();

    // console.log('doc is:', query);
    res.json(query)


})

taskRouter.delete('/task', async (req, res) => {
    let task = new Task();

    // const docs = await task.find({});
    // const docs = await task.find({});
    const docs = await task.deleteOne({ taskId: " 11" });

    console.log('delete doc is:', docs);
    res.json(docs)


})

taskRouter.put('/updatestatus', async (req, res) => {
    const id = req.body.id;

    // const update ={status: req.body.status} ;
    const newData = req.body.updatedData;
    const options = { new: true };
    console.log(" id is:", id);
    console.log(" status is:", newData);

    Task.findByIdAndUpdate(id, newData, options, (err, doc) => {

        if (err) {
            console.log('Error updating document:', err);
            res.status(400).send("Something went wrong");
        } else {
            console.log('Updated document:', doc);
        }
        res.send(doc);
    });

})




module.exports = taskRouter;