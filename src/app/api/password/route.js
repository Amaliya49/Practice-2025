// src/app/api/password/route.js
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// Определяем путь к файлу data.json
const dataPath = path.join(process.cwd(), 'data.json');

export async function POST(req) {
  const { email, newPassword } = await req.json();

  // Проверяем, что оба поля заполнены
  if (!email || !newPassword) {
    return NextResponse.json({ message: 'Все поля обязательны.' }, { status: 400 });
  }

  // Читаем пользователей из файла
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'Пользователь не найден.' }, { status: 404 });
  }

  // Хешируем новый пароль
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  users[userIndex].password = hashedPassword; // Обновляем пароль пользователя

  // Сохраняем обновленных пользователей в файл
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: 'Пароль успешно изменен.' }, { status: 200 });
}