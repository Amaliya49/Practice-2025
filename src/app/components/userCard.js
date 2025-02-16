'use client'

import React from 'react';
import Link from 'next/link';

const UserCard = ({ user }) => {
  return (
    <div className='flex mx-8 my-12'>
      <Link href={`/user/${user.id}`}>
      <div className='flex flex-col text-center'>
        <img 
          src={user.image} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-40 h-40 mb-4"
        />
        <h3>{user.firstName} {user.lastName} {user.maidenName}</h3>
      </div>
      </Link>
    </div>
  );
};

export default UserCard;