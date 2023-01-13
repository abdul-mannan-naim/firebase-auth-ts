import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ProductCard = ({ product }) => {
    const { name, price, quality, img, _id, description } = product;

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [user, loading, error] = useAuthState(auth);

     

   const onSubmit =(data) =>{ 
    const quantity =parseInt(data.quantity) 
   
    const product = {
        name: name,
        quantity: quantity,
        user:user.email,
        price: price,
        quality: quality,
        description: description,
        img: img
    }
    console.log(data,quantity,name, price, quality, img , product)
    fetch('http://localhost:5000/order',{
        method:"POST",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify(product)  
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
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
                        <div class="card-actions justify-end">
                            <input type="submit" value="ADD TO CARD"  className='btn btn-accent ' />
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