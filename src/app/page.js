// src/app/page.js
'use client'; 

import Image from 'next/image';
import React from 'react';
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  // Вызываем alert при загрузке страницы
  React.useEffect(() => {
    alert("Добро пожаловать на Фото выставку!");
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen"> 
      {/* <h1 className="text-3xl font-bold text-gray-500 mt-10 mb-6">Добро пожаловать на Фото выставку!</h1>  */}
      <Image 
        src="/photo.jpeg" 
        alt="Привлекательная картинка" 
        width={1000} 
        height={500} // Указываем высоту изображения
        className="rounded-lg shadow-lg" 
      /> 
    </div>
  );
};

export default HomePage;