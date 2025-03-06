// src/app/page.js
'use client'; 

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='main'>
      <Image 
        src="/images/main-image.png" 
        alt="img" 
        width={1210} 
        height={758}
        className="image-custom"
      /> 

      <p className='p'>
        Добро пожаловать в мир неограниченного творчества!
      </p>
      <p className='p2'>
        Присоединяйтесь к тысячам креативных людей, которые уже нашли всё необходимое для своих проектов.
      </p>

      <div className='btns'>
        <Link href="/reg">
          <button className='b1'>
            Регистрация
            <Image 
                src="/images/Vector.png" 
                alt="Стрелочка" 
                width={15} 
                height={13}
            /> 
          </button>
        </Link>

        <Link href="/auth">
          <button className='b2'>
            Вход
            <Image 
                src="/images/Vector.png" 
                alt="Стрелочка" 
                width={15} 
                height={13}
            /> 
          </button>
        </Link>
      </div>

    </div>
  );
};

export default HomePage;