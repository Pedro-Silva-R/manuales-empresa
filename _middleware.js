export async function onRequest(context) {
  const { request, next } = context;
  const authHeader = request.headers.get("Authorization");

  // 👉 Define aquí el usuario y la contraseña que compartirás con tu equipo
  const USERNAME = "Reporting";
  const PASSWORD = "Repo_31416*";

  // Genera la cabecera esperada en Base64
  const expectedAuth = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

  if (!authHeader || authHeader !== expectedAuth) {
    return new Response("Acceso restringido. Por favor ingresa tus credenciales.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Manuales de Operaciones"',
      },
    });
  }

  // Si la clave es correcta, entrega la página normalmente
  return await next();
}