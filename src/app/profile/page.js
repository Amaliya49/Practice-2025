'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Profile = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/auth'); // Перенаправляем на страницу авторизации, если токена нет
    } else {
      const tokenValue = token.split('=')[1];
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // используется для извлечения и декодирования полезной нагрузки из JWT, чтобы получить доступ к данным, содержащимся в токене
      //atob - это встроенная функция JavaScript, которая декодирует строку, закодированную в Base64.
      setEmail(decodedToken.email); // Устанавливаем email пользователя
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Удаляем токен
    router.push('/'); // Перенаправляем на главную страницу
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Пароль успешно изменен');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      handleLogout(); // Выход из системы после удаления аккаунта
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile">
      <form onSubmit={handleChangePassword} className='form-pass'>
        <p className='title'>Смена пароля</p>
        <hr></hr>
        <input
          type="password"
          placeholder="Пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br></br><br></br>
        <input
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <br></br><br></br>
        <button type="submit" className='change-btn'>
          Сменить 
          <Image 
            src="/images/Vector.png" 
            alt="Стрелочка" 
            width={15} 
            height={13}
          /> 
        </button>
        <br></br>
        <button onClick={handleDeleteAccount} className='del-btn'>Удаление аккаунта</button>
      </form>

      <Image 
        src="/images/profile.png" 
        alt="background" 
        width={488} 
        height={680}
      /> 
    </div>
  );
};

export default Profile;