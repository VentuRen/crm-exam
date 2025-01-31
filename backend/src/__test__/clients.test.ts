import request from "supertest";
import app from "../server";
import  sequelize  from "../database";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Resetea la base de datos
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión después de los tests
});

describe("Client API Endpoints", () => {
  let authToken: string;

  beforeAll(async () => {
    // Registrar un usuario y obtener un token
    const userResponse = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    });
    authToken = userResponse.body.token;
  });

  it("should create a new client", async () => {
    const response = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Client 1",
        email: "client1@example.com",
        phone: "1234567890",
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Client 1");
  });

  it("should retrieve all clients", async () => {
    const response = await request(app)
      .get("/api/clients")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should retrieve a client by ID", async () => {
    const createResponse = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Client 2",
        email: "client2@example.com",
        phone: "9876543210",
        userId: 1,
      });

    const clientId = createResponse.body.id;
    const response = await request(app)
      .get(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Client 2");
  });

  it("should update a client", async () => {
    const createResponse = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Client 3",
        email: "client3@example.com",
        phone: "1111111111",
        userId: 1,
      });

    const clientId = createResponse.body.id;
    const response = await request(app)
      .put(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Client",
        email: "updated@example.com",
        phone: "2222222222",
        userId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Client");
  });

  it("should delete a client", async () => {
    const createResponse = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Client 4",
        email: "client4@example.com",
        phone: "3333333333",
        userId: 1,
      });

    const clientId = createResponse.body.id;
    const response = await request(app)
      .delete(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Client deleted successfully");
  });

  it("should not allow access without a valid token", async () => {
    const response = await request(app).get("/api/clients");
    expect(response.status).toBe(401);
  });
});
