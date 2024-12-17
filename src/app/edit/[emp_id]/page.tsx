"use client";

import { useParams } from "next/navigation";


export default function EditEmployee() {
  const { emp_id } = useParams(); // Fetch the emp_id from the URL

  return (
    <main className="flex flex-col p-24 w-full items-center justify-center">
      <h1 className="text-4xl font-bold">Edit Employee {emp_id}</h1>

    </main>
  );
}
