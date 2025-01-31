import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

// 🔹 Función para obtener el token almacenado en localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchClients = async (page = 1, filter = "") => {
    const response = await axios.get(`${API_URL}?page=${page}&filter=${filter}`, getAuthHeaders());
    return response.data;
  };
export const createClient = async (clientData: any) => {
  const response = await axios.post(API_URL, clientData, getAuthHeaders());
  return response.data;
};

export const updateClient = async (id: number, clientData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, clientData, getAuthHeaders());
  return response.data;
};

export const deleteClient = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
