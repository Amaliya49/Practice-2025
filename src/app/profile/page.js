'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/auth'); // Перенаправляем на страницу авторизации, если токена нет
    } else {
      const tokenValue = token.split('=')[1];
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // Декодируем токен
      setEmail(decodedToken.email); // Устанавливаем email пользователя
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Удаляем токен
    router.push('/'); // Перенаправляем на главную страницу
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Пароль успешно изменен');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      handleLogout(); // Выход из системы после удаления аккаунта
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <form className="mt-10 mb-16">
         <h1 className="text-2xl">Добро пожаловать, {email}</h1>
         <button onClick={handleDeleteAccount} className="mt-4 bg-red-600 text-white p-2 rounded">Удалить аккаунт</button>
      </form>
       

      <h2 className="text-xl">Изменить пароль</h2>
      <form onSubmit={handleChangePassword} className="mt-4">
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-1 mb-2 rounded w-64" // Уменьшены отступы и ширина
          required
        />
        <br></br>
        <input
          type="password"
          placeholder="Подтвердите новый пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-1 mb-2 rounded w-64" // Уменьшены отступы и ширина
          required
        />
        <br></br>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Изменить пароль</button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

    </div>
  );
};

export default Profile;