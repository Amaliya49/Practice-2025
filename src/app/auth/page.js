// src/app/auth/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || 'Ошибка входа'); // Обработка ошибок
      return;
    }

    const data = await response.json();
    document.cookie = `token=${data.user.token}; path=/`; // Сохраняем токен в куках
    router.push('/profile'); // Перенаправляем на страницу профиля
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Вход</h2>
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Войти</button>

        <p className="mt-4 text-center text-gray-600">
          Еще нет аккаунта? <a href='/reg' className="text-blue-500 hover:underline">Зарегистрироваться</a>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;