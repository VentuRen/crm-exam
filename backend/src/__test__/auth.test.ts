import request from "supertest";
import app from "../server";
import sequelize from "../database";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Resetea la BD antes de correr los tests
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión después de los tests
});

describe("Auth API Endpoints", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should log in with valid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not log in with incorrect password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });

  it("should not log in with an unregistered email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
  });
});
