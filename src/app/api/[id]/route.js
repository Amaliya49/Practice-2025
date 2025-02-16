export async function GET(request) {
  const { searchParams } = new URL(request.url); //извлечение свойства searchParams из объекта,
  //который возвращается при создании нового экземпляра класса URL,
  //это позволяет работать с searchParams напрямую, без необходимости упоминать объект URL каждый раз

  const id = searchParams.get('id'); //извлечение значения параметра id из строки запроса

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is undefined' }), { status: 400 });
  }

  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      return new Response(errorMessage, { status: response.status });
    }

    const userData = await response.json();
    return new Response(JSON.stringify(userData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } 
  
  catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}