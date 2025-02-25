// src/app/api/login.js
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// Определяем путь к файлу data.json
const dataPath = path.join(process.cwd(), 'data.json');

export async function POST(req) {
  const { email, password } = await req.json();

  // Проверяем, что оба поля заполнены
  if (!email || !password) {
    return NextResponse.json({ message: 'Все поля обязательны.' }, { status: 400 });
  }

  // Читаем пользователей из файла
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = users.find(user => user.email === email);

  // Проверяем существование пользователя и корректность пароля
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: 'Неверные учетные данные.' }, { status: 401 });
  }

  // Если все проверки пройдены, возвращаем успешный ответ с данными пользователя
  return NextResponse.json({ message: 'Успешный вход.', user: { email: user.email } }, { status: 200 });
}