import Link from "next/link";

export default function Add() {
	return (
      <main className="flex flex-col p-24 w-full items-center justify-center">
			<Link href="/" className="absolute top-3 left-5 hover:text-blue-500 hover:underline"> ← Back </Link>
			<h1 className="text-4xl font-bold">Add Employee</h1>
			<form className="flex flex-col w-full">
				<label className="p-2">Name</label>
				<input type="text" className="p-2 border border-gray-300 rounded-md" placeholder="Name" required />
				<label className="p-2">Email</label>
				<input type="email" className="p-2 border border-gray-300 rounded-md" placeholder="Email" required />
				<label className="p-2">Phone</label>
				<input type="tel" className="p-2 border border-gray-300 rounded-md" placeholder="Phone" required />
				<label className="p-2">Department</label>
				<input type="text" className="p-2 border border-gray-300 rounded-md" placeholder="Department" required />
				<label className="p-2">Designation</label>
				<select className="p-2 border border-gray-300 rounded-md">
					<option>Manager</option>
					<option>Developer</option>
					<option>HR</option>
				</select>
				<label className="p-2">Date of Joining</label>
				<input type="date" className="p-2 border border-gray-300 rounded-md" />
				<section className="flex flex-row justify-center w-full mt-10">
					<button type="submit" className="p-2 w-1/4 m-2 bg-blue-500 hover:bg-green-500 text-white rounded-md">Add</button>
					<button className="p-2 w-1/4 m-2 bg-blue-500 hover:bg-red-400 text-white rounded-md">Reset</button>
				</section>
			</form>
      </main>
  );
}
