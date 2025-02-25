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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Регистрация</h2>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
          Email
        </label>
        <input 
          type="email" 
          id="email"
          placeholder="Электронная почта" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
  
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
          Пароль
        </label>
        <input 
          type="password" 
          id="password"
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
          className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
  
      <div className="mb-6">
        <label htmlFor="confirmed_password" className="block text-gray-700 text-sm font-semibold mb-1">
          Подтвердите пароль
        </label>
        <input 
          type="password" 
          id="confirmed_password"
          placeholder="Подтвердите пароль" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
          className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      
      <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200">Зарегистрироваться</button>
      
      <p className="mt-4 text-center text-gray-600">
        Уже есть аккаунт? <a href='/auth' className="text-blue-500 hover:underline">Войти</a>
      </p>
    </form>  
  );
};

export default Register;