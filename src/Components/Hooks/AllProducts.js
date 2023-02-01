import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import MessageModal from '../MessageControl/MessageModal';
import ProductCard from './ProductCard';


const AllProducts = () => {

    let newTime = new Date().toDateString()
    let newTTime = new Date().toLocaleTimeString()

    const [currentDate, setCurrentDate] = useState(newTime)
    const [currentTime, setCurrentTime] = useState(newTTime)

    const updateTime = () => {
        newTTime = new Date().toLocaleTimeString()
        setCurrentTime(newTTime)
    }
    setInterval(updateTime, 1000)

    // ----------------------------------------------------------------------

    const [products, setProducts] = useState([])
    const [query, setQuery] = useState("")
    const [comments,setComments] =useState(null)
    let navigate =useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/getproductbysearch`,{
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
            .then(data => {
                setProducts(data)
            })
    }, [products, query])

    
    return (
        <div>
          
           

            <h1> {currentTime} </h1>
            <p> Total Products:  {products.length} </p> 
            <h1> You Typed: {query.length} Character </h1>
            <div>
                <input type="text" placeholder='Search...'
                    className='w-full max-w-lg p-2 border-2 rounded-xl hover:border-primary'
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center px-16 my-8'>
                {
                    products.filter((product) => {
                        if (query == "") {
                            return product
                        } else if (product.name.toLowerCase().includes(query.toLocaleLowerCase())) {
                            return product
                        }
                        // else if(product.name != query){
                        //     return <p className='text-center text-xl text-bold text-red-400 '> No Result Found  </p>
                        // }
                    }).map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setComments={setComments}
                        currentTime={currentTime}
                        currentDate={currentDate}
                    ></ProductCard>)
                }
            </div>
            <div>
               { comments && <MessageModal
               comments={comments}
               ></MessageModal> 
               }
            </div>


        </div>
    );
};

export default AllProducts;