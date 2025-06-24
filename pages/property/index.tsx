import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const res = await axios.get("/api/property");
    setProperties(res.data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      await axios.delete(`/api/property/${id}`);
      fetchProperties();
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Property List</h1>
      <Link href="/property/add">➕ Add New Property</Link>
      <ul>
        {properties.map((p: any) => (
          <li key={p.id}>
            <strong>{p.name}</strong> - {p.address}{" "}
            <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
