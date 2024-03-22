import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './styles/RegisterForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';

const RegisterForm = () => {

  const{register,handleSubmit,watch,formState:{errors},reset} = useForm()
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const password = watch('password')

  const onSubmit = async(data)=>{
    try{
      const response = await axios.post('http://localhost:3001/auth/register',{username:data.username,email:data.email,password:data.password})
      setShowModal(true);
      reset()
    }
    catch(err)
    {
      console.log(err)
    }}

    const handleCloseModal = () => {
      setShowModal(false);
      navigate('/login') // Navigate to the login page
  }
  return (
    <section>
        <div className="register">
            <div className="reg-form">
                <h2>Sign In</h2>
                <form id='form1' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register('username',{required:true,})}  placeholder='username' />
                    <p>{errors.username?.type === "required"&& "username is required"}
                    {errors.username?.message}</p>


                    <input type="email" {...register('email',{required:true,message:"email Adress must be valid"})} placeholder='email' />
                    <p>{errors.email?.type === "required"&& "email is required"}
                    {errors.email?.message}</p>


                    <input type="text" {...register('password',{required:true,pattern:{value:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,message:"password should be 8-16 character and contain atleast 1 letter,1 number and 1 special character!"}})} placeholder='password' />
                    <p>{errors.password?.type === "required"&& "password is required"}
                    {errors.password?.message}</p>


                    <input type="text" {...register('confirmpwd',{required:true,validate: (value) =>value === password || 'Passwords do not match'})} placeholder='confirm password' />
                    <p>{errors.confirmpwd?.type === "required"&& "please re-enter the password"}
                    {errors.confirmpwd?.message}</p>

                    
                    <button className='button-19'>Sign In</button>
                </form>
                <p>Already have an account?? <Link to='/login'>Login</Link></p>

            </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Account created successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"onClick={handleCloseModal}>Login</Button>
                </Modal.Footer>
            </Modal>
    </section>
  )
}

export default RegisterForm