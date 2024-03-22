import React, { useState } from 'react'
import { useContext } from 'react'
import myContext from '../Context'
import {AiTwotoneStar} from 'react-icons/ai'
import {LuIndianRupee} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {AiFillMinusCircle} from 'react-icons/ai'
import { useEffect } from 'react';
import axios from 'axios'
import { useGetUser } from '../../hooks/useGetUser'
import '../User/Cart2.css'
import {loadStripe} from '@stripe/stripe-js'
import ScaleLoader from "react-spinners/ScaleLoader"
import { toast } from 'react-toastify'
import { Modal, Button } from 'react-bootstrap';



const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const userID = useGetUser();
  const [loading,setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showClearCartModal,setShowClearCartModal] = useState(false)
  const [selectedShoe,setSelectedShoe] = useState([])

  const getCart = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/products/cart/${userID}`);
      setCart(response.data);
      console.log(response.data)

      // Calculate sum of total amounts
      const totalAmount = response.data.reduce((total, shoe) => total + (shoe.price * (shoe.quantity || 1)), 0);
      setTotal(totalAmount);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
  }
  };

  useEffect(() => {
    getCart();
  }, [userID]);
  const isEmpty = cart.length === 0;

  const updateCartInBackend = async (updatedCart) => {
    try {
      await axios.put(`http://localhost:3001/products/cart/${userID}`, {
        cart: updatedCart.map(item => ({
          product: item.product._id,
          size: item.size,
          quantity: item.quantity || 1,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  };


  // const incrementQuantity = async (shoe) => {
  //   setCart(prevCart => {
  //     const updatedCart = prevCart.map((item) =>
  //       item._id === shoe._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
  //     );
  //     updateCartInBackend(updatedCart);
  //     updateTotal(updatedCart);
  //     return updatedCart;
  //   });
  // };
  
  // const decrementQuantity = async (shoe) => {
  //   setCart(prevCart => {
  //     const updatedCart = prevCart.map((item) =>
  //       item._id === shoe._id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
  //     );
  //     updateCartInBackend(updatedCart);
  //     updateTotal(updatedCart);
  //     return updatedCart;
  //   });
  // };
  // const updateTotal = (updatedCart) => {
  //   const totalAmount = updatedCart.reduce((total, shoe) => total + (shoe.price * (shoe.quantity || 1)), 0);
  //   setTotal(totalAmount);
  // };
  const incrementQuantity = async (productID, size) => {
    try {
        await axios.put(`http://localhost:3001/products/cart/increment/${userID}/${productID}/${size}`);
        getCart(); // Refresh cart after updating quantity
    } catch (error) {
        console.log(error);
    }
};

const decrementQuantity = async (productID, size) => {
    try {
        await axios.put(`http://localhost:3001/products/cart/decrement/${userID}/${productID}/${size}`);
        getCart(); // Refresh cart after updating quantity
    } catch (error) {
        console.log(error);
    }
};

// const handleProceedToBuy = async () => {
//   try {
//     const formattedCart = cart.map((shoe) => ({
//       product: shoe._id, // Assuming _id is the product ID
//       size: shoe.size,
//       quantity: shoe.quantity || 1,
//     }));

//     await axios.put(`http://localhost:3001/products/cart/${userID}`, {
//       cart: formattedCart,
//     });

//     // setCart([]); // Clear the cart in your state or Redux store if needed
//   } catch (error) {
//     console.error('Error updating quantities:', error);
//   }
// };



const removeCartItem = async (productId, size) => {
  try {
    await axios.delete(`http://localhost:3001/products/cart/${userID}/${productId}/${size}`);
    // After successful deletion, you may want to refresh the cart by making a new request
    getCart();
    toast.warn('Removed from Cart', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
  } catch (error) {
    console.log(error);
  }
};

const clearCart = async () => {
  try {
    const response = await axios.delete(`http://localhost:3001/products/cart/empty/${userID}`);
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
    // Update local state to reflect the emptied cart
    setCart([]);
  } catch (err) {
    console.log(err);
  }
  setShowClearCartModal(false);
};

const[orders,setOrders] = useState([])
const buyItems = async()=>{
  const stripe = await loadStripe("pk_test_51OlqymSHTl2dBi57um05iJaKJNuHP6rQS5sUsR41tMDHG2E4XK28RxTwJ2tfWEUgYMlQ80xTZu5uKGZWTK5ePyHu00KU5Ghf3S")
  const body = {
    userID: userID,
    products : cart
  }

  const headers = {
    "Content-Type":"application/json"
  }

  const response  = await fetch(`http://localhost:3001/checkout`,{
    method:'POST',
    headers:headers,
    body:JSON.stringify(body)
})

  const session = await response.json()
  const result = stripe.redirectToCheckout({
    sessionId : session.id
  })
  if(result.error)
  {
    console.log(result.error)
  }
  clearCart()
}

const makePayment = async (selectedShoe) => { 
 

  // Proceed to payment
  const stripe = await loadStripe("pk_test_51OlqymSHTl2dBi57um05iJaKJNuHP6rQS5sUsR41tMDHG2E4XK28RxTwJ2tfWEUgYMlQ80xTZu5uKGZWTK5ePyHu00KU5Ghf3S") 
  const body = { 
    product:selectedShoe,
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
  removeCartItem(selectedShoe._id,selectedShoe.size)
};

const handleBuyNow = () => { 
 // Proceed to payment
  setShowModal(true);
};

const handleConfirmation = (shoe) => {
  setSelectedShoe(shoe); // Assuming you have state to store the selected shoe
  setShowModal(true);
}




  return (
    <div className='cart-cover'>
      {loading && <div><ScaleLoader color="#36d7b7" /></div>}
      {!loading && isEmpty && <img className='empty-img' src='https://shop.millenniumbooksource.com/static/images/cart1.png' alt='empty-cart' />}
      
      
      <div className='cart'>
             {cart.map((shoe,index) => (
          <div className='card' key={`${shoe._id}-${shoe.size}`}>
          <Link to={`/shoes/${shoe._id}`} style={{ textDecoration: 'none' }}>
            <div className='card-content'>
              <div className='img-container'>
                <Image src={shoe.img} className='shoe-img' alt='shoe' thumbnail width="220px" />
              </div>
              <div className="section1">
                <h3 className='shoe-name'>{shoe.name}</h3>
                <p className='price'>Price : <LuIndianRupee size={15} />{shoe.price}</p>
                <p className='size'>{shoe.size}</p>
                <div className='shoe-rating'>
                  <p>
                    <AiTwotoneStar size={21} className='star' />
                    {shoe.rating}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className='price-tag'>
            <button className='dec' onClick={() => decrementQuantity(shoe._id,shoe.size)}>
              <AiFillMinusCircle size={21} />
            </button>
            <p className='amt'>{shoe.quantity || 1}</p>
            <button className='inc' onClick={() => incrementQuantity(shoe._id,shoe.size)}>
              <BsFillPlusCircleFill size={19} />
            </button>
          </div>
          <div className="section2">
            <p className='total-amt'>Total amount: <LuIndianRupee size={15} />{shoe.price * (shoe.quantity || 1)}</p>
            <div><button className='buy-btn' onClick={() => handleConfirmation(shoe)}>Buy Now</button></div>
            <button className='cart-rmv' onClick={(e) => {
              removeCartItem(shoe._id,shoe.size)
              e.preventDefault();
            }}>
              Remove from cart
            </button>
          </div>
        </div>
        ))}
      </div>
      {!isEmpty && (
        <div className='p-total'>
          <p>Total Amount: <LuIndianRupee size={15} />{total}</p>
          <div className='p-btn'>
          
            <button className='clr-crt' onClick={() => setShowClearCartModal(true)}>Clear Cart</button>
            <button className='buy-crt' onClick={buyItems}>Proceed to Buy</button>
          
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
                    <Button variant="primary" onClick={async () => {
                      await makePayment(selectedShoe);
                      setShowModal(false);
                      removeCartItem(selectedShoe._id, selectedShoe.size);
                    }
                      }>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showClearCartModal} onHide={() => setShowClearCartModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Clear Cart Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to clear your cart?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowClearCartModal(false)}>
                  No
                </Button>
                <Button variant="primary" onClick={clearCart}>
                  Yes
                </Button>
              </Modal.Footer>
          </Modal>
            
        </div>
      )}
      
    </div>
  );
};

export default Cart;