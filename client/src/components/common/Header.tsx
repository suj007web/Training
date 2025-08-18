import Link from 'next/link'
import React from 'react'
import { logoutAction } from '@/src/app/logout/actions'
import { cookies } from 'next/headers';
import { themeMap } from '@/src/utils/config';


const Header = async() => {
  const cookieStore = await cookies();
  const themeName = cookieStore.get('selectedTheme')?.value || 'theme1';
  const color = themeMap[themeName]
  return (
    <div>
        <div className="flex text-white px-10 py-4 justify-between" style={{
          backgroundColor: `${"#"+color}`
        }}>
            <Link className='font-semibold text-2xl' href={"/"}>Control Panel</Link>
            <div className='flex gap-7'>
                <Link className='font-semibold text-2xl' href={"/edit"}>EDIT PROFILE</Link>
                <form action={logoutAction}>

                  <button className='font-semibold text-2xl cursor-pointer' type='submit'>
                    LOGOUT
                  </button>
             

                </form>
            </div>
        </div>
    </div>
  )
}

export default Header