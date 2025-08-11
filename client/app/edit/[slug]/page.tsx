import EditProfileForm from '@/app/components/edit-form';
import { handleDelete, handleSave } from './actions';

export default function ProfilePage({params} : {params: {slug: string}}) {
    const { slug } = params;
    console.log("Slug:", slug);
  return (
    <main className="min-h-screen p-10">
      <EditProfileForm handleSave={handleSave} handleDelete={handleDelete} userId={slug} />
    </main>
  );
}