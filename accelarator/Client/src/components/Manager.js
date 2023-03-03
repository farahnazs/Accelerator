import React from 'react';
import TableData from './TableData';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    const btnSize = '200px'
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/createtask')
    }
    return (
        <div>
            <h1>Welcome, Manager</h1>
            <div>
                <Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload Image
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload Document
                    <input hidden accept="image/*" multiple type="file" />
                </Button>

                <Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload PDF
                    <input hidden accept="image/*" multiple type="file" />
                </Button>

                <Button variant="outlined" style={{ width: btnSize, margin: '8px' }} onClick={handleClick} >Create task</Button>
            </div>
            <TableData />
        </div>
    )
}

 

export default Manager;