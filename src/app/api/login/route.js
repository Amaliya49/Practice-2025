// src/app/api/login/route.js
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

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Все поля обязательны.' }, { status: 400 });
    }

    const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Неверные учетные данные.' }, { status: 401 });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ message: 'Успешный вход.', user: { email: user.email, token } }, { status: 200 });
  } catch (error) {
    console.error('Ошибка на сервере:', error);
    return NextResponse.json({ message: 'Внутренняя ошибка сервера.' }, { status: 500 });
  }
}