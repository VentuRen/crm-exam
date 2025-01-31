import { Request, Response } from "express";
import Client from "../models/Client";
import { Op } from "sequelize";




export const createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, userId } = req.body;
  
      if (!name || !email || !phone || !userId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
  
      // ✅ Crear cliente asegurando tipos correctos
      const newClient = await Client.create({
        name,
        email,
        phone,
        userId,
      });
  
      res.status(201).json(newClient);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ error: "Error creating the client" });
    }
  };

  export const getClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page = "1", filter = "" } = req.query;
      const limit = 10;
      const offset = (Number(page) - 1) * limit;
  
      const clients = await Client.findAndCountAll({
        where: {
          name: { [Op.like]: `%${filter}%` }, // 🔹 Corrige el operador
        },
        limit,
        offset,
      });
  
      res.json({ total: clients.count, data: clients.rows });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving clients" });
    }
  };

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the client" });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    await client.update({ name, email, phone });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Error updating the client" });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    await client.destroy();
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the client" });
  }
};
