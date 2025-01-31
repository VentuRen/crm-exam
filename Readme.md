# 🚀 **CRM System**  

**CRM System** es una aplicación Full Stack desarrollada con **React (Vite) + TypeScript** en el frontend y **Node.js + Express + Sequelize + PostgreSQL** en el backend. Permite gestionar clientes, proyectos, reuniones y contactos, con autenticación JWT y control de acceso basado en roles.

---

## 📌 **Tecnologías Utilizadas**  

### **Frontend (React + Vite)**
- ⚛️ **React (Vite)** - Framework de frontend rápido y moderno.
- 🎨 **Tailwind CSS** - Diseño responsivo y estilización eficiente.
- 🔄 **React Query** - Gestión de datos asincrónicos.
- 🔐 **JWT (JSON Web Token)** - Autenticación segura.
- 🧪 **Jest + React Testing Library** - Pruebas unitarias e integración.

### **Backend (Node.js + Express)**
- 🚀 **Node.js + Express** - API REST con autenticación JWT.
- 🗄️ **Sequelize + PostgreSQL** - ORM para gestionar la base de datos.
- 🔑 **BCrypt** - Encriptación de contraseñas.
- 🧪 **Jest + Supertest** - Pruebas automatizadas para endpoints.

---

## 🛠️ **Instalación y Configuración**  

### 📌 **1. Clonar el repositorio**
```sh
git clone https://github.com/tu-usuario/crm-system.git
cd crm-system
```

### 📌 **2. Configuración del Backend**
#### **📍 Crear el archivo `.env` en `backend/`**
```sh
cd backend
touch .env
```

✏️ **Contenido del `.env`**:
```env
PORT=5000
JWT_SECRET=supersecretkey123
DB_NAME=crm_database
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
NODE_ENV=development
```

#### **📍 Instalar dependencias**
```sh
npm install
```

#### **📍 Crear y configurar la base de datos**
Ejecuta las migraciones con Sequelize CLI:
```sh
npx sequelize-cli db:migrate
```

#### **📍 Iniciar el backend**
```sh
npm run dev
```
🔗 **Servidor disponible en:** `http://localhost:5000`

---

### 📌 **3. Configuración del Frontend**
#### **📍 Moverse a la carpeta `frontend/`**
```sh
cd ../frontend
```

#### **📍 Instalar dependencias**
```sh
npm install
```

#### **📍 Configurar Tailwind CSS**
```sh
npx tailwindcss init -p
```

✏️ **Modificar `tailwind.config.js`**:
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### **📍 Iniciar el frontend**
```sh
npm run dev
```
🔗 **Aplicación disponible en:** `http://localhost:5173`

---

## 🚀 **Uso de la Aplicación**
### 📌 **1. Autenticación**
- **Registro de usuario:** `POST /api/auth/register`
- **Inicio de sesión:** `POST /api/auth/login`
- **Protección de rutas con JWT**

### 📌 **2. Gestión de Clientes**
- **Crear Cliente:** `POST /api/clients`
- **Listar Clientes:** `GET /api/clients`
- **Actualizar Cliente:** `PUT /api/clients/:id`
- **Eliminar Cliente:** `DELETE /api/clients/:id`

### 📌 **3. Gestión de Proyectos**
- **Crear Proyecto:** `POST /api/projects`
- **Listar Proyectos:** `GET /api/projects`
- **Actualizar Proyecto:** `PUT /api/projects/:id`
- **Eliminar Proyecto:** `DELETE /api/projects/:id`

### 📌 **4. Gestión de Reuniones**
- **Crear Reunión:** `POST /api/meetings`
- **Listar Reuniones:** `GET /api/meetings`
- **Actualizar Reunión:** `PUT /api/meetings/:id`
- **Eliminar Reunión:** `DELETE /api/meetings/:id`

### 📌 **5. Gestión de Contactos**
- **Crear Contacto:** `POST /api/contacts`
- **Listar Contactos:** `GET /api/contacts`
- **Actualizar Contacto:** `PUT /api/contacts/:id`
- **Eliminar Contacto:** `DELETE /api/contacts/:id`

---

## ✅ **Pruebas Automáticas**
### 📌 **Ejecutar pruebas del Backend**
```sh
cd backend
npm test
```

### 📌 **Ejecutar pruebas del Frontend**
```sh
cd frontend
npm test
```

📊 **Ver cobertura de código**:
```sh
npm test -- --coverage
```


## 👨‍💻 **Autor**
- 🚀 **Tu Nombre**
- GitHub: [github.com/tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 🎯 **Mejoras Futuras**
✅ Implementación de WebSockets para notificaciones en tiempo real.  
✅ Mejorar la UI/UX con más interactividad.  
✅ Agregar soporte multi-idioma.  

---

¡Listo! 🎉 Este README **documenta todo el proyecto** y ayuda a otros desarrolladores a **instalar, configurar y usar** la aplicación correctamente. 🚀🔥  
Si necesitas ajustes o mejoras, dime. 🎯