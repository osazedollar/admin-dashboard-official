import { useState, type ChangeEvent, type FormEvent } from "react";
import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import ProviderSidebar from "../../components/ProviderSidebar";

export default function AddProvider() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    region: "",
    active: false,
    logo: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, logo: file }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Provider data:", form);
    alert("Provider created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex gap-6">
        {/* Sidebar */}
        <ProviderSidebar />

        {/* Main Form */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Add Delivery Provider
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="bg-gray-100 p-3 rounded-lg outline-none w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-100 p-3 rounded-lg outline-none w-full"
            />

            <input
              type="text"
              name="phone"
              placeholder="Contact Phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-gray-100 p-3 rounded-lg outline-none w-full col-span-2"
            />

            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={form.website}
              onChange={handleChange}
              className="bg-gray-100 p-3 rounded-lg outline-none w-full col-span-2"
            />

            <input
              type="text"
              name="region"
              placeholder="Region"
              value={form.region}
              onChange={handleChange}
              className="bg-gray-100 p-3 rounded-lg outline-none w-full col-span-2"
            />

            <div className="col-span-2 flex flex-col md:flex-row gap-6 items-start mt-2">
              <label className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                  {form.logo ? (
                    <img
                      src={URL.createObjectURL(form.logo)}
                      alt="logo preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">add a Logo</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logoUpload"
                />
                <label
                  htmlFor="logoUpload"
                  className="text-xs text-purple-600 mt-1 cursor-pointer"
                >
                  Upload
                </label>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="accent-purple-600 w-4 h-4"
                />
                <label className="text-gray-700 text-sm">Active</label>
              </div>

              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
