import React from 'react'
import ForgotForm from '../components/forgot-password'
import { forgotAction } from '@/brevo'


const ForgotPasswordPage = () => {

  return (
    <div>
        <ForgotForm forgotAction={forgotAction}/>
    </div>
  )
}

export default ForgotPasswordPage
