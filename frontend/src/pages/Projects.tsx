import { useEffect, useState } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projects";
import { fetchClients } from "../api/clients";
import Spinner from "../components/Spinner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

interface Project {
  id: number | null;
  name: string;
  clientId: number;
  userId: number;
}

interface Client {
  id: number;
  name: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Project>({
    id: null,
    name: "",
    clientId: 0,
    userId: 0,
  });

  useEffect(() => {
    loadProjects();
    loadClients();
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

  const loadProjects = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
    setLoading(false);
  };

  const loadClients = async (): Promise<void> => {
    try {
      const data = await fetchClients();
      setClients(data.data);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (form.id) {
      await updateProject(form.id, form);
    } else {
      await createProject(form);
    }
    setForm({ id: null, name: "", clientId: 0, userId: form.userId });
    loadProjects();
  };

  const handleEdit = (project: Project): void => {
    setForm(project);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deleteProject(id);
    loadProjects();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Project Name", width: 200 },
    { field: "clientId", headerName: "Client ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.row as Project)}
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
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mb-2 w-80"
          required
        />
        <select
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: Number(e.target.value) })}
          className="border p-2 mb-2 w-80"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-80">
          {form.id ? "Update" : "Create"}
        </button>
      </form>
      {loading ? <Spinner /> : <div className="w-3/4"><DataGrid rows={projects} columns={columns}  autoHeight /></div>}
    </div>
  );
};

export default Projects;