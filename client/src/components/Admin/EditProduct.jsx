import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const EditProduct = ({product,productID}) => {
    const {register,handleSubmit,setValue,formState: {  errors }} = useForm()
    const onSubmit = async (data)=>{
        try
        {
            const response = await axios.put(`http://localhost:3001/admin/product/${productID}`,data)
            console.log(response.data)
            alert(response.data.message)
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
    useEffect(() => {
        setValue('name', product.name);
        setValue('brand', product.brand);
        setValue('price', product.price);
        setValue('rating', product.rating);
        setValue('img', product.img);
        setValue('img2', product.img2);
        setValue('img3', product.img3);
        setValue('desc', product.desc);
    }, [product]);
  return (
    <section>
        <div className="editProduct">
            <div className="edit-form">
                <h2>Edit Product info</h2>
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

                    
                    <button className='btn'>Update info</button>
                </form>

            </div>
        </div>
    </section>
  )
}

export default EditProduct