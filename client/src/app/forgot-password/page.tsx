import React from 'react'
import ForgotForm from "@/src/components/user/forgot-password";
import { forgotAction } from './action'


const ForgotPasswordPage = () => {

  return (
    <div>
        <ForgotForm forgotAction={forgotAction}/>
    </div>
  )
}

export default ForgotPasswordPage
