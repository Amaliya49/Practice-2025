// src/app/layout.js
'use client';

import './globals.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в куках
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsAuthenticated(!!token); // Устанавливаем состояние аутентификации
  }, []);

  const handleLogout = async () => {
    // Вызов метода signOut из next-auth
    await signOut({ redirect: false });
    
    // Удаляем токен из куков
    document.cookie = 'token=; Max-Age=0; path=/'; // Удаляем токен из куков
    setIsAuthenticated(false); // Обновляем состояние
  };

  return (
    <html lang="ru">
      <body>
        <header className="bg-white shadow-md py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Фото выставка</h1>
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className="mt-4 text-red-500 text-2xl hover:text-red-700 transition duration-200">Выйти</button>
                <Link href="/search" className="mt-4 text-green-500 text-2xl hover:text-green-700 hover:underline transition duration-200">Галерея</Link>
              </>
            ) : (
              <Link href="/auth" className="mt-4 text-blue-500 text-2xl hover:text-blue-700 hover:underline transition duration-200">Войти</Link>
            )}
          </nav>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;