import axios from "axios";

const MEETINGS_API = "http://localhost:5000/api/meetings";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchMeetings = async () => {
  const response = await axios.get(MEETINGS_API, getAuthHeaders());
  return response.data;
};

export const createMeeting = async (meeting: { date: string; projectId: number; userId: number }) => {
  const response = await axios.post(MEETINGS_API, meeting, getAuthHeaders());
  return response.data;
};

export const updateMeeting = async (id: number, meeting: { date: string }) => {
  const response = await axios.put(`${MEETINGS_API}/${id}`, meeting, getAuthHeaders());
  return response.data;
};

export const deleteMeeting = async (id: number) => {
  const response = await axios.delete(`${MEETINGS_API}/${id}`, getAuthHeaders());
  return response.data;
};