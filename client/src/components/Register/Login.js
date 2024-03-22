import React from 'react'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import './styles/Login.css'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const{register,handleSubmit,watch,formState:{errors}} = useForm()
  const [cookies,setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email: data.email,
        password: data.password
      });
  
      if (response.data.token) {
        setCookies('access_token', response.data.token);
        window.sessionStorage.setItem("userID", response.data.userID);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        navigate('/');
      } else {
        if(response.data.userStatus === "banned")
        {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
        else{
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
          // alert(response.data.message);

        }
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
        <div className="login">
            <div className="login-form">
                <h2>Log In</h2>
                <form id='form1' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>


                    <input type="email" {...register('email',{required:true,message:"email Adress must be valid"})} placeholder='email' />
                    <p>{errors.email?.type === "required"&& "email is required"}
                    {errors.email?.message}</p>


                    <input type="text" {...register('password',{required:true})} placeholder='password' />
                    <p>{errors.password?.type === "required"&& "password is required"}
                    {errors.password?.message}</p> 
                    <button className='button-19'>Log In</button>
                </form>
                <p>Don't have an account?? <Link to='/register'>Register</Link></p>

            </div>
        </div>
    </section>
  )
}

export default Login