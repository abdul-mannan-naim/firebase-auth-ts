import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import ProductCard from './ProductCard';

const Product = () => {

    const [products, setProducts] = useState([])
    let navigate =useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/getProduct',{
            method:"GET",
            headers:{
                authorization :`Bearer ${localStorage.getItem('accessToken')}`,
                "content-type":"application/json"
            }
        })
            .then(res => {
                if(res.status ===403 || res.status === 404){
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
                return res.json()
            })
            .then(data => setProducts(data))
    }, [products])


    return (
        <div>
            <h1>SSSSSSSSSS</h1>

            <p> {products.length} </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center px-16 my-8'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    ></ProductCard>)
                }
            </div>


        </div>
    );
};

export default Product;