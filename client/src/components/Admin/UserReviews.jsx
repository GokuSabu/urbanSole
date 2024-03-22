import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const UserReviews = ({productID}) => {
    const [review,setReview] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

    useEffect(()=>{
        const getReviews = async()=>{
            try{
              const response =await axios.get(`http://localhost:3001/review/${productID}`)
              // console.log("review",response.data.review.user)
              setReview(response.data.review)
            }
            catch(err){
              console.log(err)
            }
          }
        getReviews()
    },[review])

    const deleteReview = async(userID)=>{
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
          setReview(prevReview => prevReview.filter(item => item._id !== userID));
          handleClose()
      }
      
      catch(err)
      {
        console.log(err)
      }

    }
  return (
    <section>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User </th>
          <th>Review</th>
          <th>Rating</th>
          
        </tr>
      </thead>
      <tbody>
        {review.length > 0 ? (
          review.map((review, index) => (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{review.user.username}</td>
              <td>{review.comment}</td>
              <td>{review.rating}</td>
              <td>
                <button onClick={() => { handleShow(); setSelectedUserID(review.user._id); }}>delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Currently there's no review for this product</td>
          </tr>
        )}
      </tbody>
    </Table><Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ar you Sure you want to Delete this Review??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { deleteReview(selectedUserID)}}>
            Delete Review
          </Button>
        </Modal.Footer>
      </Modal>
    </section>

    
  )
  
}

export default UserReviews