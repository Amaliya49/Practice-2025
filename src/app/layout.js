// src/app/layout.js
'use client';

import './globals.css';
import Link from 'next/link';
import React from 'react';

// Компонент Layout, который принимает дочерние компоненты (children) как пропс
const Layout = ({ children }) => {
  return (
    <html lang="ru">
      <body>
        <header className="bg-white shadow-md py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Фото выставка</h1>
            <Link href="/auth" className="mt-4 text-blue-500 text-2xl hover:text-blue-700 hover:underline transition duration-200">Войти</Link>
            <Link href="/search" className="mt-4 text-green-500 text-2xl hover:text-green-700 hover:underline transition duration-200">Галерея</Link> 
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
