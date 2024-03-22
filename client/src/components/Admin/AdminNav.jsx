import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';

const AdminNav = () => {
    const[cookies,setCookies] = useCookies(["admin_token"])
    const navigate = useNavigate()

    const logout = ()=>{
      setCookies('admin_token',"")
      // window.localStorage.removeItem("userID")
      window.sessionStorage.removeItem("adminID")
      navigate('/')
    }
  return (
    <div className='adminNav'>
        {[ 'lg'].map((expand) => (
        <Navbar  key={expand} variant={"dark"} expand={expand} className="bg-dark mb-3">
          <Container fluid>
            <Navbar.Brand href="#" className='logo'>URBAN SOLE Admin panel</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header className='bg-dark' closeButton>
                <Offcanvas.Title className='ms-auto me-auto text-light logo' id={`offcanvasNavbarLabel-expand-${expand}`}>
                  URBAN SOLE Admin panel
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body  className='bg-dark'>
                <Nav className="justify-content-end flex-grow-1 pe-3 mx-3 my-2">
                    {/* <button className="btn" id="login_btn">Login</button> */}
                    <Link to='/' className='home-btn mt-2 mx-3 '>home</Link>
                    <Link to='/user-list' className='home-btn mt-2 mx-3'>Users</Link>
                    <Link to='/product-list' className='home-btn mt-2 mx-3'>Products</Link>
                    {!cookies.admin_token && <Link to='/login' className='home-btn mt-2 mx-3'>login</Link>}
                    {/* {cookies.admin_token &&
                    <Link  className='home-btn mt-4'> <MdOutlineAdminPanelSettings size={28} color='white'/></Link>} */}
                    {/* {cookies.access_token && <Link to='/user-profile' className='home-btn mt-4'><FaUserCircle size={30}/></Link>} */}
                    {cookies.admin_token && <Link onClick={logout} className='home-btn mt-2'>logout</Link>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        
    </div>
  )
}

export default AdminNav