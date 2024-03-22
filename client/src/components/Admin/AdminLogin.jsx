import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import './styles/AdminLogin.css'

const AdminLogin = () => {
    const{register,handleSubmit,watch,formState:{errors}} = useForm()
    const [cookies,setCookies] = useCookies(["admin_token"])
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:3001/admin/login', {
            email: data.email,
            password: data.password
          });
      
          if (response.data.adminToken) {
            setCookies('admin_token', response.data.adminToken);
            window.sessionStorage.setItem("adminID", response.data.adminID);
            alert(response.data.message);
            navigate('/');
          } else {
            alert(response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
  
  return (
    <section>
        <div className="login">
            <div className="login-form">
                <h2>Admin Log-in</h2>
                <form id='form1' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>


                    <input type="email" {...register('email',{required:true,message:"email Adress must be valid"})} placeholder='email' />
                    <p>{errors.email?.type === "required"&& "email is required"}
                    {errors.email?.message}</p>


                    <input type="text" {...register('password',{required:true})} placeholder='password' />
                    <p>{errors.password?.type === "required"&& "password is required"}
                    {errors.password?.message}</p> 
                    <button className='button-19'>Log In</button>
                </form>

            </div>
        </div>
    </section>
  )
}

export default AdminLogin