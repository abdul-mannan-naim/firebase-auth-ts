import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Hooks/Loading';
import SingleUser from './SingleUser';

const AllUser = () => {
  const [customer, setCustomer] = useState([]) 
  
  useEffect(() => {
    fetch('http://localhost:5000/users', {
     method:"GET",
     headers:{
        "content-type":"application/json",
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
     }
    })
      .then(res => res.json())
      .then(data => {
        setCustomer(data)
        
      })
  }, [customer])

  return (
    <div>
      {customer.length}
      <div>
        <div class="overflow-x-auto">
          <table class="table w-full">

            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>

              {
                customer.map((cus, index) => <SingleUser
                  key={cus._id}
                  index={index + 1}
                  cus={cus}
                ></SingleUser>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;