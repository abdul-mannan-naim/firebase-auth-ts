import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const SingleUser = ({ cus, index }) => {
    const [user] = useAuthState(auth)
    const { email,role } = cus
    const handleAdmin = () => {
         fetch(`http://localhost:5000/user/admin/${email}`,{
            method:"PUT",
            headers:{
                authorization:`Bearer ${localStorage.getItem("accessToken")}`
            } 
         })
         .then(res=>{
            if(res.status === 403 ){
                alert(`${user.email} are not admin`)
            }
            return res.json()})
         .then(data=>{
            console.log(data);
            if(data.modifiedCount > 0) {
                alert(`Successfully made admin ${email}`)
            }
         })
        
    }
    return (
        <tr>
            <th>{index}</th>
            <td> {email} </td>
            <td> { role !== "admin" && <button onClick={handleAdmin} className='btn '>Make Admin</button>} </td>
            <td> <button className='btn '>Admin Remove</button> </td>
        </tr>
    );
};

export default SingleUser;