'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchPhotos = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Состояние для загрузки
  const router = useRouter();

  useEffect(() => {
    // Проверяем наличие токена при загрузке компонента
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth'); // Перенаправляем на страницу входа, если токен отсутствует
    }
  }, [router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Устанавливаем состояние загрузки

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=yJI02euQLdLNOm3k9xlfVfz2C1Xeiqea0Qs6cjOQJrM`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setPhotos(data.results);
      } else {
        setError('Фотографии не найдены');
      }
    } catch (err) {
      setError('Произошла ошибка при поиске фотографий');
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки
    }
  };

  const handleBack = () => {
    router.push('/profile'); // Переход на страницу профиля
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mt-10 mb-10">Поиск фотографий</h1>
     
      <form onSubmit={handleSearch} className="mb-4">
        <input 
          type="text" 
          placeholder="Введите название" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mb-12 rounded"
          required
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">Поиск</button> <button 
        onClick={handleBack} 
        className="mb-4 bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition duration-200"
      >
        Назад
      </button>
      </form>
      {loading && <p className="text-blue-500">Загрузка...</p>} {/* Сообщение о загрузке */}
      {error && <p className="text-red-500">{error}</p>} 
      <div className="grid grid-cols-2 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="flex flex-col items-center"> 
            <img src={photo.urls.small} alt={photo.alt_description} className="rounded-lg shadow-lg" />
            <p className="mt-2">{photo.description || 'Без описания'}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPhotos;