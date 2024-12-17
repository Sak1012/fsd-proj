import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Get all employees
export async function GET() {
    const { data, error } = await supabase.from("employees").select("*");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
}


// Add a new employee
export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, phone, department, designation, date_of_joining } = body;

    const { data, error } = await supabase.from("employees").insert([
        { name, email, phone, department, designation, date_of_joining },
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
