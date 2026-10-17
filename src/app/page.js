import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import AuthButton from './api/auth/authButton'

const page = () => {
  return (
    <div>
      heyy
      <p>Welcome to the home page</p>
      <AuthButton />
    
    </div>
  )
}

export default page
