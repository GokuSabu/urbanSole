import React from 'react'
import ShoeStack from '../ShoeStack'

import useGetBrand from './useGetBrand'


const Addidas = () => {
   const {product:shoes,loading,error} = useGetBrand('Addidas')
  return(
    <div className='addidas'>
      {error && <div>{error}</div>}
       {shoes && <ShoeStack shoes={shoes.filter((shoes)=>shoes.brand==='addidas')} title="Picks from addidas"/>}
    </div>
    
   
  )
     
  }


export default Addidas