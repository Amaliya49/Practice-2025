'use client';

import './globals.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split('; ').find(row => row.trim().startsWith('token='));
      if (token) {
        setIsAuthenticated(true); // Устанавливаем состояние аутентификации в true
      } else {
        setIsAuthenticated(false); // Устанавливаем состояние аутентификации в false
      }
    };
  
    checkAuth(); // Проверяем аутентификацию при монтировании компонента
  
    // Добавляем обработчик события для отслеживания изменений куков
    window.addEventListener('storage', checkAuth);
  
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Удаляем токен из куков
    document.cookie = 'token=; Max-Age=0; path=/'; // Удаляем токен из куков
    setIsAuthenticated(false); // Обновляем состояние
  };

  return (
    <html lang="ru">
      <body>
        <header className="bg-white">
          <nav className="container flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/images/Search.png" 
                  alt="back" 
                  width={50} 
                  height={51}
                />
                <h1 className="font-normal text-[40px] leading-[60px] ml-4" style={{ fontFamily: 'Vollkorn' }}>
                  ФОТО ВЫСТАВКА
                </h1>
              </div>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link href="/profile" className="header-link">
                  Профиль
                </Link>
                <Link href="/search" className="header-link">
                  Поиск фотографий
                </Link>
                <button onClick={handleLogout} className="header-link">
                  Выйти
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;