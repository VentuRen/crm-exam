import { Sequelize } from "sequelize-typescript";
import type { Dialect } from "sequelize"; // ✅ Importar el tipo correcto
import dotenv from "dotenv";

dotenv.config();

const dialect: Dialect = "postgres"; // ✅ Asegurar que Sequelize lo reconozca

const config = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "crm_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: dialect,// ✅ Ahora TypeScript reconoce el tipo correctamente
    logging: true,
    models: [__dirname + '/models']
  },
};

// Instancia de Sequelize
const sequelize = new Sequelize(config.development);

export default sequelize;
