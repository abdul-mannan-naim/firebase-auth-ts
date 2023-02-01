import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MWBBjLCKCxfXU6zLp95LZCv23TY3Gh4OIZPYqBu9IFWgywah12UkyqtKK7wyKmz8b5k0yWzUPv59fLEpOJzBPen00aGGb8kMi');

const Payment = () => {
    const { id } = useParams()
    const [order, setOrder] = useState({})
    const { _id, date, exactTime, name, quantity, user, singlePrice, userName, userPhoto, quality, description, img,price  } = order;


    console.log(_id, date, exactTime, name, quantity, user, singlePrice, userName, userPhoto, quality, description, img)

    useEffect(() => {
        fetch(`http://localhost:5000/myOrder/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrder(data)
            })
    }, [order])
    return (
        <div>

            <h1>Payment Box {id} </h1>
            <div>
                <div class=" my-28 border-2 w-full ">
                    <div class=" ">

                        <div class="card   w-full  card-side bg-base-100 shadow-xl">
                            <figure><img src={img} className="w-[100px] h-[70px] rounded-xl ml-2  " alt="Movie" /></figure>
                            <div class="card-body">
                                <p className='font-bold' > Hello, <small className='text-accent'> {userName}</small> </p>
                                <h2 class="card-title"> Pay for <small className='text-accent'> {name} </small> </h2>
                                <h2 class="card-title"> Total Amount: <small className='text-accent'> {price} </small> </h2>
                                <p className='font-bold'>   It's quality: <small className='text-accent'>{quality}</small>  </p>
                            </div>
                        </div>

                        <div class="card  w-full my-2  shadow-2xl bg-base-100">
                            <div class="card-body"> 
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm order={order} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;