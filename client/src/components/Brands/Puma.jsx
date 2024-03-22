import React from 'react'
import ShoeStack from '../ShoeStack'
import useGrab from '../useGrab'
import useGetBrand from './useGetBrand'


const Puma = () => {
  const {product:shoes,loading,error} = useGetBrand('Puma')
  return(
    <div className='puma'>
      {error && <div>{error}</div>}
       {shoes && <ShoeStack shoes={shoes.filter((shoes)=>shoes.brand==='puma')} title="Picks from Puma"/>}
    </div>
    
   
  )
     
  }


export default Puma