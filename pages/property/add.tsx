import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AddProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    userId: 1,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/property", formData);
    router.push("/property");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center text-blue-800">
          🏠 Add New Property
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-red-300">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Property Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Green Tower"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Dhanmondi 32, Dhaka"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">User ID</label>
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
          >
            ➕ Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
