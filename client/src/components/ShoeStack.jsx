import React from 'react'
import { AiTwotoneStar } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { BsHeart} from 'react-icons/bs';
import {LuIndianRupee} from 'react-icons/lu';
import '../styles/Homepage.css'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import myContext from './Context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShoeStack.css'


import { BsHeartFill } from "react-icons/bs";

import {useCookies} from 'react-cookie'
import  '../styles/ShoeCard.css'

import {useGetUser} from '../hooks/useGetUser'
import axios from 'axios';
import { toast } from 'react-toastify';

const ShoeStack = ({ shoes, title }) => {
  // const {
  //   wishlist,
  //   setWishList,
  //   isLogged,
  //   cart,
  //   setCart,
  //   amount,
  //   setamount,
  //   isAdded,
  //   setIsAdded
  // } = useContext(myContext);

  const userID = useGetUser()
  const[cookies,_] = useCookies(['access_token'])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist,setWishList] = useState([])



  const navigate = useNavigate()

  const [addWish,setAddWish] = useState([])
//   useEffect(() => {

//   }, [cart,wishlist]);

//   const handleWish = (data) => {
//     if (wishlist.includes(data)) {
//       setWishList(wishlist.filter((elm) => elm !== data));
//       setAddWish((prevAddedToWish) => prevAddedToWish.filter((item) => item !== data.id))
//     } else if (isLogged === true) {
//       setWishList([...wishlist, data]);
//       setAddWish((prevAddedToWish) => [...prevAddedToWish, data.id]);
//     }else {
//       alert('Login to add products to the Wishlist');
//     }
//   };

useEffect(() => {
  setIsLoggedIn(!!cookies.access_token)
  const getWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/wishlist/ids/${userID}`);
      setWishList(response.data.wishlist);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

 

  
  getWishlist()
}, [userID,wishlist,cookies.access_token]);

const addToWishlist = async(productID)=>{
  try 
  {
    const response = await axios.put('http://localhost:3001/products',
    {productID,userID},
    {headers:{authorization:cookies.access_token}});
    setWishList(response.data.wishlist)
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  catch(error) {
    console.log(error);
};

}

const removeFromWishlist = async(productID)=>{
try 
  {
    const response = await axios.delete(`http://localhost:3001/products/${productID}/${userID}`);
    toast.warn(response.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
  }
  catch(error) {
    console.log(error);
};

}

const handleWish = (shoeID) => {
if (wishlist.includes(shoeID)) {
  removeFromWishlist(shoeID);
} else {
  addToWishlist(shoeID);
}
};



const isWishlisted = (id)=>{ 
return wishlist && wishlist.includes(id)
}


return (
<div className='shoe-stack'>
    {/* <div className="title"><h2>{title}</h2></div> */}
      {shoes.map((shoe) => (
        <div className='card brand-card' key={shoe._id}>
          <Link to={`/shoes/${shoe._id}`} style={{ textDecoration: 'none' }}>
            <div className='img-container'>
              <Image src={shoe.img} className='shoe-img' alt='shoe' thumbnail width='220px' />
              {isLoggedIn && (<button
                className='like-btn'
                onClick={(e) => {
                //   handleWish(shoe);
                  e.preventDefault();
                handleWish(shoe._id)
                }}
              >
                {/* {isWishlisted(shoe._id) && <FcLike size={25} />}
                {!isWishlisted(shoe._id) && <BsHeart size={25}/>} */}
                 {isWishlisted(shoe._id) ? <FcLike size={25} /> : <BsHeart size={25} />} 

                  {/* <BsHeart size={25} /> */}
              </button>)}
            </div>
            <h3 className='shoe-name'>{shoe.name}</h3>
            <p className='price'>
              Price : <LuIndianRupee size={15} />
              {shoe.price}
            </p>
            <div className='shoe-rating'>
              <p>
                <AiTwotoneStar size={21} className='star' />
                {shoe.rating}
              </p>
            </div>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default ShoeStack;