import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import myContext from '../Context'
import { FcLike } from 'react-icons/fc';
import { BsHeart } from 'react-icons/bs';
import { AiOutlineClose  } from 'react-icons/ai'
import { RxCross2 } from "react-icons/rx";
import {AiTwotoneStar} from 'react-icons/ai'
import { ImCross } from "react-icons/im";
import {LuIndianRupee} from 'react-icons/lu';
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap';
import { useGetUser } from '../../hooks/useGetUser';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    // const{wishlist,setWishList,isLogged,isAddedW,setIsAddedW} = useContext(myContext)
    // useEffect(()=>{
    //   setWEmpty(wishlist.length === 0)
    // },[wishlist])

    // const handleWish = (data)=>{
    //     if (wishlist.includes(data))
    //     {
    //       setWishList(wishlist.filter((elm)=>(elm!==data)))
    //     }
    //     else if(isLogged===true)
    //     {
    //       setWishList([...wishlist,data])
    //       console.log(wishlist) 
    //     }
    // }
  const [Wempty,setWEmpty] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[cookies,_] = useCookies(['access_token'])
  const [loading,setLoading] = useState(true)
  const userID = useGetUser()
  const [wishlist,setWishList] = useState([])

  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token)
    const getWishlist = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/products/wishlist/${userID}`);
        setWishList(response.data.wishlist);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    };

    getWishlist()
  }, [userID,wishlist,cookies.access_token]);

  const removeFromWishlist = async(productID)=>{
    try 
      {
        const response = await axios.delete(`http://localhost:3001/products/${productID}/${userID}`);
        // console.log(response.data.message)
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


  return (
    <div className='wishlist'>
      {isLoggedIn ? (
      <>
      {wishlist.length === 0 ? (
        <img
          className='empty-img'
          src='https://elegantjewelersli.com/assets/images/empty-wishlist.png'
          alt='wishlist empty'
        />
        ) : (
        wishlist.map((shoe) => (
          <div className='card' key={shoe._id}>
            <Link to={`/shoes/${shoe._id}`} style={{ textDecoration: 'none' }}>
              <div className='img-container'>
                <Image src={shoe.img} className='shoe-img' alt='shoe' thumbnail width='220px'></Image>
                <button
                className='like-btn'
                
                onClick={(e) => {
                //   handleWish(shoe);
                  e.preventDefault();
                  removeFromWishlist(shoe._id)
                }}
              >
                {/* {isWishlisted(shoe._id) && <FcLike size={25} />}
                {!isWishlisted(shoe._id) && <BsHeart size={25}/>} */}
                 {/* < RxCross2 size={25} style={{marginRight:'15px',marginBottom:'27px'}}/> */}

                  <FcLike size={25} style={{marginRight:'15px',marginBottom:'30px'}} />
              </button>
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
        ))
      )}
      </>
    ) : (
      <img
          className='empty-img'
          src='https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png'
          alt='wishlist empty'
        />
    )}
    </div>
  );
};

export default Wishlist