import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const DoctorInfo = ({ doctor, setDoctor }) => {
    const { email, profession, role } = doctor;
    const [proNames, setProNames] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/productName`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setProNames(data)
            })
    }, [])
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const imagebbKey = "8cf4df2928da7fe0256bcbc04767a5c3";
    const onSubmit = data => { 
        const image = data.file[0]; 
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imagebbKey}`, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => { 
                if(result.success){
                   const img=result.data.url;
                   const doctorInfor = {
                    img:img,
                    name:data.name,
                    email:data.email,
                    speciality:data.speciality,
                   }
                   console.log(doctorInfor);
                   fetch(`http://localhost:5000/doctors/${email}`,{
                    method:"PUT",
                    headers:{
                        "content-type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(doctorInfor)
                   })
                   .then(res=>res.json())
                   .then(data =>{
                    console.log(data)
                    setDoctor(null)
                    reset()
                   })

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label for="doctor-info" class="btn">open modal</label> */}

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="doctor-info" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box   max-w-xl">


                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div class="card max-w-xl w-full  p-8">

                            <div class="card-body">
                                <p className='text-3xl py-4 text-accent font-bold'>Add Product</p>
                                <div class=" ">
                                    <input type="text" className='input input-bordered w-full max-w-lg '
                                        placeholder=' Doctor Name'
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: " Doctor Name is required"
                                            },
                                        })}
                                    />
                                    <label > {errors.name?.type === "required" && <span> {errors.name.message} </span>}</label>

                                </div>
                                <div>
                                    <label >  </label>
                                    <input type="email" placeholder='Doctor Email '
                                    value={email} disabled
                                        className='input input-bordered w-full max-w-lg my-2'
                                        {...register("email")}
                                    /> 
                                </div>

                                <div>
                                    <label ></label>

                                    <select
                                        {...register("speciality", {
                                            required: {
                                                value: true,
                                                message: " Speciality is required "
                                            },

                                        })}
                                        class="select select-bordered w-full max-w-xs">
                                        {
                                            proNames.map((proName) => <option key={proName._id} value={proName.name} > {proName.name} </option>)
                                        }
                                    </select>


                                    <label  >   {errors.speciality?.type === "required" && <span> {errors.speciality.message} </span>}</label>



                                </div>

                            </div>
                            <div>
                                <label >

                                </label>
                                <input type="file"
                                    {...register("file", { required: true })}
                                />
                                <label >  {errors.file && <span>Image is required</span>}</label>
                            </div>
                            <div>
                                <input type="submit" value="ADD" className='btn btn-accent w-full max-w-lg my-3 ' />
                            </div>
                        </div>

                    </form>

                    <div class="modal-action">
                        <label for="doctor-info" class="btn">Cancel  </label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DoctorInfo;