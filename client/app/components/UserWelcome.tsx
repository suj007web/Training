import React from 'react'

const UserWelcome = () => {
    const userName = "User"; 
  return (
    <div>
        <h1 className='text-xl font-semibold '>
            Welcome, {userName} !
        </h1>
    </div>
  )
}

export default UserWelcome