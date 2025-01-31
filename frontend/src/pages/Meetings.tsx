import { useEffect, useState } from "react";
import {
  fetchMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../api/meetings";
import { fetchProjects } from "../api/projects";
import Spinner from "../components/Spinner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

interface Meeting {
  id: number | null;
  date: string;
  userId: number;
  projectId: number;
}

interface Project {
  id: number;
  name: string;
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Meeting>({
    id: null,
    date: "",
    userId: 0,
    projectId: 0,
  });

  useEffect(() => {
    loadMeetings();
    loadProjects();
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      try {
        const userId = JSON.parse(atob(storedUser.split(".")[1])).id;
        setForm((prevForm) => ({ ...prevForm, userId: Number(userId) }));
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const loadMeetings = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings", error);
    }
    setLoading(false);
  };

  const loadProjects = async (): Promise<void> => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (form.id) {
      await updateMeeting(form.id, form);
    } else {
      await createMeeting(form);
    }
    setForm({ id: null, date: "", userId: form.userId, projectId: 0 });
    loadMeetings();
  };

  const handleEdit = (meeting: Meeting): void => {
    setForm(meeting);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deleteMeeting(id);
    loadMeetings();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.row as Meeting)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id as number)}
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
        <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <input
          type="datetime-local"
          placeholder="Meeting Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 mb-2 w-80"
          required
        />
        <select
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: Number(e.target.value) })}
          className="border p-2 mb-2 w-80"
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-80">
          {form.id ? "Update" : "Create"}
        </button>
      </form>
      {loading ? <Spinner /> : <div className="w-3/4"><DataGrid rows={meetings} columns={columns}  autoHeight /></div>}
    </div>
  );
};

export default Meetings;
