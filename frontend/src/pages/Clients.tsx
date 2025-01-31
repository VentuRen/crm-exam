import { useEffect, useState } from "react";
import { fetchClients, createClient, updateClient, deleteClient } from "../api/clients";
import Spinner from "../components/Spinner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

interface Client {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  userId: number;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Client>({ id: null, name: "", email: "", phone: "", userId: 0 });
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
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

  const loadClients = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchClients(page, filter);
      setClients(data.data);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (form.id) {
      await updateClient(form.id, form);
    } else {
      await createClient(form);
    }
    setForm({ id: null, name: "", email: "", phone: "", userId: form.userId });
    loadClients();
  };

  const handleEdit = (client: Client): void => {
    setForm(client);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deleteClient(id);
    loadClients();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row as Client)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={() => handleDelete(params.row.id as number)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Clients</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 mb-2 w-80" required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 mb-2 w-80" required />
          <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border p-2 mb-2 w-80" required />
          <input type="text" placeholder="User ID" value={form.userId} disabled className="border p-2 mb-2 w-80 bg-gray-100 cursor-not-allowed" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-80">{form.id ? "Update" : "Create"}</button>
        </form>
        <div className="flex justify-between w-full mb-4">
        <input 
            type="text"
            placeholder="Search Clients"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2"
        />
        <button onClick={() => loadClients()} className="bg-blue-500 text-white p-2 rounded">
            Search
        </button>
        </div>

        <div className="flex justify-between w-full mt-4">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-500 text-white p-2 rounded">
            Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} className="bg-gray-500 text-white p-2 rounded">
            Next
        </button>
        </div>
        {loading ? <Spinner /> : <div className="w-3/4"><DataGrid rows={clients} columns={columns}  autoHeight /></div>} 
      </div>
    </div>
  );
};

export default Clients;
