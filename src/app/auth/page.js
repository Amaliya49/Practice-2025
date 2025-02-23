// src/app/auth/page.js
'use client'; 

import { useState } from 'react';
import { useRouter } from "next/navigation";

const Login = ({ setUser  }) => { // Принимаем setUser  как пропс
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const response = await fetch('/api/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Отправляем данные на сервер
    });

    if (response.ok) {
      const user = await response.json(); // Получаем данные пользователя
      setUser (user); // Устанавливаем пользователя
      router.push('/profile'); // Перенаправление на страницу профиля
    } else {
      const errorData = await response.json();
      alert(errorData.error); // Показываем сообщение об ошибке
    }

    // Сброс полей формы после входа
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Вход</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input 
          type="email" 
          placeholder="Электронная почта" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="border border-black p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="border border-black p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="border border-blue-500 text-blue-500 p-2 rounded w-full hover:bg-blue-500 hover:text-white transition duration-200">Войти</button>
        <p className="mt-4 text-center text-gray-600">
          Нет аккаунта? <a href='/reg' className="text-blue-500 hover:underline">Зарегистрироваться</a>
        </p>
      </form>
    </div>
  );
};

export default Login;