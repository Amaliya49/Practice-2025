import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="ru">
      <body>
        <header className="bg-white shadow-md py-4">
          <center>
            <h1 className="text-3xl font-medium">Список пользователей</h1>
          </center>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
};

export default Layout;