'use client'

import { useEffect } from "react";

export const FetchMocks = () => {


    useEffect(() => {
      fetchMocks()
    }, [])
    



    const fetchMocks = async () => {

         const response = await fetch('api/episodes', {
            method: 'POST',
            headers:{},
            body: JSON.stringify({name: 'Cristian', cost: '12300usd'})
         });
         const data = await response.json();  
         console.log(data) ;
         debugger;
    }


  return (
    <div>FetchMocks</div>
  )
}