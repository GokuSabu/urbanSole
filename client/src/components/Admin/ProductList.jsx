import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Modal } from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import './styles/ProductList.css'
import { MdOutlineAddBox } from "react-icons/md";
import EditProduct from './EditProduct';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import UserReviews from './UserReviews';



const ProductList = () => {
    const [product,setProduct] = useState([])
    const[isLogged,setIsLogged] = useState(false)
    const [cookies,setCookies] = useCookies(["admin_token"])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [search,setSearch] = useState('')

    useEffect(()=>{
        const getproducts = async()=>{
            setIsLogged(!!cookies.admin_token)
            try{
                const response = await axios.get('http://localhost:3001/admin/product-list',{headers:{authorization:cookies.admin_token}})
                setProduct(response.data)
                // console.log(response.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getproducts()
    },[product])

    const handleEdit = (selectedProduct) => {
      setSelectedProduct(selectedProduct);
      setShowModal(true);
  };

  

  

  const confirmDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Product"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(product._id); // Execute userBan function with userID
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const handleDelete = async (productID)=>{
    try{
      const response = await axios.delete(`http://localhost:3001/admin/${productID}`)
      alert(response.data.message)
    }
    catch(err)
    {
      console.log(err)
    }

  }

  const handleCloseModal = () => {
    setShowModal(false); 
};

const handleEditSuccess = () => {
  setShowModal(false);
};

const handleReview = (selectedReview) => {
  setSelectedReview(selectedReview);
  setShowReviewModal(true);
};

const handleCloseReviewModal = () => {
  setShowReviewModal(false); 
};

// const handleEditSuccess = () => {
// setShowModal(false);
// };
  return (
    <div className='ProductList'>
      <Form.Control
          type="text" placeholder="Search Products..." className='my-4'
          onChange={(e)=>{setSearch(e.target.value)}}
         />
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product <Link to='/add-product'><MdOutlineAddBox  /></Link></th>
          <th>name</th>
          <th>Brand</th>
          <th>price</th>
          <th>rating</th>
          <th>Actions</th>
          
        </tr>
      </thead>
      {isLogged && <tbody>
       {product.filter((shoe)=>{
        return search.toLowerCase()===''
        ?shoe : shoe.name.toLowerCase().includes(search)
       }).map((shoe,index)=>(
         <tr key={shoe._id}>
            <td>{index + 1}</td>
            <td><img src={shoe.img} style={{ width: '100px', height: '100px' }}/></td>
            <td>{shoe.name}</td>
            <td>{shoe.brand}</td>
            <td>{shoe.price}</td>
            <td>{shoe.rating}</td>
            <td>
                <button onClick={()=>{handleEdit(shoe)}}>edit</button>
                <button onClick={()=>{ confirmDelete(shoe)}}>delete</button>
                <button 
                onClick={()=>{handleReview(shoe._id)}}
                >Reviews</button>
            </td>
       </tr>

       ))}
      </tbody>}
    </Table>
    <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && <EditProduct product={selectedProduct} productID={selectedProduct._id} onEditSuccess={handleEditSuccess} />}
                </Modal.Body>
    </Modal>

    <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReview && <UserReviews productID={selectedReview} onEditSuccess={handleEditSuccess} />}
                </Modal.Body>
    </Modal>

    </div>
  )
}

export default ProductList