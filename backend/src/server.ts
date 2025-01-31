import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database";
import clientRoutes from "./routes/clientRoutes";
import projectRoutes from "./routes/projectRoutes";
import meetingRoutes from "./routes/meetingRoutes";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

// Conectar a la Base de Datos solo si no es test
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a la base de datos.");

      await sequelize.sync({ alter: true });
      console.log("✅ Base de datos sincronizada.");

      app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("❌ Error en la conexión a la base de datos:", error);
    }
  })();
}

// ✅ Exporta `app` para los tests con Jest/Supertest
export default app;
