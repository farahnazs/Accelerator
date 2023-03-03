import React, { useState } from 'react';

const CreateTask = () => {



    const [formData, setFormData] = useState({
        taskTitle: ' ',
        taskId: ' ',
        status: ' ',
        creationDate: ' ',
        assignedTo: ' ',

    })


    const handleChange = (e) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/createtask', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }



    return (
        <form onSubmit={handleSubmit}>
            <label>Task Title</label><br />
            <input type="text" name="taskTitle" value={formData.taskTitle} onChange={handleChange}></input><br />
            <label>Task ID</label><br />
            <input type="text" name="taskId" value={formData.taskId} onChange={handleChange}></input><br />
            <label>Creaton Date</label><br />
            <input type="text" name="creationDate" value={formData.creationDate} onChange={handleChange}></input><br />
            <label>Assigned To</label><br />
            <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange}></input><br />
            <label>Status</label><br />
            <select name="status" value={formData.status} onChange={handleChange}> <br />
                <option value="inProgress">In progress</option>
                <option value="completed">Complted</option>
                <option value="waitingForReview">Waiting For Review</option>

            </select><br />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default CreateTask;