import { Request, Response } from "express";
import Meeting from "../models/Meeting";
import Project from "../models/Project";
import User from "../models/User";
import Contact from "../models/Contact";

export const createMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, userId, projectId } = req.body;

    if (!date || !userId || !projectId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newMeeting = await Meeting.create({ date, userId, projectId });
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Error creating the meeting" });
  }
};

export const getMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await Meeting.findAll({
      include: [Project, User, Contact], // 🔹 Incluir relaciones
    });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving meetings" });
  }
};

export const getMeetingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id, { include: [Project, User, Contact] });

    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }

    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the meeting" });
  }
};

export const updateMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, userId, projectId } = req.body;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }

    await meeting.update({ date, userId, projectId });
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: "Error updating the meeting" });
  }
};

export const deleteMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }

    await meeting.destroy();
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the meeting" });
  }
};
