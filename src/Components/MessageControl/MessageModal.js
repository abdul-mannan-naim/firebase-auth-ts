import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Comment from './Comment';

const MessageModal = ({ comments }) => {
    const { _id, name } = comments;
    //  ------------------------------------------------------------
    let newTime = new Date().toDateString()
    let newTTime = new Date().toLocaleTimeString() 
    const [currentDate, setCurrentDate] = useState(newTime)
    const [currentTime, setCurrentTime] = useState(newTTime) 
    const updateTime = () => {
        newTTime = new Date().toLocaleTimeString()
        setCurrentTime(newTTime)
    }
    setInterval(updateTime, 1000)
    // -------------------------------------------------------------- 

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [user, loading, error] = useAuthState(auth)
    // const emailVerified = user.emailVerified
    // -------------------------post comment------------------------------------
    const onSubmit = (data) => {
        const messagerName = user.displayName;
        const messagerEmail = user.email;
        const messagerPhoto = user.photoURL;

        const myComments = {
            productId:_id,
            text: data.message,
            messagerName,
            messagerEmail,
            messagerPhoto,
            time: currentTime,
            date: currentDate 
        }
        fetch(`http://localhost:5000/comment`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(myComments)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
            })
        // console.log(data.message, messagerName, messagerEmail, emailVerified , currentDate,currentTime , user);
        reset()

    }
    // -----------------------------------------------------------------------

    const [productComment, setProductComment] = useState([])
       

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/comment/${_id}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setProductComment(data)
                })
        }
    }, [productComment])

    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label for="message-control" class="btn">open modal</label> */}
            {/* <!-- Put this part before </body> tag --> */}

            <input type="checkbox" id="message-control" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <p className='text-2xl text-accent'> {name} </p>
                    <div>
                        <div className='grid grid-cols-1 gap-1'>
                            {productComment.map(pcom =>
                                <Comment
                                    key={pcom.messagerId}
                                    pcom={pcom} 
                                ></Comment>)
                            }
                        </div>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex items-center'>

                            <textarea

                                {...register("message", {
                                    required: {
                                        value: true,
                                        message: " Write something "
                                    },
                                    maxLength: {
                                        value: 250,
                                        message: "you write More then 250 Character "
                                    }

                                })}
                                class="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2"
                                placeholder="Comment...">

                            </textarea>




                            <input className='btn btn-accent' type="submit" value="Send" />
                            {/* { emailVerified && <input className='btn btn-accent' type="submit" value="Send" />} */}
                        </div>


                    </form  >
                    <div class="modal-action flex ">
                        {/* { !emailVerified &&  <p className='text-error  '>Email is not valied</p>} */}
                        <div >
                            <label >{errors.message?.type === "required" && <span className='text-start text-error'> {errors.message.message} </span>}</label>
                            <label >{errors.message?.type === "maxLength" && <span className='text-start text-error'> {errors.message.message} </span>}</label>
                        </div>
                        <label for="message-control" class="btn">Close</label>
                        {/* <label for="message-control" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;