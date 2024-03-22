import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const useGrab = (url) => {
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)

    useEffect(()=>{
        fetch(url)
        .then((res)=>{
          if(!res.ok){
            throw Error("Error while fetching the data")
          }
          return res.json()})
        .then((data)=>{
          setData(data)
          setError(null)})
        .catch((err)=>{
          setError(err.message)
          })
      },[url])
  return {data,error}
}

export default useGrab