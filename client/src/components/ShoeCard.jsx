import React, { useEffect, useState } from 'react'
import { AiTwotoneStar } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { BsHeart} from 'react-icons/bs';
import { BsHeartFill } from "react-icons/bs";
import {LuIndianRupee} from 'react-icons/lu';
import '../styles/Homepage.css'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import  '../styles/ShoeCard.css'

import {useGetUser} from '../hooks/useGetUser'
import axios from 'axios';
import { toast } from 'react-toastify';

const ShoeCard = ({shoes}) => {
  const userID = useGetUser()
  const [wishlist,setWishList] = useState([])
  const [cart,setCart] = useState([])
  const[cookies,_] = useCookies(['access_token'])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sshoes, setShoes] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

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

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/cart/ids/${userID}`);
        const cartItemIDs = response.data.map(item => item._id);
        setAddedToCart(cartItemIDs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems()
    getWishlist()
  }, [userID,wishlist,cookies.access_token,cart]);
  

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

 

   const handlecart = async (productID) => {
    try {
      const response = await axios.put(`http://localhost:3001/products/cart`, { userID, productID });
  
      if (response.data && response.data.cart) {
        setCart(response.data.cart);
        console.log(response.data.cart);
      } else {
        console.log("Invalid response format");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    
    <div className='shoe-stack'>
      {shoes.map((shoe) => (
        <div className='card' key={shoe._id}>
          {/* {isWishlisted(shoe._id) && <p>already saved</p>} */}
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
            {/* <button
            className='cart-btn'
            onClick={(e) => {
              handlecart(shoe._id);
              e.preventDefault();
            }}
            disabled={addedToCart.includes(shoe._id)}
          >
            {addedToCart.includes(shoe._id) ? 'Added to Cart' : 'ADD TO CART'}
          </button> */}
        </div>
      ))}
    </div>
  )
}

export default ShoeCard