// src/app/profile/page.js
'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [email, setEmail] = useState(''); // Состояние для хранения email пользователя
  const [newPassword, setNewPassword] = useState(''); // Состояние для нового пароля

  useEffect(() => {
    // Получаем email из sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail); // Устанавливаем email пользователя
    } else {
      // Если email не найден, перенаправляем на страницу входа
      router.push('/auth');
    }
  }, [router]);

  const handleDeleteAccount = async () => {
    // Подтверждаем действие удаления аккаунта у пользователя
     if (confirm('Вы уверены, что хотите удалить свой аккаунт?')) {
      const response = await fetch('/api/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), // Отправляем email для удаления
      });

      if (response.ok) {
        sessionStorage.removeItem('userEmail'); // Удаляем email из sessionStorage
        sessionStorage.removeItem('userPass'); // Удаляем пароль из sessionStorage
        router.push('/'); // Перенаправляем на главную страницу после удаления
      } else {
        alert('Ошибка при удалении аккаунта');
      }
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      alert('Пароль успешно изменен');
      setNewPassword(''); // Очищаем поле нового пароля
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Ошибка при изменении пароля');
    }
  };

  return (
    <div className="max-w mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ваш профиль</h1>
      <p className="text-gray-700 mb-4"><b className="text-red-500">Электронная почта:</b> {email || 'Не авторизован'}</p>
      <form onSubmit={handleChangePassword} className="mb-4 flex">
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-50 p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-6 w-40 h-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Изменить пароль
        </button>
      </form>
      <button
        onClick={handleDeleteAccount}
        className="w-96 h-10 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Удалить аккаунт
      </button>
    </div>
  );
};


export default Profile;