import { Button, Table, Select} from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import { ROLES } from './ROLES.js';
import useAuth from '../hooks/useAuth.js';
import axios from "axios";

const { Option } = Select;
const handleStatusChange = (record, value, text) => {
  console.log("value is:", value);
  axios
    .put("http://localhost:5000/updatestatus", {
      "id": record._id,
      "updatedData": { "status": value }
    })
    .then(response => {
      console.log("response handlechange data is:", response);
      
    })
    .catch(error => console.error(error));

}
const columnsRow = [
  {
    title: 'Task Title',
    dataIndex: 'taskTitle',
    key: 'key'
  },
  {
    title: 'Customer ID',
    dataIndex: 'taskId',
    key: 'key'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'key',
    render: (text, record) => (
      <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => handleStatusChange(record, value, text)}>
        <Option value="In Progress">In Progress</Option>
        <Option value="Completed">Completed</Option>
        <Option value="Waiting for Review">Waiting for Review</Option>

      </Select>
    )
  },
  {
    title: 'Created Date',
    dataIndex: 'creationDate',
    key: 'key'
  },
  // {
  //   title: 'Assign To',
  //   dataIndex: 'assignTo',
  //   key: 'key',
  // }
]


const TaggerData = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const [data,setData] =useState([])
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // if (auth.role === ROLES.TAGGER || auth.role === ROLES.ADMIN) {
  //   data = data.map((item) => {
  //     item.assignTo = undefined
  //     return item
  //   })
  // }
  console.log('role:', auth.role, ', data: ', data);

  axios
    .get("http://localhost:5000/getalltask")
    .then(response => {
      console.log("Response data:", response.data);
     setData(response.data)  
    })
    .catch(error => console.error(error));

  // const response= await axios.get("http://localhost:5000/getalltask")
  // console.log("Response data:", response.data);
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          StartWorking
        </Button>
        <span
          style={{
            marginRight: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columnsRow} dataSource={data} />
    </div>
  );
};
export default TaggerData;