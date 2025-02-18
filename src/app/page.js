'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import UserCard from "./components/userCard";

const usersLimit = 10; // Количество отображающихся пользователей

const Home = () => {
  const [users, setUsers] = useState([]); // Массив для отображения пользователей
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [search, setSearch] = useState(''); // Строка поиска
  const [timeoutId, setTimeoutId] = useState(null); // Идентификатор таймера
  const [totalPages, setTotalPages] = useState(0); // Общее количество страниц

  const router = useRouter();

  // Загрузка данных из API
  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/search?q=${search}&limit=${usersLimit}&skip=${(currentPage - 1) * usersLimit}`);
        
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
        setTotalPages(Math.ceil(data.total / usersLimit)); // Устанавливаем общее количество страниц
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      }
    };
    userFetch();
  }, [currentPage, search]); // Обновление происходит при каждом изменении currentPage и search
  
  // Обработка ввода из поля поиска
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    // Если предыдущий таймер существует, то он очищается
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Установка нового таймера
    const id = setTimeout(() => {
      setCurrentPage(1); // Сброс на первую страницу при новом поиске
    }, 1000);

    setTimeoutId(id);
  };

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    // Если токена нет, перенаправляем на страницу входа
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  // Создание массива с номерами страниц
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  // Возврат данных, вывод на стр
  return (
    <div>
      <center>
        <input 
          type="text" placeholder="Поиск пользователей" 
          className="px-40 py-2 border border-solid border-gray-400 rounded-md mt-8" 
          value={search} 
          onChange={handleSearch} 
        />
      </center> 
      <div className="user-list flex justify-center flex-wrap">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="pagination flex justify-center">
        {pages.map(page => (
          <button 
            key={page} 
            onClick={() => setCurrentPage(page)} 
            className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-green-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;