// src/app/api/account/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Определяем путь к файлу data.json
const dataPath = path.join(process.cwd(), 'data.json');

export async function DELETE(req) {
  const { email } = await req.json();

  // Проверяем, что email заполнен
  if (!email) {
    return NextResponse.json({ message: 'Email обязателен.' }, { status: 400 });
  }

  // Читаем пользователей из файла
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const updatedUsers = users.filter(user => user.email !== email); // Удаляем пользователя

  // Если пользователь не найден
  if (users.length === updatedUsers.length) {
    return NextResponse.json({ message: 'Пользователь не найден.' }, { status: 404 });
  }

  // Сохраняем обновленных пользователей в файл
  fs.writeFileSync(dataPath, JSON.stringify(updatedUsers, null, 2));

  return NextResponse.json({ message: 'Аккаунт успешно удален.' }, { status: 200 });
}