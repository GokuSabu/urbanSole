import React, { useContext } from 'react';
import myContext from './Context';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
const SuccessPage = () => {
  // Accessing orders array from context
  const { orders } = useContext(myContext);
  const navigate = useNavigate()

  // You can console log orders or use it as needed
  Swal.fire({
    title: "Success!!",
    text: "Purchase complete!!",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/orders') // Redirect to the "/orders" route
    }
  });

  setTimeout(() => {
    navigate('/orders');
  }, 20000);
  return (
    <div>Redirecting to orders page....
    </div>
  )
}

export default SuccessPage