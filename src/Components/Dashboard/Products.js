import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import DeleteProduct from './DeleteProduct';
import Product from './Product';
import UpdateProduct from './UpdateProduct';

const Products = () => {

    const [products, setProducts] = useState([])
    const [manages, setManages] = useState(null)
    const navigate =useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/getProduct",{
            method:"GET",
            headers:{
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status ===403 || res.status ===404){
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
               return res.json()})
            .then(data => setProducts(data))
    }, [products])


    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12 '>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        setManages={setManages}
                    >  </Product>)
                }
            </div>
            {manages && <UpdateProduct
                manages={manages}
                setManages={setManages}
            ></UpdateProduct>}
            {
                manages && <DeleteProduct
                    manages={manages} 
                ></DeleteProduct>
            }
        </div>
    );
};

export default Products;