import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import axios from 'axios'
import { useCookies } from 'react-cookie';

const AddProduct = () => {
    const {register,handleSubmit,setValue,formState: {  errors },reset} = useForm()
    const [cookies,setCookies] = useCookies(["admin_token"])

    const onSubmit = async(data)=>{
        try
        {
            const response = await axios.post(`http://localhost:3001/admin/product`,data,{headers:{authorization:cookies.admin_token}})
            console.log(response.data)
            alert(response.data.message)   
            reset() 
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
  return (
    <section>
        <div className="Add-Product">
            {cookies.admin_token && 
            <div className="add-form">
                <h2>Add new Product</h2>
                <form id='form1' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register('name',{required:true,})}  placeholder='Product Name' />
                    {errors.name && <p>Name is required</p>}

                    <input type="text" {...register('brand',{required:true})} placeholder='Brand' />
                    {errors.brand && <p>Brand is required</p>}


                    <input type="number" {...register('price',{required:true})} placeholder='Price' />
                    {errors.price && <p>Price is required</p>}


                    <input type="text" {...register('rating',{required:true})} placeholder='Rating' />
                    {errors.rating && <p>Rating is required</p>}

                    <input type="text" {...register('img',{required:true})} placeholder='Product Image 1' />
                    {errors.img && <p>Product Image URL is required</p>}

                    <input type="text" {...register('img2',{required:true})} placeholder='Product Image 2' />
                    {errors.img2 && <p>Product Image URL is required</p>}

                    <input type="text" {...register('img3',{required:true})} placeholder='Product Image 3' />
                    {errors.img3 && <p>Product Image URL is required</p>}

                    <textarea {...register('desc',{required:true})} placeholder='Description' />
                    {errors.desc && <p>Description is required</p>}

                    
                    <button className='btn'>Add Product</button>
                </form>

            </div>
             } 
        </div>
    </section>
  )
}

export default AddProduct