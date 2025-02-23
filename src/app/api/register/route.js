import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const dataPath = path.join(process.cwd(), 'data.json');

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
  
  // Создание нового пользователя
  const newUser  = { email, password: hashedPassword };
  users.push(newUser );
  
  // Запись обновленного списка пользователей в файл
  writeUsers(users);

  return new Response(JSON.stringify({ message: 'Пользователь успешно зарегистрирован.' }), { status: 201 });
}