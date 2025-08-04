import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className="flex bg-purple-500 text-white px-10 py-4 justify-between">
            <Link className='font-semibold text-2xl' href={"/"}>Control Panel</Link>
            <div className='flex gap-7'>
                <Link className='font-semibold text-2xl' href={"/edit"}>EDIT PROFILE</Link>
                <Link className='font-semibold text-2xl' href={"/logout"}>LOGOUT</Link>
            </div>
        </div>
    </div>
  )
}

export default Header