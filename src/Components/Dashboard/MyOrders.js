import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Hooks/Loading';


const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/myOrders?user=${user.email}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth)
                        localStorage.removeItem("accessToken")
                        navigate('/')
                    }
                    return res.json()
                })
                .then(data => {
                    setMyOrders(data);
                })
        }
    }, [myOrders, user])
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div>
                <p className='text-accent font-bold'> Your Orders {
                    myOrders.length
                }</p>
            </div>
            <div>
                <div>
                    <div class="overflow-x-auto hidden lg:block  w-full">
                        <table class="table w-full ">
                            <thead>
                                <tr className=' '>
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkbox" />
                                        </label>
                                    </th>
                                    <th>Name <br />
                                        Quality
                                    </th>
                                    <th> Quantity x Price <br />
                                        Ordered Time </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='  '>
                                {
                                    myOrders.map(a =>
                                        <tr >
                                            <th className={`bg-${a.paid ? "info" : ""}`}>
                                                <label>
                                                    <p> {a.quantity} </p>
                                                    <input type="checkbox" class="checkbox" />
                                                </label>
                                            </th>
                                            <td className={`bg-${a.paid ? "info" : ""}`}>
                                                <div class="flex items-center space-x-3">
                                                    <div class="avatar">
                                                        <div class="mask mask-squircle w-12 h-12">
                                                            <img src={a.img} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold"> {a.name} </div>
                                                        <div class="text-sm opacity-50"> {a.quality}  </div>
                                                           {(a.price && a.transactionId) && <span class="  text-warning font-bold ">  {a.transactionId} </span>}  
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td>
                                            {a.user}
                                            <br />
                                            <span class="badge badge-ghost badge-sm"> {a.quantity} </span>
                                        </td> */}
                                            <td className={`bg-${a.paid ? "info" : ""}`} >
                                                 <p> {a.price}</p>
                                                <p>{a.exactTime}</p>
                                            </td>
                                            <th  className={`bg-${a.paid ? "info" : ""}`} >
                                                <p> {a.date} </p>
                                                {(a.price && !a.paid) && <Link to={`/dashboard/payment/${a._id}`} > <button class="btn btn-accent btn-xs">Pay </button></Link>}
                                                {(a.price && a.paid) && <span class="  text-warning font-bold text-xl ">Paid </span>}
                                            </th>
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div class="overflow-x-auto  lg:hidden  ">
                            <table class="table  ">
                                {/* <!-- head --> */}
                                <thead>
                                    <tr className=' '>
                                        <th>
                                            {/* <label>
                                                <input type="checkbox" class="checkbox" />
                                            </label>  Name <br /> Quality */}
                                            Photo   Name <br /> Quality
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className='  '>
                                    {/* <!-- row 1 --> */}
                                    {
                                        myOrders.map(a => <tr>

                                            <td>
                                                <div class="flex items-center space-x-3">

                                                    <div class="avatar">
                                                        {/* <label className='flex items-center mr-2'>
                                                            <input type="checkbox" class="checkbox" />
                                                        </label> */}

                                                        <div class="mask mask-squircle w-12 h-12">
                                                            <img src={a.img} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold"> {a.name} </div>
                                                        <div class="text-sm opacity-50"> {a.quality}  </div>
                                                        <button class="btn btn-primary btn-xs">details</button>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;