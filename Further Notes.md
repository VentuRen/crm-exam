# 📌 **Further Notes - Elección de Tecnologías en el Proyecto CRM System**  

Este documento explica por qué se eligieron **TypeScript, Tailwind CSS, JWT Bearer y Sequelize-TS** en el desarrollo del sistema **CRM System**.

---

## 🔹 **1. TypeScript**  
Se utilizó TypeScript en lugar de JavaScript debido a su tipado estático, lo que reduce errores en tiempo de ejecución y mejora la escalabilidad del código. Además, permite una mejor integración con editores de código como VS Code, facilitando la refactorización segura y el autocompletado inteligente. Su compatibilidad con las últimas versiones de JavaScript lo hace ideal para proyectos modernos.

---

## 🔹 **2. Tailwind CSS**  
Tailwind CSS fue elegido por su flexibilidad y eficiencia en la creación de estilos sin necesidad de escribir CSS repetitivo. Su enfoque basado en clases utilitarias permite un desarrollo rápido y responsivo sin depender de estilos predefinidos. También mejora el rendimiento al generar solo los estilos necesarios, reduciendo el tamaño de los archivos CSS en producción.

---

## 🔹 **3. JWT Bearer para Autenticación**  
JWT (JSON Web Token) fue implementado en la autenticación debido a su naturaleza stateless, lo que elimina la necesidad de almacenar sesiones en el servidor. Su compatibilidad con APIs REST lo hace ideal para sistemas con frontend y backend separados. Además, permite la integración con autenticación basada en roles para restringir el acceso a ciertos endpoints según el tipo de usuario.

---

## 🔹 **4. Sequelize-TS (TypeScript ORM)**  
Sequelize-TS fue elegido como ORM por su integración con TypeScript, lo que permite definir modelos con decoradores y facilitar la validación de datos. Su compatibilidad con bases de datos SQL como PostgreSQL garantiza flexibilidad en la gestión de migraciones y seeds. Además, ofrece una estructura clara para la definición de relaciones entre entidades, lo que mejora la organización del código y facilita la escalabilidad del sistema.