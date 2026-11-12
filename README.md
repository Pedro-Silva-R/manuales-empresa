# 📚 Centro de Documentación · Analytics & BI

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat&logo=cloudflare&logoColor=white)

Portal web estático, ligero y seguro, diseñado para centralizar guías técnicas (Power BI, Microsoft Fabric, procesos operativos) y estándares del equipo de Operaciones & Analytics, superando las restricciones de diseño y gobernanza de SharePoint.

---

## 🚀 Características Principales

- **Diseño Corporativo Pulido:** Paleta equilibrada en tonos deep blue (`#283897`, `#2A295C`), acentos rojos controlados (`#EE0000`), tipografía *Open Sans* y tarjetas con bordes redondeados inferiores.
- **Acceso Restringido (Visual Gatekeeper):** Mecanismo de autenticación del lado del cliente con persistencia de sesión vía `sessionStorage`.
- **Arquitectura Modular:** Separación limpia de estructura (`index.html`), estilos (`assets/css/style.css`) y lógica de interacción (`assets/js/app.js`).
- **Accesibilidad y RWD:** Cumplimiento de pautas semánticas, contraste adecuado y diseño adaptado a dispositivos móviles.
- **Integración CSP para Embedding:** Configurado mediante `_headers` para permitir incrustación segura en entornos corporativos de Microsoft 365 y SharePoint sin riesgos de clickjacking.

---

## 📂 Estructura del Proyecto

```text
/
├── _headers              # Cabeceras HTTP y reglas CSP para Cloudflare Pages
├── .gitignore            # Exclusión de backups y documentación confidencial
├── index.html            # Estructura principal y maquetación semántica
├── README.MD             # Documentación general del repositorio
└── assets/
    ├── css/
    │   └── style.css     # Tokens de diseño, layout fluido y componentes
    └── js/
        └── app.js        # Lógica de autenticación, animaciones e interacciones
```

---

## 🛠️ Requisitos Previos

No se requieren compiladores ni entornos de ejecución pesados (Node.js, npm, bundlers). Únicamente se necesita:

- Un navegador web moderno (Edge, Chrome, Firefox, Safari).
- Un servidor web estático local (opcional para desarrollo, ej. extensión *Live Server* en VS Code o `python -m http.server`).

---

## 💻 Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Pedro-Silva-R/manuales-empresa.git
   cd manuales-empresa
   ```

2. **Ejecutar localmente:**
   - Si utilizas Visual Studio Code, haz clic derecho en `index.html` y selecciona **Open with Live Server**.
   - O mediante Python:
     ```bash
     python -m http.server 8080
     ```
   - Abre tu navegador en `http://localhost:8080`.

3. **Credenciales de acceso local:**
   - La contraseña por defecto para el gatekeeper se encuentra definida en el archivo `assets/js/app.js` (`CONFIG.PASSWORD`).

---

## 🌐 Despliegue

El proyecto se despliega automáticamente a través de **Cloudflare Pages**:
- **Rama de producción:** `main`
- **Configuración de compilación:** Ninguna (sitio estático en raíz).
