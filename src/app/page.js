// src/app/page.js
'use client'; 

import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  // Вызываем alert при загрузке страницы
  React.useEffect(() => {
    alert("Добро пожаловать на Фото выставку!");
  }, []);

  return (
    <div className="flex flex-col items-center"> 
      <Image 
        src="/photo.jpeg" 
        alt="Привлекательная картинка" 
        width={1000} 
        height={500}
        className="rounded-lg shadow-lg" 
      /> 
    </div>
  );
};

export default HomePage;