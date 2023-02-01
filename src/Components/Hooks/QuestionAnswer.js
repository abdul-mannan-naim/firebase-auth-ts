import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import MessageModal from '../MessageControl/MessageModal';
import ProductCard from './ProductCard';

const  QuestionAnswer = () => {
  

    return (
        <div>
             <h1>my Answer Section </h1>

        </div>
    );
};

export default  QuestionAnswer;