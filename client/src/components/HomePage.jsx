import React, { useEffect, useState } from 'react'
import '../styles/Homepage.css'
// import ShoeStack from './ShoeStack'
import useGrab from './useGrab'
import useGetProducts from '../hooks/useGetProducts'
import Caroussel from './Caroussel'
import Brands from './Brands/Brands'
import ShoeCard from './ShoeCard'
import axios from 'axios'
const HomePage = () => {
  const{product:shoes,loading,error} = useGetProducts('http://localhost:3001/products/')
  return (
    <div className='home-page'
    //  style={{ backgroundColor: '#070F2B' }}
     >
      <Caroussel/>
      <Brands/>
      {error && <div>{error}</div>}
       {shoes && <ShoeCard shoes={shoes} title="Picks for you"/>}
       {/* {shoes && <ShoeStack shoes={shoes.filter((shoes)=>shoes.brand==='addidas')} title="Picks from addidas"/>} */}
    </div>
  )
}

export default HomePage