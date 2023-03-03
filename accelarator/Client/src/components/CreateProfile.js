import React, { useState } from 'react';

const CreateProfile = () => {



    const [formData, setFormData] = useState({
        name: ' ',
        role: ' ',
         
    })


    const handleChange = (e) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/createprofile', {
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
            <label>Name</label><br />
            <input type="text" name="name" value={formData.name} onChange={handleChange}></input><br />
             
            <select name="role" value={formData.role} onChange={handleChange}> <br />
                <option value="manager">Manager</option>
                <option value="tagger">Tagger</option>
                <option value="reviewer">Reviewer </option>

            </select><br />
            <button type="submit">Add Profile</button>
        </form>
    );
};

export default CreateProfile;