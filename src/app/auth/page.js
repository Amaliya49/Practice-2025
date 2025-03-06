// src/app/auth/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className="authRegPage">
      <form onSubmit={handleLogin}>
        <h1>Добро пожаловать!</h1>
        <p className='under-h1'>Доступ к миллионам изображений за пару кликов</p>
        <br></br><br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <hr></hr>
        <br></br><br></br>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <hr></hr>
        <p className="link"> 
          <a href='/reg'>Еще нет учетной записи?</a>
        </p>       
        <br></br><br></br>
        <button type="submit">
          Войти
          <Image 
            src="/images/Vector.png" 
            alt="Стрелочка" 
            width={15} 
            height={13}
          /> 
        </button>
      </form>
      <Image 
        src="/images/auth-reg.png" 
        alt="background" 
        width={350} 
        height={874}
        className='mr-64'
      /> 
    </div>
  );
};

export default AuthPage;