'use client'; 

import { useState } from 'react';

// Определяем функциональный компонент SearchPhotos
const SearchPhotos = () => {
  // Создаем состояния для запроса, фотографий и ошибок
  const [query, setQuery] = useState(''); // Состояние для хранения текста запроса
  const [photos, setPhotos] = useState([]); // Состояние для хранения массива найденных фотографий
  const [error, setError] = useState(''); // Состояние для хранения сообщения об ошибке

  // Функция для обработки поиска фотографий
  const handleSearch = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    setError(''); // Сбрасываем предыдущее сообщение об ошибке

    try {
      // Выполняем запрос к API Unsplash с введенным пользователем запросом
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=yJI02euQLdLNOm3k9xlfVfz2C1Xeiqea0Qs6cjOQJrM`);
      const data = await response.json(); // Преобразуем ответ в JSON

      // Проверяем, есть ли результаты
      if (data.results && data.results.length > 0) {
        setPhotos(data.results); // Обновляем состояние фотографий с полученными результатами
      } else {
        setError('Фотографии не найдены'); // Устанавливаем сообщение об ошибке, если фотографии не найдены
      }
    } catch (err) {
      setError('Произошла ошибка при поиске фотографий'); // Устанавливаем сообщение об ошибке в случае исключения
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mt-10 mb-10">Поиск фотографий</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input 
          type="text" 
          placeholder="Введите название" 
          value={query} // Привязываем значение поля ввода к состоянию query
          onChange={(e) => setQuery(e.target.value)} // Обновляем состояние query при изменении ввода
          className="border p-2 mb-12 rounded"
          required // Указываем, что это поле обязательно для заполнения
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">Поиск</button>
      </form>
      {error && <p className="text-red-500">{error}</p>} 
      <div className="grid grid-cols-2 gap-4">
        {photos.map(photo => ( // Перебираем массив фотографий и отображаем каждую
          <div key={photo.id} className="flex flex-col items-center"> 
          {/*Уникальный ключ для каждого элемента списка, что помогает React эффективно обновлять и рендерить элементы.
           Использование photo.id гарантирует, что каждый элемент будет уникальным.*/} 
            <img src={photo.urls.small} alt={photo.alt_description} className="rounded-lg shadow-lg" />
            <p className="mt-2">{photo.description || 'Без описания'}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPhotos;