import EditProfileForm from '@/app/components/user/edit-form';
import { handleDelete, handleSave } from './actions';
import { _fetch } from '@/fetch';
import { cookies } from 'next/headers';
import { backendUrl } from '@/config';
import { User } from '@/interfaces/interfaces';

export default async function ProfilePage({params} : {params: {slug: string}}) {
  const { slug } = params;
  console.log("Slug:", slug);

  const cookieStore = await cookies();
  const response = await _fetch<User>({
    url : `${backendUrl}/user/${slug}`,
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieStore.get('token')?.value || ''}`
    }
  });
  const user = response.data as User;

  return (
    <main className="min-h-screen p-10">
      <EditProfileForm handleSave={handleSave} handleDelete={handleDelete} userId={slug} user={user} />
    </main>
  );
}