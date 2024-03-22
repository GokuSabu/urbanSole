import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import {FaUserCircle} from 'react-icons/fa'
import Search from './Search/SearchBar';
import { Link } from 'react-router-dom';
import myContext from './Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useCookies } from 'react-cookie';
import { useGetUser } from '../hooks/useGetUser';
import axios from 'axios';


const Navbar3 = () => {
    // const {isLogged,setIsLogged,adminlog,setAdmionLog} = useContext(myContext)
    const[cookies,setCookies] = useCookies(["access_token"])

    const [user, setUser] = useState([]);
    const userID = useGetUser();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    const logout = () => {
      setCookies('access_token', '');
      window.sessionStorage.removeItem('userID');
      navigate('/', { replace: true });
  }

  const handleLogoutConfirmation = () => {
      setShowModal(false);
      logout();
      setShow(false)
  }

  useEffect(() => {
      const getUser = async () => {
          try {
              const response = await axios.get(`http://localhost:3001/user/${userID}`);
              console.log(response);
              setUser(response.data);
          } catch (err) {
              console.log(err);
          }
      }
      getUser();
  }, []);

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // const logout = ()=>{
    //   setCookies('admin_token',"")
    //   // window.localStorage.removeItem("userID")
    //   window.sessionStorage.removeItem("adminID")
    //   navigate('/')
    // }


  return (
    <div className='navbar3'>
        {[ 'lg'].map((expand) => (
        <Navbar  key={expand} variant={"dark"} expand={expand} className="bg-dark mb-3">
          <Container fluid>
            <Navbar.Brand href="#" className='logo'>URBAN SOLE</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header className='bg-dark' closeButton>
                <Offcanvas.Title className='ms-auto me-auto text-light logo' id={`offcanvasNavbarLabel-expand-${expand}`}>
                  URBAN SOLE
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body  className='bg-dark'>
              <div className=" col-12 col-md-4 mt-4 mt-md-3 flex-grow-1 ms-auto">
                <Search/>
                </div>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    {/* <button className="btn" id="login_btn">Login</button> */}
                    <Link to='/' className='home-btn mt-4 mx-3 '>home</Link>
                    <Link to='/cart' className='home-btn mt-4 mx-3'>Cart</Link>
                    <Link to='/wishlist' className='home-btn mt-4 mx-3'>wishlist</Link>
                    {cookies.access_token && <Link to='/orders' className='home-btn mt-4 mx-3'>Orders</Link>}                    
                    {!cookies.access_token && <Link to='/login' className='home-btn mt-4 mx-3'>login</Link>}
                    {/* {adminlog &&
                    <Link to={'/admin'} className='home-btn mt-4'> <MdOutlineAdminPanelSettings size={28} color='white'/></Link>} */}
                    {/* {cookies.access_token && <Link to='/user-profile' className='home-btn mt-4'><FaUserCircle size={30}/></Link>} */}
                    {cookies.access_token && <Link  onClick={handleShow} className='home-btn mt-4'><FaUserCircle size={30}/></Link>}
                    {/* {cookies.admin_token && <button onClick={logout} className='home-btn mt-4'>logout</button>} */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h3>User Profile</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='user-data'>
            
            {/* Check if user object is not empty */}
            {Object.keys(user).length > 0 && (
                <div className='user-details' style={{ textAlign: 'center' }}>
                    <img
                        src='https://static.thenounproject.com/png/3201587-200.png'
                        alt='User Avatar'
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto',
                        }}
                    />
                    <div 
                    className="details" 
                    style={{
                            maxWidth: '100%',
                            height: 'auto',
                            display: 'inline-block',
                            textAlign: 'left',
                            marginRight:"1.5rem"
                        }}>
                      <h3>{user.username}</h3>
                      <p>{user.email}</p>
                      <button onClick={() => setShowModal(true)}>Logout</button>
                    </div>
                </div>
            )}

            {/* Logout Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleLogoutConfirmation}>Logout</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </Modal.Body>
      </Modal>
        
    </div>
  )
}

export default Navbar3