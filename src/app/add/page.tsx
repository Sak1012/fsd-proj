"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "Manager",
        date_of_joining: "",
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            alert("Employee added successfully!");
            router.push("/");
        } else {
            const error = await res.json();
            alert(`Error: ${error.error}`);
        }
    };

    return (
        <main className="flex flex-col p-24 w-full items-center justify-center">
            <h1 className="text-4xl font-bold">Add Employee</h1>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <label className="p-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Name"
                    required
                />
                <label className="p-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Email"
                    required
                />
                <label className="p-2">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Phone"
                    required
                />
                <label className="p-2">Department</label>
                <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Department"
                    required
                />
                <label className="p-2">Designation</label>
                <select
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option>Manager</option>
                    <option>Developer</option>
                    <option>HR</option>
                </select>
                <label className="p-2">Date of Joining</label>
                <input
                    type="date"
                    name="date_of_joining"
                    value={form.date_of_joining}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="p-2 w-full mt-4 bg-blue-500 text-white rounded-md">
                    Add Employee
                </button>
            </form>
        </main>
    );
}
