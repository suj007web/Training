import React from 'react'

import ResetPasswordForm from '@/src/components/user/reset-form';

import { resetAction } from './action'


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
