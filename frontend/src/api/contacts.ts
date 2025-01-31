import axios from "axios";

const CONTACTS_API = "http://localhost:5000/api/contacts";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchContacts = async () => {
  const response = await axios.get(CONTACTS_API, getAuthHeaders());
  return response.data;
};

export const createContact = async (contact: { name: string; email: string; userId: number }) => {
  const response = await axios.post(CONTACTS_API, contact, getAuthHeaders());
  return response.data;
};

export const updateContact = async (id: number, contact: { name: string; email: string }) => {
  const response = await axios.put(`${CONTACTS_API}/${id}`, contact, getAuthHeaders());
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await axios.delete(`${CONTACTS_API}/${id}`, getAuthHeaders());
  return response.data;
};
