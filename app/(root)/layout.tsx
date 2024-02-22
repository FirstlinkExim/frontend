import Navbar from '@/components/layout/Navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default RootLayout