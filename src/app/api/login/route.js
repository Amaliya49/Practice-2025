// src/app/api/login/route.js
// src/app/api/login/route.js
import fs from 'fs'; 
import path from 'path'; 
import bcrypt from 'bcryptjs'; 

const dataPath = path.join(process.cwd(), 'data.json');

const readUsers = () => {
  if (!fs.existsSync(dataPath)) return []; 
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Все поля обязательны.' }), { status: 400 });
  }

  const users = readUsers();
  const user = users.find(user => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ error: 'Неверные учетные данные.' }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: 'Успешный вход.', user: { email } }), { status: 200 });
}