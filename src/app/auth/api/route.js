import { NextResponse } from 'next/server'; //позволяет формировать ответы на запросы

//асинхронная функция, отвечающая на входящие POST-запросы к API
export async function POST(req) {
  const { username, password } = await req.json(); //извлечение username и password из тела запроса

  //отправляем POST-запрос на API dummyjson для авторизации пользователя
  const response = await fetch('https://dummyjson.com/auth/login', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username, 
      password,
      expiresInMins: 30, //время жизни токена
    }),
    credentials: 'include' //отправляем куки вместе с запросом, которые могут использоваться для аутентификации на сервере
  });

  if (response.ok) {
    const data = await response.json(); //извлекаем данные из ответа (логин, пароль, токен)

    //ответ об успешном входе с передачей токена
    return NextResponse.json({
      success: true,
      accessToken: data.accessToken,
    });
  } 
  else {
    return NextResponse.json({
      success: false,
      message: 'Неверные учетные данные',
    }, { status: 401 });
  }
}