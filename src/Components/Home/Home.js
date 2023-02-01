import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Calculator from '../hook/Calculator';
import { FaStar } from "react-icons/fa"
import './Home.css'

const Home = () => {

    let newTime = new Date().toDateString()
    let newTTime = new Date().toLocaleTimeString()
    const [currentDate, setCurrentDate] = useState(newTime)
    const [currentTime, setCurrentTime] = useState(newTTime)

    const updateTime = () => {
        newTTime = new Date().toLocaleTimeString()
        setCurrentTime(newTTime)
    }
    setInterval(updateTime, 1000)
    const array = [1, 2, 3, 4, 9, 8, 3].reduce((a, b) => a + b, 0)

    // ---------------------Rating -----------------------------
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    // var handleRating =(e) =>{
        
    //     let myRating =e.target.rating.value;
    //     setRating(myRating)
    //     console.log(myRating)

    // }



    return (
        <div>
            <h1>  </h1>
            <Calculator></Calculator>
            <p>{currentDate}</p>
            <p>{currentTime}</p>
            <p>
                array ={array}
            </p>
            {/* onClick={() => setRating(ratingValue)} */}
            <p >   {rating}</p>
            <div className='app'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label >
                           
                           <input
                                type="radio"
                                name="rating"
                                onClick={() => setRating(ratingValue)}

                                value={ratingValue} />
                            <FaStar
                                className='star '
                                color={ratingValue <= (hover || rating) ? "#f6c910" : "#DEE6E2"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            ></FaStar>
                             
                            
                        </label>
                    )
                })
                }

            </div>



        </div>
    );
};

export default Home;