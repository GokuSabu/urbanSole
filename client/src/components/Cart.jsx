import React, { useState } from 'react'
import { useContext } from 'react'
import myContext from './Context'
import {AiTwotoneStar} from 'react-icons/ai'
import {LuIndianRupee} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {AiFillMinusCircle} from 'react-icons/ai'
import { useEffect } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader"



const Cart = () => {
  const { cart, setCart, amount, setamount,isAdded,setIsAdded } = useContext(myContext);
  const [pTotal, setPTotal] = useState(0);
  const [isEmpty,setIsEmpty] = useState(true)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    setPTotal(totalPrice);
    setIsEmpty(cart.length === 0)
  }, [cart, amount]);

  const removeC = (data) => {
    setCart(cart.filter((elm) => elm !== data));
    setIsAdded(false);
  };
  const clearCart = () => {
    setCart([]);
    setIsEmpty(true)
  }

  const increment = (data) => {
    const updatedCart = cart.map((item) => {
      if (item.id === data.id) {
        const updatedItem = { ...item, quantity: (item.quantity || 1) + 1 };
        setamount(amount + data.price);
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrement = (data) => {
    const updatedCart = cart.map((item) => {
      if (item.id === data.id && (item.quantity || 1) > 0) {
        const updatedItem = { ...item, quantity: (item.quantity || 1) - 1 };
        setamount(amount - data.price);
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div className='cart-cover'>
      {isEmpty && <img className='empty-img' src='https://shop.millenniumbooksource.com/static/images/cart1.png' alt='empty-cart' />}
      <div className='cart'>
        {cart.map((shoe) => (
          <div className='card' key={shoe.id}>
            <Link to={`/shoes/${shoe.id}`} style={{ textDecoration: 'none' }}>
              <div className='img-container'>
                <Image src={shoe.img} className='shoe-img' alt='shoe' thumbnail width="220px" />
              </div>
              <h3 className='shoe-name'>{shoe.name}</h3>
              <p className='price'>Price : <LuIndianRupee size={15} />{shoe.price}</p>
              <div className='shoe-rating'>
                <p>
                  <AiTwotoneStar size={21} className='star' />
                  {shoe.rating}
                </p>
              </div>
            </Link>
            <div className='price-tag'>
              <button className='dec' onClick={() => decrement(shoe)}>
                <AiFillMinusCircle size={21} />
              </button>
              <p className='amt'>{shoe.quantity || 1}</p>
              <button className='inc' onClick={() => increment(shoe)}>
                <BsFillPlusCircleFill size={19} />
              </button>
            </div>
            <p className='total-amt'>Total amount: <LuIndianRupee size={15} />{shoe.price * (shoe.quantity || 1)}</p>
            <Link to={`/shoes/${shoe.id}`}><button className='buy-btn'>Buy Now</button></Link>
            <button
              className='cart-rmv'
              onClick={(e) => {
                removeC(shoe);
                e.preventDefault();
              }}
            >
              Remove from cart
            </button>
          </div>
        ))}
        
      </div>
      {!isEmpty && <div className='p-total'>
          <p>Total Amount: <LuIndianRupee size={15} />{pTotal}</p>
         <div className='p-btn'>
          <button className='clr-crt' onClick={()=>{clearCart()}}>Clear Cart</button>
          <button className='buy-crt'>Proceed to Buy</button>
          </div>
        </div>}
    </div>
  );
};

export default Cart;