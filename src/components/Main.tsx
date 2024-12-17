"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Define the type for an employee
type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  date_of_joining: string;
};

export default function Main() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]); // State for filtered employees

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees");
        const data: Employee[] = await res.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize filtered employees
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        // Fallback to static data
        const fallbackData = [
          {
            id: 1,
            name: "John Doe",
            email: "johndoe@exe.in",
            phone: "1234567890",
            department: "IT",
            designation: "Manager",
            date_of_joining: "2021-01-01",
          },
          {
            id: 2,
            name: "Jane Doe",
            email: "janedoe@exe.in",
            phone: "1234567890",
            department: "HR",
            designation: "Manager",
            date_of_joining: "2021-01-01",
          },
          {
            id: 3,
            name: "John Smith",
            email: "johnsmith@exe.in",
            phone: "1234567890",
            department: "IT",
            designation: "Developer",
            date_of_joining: "2021-01-01",
          },
        ];
        setEmployees(fallbackData);
        setFilteredEmployees(fallbackData); // Initialize filtered employees
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      [emp.name, emp.email,emp.phone, emp.department, emp.designation]
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  return (
    <main className="flex flex-col p-6 w-full max-w-4xl mx-auto">
      <section className="flex flex-row items-center w-full mb-5">
        <input
          type="text"
          className="p-2 w-3/4 border border-gray-300 rounded-md"
          placeholder="Search employees..."
          value={searchTerm} // Bind searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
        />
        <button
          className="py-2 px-4 ml-2 bg-blue-500 hover:bg-red-400 text-white rounded-md"
          onClick={() => setSearchTerm("")} // Clear search term
        >
          Reset ❌
        </button>
        <Link
          href="/add"
          className="py-2 px-4 ml-2 bg-blue-500 hover:bg-green-600 text-white rounded-md text-center"
        >
          Add ➕
        </Link>
      </section>

      <section className="flex flex-col items-center w-full">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <section
              key={emp.id}
              className="flex flex-row w-full border-gray-300 border-2 my-2 p-4 rounded-md"
            >
              <section className="flex flex-col w-1/3">
                <h2 className="font-bold text-lg">{emp.name}</h2>
                <p>Email: {emp.email}</p>
                <p>Phone: {emp.phone}</p>
              </section>
              <section className="flex flex-col w-1/3">
                <p>Department: {emp.department}</p>
                <p>Designation: {emp.designation}</p>
                <p>Date of Joining: {emp.date_of_joining}</p>
              </section>
              <section className="flex flex-col justify-between items-end w-1/3">
				 <Link href={`/edit/${emp.id}`}>
				 <button className="px-2 py-1 bg-gray-600 hover:bg-blue-500 text-white rounded-md">
				 ✏️
				 </button>
				 </Link>
				 <Link href={`/delete/${emp.id}`}>
				 <button className="px-2 py-1 bg-gray-500 hover:bg-red-500 text-white rounded-md">
				 🗑️
				 </button>
				 </Link>
              </section>
            </section>
          ))
        ) : (
          <p className="text-gray-500 mt-5">No employees found.</p>
        )}
      </section>
    </main>
  );
}
