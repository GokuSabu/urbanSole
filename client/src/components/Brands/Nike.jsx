import React from 'react'
import ShoeStack from '../ShoeStack'
import useGrab from '../useGrab'
import useGetBrand from './useGetBrand'


const Nike = () => {
  const {product:shoes,loading,error} = useGetBrand('Nike')
  return(
    <div className='nike'>
      {error && <div>{error}</div>}
       {shoes && <ShoeStack shoes={shoes.filter((shoes)=>shoes.brand==='nike')} title="Picks from Nike"/>}
    </div>
    
   
  )
     
  }


export default Nike