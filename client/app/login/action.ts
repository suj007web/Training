  'use server';
import { backendUrl } from '@/config';
import { _fetch } from '@/fetch';
import {  LoginData } from '@/interfaces/reponses';

import { LoginRequest } from '@/interfaces/requests';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const response = await _fetch<LoginData, LoginRequest>({
    url: `${backendUrl}/user/login`, 
    method: 'POST',
    body: {
      username,
      password,
    },
  })
  const cookieStore = await cookies();
  cookieStore.set('token', response.data?.accessToken || '', {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  })
  console.log('Login attempt:', { username, password });
  console.log(response)

  if( response.error ) {
    console.error('Login failed:', response.error);
    redirect(`/login?error=${encodeURIComponent(response.error)}`);
  }
  const res = await _fetch<{
    id : number,
    name : string,
    userId : string
  }>({
    url : `${backendUrl}/theme/getTheme`,
    method: 'GET',
    headers :{
      'Authorization': `Bearer ${cookieStore.get('token')?.value}`
    }
  })

  cookieStore.set('selectedTheme', res.data?.name || 'theme1', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  console.log(res)
  redirect(`/?success=Logged+in+successfully`);  
}