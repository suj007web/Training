'use server';

import { backendUrl } from '@/src/utils/config';
import { _fetch } from '@/src/utils/fetch';
import { User } from '@/src/interfaces/interfaces';

import { EditRequest } from '@/src/interfaces/requests';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSave(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;


    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
        const body: Record<string, string> = {};
    if (email) body.email = email;
    if (password) body.password = password;
    
    const id = formData.get('id') as string;

    const token = (await cookies()).get('token')?.value;
    const resopnse = await _fetch<Partial<User>, EditRequest>({
      url : `${backendUrl}/user/${id}`,
      method : 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body
    })

    console.log('Saving profile:', { email, password: '***' });
    console.log('Response from server:', resopnse);


    redirect('/profile');
  } catch (error) {
    console.error('Error saving profile:', error);

    throw error;
  }
}

export async function handleDelete(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    
    const token = (await cookies()).get('token')?.value;
    // Add your delete API call here
    // await _fetch({
    //   url: `${backendUrl}/user/${id}`,
    //   method: 'DELETE',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    
    console.log('Deleting user with ID:', id);
    redirect('/goodbye');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
