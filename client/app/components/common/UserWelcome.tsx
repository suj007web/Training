import React from 'react'

const UserWelcome = ({username} : {username : string}) => {
  return (
    <div>
        <h1 className='text-xl font-semibold '>
            Welcome, {username} !
        </h1>
    </div>
  )
}

export default UserWelcome