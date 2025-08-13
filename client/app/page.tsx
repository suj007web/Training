import UserWelcome from "./components/common/UserWelcome";
import Header from "./components/common/Header";
import ThemeSelector from "./components/theme/ThemeSelector";
import { cookies } from "next/headers";
import { parseJwt } from "@/lib/utils";
import { redirect } from "next/navigation";


export default async function Home() {

  const getToken = async()=>{
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || '';
  }
  const token = await getToken();

  if(!token){
    redirect(`/login?error=${encodeURIComponent('You must be logged in to access this page')}`);
  }
  const decodedToken = parseJwt(token);

  
  return (
    <>
      <Header/>
      <div className="mx-10 mt-5">
        <UserWelcome username = {decodedToken?.username ?? 'User'} />
        <ThemeSelector/>
      </div>

     
    </>
  );
}
