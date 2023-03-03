import React from 'react';
import TableData from './TableData';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const btnSize = '200px'
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/createtask')
  }

  const handleCreateProfile = () => {
    navigate('/createprofile')
  }
  return (
    <div>
      <h1>Welcome, Admin</h1>
      <div>
        {/*<Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload Image
        <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload Document
        <input hidden accept="image/*" multiple type="file" />
        </Button>
         
        <Button variant="contained" component="label" style={{ width: btnSize, margin: '8px' }}>Upload PDF
        <input hidden accept="image/*" multiple type="file" />
        </Button>*/}
        <Button variant="outlined" style={{ width: btnSize, margin: '8px' }} onClick={handleCreateProfile}>Create Profile</Button>
        <Button variant="outlined" style={{ width: btnSize, margin: '8px' }} onClick={handleClick} >Create task</Button>
      </div>
      <TableData />
    </div>
  )
}

export default Admin
