import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Comment = ({ pcom  }) => {
    const { messagerPhoto, messagerName, text, time, date,messagerId ,_id } = pcom;
    const [user, loading, error] = useAuthState(auth)
    const [me,setMe] =useState(false)
    console.log(me)

    if(user){
      fetch(`http://localhost:5000/commenter/${_id}`,{
        method:"GET",
        headers: {
            "content-type": "application/json",
            authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(res=>res.json())
      .then(data=>{
        setMe(data.success)
        console.log(data);
      })
    }

    const deleteComment=()=>{
        fetch(`http://localhost:5000/comment/${_id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }, 
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
        })
        
    }
    return (
        <div>
            <>
                <div className='border-2 rounded-xl p-2'>
                    <div className='flex justify-between'>
                        <div class="flex items-center  space-x-3 ">
                            <div class="avatar">
                                <div class="w-8 mask mask-hexagon">
                                    <img src={messagerPhoto} />
                                </div>
                            </div>
                            <div>
                                <div className=''>
                                    <p class="font-bold">{messagerName} </p>
                                    <small className='text-sm'> {date} </small>
                                </div>
                                {/* <div class="text-sm opacity-50"> {time}  </div> */}
                            </div>
                        </div>
                        <div>
                            {/*  */}
                          { me &&  <button onClick={deleteComment} className='text-error  '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button> }
                        </div>
                    </div>
                    <div className='text-start'>
                        {text} <br />
                        <small className='text-sm text-accent'> {time} </small>
                    </div>
                </div>

            </>
        </div>
    );
};

export default Comment;