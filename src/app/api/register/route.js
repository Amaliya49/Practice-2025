// src/app/api/register/route.js
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

const dataPath = path.join(process.cwd(), 'data.json');
const SECRET_KEY = process.env.SECRET_KEY; // Используем переменную окружения

// Функция для чтения пользователей из файла
const readUsers = () => {
  if (!fs.existsSync(dataPath)) {
    return []; // Если файл не существует, возвращаем пустой массив
  }
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Функция для записи пользователей в файл
const writeUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// Обработка POST-запроса для регистрации
export async function POST(req) {
  const { email, password } = await req.json();

  // Проверка обязательных полей
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Все поля обязательны.' }), { status: 400 });
  }

  const users = readUsers();
  const existingUser  = users.find(user => user.email === email);

  // Проверка на существование пользователя
  if (existingUser ) {
    return new Response(JSON.stringify({ error: 'Пользователь с таким email уже существует.' }), { status: 400 });
  }

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Генерация токена
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

  // Создание нового пользователя
  const newUser  = { email, password: hashedPassword, token };
  users.push(newUser );
  
  // Запись обновленного списка пользователей в файл
  writeUsers(users);

  return NextResponse.json({ message: 'Пользователь успешно зарегистрирован.', user: { email } }, { status: 201 });
}