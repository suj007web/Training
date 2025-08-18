"use server"
import { backendUrl } from '@/src/utils/config';
import { _fetch } from '@/src/utils/fetch';
import { cookies } from 'next/headers';


export type Theme = {
  id: number,
  name: string,
  userId: string
}


export async function saveThemeChoice(formData: FormData) {


  const selectedTheme = formData.get('theme-selection') as string;

  if (!selectedTheme) {
    console.error('No theme selected');
    return;
  }
  const cookieStore = await cookies();

  const response = await _fetch<Theme>({
    url: `${backendUrl}/theme/update`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieStore.get('token')?.value}`
    },
    body: {
      name: selectedTheme,
    }
  })

  console.log(response)

  if (response.error) {
    console.error('Error saving theme:', response.error);
    return;
  }
  const themeName = response.data?.name
  if (!themeName) {
    throw new Error('Theme name is missing in the response');
  }




  // Save the theme choice to cookies 
  cookieStore.set('selectedTheme', selectedTheme, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  console.log('Theme saved:', selectedTheme);


}

export async function setDefaultTheme(formData: FormData) {
  console.log("Hello World")

  const defaultTheme = 'theme1';


  const cookieStore = await cookies();
  cookieStore.set('selectedTheme', defaultTheme, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  console.log('Theme set to default:', defaultTheme);


}

export async function getCurrentTheme(): Promise<string> {


  const cookieStore = await cookies();
  const savedTheme = cookieStore.get('selectedTheme');

  return savedTheme?.value || 'theme1';
}
