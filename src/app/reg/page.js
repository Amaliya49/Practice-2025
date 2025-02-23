'use client'; 

import { useState } from 'react';
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (password !== confirmPassword) {
      alert('Пароли не совпадают'); // Проверяем, совпадают ли пароли
      return;
    }

    const newUser  = { email, password, confirmPassword }; // Создаем объект нового пользователя

    const response = await fetch('/api/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser ), // Отправляем данные на сервер
    });

    if (response.ok) {
      console.log('Пользователь успешно зарегистрирован');
      router.push('/auth'); // Редирект на страницу авторизации
    } else {
      const errorData = await response.json();
      alert(errorData.error); // Показываем сообщение об ошибке
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Регистрация</h1>
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
      <input 
        type="password" 
        placeholder="Подтвердите пароль" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        required 
        className="border border-black p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
      />
      <button className="border border-blue-500 text-blue-500 p-2 rounded w-full hover:bg-blue-500 hover:text-white transition duration-200">Зарегистрироваться</button>
      <p className="mt-4 text-center text-gray-600">
        Уже есть аккаунт? <a href='/auth' className="text-blue-500 hover:underline">Войти</a>
      </p>
    </form>
  </div>
  );
};

export default Register;