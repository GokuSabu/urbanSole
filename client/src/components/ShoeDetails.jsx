import React, { useState,useEffect} from 'react'
import { useParams,useNavigate, Link} from 'react-router-dom'
import { AiTwotoneStar } from 'react-icons/ai';
import {LuIndianRupee} from 'react-icons/lu'
import useGrab from './useGrab'
import '../styles/ShoeDetails.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import useGetProducts from '../hooks/useGetProducts'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineShopping } from 'react-icons/ai';
import { useContext } from 'react';
import myContext from './Context';
import axios from 'axios';
import { useGetUser } from '../hooks/useGetUser'
import { useCookies } from 'react-cookie';
import ScaleLoader from "react-spinners/ScaleLoader"
import { toast } from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js'
import { Modal, Button } from 'react-bootstrap';
import Review from './Reviews/Review';
import CommentBox from './Reviews/CommentBox';
import Rating from '@mui/material/Rating';
import { MdOutlineRateReview } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export const ShoeDetails = () => {
  // const {
  //   wishlist,
  //   setWishList,
  //   isLogged,
  //   cart,
  //   setCart,
  //   setamount,
  //   adminlog,
  //   setAdminLog,
  //   newShoe,
  //   setNewShoe,
  // } = useContext(myContext);

  // const [addedToCart, setAddedToCart] = useState(false);
  const[shoe,setShoe] = useState([])
  const [cart,setCart] = useState([])
  const userID = useGetUser();
  const [addedToCart, setAddedToCart] = useState([]);
  const navigate = useNavigate();
  const[cookies,_] = useCookies(['access_token'])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { productID } = useParams();
  const [loading,setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);

  const [purchase,setPurchase] = useState([])
  const [review,setReview] = useState([])
  
 

  const [size, setSize] = useState();

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const [showReviewModal, setShowReviewModal] = useState(false);

    const handleShowReviewModal = () => {
        setShowReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
    };



  // const { product: shoe, error } = useGetProducts('http://localhost:3001/products/' + productID);

  // useEffect(() => {
  //   setAddedToCart(cart.some((item) => item.id === shoe?.id));
  // }, [cart, shoe]);
  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token)
  const getDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/products/${productID}`);
      setShoe(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async()=>{
    try{
      const response =await axios.get(`http://localhost:3001/review/${productID}`)
      setReview(response.data.review)
    }
    catch(err){
      console.log(err)
    }
  }


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
    getReviews()

    getDetails();
    console.log("shoes",shoe)
    
  }, [productID,cart]);

  

  const handlecart = async (productID) => {
    if (!size) {
      // alert("Please select a size before adding to cart.");
      toast.warn("Please select a size before adding to cart.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    try {
      // Add the product to the cart with the new size as a separate element
      const response = await axios.put(`http://localhost:3001/products/cart`, {
        userID,
        productID,
        size,
      });
  
      if (response.data && response.data.cart) {
        setCart(response.data.cart);
        // alert("Product added to cart!");
        toast.success("Product added to cart!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        console.log("Invalid response format");
      }
    } catch (err) {
      console.log(err);
    }
  };


  const makePayment = async (shoeDetails) => { 
    // Check if size is selected
    if (!size) {
      toast.warn("Please select a size before proceeding to checkout.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    // Proceed to payment
    const stripe = await loadStripe("pk_test_51OlqymSHTl2dBi57um05iJaKJNuHP6rQS5sUsR41tMDHG2E4XK28RxTwJ2tfWEUgYMlQ80xTZu5uKGZWTK5ePyHu00KU5Ghf3S") 
    const body = { 
      product:shoeDetails,
      userID: userID
     }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
   
    const response = await fetch( 
      "http://localhost:3001/checkout/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
   
    const session = await response.json(); 
   
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
   
    if (result.error) { 
      console.log(result.error); 
    } 
  };
  
  const handleBuyNow = () => {
    // Check if size is selected
    if (!size) {
      toast.warn("Please select a size before proceeding to checkout.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    // Proceed to payment
    setShowModal(true);
  };

  const handleConfirmation = ()=>{
    makePayment(shoe);

  }
const deleteReview = async()=>{
  
  try{
    const response = await axios.delete(`http://localhost:3001/review/${userID}/${productID}`)
    // alert(response.data.message)
    toast.warn(response.data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
  }
  catch(err)
  {
    console.log(err)
  }
}




  return (
    <div className='shoe-details'>
      {/* {error && <div>Error fetching the data</div>} */}
      {loading && <div><ScaleLoader color="#36d7b7" /></div>}
      {!loading && shoe && (
        <article className='shoe-details-container' key={shoe._id}>
          <div className='sh-img'>
            <Carousel fade>
              <Carousel.Item>
                <img src={shoe.img} width='750px' height='900px' alt='shoe'></img>
              </Carousel.Item>
              <Carousel.Item>
                <img src={shoe.img2} width='750px' height='900px' alt='shoe'></img>
              </Carousel.Item>
              <Carousel.Item>
                <img src={shoe.img3} width='750px' height='900px' alt='shoe'></img>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className='sh-product'>
            <h4 className='sh-brand'>{shoe.brand}</h4>
            <h3 className='sh-name'>{shoe.name}</h3>
            <h2 className='sh-price'><LuIndianRupee size={28}/>{shoe.price}</h2>
            <p className='sh-rating'>
              <AiTwotoneStar size={21} className='star' />
              {shoe.rating}
            </p>
            <div className='sh-description'>
              <h3>Description</h3>
              <p>{shoe.desc}</p>
            </div>

            <div>
            {isLoggedIn ? (
    <div>
      <label htmlFor="shoe-size"> Size:</label>
      <select id="shoe-size" value={size} onChange={handleChange}>
        <option value="">Select Size</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <div className='buttons'>
      <button
          className='buy'
          onClick={handleBuyNow}
        >
          BUY NOW
        </button>
        <button
          className='cart-btn'
          onClick={(e) => {
            handlecart(shoe._id);
            e.preventDefault();
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  ) : (
    <p>Login to buy the product or add to cart</p>
  )}
              {/* {!adminlog && <button className='buy'>
                <AiOutlineShopping />Buy Now
              </button>}
              {adminlog && (
                <button className='delete-btn' onClick={handleDelete}>
                  Delete Product
                </button>
              )}
              {adminlog && (
                <Link to={`/update/${shoe.id}`} className='edit-btn'>
                  Edit Product
                </Link>
              )} */}
            </div>
          </div>
        </article>
      )}
      <div className='user-reviews'>
      <div className='comment-box'>
        <div className='post-review'>
            <h2>User Reviews {isLoggedIn && <MdOutlineRateReview onClick={handleShowReviewModal} />}</h2>
            
            
            <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Post a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Review userID={userID} productID={productID} handleCloseReviewModal = {handleCloseReviewModal}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReviewModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
          </div>
            
              {review.map((review)=>(
                  <div className='review' key={review._id}>
                      <p className='review-user'><FaUserCircle className='userIcon' size={25} />@{review.user.username}</p>
                      <Rating name="half-rating-read" className='ratingStar' value={review.rating} precision={0.5} size="small" readOnly />
                      <p>{review.comment}</p>
                      {review.user._id === userID && (<MdDelete size={35} className="delete-button" onClick={() => deleteReview(review._id)} />)}
                  </div>
              ))}

            </div>
        </div>
        

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Redirecting to Checkout page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Proceed To Checkout??</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleConfirmation}>Yes</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
};
