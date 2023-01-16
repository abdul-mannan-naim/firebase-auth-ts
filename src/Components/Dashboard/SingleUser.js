import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const SingleUser = ({ cus, index,setDoctor }) => {
    const [user] = useAuthState(auth)
    const { email, role ,profession } = cus
    const handleAdmin = () => {
        const adminInfo ={
            email:email,
            role:"admin", 
        }
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify(adminInfo)                                
        })
            .then(res => {
                if (res.status === 403) {
                    alert(`${user.email} are not admin`)
                }
                return res.json()
            })
            .then(data => {
                console.log(data);
                // if (data.modifiedCount > 0) {
                //     alert(`Successfully made admin ${email}`)
                // }
            })

    }
    return (
        <tr>
            <th>{index}</th>
            <td> {email} </td>
            <td> {role !== "admin" && <button onClick={handleAdmin} className='btn '>Make Admin</button>} </td>
            <td> { profession !== "doctor" &&  <label for="doctor-info" onClick={()=>setDoctor(cus)} className='btn '>Make Doctor </label>} </td>
            
        </tr>
    );
};

export default SingleUser;