import React from 'react'
import ResetPasswordForm from '../components/user/reset-form'
import { loginAction } from '../login/action'
import { resetAction } from './action'
import { cookies } from 'next/headers'

const ResetPassword = async({searchParams} : {
  searchParams : { [key : string]: string | string[] | undefined } 
}) => {
  const token = searchParams.token as string | undefined;

  return (
    <div>
      <ResetPasswordForm resetAction={resetAction} token={token  as string}  />
    </div>
  )
}

export default ResetPassword
