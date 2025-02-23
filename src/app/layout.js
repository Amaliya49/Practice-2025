// src/app/layout.js
'use client'; 

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const [user, setUser ] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    setUser (null);
    router.push('/');
  };

  return (
    <html lang="ru">
      <body>
        <header className="bg-white shadow-md py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Фото выставка</h1>
            {user ? (
              <div>
                <span className="mr-4">{user.email}</span>
                <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">Выйти</button>
              </div>
            ) : (
              <Link href="/auth" className="mt-4 text-blue-500 text-2xl hover:text-blue-700 hover:underline transition duration-200">Войти</Link>
            )}
            <Link href="/search" className="mt-4 text-green-500 text-2xl hover:text-green-700 hover:underline transition duration-200">Галерея</Link>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-6">
          {React.cloneElement(children, { setUser  })} {/* Передаем setUser  как пропс */}
        </main>
      </body>
    </html>
  );
};

export default Layout;