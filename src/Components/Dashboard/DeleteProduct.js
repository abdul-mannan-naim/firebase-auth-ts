import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = ({ manages }) => {
    const { name, quality, price, _id, description } = manages;
    let navigate = useNavigate()

    const confirmHandling = async () => {
        await fetch(`http://localhost:5000/delete/${_id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 404) {
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
               return res.json()})
            .then(data => {
                console.log(data);
                
            })

    }
    return (
        <div>
            {/* <!-- The button to open modal --> */}


            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="delete-product" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">

                    <h3 class="font-bold text-red-500 text-lg">Do you want to Delete {name}? </h3>
                    <p class="py-4"> {description} </p>
                    <div class="modal-action">
                        <label onClick={() => confirmHandling()} for="delete-product" class="btn"> Confirm  </label>
                        <label for="delete-product" class="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;