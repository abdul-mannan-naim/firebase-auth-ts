import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Product = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/getProduct')
            .then(res => res.json())
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