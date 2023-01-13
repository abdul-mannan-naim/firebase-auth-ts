import React from 'react';

const Product = ({ product , setManages }) => {
    const { name, price, quality, img, _id, description } = product
    return (
        <div>
            <div class="card w-[300px] max-w-xl  bg-base-100 shadow-xl">
                <figure><img src={img}
                    className='w-full h-[250px] rounded-xl'
                    alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title"> {name} !</h2>
                    <p> {price} </p>
                    <p> {quality} </p>
                    <p> {description} </p>
                    <div class="card-actions justify-end"> 
                        <label onClick={()=>setManages(product)} for="update-product" class="btn"> Update </label>
                        <label onClick={()=>setManages(product)} for="delete-product" class="btn"> Delete  </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;