// src/app/auth/page.js
'use client'; 

import { useState } from 'react'; //хук для управления состоянием
import { useRouter } from 'next/navigation'; //хук для навигации между страницами

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();//объект, который осуществляет навигацию м/у страницами

  //асинхроннуя функция для обработки отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); //предотвращаем перезагрузку страницы при отправке формы
    setLoading(true); //устанавливаем состояние загрузки в true, чтобы показать пользователю, что идет процесс входа

    //отладка: выводим данные, которые отправляем на сервер
    console.log('Отправка данных:', { username, password });

    //отправляем POST-запрос на сервер для авторизации с логином и паролем
    const response = await fetch('/auth/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, 
        password,
        expiresInMins: 30, 
      }),
      credentials: 'include' 
    });

    const data = await response.json(); //получаем данные из ответа сервера
    setLoading(false); //устанавливаем состояние загрузки в false, чтобы пользователь знал, что процесс завершен

    //отладка: выводим ответ от сервера
    console.log('Ответ от сервера:', data);

    if (response.ok) {
      document.cookie = `token=${data.accessToken}; path=/`; //сохранение токена в куки
      router.push('/'); //перенаправление на главную страницу
    } 
    else {
      alert(data.message || 'Ошибка входа. Проверьте свои учетные данные.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Вход</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded w-96"> 
        <input
          type="text"
          placeholder="Логин" 
          value={username} //связывает состояние компонента с полем ввода
          onChange={(e) => setUsername(e.target.value)} //обработчик изменения, который обновляет username при вводе текста
          required
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)} //обработчик изменения, который обновляет password при вводе текста
          required
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'transition duration-200'}`}
        >
          {loading ? 'Вход...' : 'Войти'} {/*текст кнопки в зависимости от состояния загрузки*/}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;