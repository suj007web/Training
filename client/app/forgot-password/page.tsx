import React from 'react'
import ForgotForm from '../components/user/forgot-password'
import { forgotAction } from '@/brevo'


const ForgotPasswordPage = () => {

  return (
    <div>
        <ForgotForm forgotAction={forgotAction}/>
    </div>
  )
}

export default ForgotPasswordPage
