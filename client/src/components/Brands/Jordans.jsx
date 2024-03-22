import React from 'react'
import ShoeStack from '../ShoeStack'
import useGrab from '../useGrab'
import useGetBrand from './useGetBrand'


const Jordans = () => {
  const {product:shoes,loading,error} = useGetBrand('Jordans')
  return(
    <div className='jordans'>
      {error && <div>{error}</div>}
       {shoes && <ShoeStack shoes={shoes.filter((shoes)=>shoes.brand==='jordans')} title="Picks from jordans"/>}
    </div>
    
   
  )
     
  }


export default Jordans