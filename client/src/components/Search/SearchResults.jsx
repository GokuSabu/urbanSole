import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import myContext from '../Context'
import useGrab from '../useGrab'
import Image from 'react-bootstrap/Image';
import { AiTwotoneStar } from 'react-icons/ai';
import useGetProducts from '../../hooks/useGetProducts'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Search/SearchResults.css'
import { useCookies } from 'react-cookie';
import ScaleLoader from "react-spinners/ScaleLoader"

import { BsHeartFill } from "react-icons/bs";





import { FcLike } from 'react-icons/fc';
import { BsHeart} from 'react-icons/bs';
import { toast } from 'react-toastify';





  //   const { product:data } = useGetProducts('http://localhost:3001/products/');
  
  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }
  
    
  //   let filteredData;
    
  //   if (srch.length === 1) {
  //     filteredData = data.filter((shoe) => shoe.name.toLowerCase().startsWith(srch.toLowerCase()));
  //   } else {
  //     filteredData = data.filter((shoe) => shoe.name.toLowerCase().includes(srch.toLowerCase()));
  //   }
  //   if (filteredData.length === 0) {
  //     return (
  //         <div>
  //             <img src="https://www.avisa.care//assets/img/No_Product_Found.png" alt="No items found" />
  //         </div>
  //     );
  // }

  const SearchResults = () => {
    const { srch } = useContext(myContext);
    const [filteredData, setFilteredData] = useState([]); // Initialize state for filteredData
    const [match,setmatch] = useState(false)
    const [loading,setLoading] = useState(true)
    const userID = window.sessionStorage.getItem('userID')
    const[cookies,_] = useCookies(['access_token'])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlist,setWishList] = useState([])
  
    useEffect(() => {

      const handleSearch = async () => {
        try {
          setLoading(true)
          const response = await axios.get(`http://localhost:3001/products/search/${srch}`);
          const searchData = response.data.product; // Corrected: 'product' instead of 'prouct'
          setFilteredData(searchData); // Set the filtered data in state
          setmatch(response.data.match)
        } catch (err) {
          console.log(err);
        }finally {
          setLoading(false); // Set loading to false when search completes (regardless of success or error)
      }
      };
  
      handleSearch();
    }, [srch]); // Make sure to include 'srch' in the dependency array

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
      <div className="shoe-stack">
          {loading ? (
              <div><ScaleLoader color="#36d7b7" /></div> // Show loading indicator while data is being fetched
          ) : match ? (
              filteredData.map((shoe) => (
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
                    {/* Price : <LuIndianRupee size={15} /> */}
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
          ) : (
              <div>
                  <img src="https://www.avisa.care//assets/img/No_Product_Found.png" alt="No items found" />
              </div>
          )}
      </div>
  );
};
  
  export default SearchResults;