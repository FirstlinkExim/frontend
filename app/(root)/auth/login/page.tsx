import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="container py-4 my-8">
      <div className="max-w-lg w-full mx-auto">
        <h2 className="sm:text-2xl text-xl font-bold text-center mb-8">
          Welcome Back
        </h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage