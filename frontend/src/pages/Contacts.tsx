import { useEffect, useState } from "react";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../api/contacts";
import Spinner from "../components/Spinner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

interface Contact {
  id: number | null;
  name: string;
  email: string;
  userId: number;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Contact>({
    id: null,
    name: "",
    email: "",
    userId: 0,
  });

  useEffect(() => {
    loadContacts();
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

  const loadContacts = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (form.id) {
      await updateContact(form.id, form);
    } else {
      await createContact(form);
    }
    setForm({ id: null, name: "", email: "", userId: form.userId });
    loadContacts();
  };

  const handleEdit = (contact: Contact): void => {
    setForm(contact);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deleteContact(id);
    loadContacts();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "userId", headerName: "User ID", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.row as Contact)}
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
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mb-2 w-80"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 mb-2 w-80"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-80">
          {form.id ? "Update" : "Create"}
        </button>
      </form>
      {loading ? <Spinner /> : <div className="w-3/4"><DataGrid rows={contacts} columns={columns}  autoHeight /></div>}
    </div>
  );
};

export default Contacts;
