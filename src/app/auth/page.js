// src/app/login/page.js
'use client';

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email'); // Получаем email
    const password = formData.get('password'); // Получаем пароль

    const response = await fetch('/api/login', { // Запрос на сервер для аутентификации
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json(); // Получаем данные пользователя
      // Сохраняем email, password в sessionStorage
      sessionStorage.setItem('userEmail', userData.user.email);
      sessionStorage.setItem('userPass', userData.user.password);
      // Если успешный ответ, перенаправляем на страницу профиля
      router.push('/profile');
    } else {
      // Обработка ошибок
      const errorData = await response.json();
      alert(errorData.message || 'Ошибка входа');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Войти</h2>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Введите ваш Email"
          required
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Введите ваш пароль"
          required
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Войти
      </button>
      <p className="mt-4 text-center text-gray-600">
          Нет аккаунта? <a href='/reg' className="text-blue-500 hover:underline">Зарегистрироваться</a>
        </p>
    </form>
  );
  
}