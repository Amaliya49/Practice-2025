// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // Получаем токен из куков
  const protectedRoutes = ['/profile']; // Защищенные маршруты

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', req.url)); // Перенаправляем на страницу авторизации
    }
  }

  return NextResponse.next(); // Если все проверки пройдены, продолжаем выполнение запроса
}

export const config = {
  matcher: ['/profile/:path*'], // Указываем защищенные маршруты
};