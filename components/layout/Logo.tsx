"use client"

import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className='block'>
        <span className='sm:text-2xl text-xl font-bold'>Clothes&Hair.</span>
    </Link>
  )
}

export default Logo