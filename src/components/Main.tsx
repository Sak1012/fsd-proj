"use client";

import { useState } from "react";
import Link from "next/link";

export default function Main() {

  const employee = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@exe.in",
      phone: "1234567890",
      department: "IT",
      designation: "Manager",
      dateOfJoining: "2021-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@exe.in",
      phone: "1234567890",
      department: "HR",
      designation: "Manager",
      dateOfJoining: "2021-01-01",
    },
    {
      id: 3,
      name: "John Smith",
      email: "johnsmith@exe.in",
      phone: "1234567890",
      department: "IT",
      designation: "Developer",
      dateOfJoining: "2021-01-01",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employee);
  // Handle search input change
  const handleSearch = (e:any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEmployees(
      employee.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.phone.includes(query) ||
          emp.department.toLowerCase().includes(query) ||
          emp.designation.toLowerCase().includes(query) ||
          emp.dateOfJoining.includes(query)
      )
    );
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredEmployees(employee);
  };

  return (
    <main className="flex flex-col p-24 w-full">
      {/* Search Section */}
      <section className="flex flex-row items-center w-full mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 w-3/4 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={handleReset}
          className="py-2 w-1/6 ml-2 bg-blue-500 hover:bg-red-400 text-white rounded-md"
        >
          Reset ❌
        </button>
        <Link
          href="/add"
          className="p-2 ml-2 w-1/6 bg-blue-500 hover:bg-green-500 text-white rounded-md text-center"
        >
          Add ➕
        </Link>
      </section>

      {/* Employee List Section */}
      <section className="flex flex-col items-center w-full">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <section
              key={emp.id}
              className="flex flex-row w-full border-gray-300 border-2 my-2 p-2 rounded-md"
            >
			  <section className="flex flex-col w-1/2">
              	<h2>{emp.name}</h2>
              	<p>Email: {emp.email}</p>
              	<p>Phone: {emp.phone}</p>
			  </section>
			  <section className="flex flex-col w-1/2">
              	<p>Department: {emp.department}</p>
              	<p>Designation: {emp.designation}</p>
              	<p>Date of Joining: {emp.dateOfJoining}</p>
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
