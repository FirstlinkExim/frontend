"use client"

import Products from '@/components/products/Products'
import useProducts from '@/hooks/data-queries/useProducts'
import useCart from '@/hooks/mutations/useCart'
import useWishlist from '@/hooks/queries/useWishlist'
import React from 'react'
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

const Home = () => {
 
  
  
  useWishlist()
 
  
  return (
    <div>
      <div className='container py-4'>
        <Products />
      </div>
    </div>
  )
}

export default Home