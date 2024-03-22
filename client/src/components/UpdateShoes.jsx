import React, { useEffect, useState } from 'react'
import '../styles/UpdateShoes.css'
import useGrab from './useGrab';
import {  useNavigate, useParams } from 'react-router-dom';

const UpdateShoes = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const { data: shoe, error } = useGrab('http://localhost:8000/shoes/' + id);
    const [values,setValues] = useState({
        id:id,
        name:'',
        brand:'',
        rating:'',
        img:'',
        img2:'',
        img3:'',
        desc:'',
        price:null

    })
  useEffect(() => {
    if (shoe) {
        setValues({
            ...values,
            name: shoe.name || '',
            brand: shoe.brand || '',
            rating: shoe.rating || '',
            img: shoe.img || '',
            img2: shoe.img2 || '',
            img3: shoe.img3 || '',
            desc: shoe.desc || '',
            price: shoe.price || null
        });
    }
    }, [shoe]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/shoes/${shoe.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(() => {
            navigate(-1);
            alert("Product has been updated")
        })
        .catch((error) => {
            console.error('Error updating shoe:', error);
        });
    };



  return (
    <div className='update-shoes'>
        <h3>Product Update</h3>
        <div className='pt-update'>
            
            <form onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <input
                type='text'
                required
                value={values.name}
                onChange={((e)=>{setValues({...values,name:e.target.value})})}
                />
                <label>Brand:</label>
                <input
                type='text'
                required
                value={values.brand}
                onChange={((e)=>{setValues({...values,brand:e.target.value})})}
                />
                <label>Given Rating:</label>
                <input
                type='text'
                required
                value={values.rating}
                onChange={((e)=>{setValues({...values,rating:e.target.value})})}
                />
                <label>Product image1 url:</label>
                <input
                type='text'
                required
                value={values.img}
                onChange={((e)=>{setValues({...values,img:e.target.value})})}
                />
                <label>Product image2 url:</label>
                <input
                type='text'
                required
                value={values.img2}
                onChange={((e)=>{setValues({...values,img2:e.target.value})})}
                />
                <label>Product image3 url:</label>
                <input
                type='text'
                required
                value={values.img3}
                onChange={((e)=>{setValues({...values,img3:e.target.value})})}
                />
                <label>Product description:</label>
                <textarea
                type='text'
                required
                value={values.desc}
                onChange={((e)=>{setValues({...values,desc:e.target.value})})}
                />
                <label>Product Price:</label>
                <input
                type='number'
                required
                value={values.price}
                onChange={((e)=>{setValues({...values,price:e.target.value})})}
                />
                <button type='submit'>Update PRODUCT</button>
            </form>
        </div>
      </div>
  )
}

export default UpdateShoes