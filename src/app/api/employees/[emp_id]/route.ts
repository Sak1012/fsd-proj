import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { emp_id: string } }) {
    const { emp_id } = params;
    
    const employeeId = parseInt(emp_id, 10);
    if (isNaN(employeeId)) {
        return NextResponse.json({ error: "Invalid employee ID" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", employeeId)
        .single(); // Ensure you get only one employee
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
