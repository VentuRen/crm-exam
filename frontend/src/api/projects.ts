import axios from "axios";

const PROJECTS_API = "http://localhost:5000/api/projects";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchProjects = async () => {
  const response = await axios.get(PROJECTS_API, getAuthHeaders());
  return response.data;
};

export const createProject = async (project: { name: string; clientId: number; userId: number }) => {
  const response = await axios.post(PROJECTS_API, project, getAuthHeaders());
  return response.data;
};

export const updateProject = async (id: number, project: { name: string }) => {
  const response = await axios.put(`${PROJECTS_API}/${id}`, project, getAuthHeaders());
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await axios.delete(`${PROJECTS_API}/${id}`, getAuthHeaders());
  return response.data;
};
