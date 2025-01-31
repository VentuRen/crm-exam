import { Request, Response } from "express";
import Project from "../models/Project";
import Client from "../models/Client";
import User from "../models/User";

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, clientId, userId } = req.body;

    if (!name || !clientId || !userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newProject = await Project.create({ name, clientId, userId });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Error creating the project" });
  }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.findAll({
      include: [Client, User], // 🔹 Incluir relaciones con Client y User
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving projects" });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, { include: [Client, User] });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the project" });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, clientId, userId } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    await project.update({ name, clientId, userId });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error updating the project" });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the project" });
  }
};
