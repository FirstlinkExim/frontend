"use client"

import Navbar from '@/components/layout/Navbar'
import useProducts from '@/hooks/data-queries/useProducts'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode}) => {
  const {products} = useProducts()
  console.log(products);
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default RootLayout