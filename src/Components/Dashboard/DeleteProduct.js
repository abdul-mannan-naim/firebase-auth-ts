import React from 'react';

const DeleteProduct = ({ manages }) => {
    const { name, quality, price, _id, description } = manages;

    const confirmHandling = async () => {
        await fetch(`http://localhost:5000/delete/${_id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
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