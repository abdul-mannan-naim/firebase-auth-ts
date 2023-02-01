import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FaStar } from "react-icons/fa"
import { useEffect } from 'react';

const ProductCard = ({ product, setComments, currentTime, currentDate }) => {
    const { name, price, quality, img, _id, description, rating, } = product;

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [user, loading, error] = useAuthState(auth);
    // const emailVerified =user.emailVerified
    const [ratin, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const [alreadyRater, setAlreadyRater] = useState(null)

    //  var ami =alreadyRater["rater"]
    //  console.log(ami);

    // rating.forEach(e => {
    //     if (e.rater === user.email) {
    //         <FaStar
    //             className='star '
    //             color={ratingValue <= (hover || ratin) ? "#f6c910" : "#DEE6E2"}
    //             onMouseEnter={() => setHover(ratingValue)}
    //             onMouseLeave={() => setHover(null)}
    //         ></FaStar>
    //     }
    // })

    let Rmap = rating.map((r => r.rating))

    let TotalRmap = Rmap.reduce((a, b) => a + b, 0)
    let TotalRating =TotalRmap * 2
    let averageRating = (TotalRating / rating.length).toFixed(1)
    //     const array = [1, 2, 3, 4, 9, 8, 3].reduce((a, b) => a + b, 0)

    useEffect(() => {
// -------------------------------check rater or not by email id-------------------------- 
        if (alreadyRater === null) {
            fetch(`http://localhost:5000/rating/${_id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setAlreadyRater(data)
                    // console.log(data)

                })
        }
        // ------------------------check rated or not to product--------------------------------- 

        if (ratin > 0) {
            let ratings = {
                ratin: ratin,
            };
            fetch(`http://localhost:5000/rating/${_id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(ratings)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.success) {
                        alert("Thank you for your feedback ")

                    }
                    else {
                        alert(data.message)
                    }

                })
        } 
        // ------------------------------------------------------ 
    }, [ratin, alreadyRater])

    const onSubmit = (data) => {
        const quantity = parseInt(data.quantity)
        let totalPrice =quantity * price;

        const product = {
            date: currentDate,
            exactTime: currentTime,
            name: name,
            quantity: quantity,
            user: user.email,
            singlePrice:price,
            price: totalPrice,
            userName:user.displayName,
            userPhoto:user.photoURL,
            quality: quality,
            description: description,
            img: img
        }
        // console.log(data, quantity, name, price, quality, img, product)
        fetch('http://localhost:5000/order', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })

    }

    return (
        <div>
            <div>
                <div class="card w-[300px] max-w-xl  bg-base-100 shadow-xl">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <figure><img src={img}
                            className='w-full h-[250px] rounded-xl'
                            alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title"> {name} !</h2>
                            <div>
                                <input type="number" name="" id=""
                                    placeholder='Enter The Quantity'
                                    className='input input-bordered '
                                    defaultValue="1"

                                    {...register("quantity", {
                                        required: {
                                            value: true,
                                            message: "Input The Quantity"
                                        }
                                    })}

                                />
                                <label > {errors.quantity?.type === "required" && <span> {errors.quantity.message} </span>} </label>
                            </div>

                            <p> {price} </p>
                            <p> {quality} </p>
                            <p> {description} </p>
                            {/* <p> {rating} </p> */}
                            {/* <p className='flex justify-end'> {ratin} </p> */}
                            <div className='flex items-center gap-1'>
                                <p className='flex justify-end'> {averageRating}
                                </p>
                                <small>
                                    <FaStar
                                        className='star '
                                        color="#f6c910"
                                    ></FaStar>
                                </small>
                            </div>
                            <div>
                                <p className='flex justify-end' >
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label >

                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    onClick={() => setRating(ratingValue)}

                                                    value={ratingValue} />
                                                {(!alreadyRater) && <FaStar
                                                    className='star '
                                                    color={ratingValue <= (hover || ratin) ? "#f6c910" : "#DEE6E2"}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                ></FaStar>}


                                            </label>
                                        )
                                    })
                                    }

                                </p>
                            </div>



                            <div class="card-actions flex items-center justify-end">
                                <div className='flex items-end '>
                                    <label onClick={() => setComments(product)} for="message-control" class="btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </label>
                                </div>
                                <input type="submit" value="ADD TO CARD" className='btn btn-accent ' />

                                {/* <label onClick={() => setManages(product)} for="update-product" class="btn"> Update </label>
                            <label onClick={() => setManages(product)} for="delete-product" class="btn"> Delete  </label> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;