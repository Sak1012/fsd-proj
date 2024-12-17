"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  date_of_joining: string;
};

export default function EditEmployee() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    date_of_joining: "",
  });

  const router = useRouter();
  const { emp_id } = useParams(); // Fetch the emp_id from the URL

  useEffect(() => {
    if (!emp_id) return; // If there's no emp_id in the URL, do nothing

    const fetchEmployeeData = async () => {
      try {
        // Fetch employee data by emp_id from the new API route
        const res = await fetch(`/api/employees/${emp_id}`);
        const data = await res.json();

        if (res.status !== 200 || data.error) {
          setError(data.error || "Failed to fetch employee data.");
          return;
        }

        setEmployee(data);
        setFormData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch employee data.");
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [emp_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/employees/${emp_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update employee data.");
    }
  };

  if (isLoading) {
    return <p>Loading employee data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="flex flex-col p-24 w-full items-center justify-center">
      <h1 className="text-4xl font-bold">Edit Employee</h1>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="department" className="font-semibold">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="designation" className="font-semibold">Designation</label>
          <input
            type="text"
            name="designation"
            id="designation"
            value={formData.designation}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date_of_joining" className="font-semibold">Date of Joining</label>
          <input
            type="date"
            name="date_of_joining"
            id="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="py-2 px-4 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </main>
  );
}
