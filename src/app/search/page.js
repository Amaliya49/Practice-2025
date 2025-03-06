'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSearch}>
          <h1>Поиск фотографий</h1>
          <hr></hr>
          <input 
            type="text" 
            placeholder="Введите название" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mb-12 rounded"
            required
          />
          <button type="submit" className='mt-22'>
            <Image 
              src="/images/Vector2.png" 
              alt="Стрелочка" 
              width={40} 
              height={0}
            /> 
          </button>
        </form>
      </div>
      {loading && <p className="text-blue-500">Загрузка...</p>}
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