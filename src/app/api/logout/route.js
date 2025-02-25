import { signOut } from "next-auth/react";

// Внутри AuthLinks
const handleLogout = async () => {
  await signOut(); // Используем метод signOut для выхода
  window.location.reload(); // Перезагружаем страницу, чтобы обновить состояние
};