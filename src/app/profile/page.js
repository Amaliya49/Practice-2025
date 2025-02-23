'use client'; 

import { useState } from 'react';
import { useRouter } from "next/navigation";

const Profile = ({ user, onDelete }) => {
  const router = useRouter();

  const handleDeleteAccount = () => {
    if (confirm('Вы уверены, что хотите удалить свой аккаунт?')) {
      onDelete(); // Вызов функции для удаления аккаунта
      router.push('/'); // Перенаправление на главную страницу
    }
  };

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Электронная почта: {user.email}</p>
      <button onClick={handleDeleteAccount} className="mt-4 bg-red-500 text-white p-2 rounded">Удалить аккаунт</button>
    </div>
  );
};

export default Profile;