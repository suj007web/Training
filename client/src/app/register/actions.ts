'use server';
import { redirect } from 'next/navigation';

import { backendUrl } from '@/src/utils/config';
import { _fetch } from '@/src/utils/fetch';

export async function registerAction(formData: FormData) {

  
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  console.log('Registration attempt:', { username, email, password, confirmPassword });
  

  if (password !== confirmPassword) {    
    console.error('Passwords do not match');
    redirect(`/register?error=${encodeURIComponent('Passwords do not match')}`);
  }
  
  const response = await _fetch({
    url : `${backendUrl}/user/register`,
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body : {
      username,
      email,
      password,
    }
  })

  if(response.error){
    console.error('Registration failed:', response.error);
    redirect(`/register?error=${encodeURIComponent(response.error)}`);
  }
  console.log('Registration response:', response.data);
  redirect(`/login/?success=User+Registered+successfully`);

}

