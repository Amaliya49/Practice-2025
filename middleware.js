import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token');//извлекаем токен из cookies, чтобы проверить, авторизован ли пользователь

  //если токен отсутствует и пользователь не на странице входа, перенаправляем на страницу входа
  if (!token && request.nextUrl.pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  //если токен есть, проверяем его
  if (token) {
    const isValid = await validateToken(token);
    if (!isValid && request.nextUrl.pathname !== '/auth') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }
  //если все проверки пройдены, продолжаем
  return NextResponse.next();
}

// маршруты, где middleware будет применяться (все маршруты, кроме апи и входа)
export const config = {
  matcher: ['/((?!api|auth).*)'],
};

//функция для проверки токена
async function validateToken(token) {
  const response = await fetch('https://dummyjson.com/auth/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.ok;
}