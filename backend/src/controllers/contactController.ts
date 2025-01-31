import { Request, Response } from "express";
import Contact from "../models/Contact";
import User from "../models/User";
import Meeting from "../models/Meeting";

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, userId } = req.body;

    if (!name || !email || !userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newContact = await Contact.create({ name, email, userId });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Error creating the contact" });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.findAll({
      include: [User, Meeting], // 🔹 Incluir relaciones
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving contacts" });
  }
};

export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id, { include: [User, Meeting] });

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the contact" });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, userId } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    await contact.update({ name, email, userId });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error updating the contact" });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    await contact.destroy();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the contact" });
  }
};
