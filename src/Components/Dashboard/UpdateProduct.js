import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const UpdateProduct = ({ manages, setManages }) => {
    const { name, quality, price, description, _id, img } = manages;

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate =useNavigate()
    const imagebbKey = "8cf4df2928da7fe0256bcbc04767a5c3";

    const onSubmit = data => {
        const price =parseInt(data.price)
        console.log(data)
        let image = data.file[0]
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imagebbKey}`, {
            method: "POST", 
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        name: data.name,
                        price: price,
                        quality: data.quality,
                        description: data.description,
                        img: img
                    }
                    fetch(`http://localhost:5000/update/${_id}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => {
                            if (res.status === 403 || res.status === 404) {
                                signOut(auth)
                                localStorage.removeItem('accessToken')
                                navigate('/')
                            }
                           return res.json()})
                        .then(data => {
                            console.log(data)
                            setManages(null)
                            reset()
                        })
                }
            })

    }
    return (
        <div>
            {/* <!-- The button to open modal --> */}


            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="update-product" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="update-product" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div class="card max-w-xl w-full ">

                            <div class="card-body">
                                <p className='text-3xl py-4 text-accent font-bold'>Add Product</p>
                                <div class=" ">
                                    <input type="text" className='input input-bordered w-full max-w-lg   '
                                        placeholder='Product Name'
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "implement The product Name"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Name Should be 6 Character"
                                            }

                                        })}
                                    />
                                    <label  > {errors.name?.type === "required" && <span> {errors.name.message} </span>}</label>
                                    <label  > {errors.name?.type === "minLength" && <span> {errors.name.message} </span>}</label>
                                </div>
                                <div>
                                    <label htmlFor="">  </label>
                                    <input type="text" placeholder='Product Quality '
                                        className='input input-bordered w-full max-w-lg my-2'
                                        {...register("quality", {
                                            required: {
                                                value: true,
                                                message: "implement The product quality"
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "quality Should be 4 Character"
                                            }

                                        })}
                                    />
                                    <label >{errors.quality?.type === "required" && <span> {errors.quality.message} </span>}</label>
                                    <label >{errors.quality?.type === "minLength" && <span> {errors.quality.message} </span>}</label>

                                </div>

                                <div>
                                    <label htmlFor=""></label>
                                    <input type="number" name="" id="" placeholder='Product Price'
                                        className='input input-bordered w-full max-w-lg  '
                                        {...register("price", {
                                            required: {
                                                value: true,
                                                message: "implement The product Price"
                                            },
                                            minLength: {
                                                value: 1,
                                                message: "quality Should be 1 Character"
                                            }

                                        })}
                                    />
                                    <label  >   {errors.price?.type === "required" && <span> {errors.price.message} </span>}</label>
                                    <label  >    {errors.price?.type === "minLength" && <span> {errors.price.message} </span>}</label>


                                </div>

                                <div className='my-2'>
                                    <textarea
                                        {...register("description", { required: true })}
                                        class="textarea textarea-bordered " placeholder="Short description">
                                    </textarea> <br />
                                    <label  > {errors.description && <span>Description is required</span>}</label>
                                </div>


                            </div>
                            <div>
                                <label >

                                </label>
                                <input type="file" name="" id=""
                                    {...register("file", { required: true })}
                                />
                                <label >  {errors.file && <span>Image is required</span>}</label>
                            </div>
                            <div>
                                <input type="submit" value="Confirm" className='btn btn-accent w-full max-w-lg my-3 ' />
                            </div>
                        </div>

                    </form>
                    {/* <div class="modal-action">
                        <label for="update-product" class="btn">Yay!</label>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;