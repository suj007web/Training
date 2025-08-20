import { cookies } from "next/headers";

import EditProfileForm from "@/src/components/user/edit-form";
import { backendUrl } from "@/src/utils/config";
import { User } from "@/src/interfaces/interfaces";
import { _fetch } from "@/src/utils/fetch";

import { handleDelete, handleSave } from "./actions";


export default async function ProfilePage({params} : {params: Promise<{slug: string}>}) {
  const { slug } = await params;
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