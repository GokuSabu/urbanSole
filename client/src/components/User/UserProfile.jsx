import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useGetUser } from '../../hooks/useGetUser'

const UserProfile = () => {
    const [user, setUser] = useState([]);
    const userID = useGetUser();
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        setCookies('access_token', '');
        window.sessionStorage.removeItem('userID');
        navigate('/', { replace: true });
    }

    const handleLogoutConfirmation = () => {
        setShowModal(false);
        logout();
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

    return (
        <div className='user-data'>
            <h3>User Profile</h3>
            {/* Check if user object is not empty */}
            {Object.keys(user).length > 0 && (
                <div className='user-details'>
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
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <button onClick={() => setShowModal(true)}>Logout</button>
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
    )
}

export default UserProfile;