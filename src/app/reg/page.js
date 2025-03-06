'use client'; 

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

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
    <div className="authRegPage">
      <form onSubmit={handleSubmit} className='reg-form'>
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
        <br></br><br></br>
        <input 
          type="password" 
          placeholder="Подтвердите пароль" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
        <hr></hr>
        <p className="link"> 
          <a href='/auth'>Уже есть учетная запись?</a>
        </p>       
        <br></br><br></br>
        <button type="submit" className='reg-btn'>
          Зарегистрироваться
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

export default Register;