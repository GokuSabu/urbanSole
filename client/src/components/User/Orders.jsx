import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/useGetUser';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import '../User/Orders.css'
import { Image } from 'react-bootstrap';
import {AiTwotoneStar} from 'react-icons/ai'
import {LuIndianRupee} from 'react-icons/lu'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';


const Orders = () => {
  const[orders,setOrders] = useState([])
  const [selectedShoe,setSelectedShoe] = useState([])
  const [showModal, setShowModal] = useState(false);
  const userID = useGetUser();

  useEffect(()=>{
    const getOrders =async ()=>{
      try{
        const response = await axios.get(`http://localhost:3001/checkout/${userID}`)
      setOrders(response.data.orders)
      console.log(response.data.orders)
      }
      catch(err){
        console.log(err)
      }
    }
    getOrders()

  },[])

  const deleteOrder = async (productID) => {
    try {
      const response = await axios.delete(`http://localhost:3001/checkout/${userID}/${productID}`);
      // alert(response.data.message);
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
        // Update orders after successful deletion
        setOrders(prevOrders => prevOrders.filter(order => order.product._id !== productID));
      } catch (err) {
        console.log(err);
      }
    };

    const handleConfirmation = (shoe) => {
      setSelectedShoe(shoe._id); // Assuming you have state to store the selected shoe
      setShowModal(true);
    }
  return (
    <div className='orders'>
       {orders.length === 0 && (
        <div className="empty-orders">
          <img src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" alt="Empty Orders" />
        </div>
        )}
      {orders.length > 0 && (  
      <div>
      <div>
        <h2>Recent orders</h2>
      </div>
      {orders.map((order) => (
        <div className='order-card' key={order.product._id}>
          <Card>
            <Card.Body className="order-body">
              <div className='img-container'>
                <Image src={order.product.img} className='shoe-img' alt='shoe' thumbnail width='220px' />
              </div>
              <div className="details">
              <h3 className='shoe-name'>{order.product.name}</h3>
              <p className='price'>Price : <LuIndianRupee size={15} />{order.product.price}</p>
                <p className='size'>{order.product.size}</p>
                <div className='shoe-rating'>
                  <p>
                    <AiTwotoneStar size={21} className='star' />
                    {order.product.rating}
                  </p>
                </div>
                <p className="order-date">Ordered on: {new Date(order.timestamp).toLocaleString()}</p>
                <button onClick={()=>{handleConfirmation(order.product)}}>Remove</button>
              </div>
              
            </Card.Body>
          </Card>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove from order history?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This will be permenantly deleted</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="primary" onClick={() => {
                       deleteOrder(order.product._id);
                      setShowModal(false);
                    }
                      }>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
      ))}
      </div>)}
    </div>
  
  );
};
export default Orders