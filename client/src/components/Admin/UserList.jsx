import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2'

const UserList = () => {
    const [users,setUsers] = useState([])
    const[isLogged,setIsLogged] = useState(false)
    const [cookies,setCookies] = useCookies(["admin_token"])
    const [search,setSearch] = useState('')

    useEffect(()=>{
        setIsLogged(!!cookies.admin_token)
        const getUsers = async()=>{
            try{
                const response = await axios.get('http://localhost:3001/admin/user-list',
                {headers:{authorization:cookies.admin_token}}
                )
                setUsers(response.data)
                console.log(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getUsers()
    },[users])

    const confirmBan = (user) => {
      let actionText = user.status === "active" ? "Ban" : "Unban";
      let actionMessage =
        user.status === "active"
          ? `user ${user.username} won't be able to use the website!`
          : `user ${user.username} will be able to use the website again.`;
      let successMessage =
        user.status === "active"
          ? `user ${user.username} has been banned from using the website.`
          : `user ${user.username} has been unbanned.`;
      
          let successTitle =user.status === "active" ? "Banned" : "Unbanned";
    
      Swal.fire({
        title: `${actionText} ${user.username}??`,
        text: actionMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${actionText} it!`
      }).then(async (result) => {
        if (result.isConfirmed) {
          await userBan(user._id); // Execute userBan function with userID
          Swal.fire({
            title: `${successTitle}!`,
            text: successMessage,
            icon: "success"
          });
        }
      });
    };

    const userBan =async(userID)=>{
      try{
        const response = await axios.put(`http://localhost:3001/admin/${userID}`)
        // alert(response.data.message)

        const updatedResponse = await axios.get('http://localhost:3001/admin/user-list');
        setUsers(updatedResponse.data);
      }
      catch(err)
      {
        console.log(err)
      }

    }

  return (
    <div className='User-list'>
        <h1>Manage Users</h1>
        <Form.Control
          type="text" placeholder="Search Users..." className='my-4'
          onChange={(e)=>{setSearch(e.target.value)}}
         />
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      {isLogged && <tbody>
       {users.filter((user)=>{
        return search.toLowerCase()===''
        ?user : user.username.toLowerCase().includes(search)
       }).map((user,index)=>(
         <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={()=>{
                  
                  confirmBan(user)
                  // userBan(user._id)
                }}>
                  {user.status === "active" ? "Ban User" : "Unban User"}
                </button>
            </td>
       </tr>

       ))}
      </tbody>}
    </Table>
    </div>
  )
}

export default UserList